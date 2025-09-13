import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WellnessButton } from "@/components/ui/wellness-button";
import { BookOpen, Brain, User, LogOut, Calendar, TrendingUp } from "lucide-react";
import { WellnessScene } from "@/components/3d/WellnessScene";

const Dashboard = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background Scene */}
      <WellnessScene />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient opacity-40 -z-5" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">
              Welcome to Your Wellness Dashboard
            </h1>
            <p className="text-lg text-primary-foreground/80 mt-2">
              Choose how you'd like to explore your mental wellness today
            </p>
          </div>
          <Link to="/">
            <WellnessButton variant="glass" size="default" className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </WellnessButton>
          </Link>
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Diary Section */}
          <Card className="wellness-card group cursor-pointer hover:scale-105 transition-transform duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-wellness/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-wellness/30 transition-colors">
                <BookOpen className="h-10 w-10 text-wellness" />
              </div>
              <CardTitle className="text-2xl font-bold">Personal Diary</CardTitle>
              <CardDescription className="text-base">
                Express your thoughts and feelings. Our AI will analyze your entries to track your emotional patterns and provide insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/diary">
                <WellnessButton variant="wellness" size="lg" className="w-full">
                  Start Writing
                </WellnessButton>
              </Link>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="wellness-card group cursor-pointer hover:scale-105 transition-transform duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-calm/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-calm/30 transition-colors">
                <Brain className="h-10 w-10 text-calm" />
              </div>
              <CardTitle className="text-2xl font-bold">Wellbeing Assessment</CardTitle>
              <CardDescription className="text-base">
                Take our comprehensive quiz to assess your current mental health status and receive personalized recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/quiz">
                <WellnessButton variant="calm" size="lg" className="w-full">
                  Take Assessment
                </WellnessButton>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="wellness-card">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-support/20 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-support" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">7</p>
                <p className="text-sm text-muted-foreground">Days Active</p>
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-wellness/20 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-wellness" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">12</p>
                <p className="text-sm text-muted-foreground">Diary Entries</p>
              </div>
            </CardContent>
          </Card>

          <Card className="wellness-card">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-calm/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-calm" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">Good</p>
                <p className="text-sm text-muted-foreground">Overall Mood</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-primary-foreground mb-4">
            Need immediate support?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <WellnessButton variant="outline" size="default">
              Contact Therapist
            </WellnessButton>
            <WellnessButton variant="outline" size="default">
              Breathing Exercise
            </WellnessButton>
            <WellnessButton variant="outline" size="default">
              Guided Meditation
            </WellnessButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;