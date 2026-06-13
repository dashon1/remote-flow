import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp, CheckCircle, Target } from "lucide-react";

export default function SkillGapAnalysis({ skillScores, categories, assessmentComplete }) {
  if (!assessmentComplete) {
    return (
      <Card className="shadow-xl border-0">
        <CardContent className="p-12 text-center">
          <Target className="w-16 h-16 mx-auto text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Complete Your Assessment First
          </h3>
          <p className="text-slate-600">
            Take the skills assessment to see your personalized gap analysis and recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getSkillLevel = (score) => {
    if (score >= 4) return { level: "Strong", color: "emerald", icon: CheckCircle };
    if (score >= 3) return { level: "Good", color: "yellow", icon: TrendingUp };
    return { level: "Needs Improvement", color: "red", icon: AlertTriangle };
  };

  const prioritySkills = Object.entries(skillScores)
    .sort(([,a], [,b]) => a - b)
    .slice(0, 3);

  const strongSkills = Object.entries(skillScores)
    .filter(([,score]) => score >= 4)
    .sort(([,a], [,b]) => b - a);

  return (
    <div className="space-y-8">
      {/* Priority Areas for Improvement */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-6 h-6" />
            Priority Areas for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {prioritySkills.map(([skill, score], index) => {
              const skillInfo = getSkillLevel(score);
              const category = categories.find(cat => cat.skills?.includes(skill));
              
              return (
                <div key={skill} className="flex items-center gap-4 p-4 border border-red-200 rounded-lg bg-red-50/50">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="font-bold text-red-800">#{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">{skill}</h4>
                      <Badge className="bg-red-100 text-red-800">
                        {skillInfo.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress value={(score / 5) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{score}/5</span>
                    </div>
                    {category && (
                      <p className="text-sm text-slate-600 mt-2">{category.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Strengths */}
      {strongSkills.length > 0 && (
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b">
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <CheckCircle className="w-6 h-6" />
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {strongSkills.map(([skill, score]) => (
                <div key={skill} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div>
                    <h4 className="font-semibold text-slate-900">{skill}</h4>
                    <Badge className="bg-emerald-100 text-emerald-800 mt-1">
                      Strong
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-800">{score}/5</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Target className="w-6 h-6 text-blue-600" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {prioritySkills.slice(0, 2).map(([skill, score]) => {
              const recommendations = {
                "Written Communication": [
                  "Practice writing clear, concise emails daily",
                  "Learn Markdown for better documentation",
                  "Take an online business writing course"
                ],
                "Time Management": [
                  "Use time-blocking techniques",
                  "Try the Pomodoro Technique",
                  "Set up a dedicated workspace at home"
                ],
                "Self-Motivation": [
                  "Create daily routines and stick to them",
                  "Set small, achievable daily goals",
                  "Find an accountability partner"
                ],
                "Video Conferencing": [
                  "Practice presenting to a camera",
                  "Learn keyboard shortcuts for video platforms",
                  "Invest in good lighting and audio equipment"
                ]
              };

              const skillRecs = recommendations[skill] || [
                "Research best practices for this skill",
                "Practice regularly in real-world scenarios",
                "Seek feedback from colleagues or mentors"
              ];

              return (
                <div key={skill} className="p-4 border border-blue-200 rounded-lg bg-blue-50/50">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Improving {skill}
                  </h4>
                  <div className="space-y-2">
                    {skillRecs.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-slate-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}