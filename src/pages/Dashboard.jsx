import React, { useState, useEffect } from "react";
import { JobLead } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Search, 
  TrendingUp, 
  Target, 
  Calendar,
  ArrowRight,
  Briefcase,
  Star,
  Users,
  Globe,
  Clock,
  CheckCircle,
  ExternalLink,
  Rocket
} from "lucide-react";

import QuickStats from "../components/dashboard/QuickStats";
import JobMarketInsights from "../components/dashboard/JobMarketInsights";
import RemotePlatforms from "../components/dashboard/RemotePlatforms";
import ActionItems from "../components/dashboard/ActionItems";

export default function Dashboard() {
  const [jobLeads, setJobLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadJobLeads();
  }, []);

  const loadJobLeads = async () => {
    setIsLoading(true);
    const data = await JobLead.list("-created_date");
    setJobLeads(data);
    setIsLoading(false);
  };

  const getApplicationStats = () => {
    const total = jobLeads.length;
    const applied = jobLeads.filter(job => job.status !== 'saved').length;
    const interviews = jobLeads.filter(job => job.status === 'interview').length;
    const offers = jobLeads.filter(job => job.status === 'offer').length;
    
    return { total, applied, interviews, offers };
  };

  const stats = getApplicationStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-8 md:p-12 mb-8 text-white">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  Master the Remote Job Market
                </h1>
                <p className="text-xl text-blue-100 mb-6 max-w-2xl">
                  Your complete guide to landing high-paying remote positions in 2024's competitive market
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to={createPageUrl("Resources")}>
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                      <Rocket className="w-5 h-5 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                  <Link to={createPageUrl("JobTracker")}>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Track Applications
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-64 h-64 relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-white/5 rounded-full animate-ping"></div>
                  <Search className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white/80" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-24 translate-x-24"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* Quick Stats */}
        <QuickStats stats={stats} isLoading={isLoading} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-8">
            <JobMarketInsights />
            <ActionItems />
          </div>
          <div className="space-y-8">
            <RemotePlatforms />
            
            {/* Progress Card */}
            <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-br from-emerald-50 to-teal-50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <Target className="w-5 h-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-emerald-700">Job Applications</span>
                    <span className="font-semibold text-emerald-800">{stats.applied}/10</span>
                  </div>
                  <Progress value={(stats.applied / 10) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-emerald-700">Interview Rate</span>
                    <span className="font-semibold text-emerald-800">
                      {stats.applied > 0 ? Math.round((stats.interviews / stats.applied) * 100) : 0}%
                    </span>
                  </div>
                  <Progress 
                    value={stats.applied > 0 ? (stats.interviews / stats.applied) * 100 : 0} 
                    className="h-2" 
                  />
                </div>
                <p className="text-sm text-emerald-600 mt-4">
                  Keep applying! Industry average interview rate is 10-15%.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to accelerate your remote job search?</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Access our comprehensive resources, track your applications, and get personalized guidance to land your dream remote job.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={createPageUrl("Skills")}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Assess Skills
                </Button>
              </Link>
              <Link to={createPageUrl("Resources")}>
                <Button size="lg" variant="outline">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Browse Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}