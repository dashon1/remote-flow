import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";

export default function RemotePlatforms() {
  const platforms = [
    {
      name: "Remote.co",
      description: "Curated remote jobs from top companies",
      rating: 4.8,
      category: "General",
      url: "https://remote.co",
      featured: true
    },
    {
      name: "We Work Remotely",
      description: "Largest remote work community",
      rating: 4.6,
      category: "Community",
      url: "https://weworkremotely.com",
      featured: true
    },
    {
      name: "FlexJobs",
      description: "Vetted flexible and remote positions",
      rating: 4.5,
      category: "Premium",
      url: "https://flexjobs.com",
      featured: false
    },
    {
      name: "AngelList",
      description: "Startup and tech remote opportunities",
      rating: 4.4,
      category: "Startup",
      url: "https://angel.co",
      featured: false
    }
  ];

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Star className="w-5 h-5 text-amber-500" />
          Top Remote Job Platforms
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.map((platform, index) => (
          <div key={index} className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
            platform.featured ? 'border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50' : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900">{platform.name}</h4>
                  {platform.featured && (
                    <Badge className="bg-amber-100 text-amber-800 text-xs">Featured</Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-2">{platform.description}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium text-slate-700">{platform.rating}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {platform.category}
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full mt-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
              onClick={() => window.open(platform.url, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Platform
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}