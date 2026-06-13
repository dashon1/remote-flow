import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  CheckCircle,
  AlertCircle,
  Star,
  BookOpen,
  Award,
  ExternalLink
} from "lucide-react";

import SkillAssessment from "../components/skills/SkillAssessment";
import SkillGapAnalysis from "../components/skills/SkillGapAnalysis";
import LearningPaths from "../components/skills/LearningPaths";

export default function Skills() {
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [skillScores, setSkillScores] = useState({});

  const handleAssessmentComplete = (scores) => {
    setSkillScores(scores);
    setAssessmentComplete(true);
  };

  const remoteSkillCategories = [
    {
      name: "Communication",
      description: "Written and verbal communication skills for remote collaboration",
      skills: ["Written Communication", "Video Conferencing", "Active Listening", "Documentation"],
      importance: "high"
    },
    {
      name: "Self-Management", 
      description: "Ability to work independently and manage your time effectively",
      skills: ["Time Management", "Self-Motivation", "Goal Setting", "Discipline"],
      importance: "high"
    },
    {
      name: "Technical Proficiency",
      description: "Digital tools and platforms commonly used in remote work",
      skills: ["Slack/Teams", "Video Calls", "Project Management Tools", "Cloud Storage"],
      importance: "high"
    },
    {
      name: "Collaboration",
      description: "Working effectively with distributed teams",
      skills: ["Async Communication", "Cross-cultural Awareness", "Virtual Team Building", "Conflict Resolution"],
      importance: "medium"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Remote Work Skills Assessment
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Evaluate your remote work readiness and discover areas for improvement
          </p>
        </div>

        <Tabs defaultValue="assessment" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="analysis">Gap Analysis</TabsTrigger>
            <TabsTrigger value="learning">Learning Paths</TabsTrigger>
          </TabsList>

          <TabsContent value="assessment">
            {!assessmentComplete ? (
              <SkillAssessment 
                categories={remoteSkillCategories}
                onComplete={handleAssessmentComplete}
              />
            ) : (
              <div className="space-y-8">
                <Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-800">
                      <CheckCircle className="w-6 h-6" />
                      Assessment Complete!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-emerald-700 mb-4">
                      Great job completing the assessment! Check out your results below and explore the Gap Analysis tab for personalized recommendations.
                    </p>
                    <Button 
                      onClick={() => setAssessmentComplete(false)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Retake Assessment
                    </Button>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(skillScores).map(([category, score]) => (
                    <Card key={category} className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="text-lg">{category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Score</span>
                          <span className="font-semibold">{score}/5</span>
                        </div>
                        <Progress value={(score / 5) * 100} className="h-3" />
                        <Badge 
                          className={`mt-3 ${
                            score >= 4 ? 'bg-green-100 text-green-800' :
                            score >= 3 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {score >= 4 ? 'Strong' : score >= 3 ? 'Good' : 'Needs Work'}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analysis">
            <SkillGapAnalysis 
              skillScores={skillScores} 
              categories={remoteSkillCategories}
              assessmentComplete={assessmentComplete}
            />
          </TabsContent>

          <TabsContent value="learning">
            <LearningPaths skillScores={skillScores} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}