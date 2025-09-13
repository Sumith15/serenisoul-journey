import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { WellnessButton } from "@/components/ui/wellness-button";
import { ArrowLeft, Save, Calendar, Smile, Meh, Frown, Brain } from "lucide-react";
import { WellnessScene } from "@/components/3d/WellnessScene";
import { useToast } from "@/hooks/use-toast";

const DiaryPage = () => {
  const [entry, setEntry] = useState("");
  const [moodAnalysis, setMoodAnalysis] = useState<{
    mood: string;
    level: 'high' | 'medium' | 'low';
    suggestions: string[];
  } | null>(null);
  const { toast } = useToast();

  const analyzeMood = (text: string) => {
    // Simple mood analysis simulation
    const words = text.toLowerCase().split(' ');
    const positiveWords = ['happy', 'good', 'great', 'amazing', 'wonderful', 'excited', 'joy', 'love', 'peaceful', 'calm'];
    const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'depressed', 'angry', 'frustrated', 'anxious', 'worried', 'stressed'];
    
    const positiveCount = words.filter(word => positiveWords.some(pos => word.includes(pos))).length;
    const negativeCount = words.filter(word => negativeWords.some(neg => word.includes(neg))).length;
    
    let mood: string;
    let level: 'high' | 'medium' | 'low';
    let suggestions: string[];
    
    if (positiveCount > negativeCount) {
      mood = "Positive";
      level = "high";
      suggestions = [
        "Keep up the great work! Continue your healthy habits.",
        "Consider sharing your positive energy with others.",
        "Schedule regular study breaks to maintain your wellbeing.",
        "Practice gratitude journaling to reinforce positive thoughts."
      ];
    } else if (negativeCount > positiveCount) {
      mood = "Challenging";
      level = "low";
      suggestions = [
        "It's okay to feel this way. Consider talking to a therapist.",
        "Try some deep breathing exercises or meditation.",
        "Reach out to friends or family for support.",
        "Consider professional counseling if these feelings persist."
      ];
    } else {
      mood = "Neutral";
      level = "medium";
      suggestions = [
        "Try watching some wellness videos for inspiration.",
        "Consider doing a light physical activity like walking.",
        "Practice mindfulness or meditation.",
        "Connect with friends or engage in a hobby you enjoy."
      ];
    }
    
    return { mood, level, suggestions };
  };

  const handleSave = () => {
    if (!entry.trim()) {
      toast({
        title: "Empty Entry",
        description: "Please write something in your diary first.",
        variant: "destructive",
      });
      return;
    }

    const analysis = analyzeMood(entry);
    setMoodAnalysis(analysis);

    toast({
      title: "Diary Entry Saved",
      description: "Your entry has been analyzed and saved successfully.",
    });
  };

  const getMoodIcon = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return <Smile className="h-8 w-8 text-wellness" />;
      case 'medium':
        return <Meh className="h-8 w-8 text-support" />;
      case 'low':
        return <Frown className="h-8 w-8 text-destructive" />;
    }
  };

  const getMoodColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'text-wellness';
      case 'medium':
        return 'text-support';
      case 'low':
        return 'text-destructive';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background Scene */}
      <WellnessScene />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient opacity-30 -z-5" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-primary-foreground hover:text-primary-glow transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center text-primary-foreground/80">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Diary Entry Section */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gradient">
                  Today's Diary Entry
                </CardTitle>
                <CardDescription>
                  Express your thoughts, feelings, and experiences. Be honest and open - this is your safe space.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Dear diary, today I felt..."
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  className="min-h-[300px] text-base leading-relaxed"
                />
                <WellnessButton onClick={handleSave} variant="wellness" size="lg" className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  Save & Analyze Entry
                </WellnessButton>
              </CardContent>
            </Card>

            {/* Mood Analysis Section */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gradient">
                  Mood Analysis
                </CardTitle>
                <CardDescription>
                  AI-powered insights based on your diary entry
                </CardDescription>
              </CardHeader>
              <CardContent>
                {moodAnalysis ? (
                  <div className="space-y-6">
                    {/* Mood Status */}
                    <div className="text-center p-6 rounded-lg bg-muted/50">
                      <div className="flex justify-center mb-4">
                        {getMoodIcon(moodAnalysis.level)}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Detected Mood: <span className={getMoodColor(moodAnalysis.level)}>{moodAnalysis.mood}</span>
                      </h3>
                      <p className="text-muted-foreground">
                        Wellbeing Level: <span className={`font-medium ${getMoodColor(moodAnalysis.level)}`}>
                          {moodAnalysis.level.charAt(0).toUpperCase() + moodAnalysis.level.slice(1)}
                        </span>
                      </p>
                    </div>

                    {/* Suggestions */}
                    <div>
                      <h4 className="font-semibold mb-3 text-card-foreground">
                        Personalized Suggestions:
                      </h4>
                      <ul className="space-y-2">
                        {moodAnalysis.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {moodAnalysis.level === 'low' && (
                        <WellnessButton variant="destructive" size="sm" className="w-full">
                          Find a Therapist
                        </WellnessButton>
                      )}
                      {moodAnalysis.level === 'medium' && (
                        <WellnessButton variant="outline" size="sm" className="w-full">
                          Watch Wellness Videos
                        </WellnessButton>
                      )}
                      {moodAnalysis.level === 'high' && (
                        <WellnessButton variant="wellness" size="sm" className="w-full">
                          Share Your Success
                        </WellnessButton>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Brain className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Write and save your diary entry to see AI-powered mood analysis and personalized suggestions.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Previous Entries Preview */}
          <Card className="wellness-card mt-8">
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
              <CardDescription>Your wellness journey over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your previous diary entries will appear here as you continue your wellness journey.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;