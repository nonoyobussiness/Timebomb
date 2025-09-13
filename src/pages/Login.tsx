import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Timer, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to Timebomb.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Try demo@timebomb.app / password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md relative bg-card/80 backdrop-blur-glass border-border shadow-elevated">
        <CardHeader className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="relative">
              <Timer className="h-8 w-8 text-primary" />
              <Zap className="h-4 w-4 text-secondary absolute -top-1 -right-1" />
            </div>
            <h1 className="text-2xl font-bold text-gradle">Timebomb</h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-muted-foreground">
              {isRegister 
                ? 'Join the community of timed reveals' 
                : 'Sign in to your account to continue'
              }
            </p>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@timebomb.app"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-surface border-border focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-surface border-border focus:ring-primary"
              />
            </div>

            {/* Demo Credentials Hint */}
            <div className="bg-accent-subtle/20 border border-accent-subtle rounded-lg p-3">
              <p className="text-sm text-accent font-medium">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground">
                Email: demo@timebomb.app<br />
                Password: password
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradle-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-glow"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : (isRegister ? 'Create Account' : 'Sign In')}
            </Button>
            
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-accent hover:text-accent/80 underline transition-colors"
            >
              {isRegister 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Register"
              }
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;