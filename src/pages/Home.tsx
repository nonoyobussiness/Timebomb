import React, { useState } from 'react';
import { useEffect } from "react"; 
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TimebombCard from '@/components/TimebombCard';
import { getFriendsTimebombs, getPublicTimebombs } from '@/data/mockData';
import { Plus, Timer, Zap, Users, Globe, Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import Friends from './Friends';
import Gossip from './Gossip';
import Search from './Search';


const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('following');
  
  const friendsTimebombs = getFriendsTimebombs(user?.id || '');

  const [posts, setPosts] = useState([]);
  const publicTimebombs = posts;


useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  fetchPosts();
}, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-glass border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Timer className="h-8 w-8 text-primary" />
              <Zap className="h-4 w-4 text-secondary absolute -top-1 -right-1" />
            </div>
            <h1 className="text-2xl font-bold text-gradle">Timebomb</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Welcome back, <span className="text-primary font-medium">{user?.username}</span>
            </span>
            
            <Button
              variant="outline"
              onClick={logout}
              className="border-border hover:bg-surface-hover"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Left Sidebar - Search + Friends */}
        <aside className="hidden md:flex flex-col w-1/4 space-y-6">
          <Search />
          
        </aside>

        {/* Main Feed */}
        <section className="flex-1 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-surface border border-border">
              <TabsTrigger 
                value="following" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="h-4 w-4 mr-2" />
                Following
              </TabsTrigger>
              <TabsTrigger 
                value="foryou"
                className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                <Globe className="h-4 w-4 mr-2" />
                For You
              </TabsTrigger>
            </TabsList>

            <TabsContent value="following" className="space-y-4">
              {friendsTimebombs.length > 0 ? (
                friendsTimebombs.map((timebomb) => (
                  <TimebombCard key={timebomb.id} timebomb={timebomb} variant="friends" />
                ))
              ) : (
                <div className="text-center py-16 bg-surface/30 rounded-lg border border-border">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">No Posts Yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Follow friends to see their posts here, or check out the For You feed for public content.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('foryou')}
                    variant="outline"
                    className="border-border hover:bg-surface-hover"
                  >
                    Explore For You
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="foryou" className="space-y-4">
              {publicTimebombs.map((timebomb) => (
                <TimebombCard key={timebomb.id} timebomb={timebomb} variant="public" />
              ))}
            </TabsContent>
          </Tabs>
          
          
        </section>

        {/* Mobile - Search + Friends */}
        <aside className="md:hidden flex flex-col space-y-6">
          <Search />
          
        </aside>
      </main>

      {/* Floating Create Button (Mobile) */}
      <Button
        onClick={() => navigate('/create')}
        className="fixed bottom-6 right-6 md:hidden h-14 w-14 rounded-full bg-gradle-primary text-primary-foreground shadow-glow hover:opacity-90 z-40"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <BottomNav/>
    </div>
  );
};

export default Home;
