import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Timer, Upload, Eye, EyeOff, Calendar } from 'lucide-react';

const CreateTimebomb = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [delayHours, setDelayHours] = useState('1');
  const [previewText, setPreviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Timebomb Created! 💣",
      description: `Your timebomb will unlock in ${delayHours} hour${delayHours !== '1' ? 's' : ''}.`,
    });
    
    setIsSubmitting(false);
    navigate('/home');
  };

  const delayOptions = [
    { value: '0.1', label: '5 minutes' },
    { value: '0.5', label: '30 minutes' },
    { value: '1', label: '1 hour' },
    { value: '2', label: '2 hours' },
    { value: '6', label: '6 hours' },
    { value: '12', label: '12 hours' },
    { value: '24', label: '1 day' },
    { value: '72', label: '3 days' },
    { value: '168', label: '1 week' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/home')}
              className="border-border hover:bg-surface-hover"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <Timer className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Create Timebomb</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Info Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Timer className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-primary mb-1">What's a Timebomb?</h3>
                  <p className="text-sm text-muted-foreground">
                    Create content that unlocks after a set time. Perfect for announcements, 
                    surprises, or building anticipation with your audience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Creation Form */}
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <h2 className="text-lg font-semibold">Timebomb Details</h2>
              <p className="text-sm text-muted-foreground">
                Fill in the details for your time-locked content.
              </p>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Give your timebomb an intriguing title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={100}
                    className="bg-surface border-border focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    {title.length}/100 characters
                  </p>
                </div>

                {/* Preview Text */}
                <div className="space-y-2">
                  <Label htmlFor="preview">Preview Text (Optional)</Label>
                  <Input
                    id="preview"
                    placeholder="A teaser for what's locked inside..."
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    maxLength={150}
                    className="bg-surface border-border focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    This text will be visible before the timebomb unlocks
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your time-locked message here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={6}
                    maxLength={1000}
                    className="bg-surface border-border focus:ring-primary resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {content.length}/1000 characters
                  </p>
                </div>

                {/* Media Upload Placeholder */}
                <div className="space-y-2">
                  <Label>Media (Coming Soon)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 bg-surface/30">
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Image and video uploads will be available soon
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timer Settings */}
                <div className="space-y-2">
                  <Label htmlFor="delay">Unlock Timer</Label>
                  <Select value={delayHours} onValueChange={setDelayHours}>
                    <SelectTrigger className="bg-surface border-border">
                      <SelectValue placeholder="Select unlock time" />
                    </SelectTrigger>
                    <SelectContent>
                      {delayOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-4">
                  <Label>Privacy Settings</Label>
                  <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      {isPublic ? (
                        <Eye className="h-5 w-5 text-secondary" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-warning" />
                      )}
                      <div>
                        <p className="font-medium">
                          {isPublic ? 'Public Timebomb' : 'Private Timebomb'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isPublic 
                            ? 'Visible to everyone in the public feed'
                            : 'Only visible to your friends'
                          }
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !title.trim() || !content.trim()}
                    className="w-full bg-gradle-primary text-primary-foreground hover:opacity-90 shadow-glow"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <Timer className="h-4 w-4 animate-spin" />
                        <span>Creating Timebomb...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <Timer className="h-4 w-4" />
                        <span>Launch Timebomb</span>
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateTimebomb;