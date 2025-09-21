import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Timer, Zap, Users, MessageCircle, Search, Eye, ArrowRight, Play } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Timer,
      title: "Time-Locked Posts",
      description: "Create posts that unlock at the perfect moment. Build anticipation and surprise your followers.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Follow Friends",
      description: "Connect with friends and discover new people. See what everyone's planning to reveal.",
      color: "text-secondary"
    },
    {
      icon: MessageCircle,
      title: "Private Messenger",
      description: "Send time-locked messages that unlock later. Perfect for secrets and surprises.",
      color: "text-tertiary"
    },
    {
      icon: Search,
      title: "Discover Content",
      description: "Search for friends, trending timebombs, and interesting conversations.",
      color: "text-primary"
    },
    {
      icon: Eye,
      title: "Gossip Space",
      description: "A safe anonymous space for confessions and gossip. Share what's on your mind.",
      color: "text-secondary"
    },
    {
      icon: Zap,
      title: "Instant Reveals",
      description: "When the time comes, watch posts explode with content. The anticipation makes it worth it.",
      color: "text-tertiary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Timer className="h-8 w-8 text-primary float" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-timebomb rounded-full animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-gradient-timebomb">Timebomb</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="border-border hover:bg-surface-hover"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/login')}
              className="btn-timebomb text-primary-foreground"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-8">
            <Timer className="h-20 w-20 text-primary mx-auto hourglass-spin" />
            <div className="absolute inset-0 bg-gradient-timebomb opacity-20 rounded-full blur-xl" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-timebomb bounce-in">
            The Future of<br />Social Surprises
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create time-locked posts that build anticipation. Share secrets, surprises, and stories 
            that unlock at the perfect moment. The social media experience you've been waiting for.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="btn-timebomb text-primary-foreground px-8 py-4 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Creating
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:bg-surface-hover px-8 py-4 text-lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* What is Timebomb Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-timebomb">
              What is Timebomb?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A revolutionary social platform where timing is everything. Create anticipation, 
              build suspense, and share moments that matter.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover bg-card border-border text-center p-8">
              <CardContent className="pt-6">
                <div className="h-16 w-16 bg-gradient-timebomb rounded-full flex items-center justify-center mx-auto mb-4">
                  <Timer className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Set the Timer</h4>
                <p className="text-muted-foreground">
                  Create your post and choose when it should be revealed. Minutes, hours, or days - you decide.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover bg-card border-border text-center p-8">
              <CardContent className="pt-6">
                <div className="h-16 w-16 bg-gradient-timebomb rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Build Anticipation</h4>
                <p className="text-muted-foreground">
                  Your followers see the locked post and wait in anticipation. The suspense builds excitement.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover bg-card border-border text-center p-8">
              <CardContent className="pt-6">
                <div className="h-16 w-16 bg-gradient-timebomb rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white spark-effect" />
                </div>
                <h4 className="text-xl font-semibold mb-3">The Big Reveal</h4>
                <p className="text-muted-foreground">
                  When the timer hits zero, your content explodes into view. The wait makes it worth it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-timebomb">
              Why Choose Timebomb?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed to make social media more exciting, mysterious, and engaging.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover bg-card border-border">
                <CardContent className="p-6">
                  <feature.icon className={`h-8 w-8 ${feature.color} mb-4`} />
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative mb-8">
            <div className="h-24 w-24 bg-gradient-timebomb rounded-full flex items-center justify-center mx-auto">
              <Timer className="h-12 w-12 text-white hourglass-spin" />
            </div>
            <div className="absolute inset-0 bg-gradient-timebomb opacity-20 rounded-full blur-2xl" />
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-timebomb">
            Ready to Drop Your First Bomb?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating suspense and sharing surprises. 
            Your audience is waiting for something amazing.
          </p>
          
          <Button
            size="lg"
            onClick={() => navigate('/login')}
            className="btn-timebomb text-primary-foreground px-8 py-4 text-lg"
          >
            <Zap className="mr-2 h-5 w-5" />
            Start Creating Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Timer className="h-6 w-6 text-primary" />
              <span className="text-sm text-muted-foreground">© 2024 Timebomb. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;