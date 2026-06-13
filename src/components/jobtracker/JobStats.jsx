import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Send, Calendar, Trophy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobStats({ jobs, isLoading }) {
  const getStats = () => {
    const total = jobs.length;
    const applied = jobs.filter(job => job.status === 'applied' || job.status === 'interview' || job.status === 'offer').length;
    const interviews = jobs.filter(job => job.status === 'interview').length;
    const offers = jobs.filter(job => job.status === 'offer').length;
    
    return { total, applied, interviews, offers };
  };

  const stats = getStats();

  const statCards = [
    {
      title: "Total Leads",
      value: stats.total,
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      title: "Applications",
      value: stats.applied,
      icon: Send,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      title: "Interviews",
      value: stats.interviews,
      icon: Calendar,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100"
    },
    {
      title: "Offers",
      value: stats.offers,
      icon: Trophy,
      color: "from-amber-500 to-amber-600",
      bgColor: "from-amber-50 to-amber-100"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index} className="overflow-hidden shadow-lg border-0">
          <CardContent className={`p-6 bg-gradient-to-br ${stat.bgColor} relative`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">{stat.title}</p>
                {isLoading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                )}
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}