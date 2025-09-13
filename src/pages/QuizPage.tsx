import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WellnessButton } from "@/components/ui/wellness-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ChevronRight, Award, AlertTriangle, Info } from "lucide-react";
import { WellnessScene } from "@/components/3d/WellnessScene";
import { useToast } from "@/hooks/use-toast";

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const questions = [
    {
      question: "How often do you feel overwhelmed by your studies?",
      options: [
        { text: "Never", value: 3 },
        { text: "Sometimes", value: 2 },
        { text: "Often", value: 1 },
        { text: "Always", value: 0 }
      ]
    },
    {
      question: "How well do you sleep at night?",
      options: [
        { text: "Very well (7-8 hours)", value: 3 },
        { text: "Pretty well (5-6 hours)", value: 2 },
        { text: "Poorly (3-4 hours)", value: 1 },
        { text: "Very poorly (less than 3 hours)", value: 0 }
      ]
    },
    {
      question: "How often do you engage in activities you enjoy?",
      options: [
        { text: "Daily", value: 3 },
        { text: "Several times a week", value: 2 },
        { text: "Once a week", value: 1 },
        { text: "Rarely or never", value: 0 }
      ]
    },
    {
      question: "How would you rate your stress levels?",
      options: [
        { text: "Very low", value: 3 },
        { text: "Moderate", value: 2 },
        { text: "High", value: 1 },
        { text: "Extremely high", value: 0 }
      ]
    },
    {
      question: "How often do you feel supported by friends and family?",
      options: [
        { text: "Always", value: 3 },
        { text: "Most of the time", value: 2 },
        { text: "Sometimes", value: 1 },
        { text: "Rarely", value: 0 }
      ]
    },
    {
      question: "How confident do you feel about your future?",
      options: [
        { text: "Very confident", value: 3 },
        { text: "Somewhat confident", value: 2 },
        { text: "Not very confident", value: 1 },
        { text: "Not confident at all", value: 0 }
      ]
    }
  ];

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      toast({
        title: "Please select an answer",
        description: "Choose the option that best describes your situation.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage >= 70) {
      return {
        level: 'high' as const,
        title: 'High Wellbeing',
        description: 'You\'re doing great! Your mental health appears to be in a good state.',
        suggestions: [
          'Continue your healthy habits and routines',
          'Share your positive strategies with others',
          'Take regular study breaks to maintain balance',
          'Practice gratitude and mindfulness regularly'
        ],
        color: 'text-wellness',
        icon: Award
      };
    } else if (percentage >= 40) {
      return {
        level: 'medium' as const,
        title: 'Medium Wellbeing',
        description: 'You\'re managing okay, but there\'s room for improvement.',
        suggestions: [
          'Watch wellness and self-care videos',
          'Try meditation or breathing exercises',
          'Establish a better sleep routine',
          'Connect more with friends and family'
        ],
        color: 'text-support',
        icon: Info
      };
    } else {
      return {
        level: 'low' as const,
        title: 'Low Wellbeing',
        description: 'It seems you might be struggling. Consider seeking professional support.',
        suggestions: [
          'Speak with a licensed therapist or counselor',
          'Contact your school\'s mental health services',
          'Reach out to trusted friends or family members',
          'Consider calling a mental health helpline'
        ],
        color: 'text-destructive',
        icon: AlertTriangle
      };
    }
  };

  const results = showResults ? calculateResults() : null;

  if (showResults && results) {
    const IconComponent = results.icon;
    
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* 3D Background Scene */}
        <WellnessScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient opacity-30 -z-5" />
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Link to="/dashboard" className="inline-flex items-center text-primary-foreground hover:text-primary-glow transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="wellness-card">
              <CardHeader className="text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  results.level === 'high' ? 'bg-wellness/20' : 
                  results.level === 'medium' ? 'bg-support/20' : 'bg-destructive/20'
                }`}>
                  <IconComponent className={`h-10 w-10 ${results.color}`} />
                </div>
                <CardTitle className="text-3xl font-bold text-gradient">
                  {results.title}
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  {results.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-card-foreground">
                    Recommended Actions:
                  </h4>
                  <ul className="space-y-3">
                    {results.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          results.level === 'high' ? 'bg-wellness' : 
                          results.level === 'medium' ? 'bg-support' : 'bg-destructive'
                        }`} />
                        <span className="text-muted-foreground">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4">
                  {results.level === 'low' && (
                    <WellnessButton variant="destructive" size="lg" className="w-full">
                      Find Professional Help
                    </WellnessButton>
                  )}
                  {results.level === 'medium' && (
                    <WellnessButton variant="outline" size="lg" className="w-full">
                      Access Wellness Resources
                    </WellnessButton>
                  )}
                  {results.level === 'high' && (
                    <WellnessButton variant="wellness" size="lg" className="w-full">
                      Continue Your Journey
                    </WellnessButton>
                  )}
                  
                  <Link to="/diary">
                    <WellnessButton variant="calm" size="lg" className="w-full">
                      Write in Your Diary
                    </WellnessButton>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background Scene */}
      <WellnessScene />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient opacity-30 -z-5" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-primary-foreground hover:text-primary-glow transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="text-primary-foreground/80">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gradient">
                Wellbeing Assessment
              </CardTitle>
              <CardDescription>
                Answer honestly to get the most accurate assessment of your current mental health status.
              </CardDescription>
              
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mt-4">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-card-foreground">
                  {questions[currentQuestion].question}
                </h3>

                <RadioGroup
                  value={answers[currentQuestion]?.toString()}
                  onValueChange={handleAnswerChange}
                  className="space-y-4"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <WellnessButton 
                onClick={handleNext} 
                variant="hero" 
                size="lg" 
                className="w-full gap-2"
              >
                {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                <ChevronRight className="h-4 w-4" />
              </WellnessButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;