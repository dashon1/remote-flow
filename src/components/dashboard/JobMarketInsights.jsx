import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Globe, Clock } from "lucide-react";

export default function JobMarketInsights() {
  const insights = [
    {
      title: "Top Remote Skills in Demand",
      items: ["React/JavaScript", "Python", "Cloud (AWS/Azure)", "Project Management", "UI/UX Design"],
      icon: TrendingUp,
      color: "blue"
    },
    {
      title: "Best Time to Apply",
      items: ["Tuesday-Thursday", "8-10 AM EST", "Avoid Mondays/Fridays", "Early in the month"],
      icon: Clock,
      color: "purple"
    },
    {
      title: "Remote-Friendly Companies",
      items: ["GitLab", "Buffer", "Zapier", "Automattic", "InVision"],
      icon: Users,
      color: "emerald"
    },
    {
      title: "Global Remote Trends",
      items: ["+40% remote jobs", "Hybrid is growing", "Tech leads adoption", "Geographic flexibility"],
      icon: Globe,
      color: "amber"
    }
  ];

  const colorSchemes = {
    blue: "from-blue-50 to-blue-100 text-blue-800 border-blue-200",
    purple: "from-purple-50 to-purple-100 text-purple-800 border-purple-200",
    emerald: "from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-200",
    amber: "from-amber-50 to-amber-100 text-amber-800 border-amber-200"
  };

  return (
    <Card className="shadow-xl border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
        <CardTitle className="text-xl font-bold text-slate-900">
          2024 Remote Job Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r from-${insight.color}-500 to-${insight.color}-600`}>
                  <insight.icon className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900">{insight.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {insight.items.map((item, itemIndex) => (
                  <Badge 
                    key={itemIndex}
                    variant="secondary"
                    className={`bg-gradient-to-r ${colorSchemes[insight.color]} border font-medium`}
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}