import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Video, 
  BookOpen, 
  ExternalLink, 
  Star,
  Clock,
  Users,
  Award,
  Target,
  MessageSquare,
  Laptop,
  Globe
} from "lucide-react";

import ResourceCard from "../components/resources/ResourceCard";
import GuideSection from "../components/resources/GuideSection";

export default function Resources() {
  const topResources = [
    {
      title: "Remote Job Boards Directory",
      description: "Comprehensive list of the best remote job platforms",
      type: "directory",
      icon: Globe,
      color: "blue",
      featured: true,
      resources: [
        { name: "Remote.co", url: "https://remote.co", description: "Curated remote jobs" },
        { name: "We Work Remotely", url: "https://weworkremotely.com", description: "Largest remote community" },
        { name: "FlexJobs", url: "https://flexjobs.com", description: "Premium vetted positions" },
        { name: "AngelList", url: "https://angel.co", description: "Startup opportunities" }
      ]
    },
    {
      title: "Resume Optimization Guide",
      description: "ATS-friendly resume tips for remote positions",
      type: "guide",
      icon: FileText,
      color: "emerald",
      featured: true,
      tips: [
        "Include 'remote work' keywords naturally",
        "Highlight async communication skills",
        "Show self-management abilities",
        "Include relevant tech stack",
        "Quantify achievements with metrics"
      ]
    },
    {
      title: "Remote Interview Preparation",
      description: "Master video interviews and remote scenarios",
      type: "guide",
      icon: Video,
      color: "purple",
      featured: true,
      tips: [
        "Test your tech setup beforehand",
        "Prepare for technical demos",
        "Practice explaining remote work experience",
        "Have examples of self-directed projects",
        "Prepare questions about remote culture"
      ]
    },
    {
      title: "Salary Negotiation for Remote Roles",
      description: "Navigate location-based pay and remote premiums",
      type: "guide",
      icon: Target,
      color: "amber",
      featured: false,
      tips: [
        "Research location-adjusted salaries",
        "Highlight cost savings for employers",
        "Negotiate for remote work equipment",
        "Consider equity and benefits packages",
        "Know your market value globally"
      ]
    }
  ];

  const learningResources = [
    {
      title: "Remote Work Skills Bootcamp",
      provider: "Coursera",
      rating: 4.7,
      duration: "4 weeks",
      price: "Free",
      skills: ["Communication", "Time Management", "Digital Collaboration"]
    },
    {
      title: "Async Communication Mastery",
      provider: "LinkedIn Learning",
      rating: 4.5,
      duration: "2 hours",
      price: "$29.99",
      skills: ["Written Communication", "Documentation", "Slack Mastery"]
    },
    {
      title: "Remote Leadership Certificate",
      provider: "edX",
      rating: 4.8,
      duration: "8 weeks",
      price: "$199",
      skills: ["Team Management", "Virtual Meetings", "Performance Tracking"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Remote Job Resources
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need to master the remote job search, from resume optimization to interview preparation
          </p>
        </div>

        {/* Featured Resources */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {topResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>

        {/* Job Search Strategy Guide */}
        <GuideSection 
          title="The 30-Day Remote Job Search Strategy"
          description="A proven step-by-step approach to landing remote work"
          weeks={[
            {
              title: "Week 1: Foundation",
              tasks: [
                "Optimize your LinkedIn profile for remote work",
                "Create ATS-friendly resume with remote keywords",
                "Set up job alerts on 5+ remote job platforms",
                "Join remote work communities (Remote Year, Nomad List)"
              ]
            },
            {
              title: "Week 2: Applications",
              tasks: [
                "Apply to 15-20 positions that match your skills",
                "Customize cover letters for each application",
                "Follow up on applications sent previous week",
                "Network with remote workers in your industry"
              ]
            },
            {
              title: "Week 3: Interview Prep",
              tasks: [
                "Practice common remote interview questions",
                "Test your video call setup and lighting",
                "Prepare remote work portfolio examples",
                "Research company remote culture and values"
              ]
            },
            {
              title: "Week 4: Follow Through",
              tasks: [
                "Send thank you notes after interviews",
                "Continue applying to new positions",
                "Negotiate offers with remote work considerations",
                "Plan your remote work setup and schedule"
              ]
            }
          ]}
        />

        {/* Learning Resources */}
        <Card className="mb-12 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
            <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Skill Development Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningResources.map((course, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <Award className="w-8 h-8 text-blue-600" />
                    <Badge className="bg-green-100 text-green-800">
                      {course.price}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">by {course.provider}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      {course.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Remote Work Communities */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
              <Users className="w-6 h-6 text-purple-600" />
              Remote Work Communities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Remote Work Hub",
                  description: "Slack community with 50k+ remote workers",
                  members: "50,000+",
                  focus: "General remote work discussion"
                },
                {
                  name: "Nomad List",
                  description: "Community for digital nomads and remote workers",
                  members: "100,000+",
                  focus: "Location-independent professionals"
                },
                {
                  name: "Remote Year",
                  description: "Travel program and community for remote workers",
                  members: "10,000+",
                  focus: "Remote work + travel"
                },
                {
                  name: "Women in Remote Work",
                  description: "Supportive community for women in remote roles",
                  members: "25,000+",
                  focus: "Women's remote career growth"
                },
                {
                  name: "Remote Work Association",
                  description: "Professional association for remote work advocates",
                  members: "15,000+",
                  focus: "Remote work best practices"
                },
                {
                  name: "r/remotework",
                  description: "Reddit community for remote work discussions",
                  members: "300,000+",
                  focus: "Job leads and remote work tips"
                }
              ].map((community, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                  <h3 className="font-semibold text-slate-900 mb-2">{community.name}</h3>
                  <p className="text-sm text-slate-600 mb-3">{community.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      <Users className="w-4 h-4 inline mr-1" />
                      {community.members}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {community.focus}
                    </Badge>
                  </div>
                  <Button className="w-full mt-4" variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Join Community
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}