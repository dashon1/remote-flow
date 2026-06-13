import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, TrendingUp, Target } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuickStats({ stats, isLoading }) {
  const statCards = [
    {
      title: "Total Job Leads",
      value: stats.total,
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      title: "Applications Sent",
      value: stats.applied,
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      title: "Interviews",
      value: stats.interviews,
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100"
    },
    {
      title: "Offers",
      value: stats.offers,
      icon: Target,
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