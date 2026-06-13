import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle } from "lucide-react";

export default function ResourceCard({ resource }) {
  const colorSchemes = {
    blue: "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
    amber: "from-amber-500 to-amber-600"
  };

  const bgColorSchemes = {
    blue: "from-blue-50 to-blue-100",
    emerald: "from-emerald-50 to-emerald-100",
    purple: "from-purple-50 to-purple-100",
    amber: "from-amber-50 to-amber-100"
  };

  return (
    <Card className="overflow-hidden shadow-xl border-0 hover:shadow-2xl transition-all">
      <CardHeader className={`bg-gradient-to-r ${bgColorSchemes[resource.color]} border-b relative`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${colorSchemes[resource.color]} shadow-lg`}>
              <resource.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-900">{resource.title}</CardTitle>
              {resource.featured && (
                <Badge className="mt-1 bg-amber-100 text-amber-800">Featured</Badge>
              )}
            </div>
          </div>
        </div>
        <p className="text-slate-600 mt-2">{resource.description}</p>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
      </CardHeader>
      
      <CardContent className="p-6">
        {resource.type === 'directory' && resource.resources && (
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 mb-3">Top Platforms</h4>
            {resource.resources.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">{platform.name}</p>
                  <p className="text-sm text-slate-600">{platform.description}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open(platform.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {resource.type === 'guide' && resource.tips && (
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 mb-3">Key Tips</h4>
            {resource.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}