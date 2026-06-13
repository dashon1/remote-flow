import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Star, Clock, Users } from "lucide-react";

export default function LearningPaths({ skillScores }) {
  const learningPaths = [
    {
      title: "Remote Communication Master",
      description: "Master written and verbal communication for remote teams",
      duration: "4 weeks",
      level: "Beginner to Intermediate",
      rating: 4.8,
      students: "12,000+",
      skills: ["Written Communication", "Video Conferencing", "Documentation"],
      courses: [
        { name: "Business Writing for Remote Teams", provider: "Coursera", duration: "1 week" },
        { name: "Video Presentation Skills", provider: "LinkedIn Learning", duration: "2 hours" },
        { name: "Technical Documentation", provider: "Udemy", duration: "1 week" }
      ]
    },
    {
      title: "Remote Work Productivity Pro",
      description: "Build self-management and productivity skills for remote success",
      duration: "3 weeks", 
      level: "All Levels",
      rating: 4.7,
      students: "8,500+",
      skills: ["Time Management", "Self-Motivation", "Goal Setting"],
      courses: [
        { name: "Time Management for Remote Workers", provider: "Skillshare", duration: "1 week" },
        { name: "Building Self-Discipline", provider: "MasterClass", duration: "3 hours" },
        { name: "Goal Setting & Achievement", provider: "Coursera", duration: "1 week" }
      ]
    },
    {
      title: "Digital Collaboration Expert",
      description: "Master remote tools and async collaboration techniques",
      duration: "5 weeks",
      level: "Beginner",
      rating: 4.6,
      students: "15,000+",
      skills: ["Slack/Teams", "Project Management Tools", "Async Communication"],
      courses: [
        { name: "Slack for Team Communication", provider: "LinkedIn Learning", duration: "1 hour" },
        { name: "Asana Project Management", provider: "Asana Academy", duration: "2 weeks" },
        { name: "Async Communication Best Practices", provider: "Remote Year", duration: "1 week" }
      ]
    },
    {
      title: "Global Remote Leader",
      description: "Lead and collaborate across cultures and time zones",
      duration: "6 weeks",
      level: "Intermediate to Advanced", 
      rating: 4.9,
      students: "3,200+",
      skills: ["Cross-cultural Awareness", "Virtual Team Building", "Conflict Resolution"],
      courses: [
        { name: "Cultural Intelligence", provider: "edX", duration: "2 weeks" },
        { name: "Remote Team Leadership", provider: "FutureLearn", duration: "3 weeks" },
        { name: "Virtual Conflict Resolution", provider: "Coursera", duration: "1 week" }
      ]
    }
  ];

  // Recommend paths based on skill scores
  const getRecommendedPaths = () => {
    if (!skillScores || Object.keys(skillScores).length === 0) {
      return learningPaths;
    }

    return learningPaths.map(path => {
      const relevantScores = path.skills.map(skill => skillScores[skill] || 0);
      const avgScore = relevantScores.reduce((sum, score) => sum + score, 0) / relevantScores.length;
      
      return {
        ...path,
        recommended: avgScore < 3,
        relevanceScore: avgScore
      };
    }).sort((a, b) => (a.relevanceScore || 5) - (b.relevanceScore || 5));
  };

  const recommendedPaths = getRecommendedPaths();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Personalized Learning Paths
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Curated learning experiences designed to boost your remote work skills
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {recommendedPaths.map((path, index) => (
          <Card key={index} className={`shadow-xl border-0 overflow-hidden ${
            path.recommended ? 'ring-2 ring-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50' : ''
          }`}>
            <CardHeader className="relative">
              {path.recommended && (
                <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                  Recommended for You
                </Badge>
              )}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg text-slate-900 mb-2">
                    {path.title}
                  </CardTitle>
                  <p className="text-sm text-slate-600 mb-3">{path.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {path.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {path.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      {path.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {path.students}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Included Courses</h4>
                <div className="space-y-2">
                  {path.courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">{course.name}</p>
                        <p className="text-xs text-slate-500">by {course.provider} • {course.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Level: {path.level}</span>
                  <span className="text-lg font-bold text-slate-900">Free</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Start Learning Path
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}