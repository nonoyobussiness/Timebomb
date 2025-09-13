import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import TimebombCard from '@/components/TimebombCard';
import { getFriendsTimebombs, getPublicTimebombs } from '@/data/mockData';
import { Plus, Timer, Zap, Users, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const friendsTimebombs = getFriendsTimebombs(user?.id || '');
  const publicTimebombs = getPublicTimebombs();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-glass border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Timer className="h-8 w-8 text-primary" />
                <Zap className="h-4 w-4 text-secondary absolute -top-1 -right-1" />
              </div>
              <h1 className="text-2xl font-bold text-gradle">Timebomb</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome back, <span className="text-primary font-medium">{user?.username}</span>
              </span>
              <Button
                onClick={() => navigate('/create')}
                className="bg-gradle-primary text-primary-foreground hover:opacity-90 shadow-glow"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
              <Button
                variant="outline"
                onClick={logout}
                className="border-border hover:bg-surface-hover"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Your Timebomb Feed</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover time-locked content from friends and the community. Some secrets are worth the wait.
          </p>
        </div>

        {/* Friends' Timebombs Section */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold">Friends' Timebombs</h3>
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
              {friendsTimebombs.length}
            </span>
          </div>
          
          {friendsTimebombs.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4">
                {friendsTimebombs.map((timebomb) => (
                  <div key={timebomb.id} className="min-w-[320px]">
                    <TimebombCard timebomb={timebomb} variant="friends" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-surface/30 rounded-lg border border-border">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No Friends' Timebombs Yet</h4>
              <p className="text-muted-foreground">
                Connect with friends to see their private timebombs here.
              </p>
            </div>
          )}
        </section>

        <Separator className="bg-border" />

        {/* Public Timebombs Section */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Globe className="h-6 w-6 text-secondary" />
            <h3 className="text-2xl font-semibold">Public Timebombs</h3>
            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-sm font-medium">
              {publicTimebombs.length}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicTimebombs.map((timebomb) => (
              <TimebombCard key={timebomb.id} timebomb={timebomb} variant="public" />
            ))}
          </div>
        </section>
      </main>

      {/* Floating Create Button (Mobile) */}
      <Button
        onClick={() => navigate('/create')}
        className="fixed bottom-6 right-6 md:hidden h-14 w-14 rounded-full bg-gradle-primary text-primary-foreground shadow-glow hover:opacity-90"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Home;