import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar } from "lucide-react";

export default function GuideSection({ title, description, weeks }) {
  return (
    <Card className="mb-12 shadow-xl border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
        <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
          <Calendar className="w-6 h-6 text-indigo-600" />
          {title}
        </CardTitle>
        <p className="text-slate-600 mt-2">{description}</p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {weeks.map((week, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-indigo-100 text-indigo-800">
                  Week {index + 1}
                </Badge>
                <h3 className="font-semibold text-slate-900">{week.title}</h3>
              </div>
              <div className="space-y-3">
                {week.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-slate-700">{task}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}