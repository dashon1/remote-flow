import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

export default function SkillAssessment({ categories, onComplete }) {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentSkill, setCurrentSkill] = useState(0);

  const allSkills = categories.flatMap(cat => 
    cat.skills.map(skill => ({ skill, category: cat.name }))
  );
  
  const currentSkillData = allSkills[currentSkill];
  const progress = ((currentSkill + 1) / allSkills.length) * 100;

  const questions = {
    "Written Communication": "How comfortable are you with written communication (emails, documentation, chat)?",
    "Video Conferencing": "How confident are you in video meetings and presentations?",
    "Active Listening": "How well do you listen and respond in virtual conversations?",
    "Documentation": "How skilled are you at creating clear, detailed documentation?",
    "Time Management": "How well do you manage your time and priorities without supervision?",
    "Self-Motivation": "How good are you at staying motivated without external accountability?",
    "Goal Setting": "How effectively do you set and achieve personal goals?",
    "Discipline": "How well can you maintain focus and avoid distractions at home?",
    "Slack/Teams": "How comfortable are you with team communication platforms?",
    "Video Calls": "How proficient are you with video calling software?",
    "Project Management Tools": "How experienced are you with project management platforms?",
    "Cloud Storage": "How comfortable are you with cloud-based file sharing?",
    "Async Communication": "How well do you communicate across different time zones?",
    "Cross-cultural Awareness": "How comfortable are you working with diverse, global teams?",
    "Virtual Team Building": "How good are you at building relationships remotely?",
    "Conflict Resolution": "How well do you handle disagreements in virtual settings?"
  };

  const handleAnswer = (value) => {
    const newAnswers = {
      ...answers,
      [currentSkillData.skill]: parseInt(value)
    };
    setAnswers(newAnswers);

    if (currentSkill < allSkills.length - 1) {
      setCurrentSkill(currentSkill + 1);
    } else {
      // Calculate category averages
      const categoryScores = {};
      categories.forEach(category => {
        const categorySkills = category.skills;
        const scores = categorySkills.map(skill => newAnswers[skill] || 0);
        categoryScores[category.name] = Math.round(
          scores.reduce((sum, score) => sum + score, 0) / scores.length * 10
        ) / 10;
      });
      onComplete(categoryScores);
    }
  };

  const goBack = () => {
    if (currentSkill > 0) {
      setCurrentSkill(currentSkill - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-0">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl">
              Skill Assessment
            </CardTitle>
            <span className="text-sm text-slate-500">
              {currentSkill + 1} of {allSkills.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {currentSkillData?.skill}
            </h3>
            <p className="text-slate-600">
              {questions[currentSkillData?.skill]}
            </p>
          </div>

          <RadioGroup 
            onValueChange={handleAnswer}
            value={answers[currentSkillData?.skill]?.toString() || ""}
            className="space-y-4"
          >
            {[
              { value: "5", label: "Expert - I excel at this and could teach others" },
              { value: "4", label: "Advanced - I'm very comfortable and effective" },
              { value: "3", label: "Intermediate - I can do this adequately" },
              { value: "2", label: "Beginner - I have basic knowledge but need improvement" },
              { value: "1", label: "Novice - I have little to no experience with this" }
            ].map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value} className="flex-1 cursor-pointer">
                  <div className="font-medium text-slate-900">{value}/5</div>
                  <div className="text-sm text-slate-600">{label}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={goBack}
              disabled={currentSkill === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={() => handleAnswer(answers[currentSkillData?.skill] || "1")}
              disabled={!answers[currentSkillData?.skill]}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {currentSkill === allSkills.length - 1 ? 'Complete Assessment' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}