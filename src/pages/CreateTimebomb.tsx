import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Timer, Eye, EyeOff, Send, Upload } from 'lucide-react';

const CreateTimebomb = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [previewText, setPreviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Post Created! 🎉",
      description: "Your timebomb is now live in the feed.",
    });
    
    setIsSubmitting(false);
    navigate('/home');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return title.trim().length > 0;
      case 2:
        return content.trim().length > 0;
      case 3:
        return true; // Media step is optional
      case 4:
        return true; // Privacy step always valid
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Timer className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">What's your story?</h2>
              <p className="text-muted-foreground">Give your post a catchy title</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Something interesting is happening..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                className="bg-surface border-border focus:ring-primary text-lg py-6"
                autoFocus
              />
              <p className="text-xs text-muted-foreground text-right">
                {title.length}/100 characters
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preview">Preview Text (Optional)</Label>
              <Input
                id="preview"
                placeholder="A teaser for your followers..."
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                maxLength={150}
                className="bg-surface border-border focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground">
                This appears as a preview before people read your full post
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary text-xl">✍️</span>
              </div>
              <h2 className="text-2xl font-bold">Write your content</h2>
              <p className="text-muted-foreground">Share what's on your mind</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Your Post</Label>
              <Textarea
                id="content"
                placeholder="Tell your story here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                maxLength={1000}
                className="bg-surface border-border focus:ring-primary resize-none text-base"
                autoFocus
              />
              <p className="text-xs text-muted-foreground text-right">
                {content.length}/1000 characters
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Upload className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Add media</h2>
              <p className="text-muted-foreground">Make your post more engaging (coming soon)</p>
            </div>
            
            <div className="border-2 border-dashed border-border rounded-lg p-12 bg-surface/20">
              <div className="text-center">
                <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Media Upload</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Image and video uploads will be available in a future update
                </p>
                <Button variant="outline" disabled className="border-border">
                  Browse Files
                </Button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                {isPublic ? (
                  <Eye className="h-6 w-6 text-secondary" />
                ) : (
                  <EyeOff className="h-6 w-6 text-warning" />
                )}
              </div>
              <h2 className="text-2xl font-bold">Who can see this?</h2>
              <p className="text-muted-foreground">Choose your audience</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-surface rounded-lg border border-border">
                <div className="flex items-center space-x-4">
                  {isPublic ? (
                    <Eye className="h-6 w-6 text-secondary" />
                  ) : (
                    <EyeOff className="h-6 w-6 text-warning" />
                  )}
                  <div>
                    <p className="font-medium text-lg">
                      {isPublic ? 'Public Post' : 'Followers Only'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isPublic 
                        ? 'Everyone can see this in the For You feed'
                        : 'Only your followers can see this post'
                      }
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                  className="scale-125"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="bg-surface/30 rounded-lg p-4 border border-border">
              <h4 className="font-medium mb-3 text-center">Preview</h4>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">
                      {user?.username.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user?.username}</p>
                    <p className="text-xs text-muted-foreground">now</p>
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{title || 'Your title here'}</h3>
                {previewText && (
                  <p className="text-sm text-muted-foreground italic mb-2">{previewText}</p>
                )}
                <div className="bg-surface/50 rounded p-3 text-sm">
                  {content || 'Your content will appear here...'}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('/home')}
              className="border-border hover:bg-surface-hover"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <Progress value={progress} className="w-24" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-8">
            {renderStep()}
            
            {/* Navigation */}
            <div className="flex justify-between pt-8 border-t border-border mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="border-border hover:bg-surface-hover"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradle-primary text-primary-foreground hover:opacity-90"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !canProceed()}
                  className="bg-gradle-primary text-primary-foreground hover:opacity-90"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <Timer className="h-4 w-4 animate-spin" />
                      <span>Publishing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Publish</span>
                    </span>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateTimebomb;