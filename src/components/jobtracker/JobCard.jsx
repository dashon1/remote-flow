import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Edit, 
  Calendar, 
  Building, 
  DollarSign,
  ArrowUpCircle,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function JobCard({ job, onEdit, onStatusChange, compact = false }) {
  const statusColors = {
    saved: "bg-slate-100 text-slate-800 border-slate-200",
    applied: "bg-blue-100 text-blue-800 border-blue-200",
    interview: "bg-purple-100 text-purple-800 border-purple-200",
    offer: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200"
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200"
  };

  const statusIcons = {
    saved: Clock,
    applied: ArrowUpCircle,
    interview: Calendar,
    offer: CheckCircle,
    rejected: XCircle
  };

  const StatusIcon = statusIcons[job.status] || Clock;

  return (
    <Card className={`transition-all hover:shadow-lg border-0 ${compact ? 'shadow-md' : 'shadow-xl'}`}>
      <CardHeader className={`${compact ? 'p-4 pb-2' : 'p-6 pb-4'}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-slate-900 ${compact ? 'text-sm' : 'text-lg'} truncate`}>
              {job.job_title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Building className="w-4 h-4 text-slate-400" />
              <span className={`text-slate-600 ${compact ? 'text-xs' : 'text-sm'} truncate`}>
                {job.company_name}
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={compact ? 'h-8 w-8' : 'h-10 w-10'}>
                <StatusIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStatusChange(job, "saved")}>
                <Clock className="w-4 h-4 mr-2" />
                Mark as Saved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(job, "applied")}>
                <ArrowUpCircle className="w-4 h-4 mr-2" />
                Mark as Applied
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(job, "interview")}>
                <Calendar className="w-4 h-4 mr-2" />
                Mark as Interview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(job, "offer")}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Offer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(job, "rejected")}>
                <XCircle className="w-4 h-4 mr-2" />
                Mark as Rejected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={`${statusColors[job.status]} border text-xs`}>
            {job.status}
          </Badge>
          {job.priority && (
            <Badge className={`${priorityColors[job.priority]} border text-xs`}>
              {job.priority} priority
            </Badge>
          )}
          {job.platform && (
            <Badge variant="secondary" className="text-xs">
              {job.platform}
            </Badge>
          )}
        </div>
      </CardHeader>

      {!compact && (
        <CardContent className="p-6 pt-2">
          <div className="space-y-3">
            {job.salary_range && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <DollarSign className="w-4 h-4" />
                {job.salary_range}
              </div>
            )}
            
            {job.application_date && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" />
                Applied {format(new Date(job.application_date), "MMM d, yyyy")}
              </div>
            )}

            {job.notes && (
              <p className="text-sm text-slate-600 line-clamp-2">
                {job.notes}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(job)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              {job.job_url && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open(job.job_url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Job
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}