import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Clock, Target, FileText, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ActionItems() {
  const actions = [
    {
      title: "Optimize Your Resume",
      description: "Tailor your resume for remote positions with ATS-friendly keywords",
      icon: FileText,
      color: "blue",
      priority: "high",
      timeEstimate: "30 mins",
      link: createPageUrl("Resources")
    },
    {
      title: "Set Up Job Alerts",
      description: "Create targeted alerts on major job platforms",
      icon: Clock,
      color: "purple",
      priority: "high",
      timeEstimate: "15 mins",
      link: createPageUrl("Resources")
    },
    {
      title: "Assess Your Skills",
      description: "Identify skill gaps and areas for improvement",
      icon: Target,
      color: "emerald",
      priority: "medium",
      timeEstimate: "20 mins",
      link: createPageUrl("Skills")
    },
    {
      title: "Practice Remote Interviews",
      description: "Prepare for video interviews and remote work scenarios",
      icon: MessageSquare,
      color: "amber",
      priority: "medium",
      timeEstimate: "45 mins",
      link: createPageUrl("Resources")
    }
  ];

  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200"
  };

  const iconColors = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    emerald: "from-emerald-500 to-emerald-600",
    amber: "from-amber-500 to-amber-600"
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          Your Action Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <div key={index} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:shadow-md transition-all bg-white">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${iconColors[action.color]} shadow-lg`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-semibold text-slate-900">{action.title}</h4>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium ${priorityColors[action.priority]}`}>
                    {action.priority}
                  </span>
                  <span className="text-xs text-slate-500">{action.timeEstimate}</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">{action.description}</p>
              <Link to={action.link}>
                <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}