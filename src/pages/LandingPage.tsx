import { WellnessScene } from "@/components/3d/WellnessScene";
import { WellnessButton } from "@/components/ui/wellness-button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, Smile, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background Scene */}
      <WellnessScene />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient opacity-80 -z-5" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Hero Section */}
          <div className="max-w-4xl space-y-8 pt-20">
            <h1 className="text-6xl md:text-7xl font-bold text-gradient leading-tight">
              SereniSpace
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Your personal sanctuary for mental wellness. Track your mood, discover your wellbeing, and find your path to serenity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link to="/login">
                <WellnessButton variant="hero" size="xl" className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </WellnessButton>
              </Link>
              <WellnessButton variant="glass" size="xl">
                Learn More
              </WellnessButton>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full pt-16">
            <Card className="wellness-card">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-wellness/20 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="h-8 w-8 text-wellness" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  Mood Tracking
                </h3>
                <p className="text-muted-foreground">
                  Write in your personal diary and let AI analyze your emotional patterns to provide personalized insights.
                </p>
              </CardContent>
            </Card>
            
            <Card className="wellness-card">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-calm/20 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-calm" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  Wellbeing Assessment
                </h3>
                <p className="text-muted-foreground">
                  Take personalized quizzes to understand your mental health status and receive tailored recommendations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="wellness-card">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-support/20 rounded-full flex items-center justify-center mx-auto">
                  <Smile className="h-8 w-8 text-support" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  Personalized Support
                </h3>
                <p className="text-muted-foreground">
                  Get customized suggestions from therapist recommendations to wellness videos and self-care tips.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Call to Action */}
          <div className="text-center space-y-6 pt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Transform Your Mental Wellness?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands of students who have already started their journey to better mental health with SereniSpace.
            </p>
            <Link to="/login">
              <WellnessButton variant="wellness" size="xl" className="animate-pulse-glow">
                Get Started Today
              </WellnessButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;