import React, { useState, useEffect } from "react";
import { JobLead } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, ExternalLink, Calendar, Building, MapPin } from "lucide-react";
import { format } from "date-fns";

import JobForm from "../components/jobtracker/JobForm";
import JobCard from "../components/jobtracker/JobCard";
import JobStats from "../components/jobtracker/JobStats";

export default function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setIsLoading(true);
    const data = await JobLead.list("-created_date");
    setJobs(data);
    setIsLoading(false);
  };

  const handleSubmit = async (jobData) => {
    if (editingJob) {
      await JobLead.update(editingJob.id, jobData);
    } else {
      await JobLead.create(jobData);
    }
    setShowForm(false);
    setEditingJob(null);
    loadJobs();
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleStatusChange = async (job, newStatus) => {
    await JobLead.update(job.id, { 
      ...job, 
      status: newStatus,
      application_date: newStatus !== 'saved' && !job.application_date ? new Date().toISOString().split('T')[0] : job.application_date
    });
    loadJobs();
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.job_title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || job.status === filterStatus;
    const matchesPlatform = filterPlatform === "all" || job.platform === filterPlatform;
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const jobsByStatus = {
    saved: filteredJobs.filter(job => job.status === 'saved'),
    applied: filteredJobs.filter(job => job.status === 'applied'),
    interview: filteredJobs.filter(job => job.status === 'interview'),
    offer: filteredJobs.filter(job => job.status === 'offer'),
    rejected: filteredJobs.filter(job => job.status === 'rejected')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Job Application Tracker</h1>
            <p className="text-slate-600">Organize and track your remote job applications</p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Job Lead
          </Button>
        </div>

        <JobStats jobs={jobs} isLoading={isLoading} />

        {showForm && (
          <div className="mb-8">
            <JobForm
              job={editingJob}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingJob(null);
              }}
            />
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search companies or job titles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="saved">Saved</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Remote.co">Remote.co</SelectItem>
                    <SelectItem value="FlexJobs">FlexJobs</SelectItem>
                    <SelectItem value="We Work Remotely">We Work Remotely</SelectItem>
                    <SelectItem value="AngelList">AngelList</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Pipeline */}
        <Tabs defaultValue="pipeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
            <TabsTrigger value="saved">Saved ({jobsByStatus.saved.length})</TabsTrigger>
            <TabsTrigger value="applied">Applied ({jobsByStatus.applied.length})</TabsTrigger>
            <TabsTrigger value="interview">Interviews ({jobsByStatus.interview.length})</TabsTrigger>
            <TabsTrigger value="offers">Offers ({jobsByStatus.offer.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline">
            <div className="grid lg:grid-cols-5 gap-6">
              {Object.entries(jobsByStatus).map(([status, statusJobs]) => (
                <div key={status} className="space-y-4">
                  <h3 className="font-semibold text-slate-900 capitalize flex items-center gap-2">
                    {status} 
                    <Badge variant="secondary" className="ml-auto">
                      {statusJobs.length}
                    </Badge>
                  </h3>
                  <div className="space-y-3">
                    {statusJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onEdit={handleEdit}
                        onStatusChange={handleStatusChange}
                        compact={true}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {Object.entries(jobsByStatus).map(([status, statusJobs]) => (
            <TabsContent key={status} value={status}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statusJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={handleEdit}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {filteredJobs.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No jobs found</h3>
            <p className="text-slate-600 mb-4">Start tracking your job applications to see them here</p>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Job
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}