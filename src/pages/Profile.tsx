import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import ProfileComponent from '@/components/Profile';
import TimebombCard from '@/components/TimebombCard';
import { getUserTimebombs } from '@/data/mockData';
import { ArrowLeft, Settings, Timer, Zap, Calendar, Activity, Bookmark, Edit3 } from 'lucide-react';
import { User } from '@/types';
import { toast } from '@/hooks/use-toast';
import { API_BASE } from '@/lib/api';

const Profile = () => {
  const { user: currentUser, token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const isOwnProfile = !id || id === 'me' || id === String(currentUser?.id);
  const viewingUserId = isOwnProfile ? currentUser?.id : id;
  
  const userTimebombs = getUserTimebombs(String(viewingUserId || ''));
  const savedTimebombs = userTimebombs.slice(0, 2); // Mock saved posts
  
  // Mock user stats
  const userStats = {
    bombsSet: 34,
    bombsRevealed: 89,
    totalLikes: 456,
    totalComments: 123,
    joinDate: 'March 2024',
    streak: 7
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!viewingUserId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        let url = `${API_BASE}/profile/${viewingUserId}`;
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        // If viewing own profile, use /me endpoint
        if (isOwnProfile && token) {
          url = `${API_BASE}/profile/me`;
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, { headers });
        
        if (!response.ok) {
          throw new Error('Failed to load profile');
        }

        const userData = await response.json();
        setProfileUser(userData);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to load profile',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [viewingUserId, isOwnProfile, token]);

  const handleProfileUpdate = (updatedUser: User) => {
    setProfileUser(updatedUser);
    // Also update current user if it's the same user
    if (isOwnProfile && currentUser?.id === updatedUser.id) {
      // The AuthContext should handle this, but we can update local state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-glass border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/home')}
                className="border-border hover:bg-surface-hover"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-bold text-gradient-timebomb">Profile</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-surface-hover"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-surface-hover"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <section className="container mx-auto px-4 py-6 max-w-4xl">
        {isLoading ? (
          <Card className="bg-card border-border mb-6">
            <CardContent className="p-8">
              <div className="text-center text-muted-foreground">Loading profile...</div>
            </CardContent>
          </Card>
        ) : profileUser ? (
          <div className="mb-6">
            <ProfileComponent 
              user={profileUser} 
              isOwnProfile={isOwnProfile}
              onUpdate={handleProfileUpdate}
            />
          </div>
        ) : (
          <Card className="bg-card border-border mb-6">
            <CardContent className="p-8">
              <div className="text-center text-muted-foreground">Profile not found</div>
            </CardContent>
          </Card>
        )}
        
        {profileUser && (
          <>
            {/* Stats Card */}
            <Card className="bg-card border-border mb-6">
              <CardContent className="p-8">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Timebomb enthusiast • Joined {userStats.joinDate}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Timer className="h-4 w-4 text-primary" />
                      <p className="text-2xl font-bold text-foreground">{userStats.bombsSet}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Bombs Set</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Zap className="h-4 w-4 text-secondary" />
                      <p className="text-2xl font-bold text-foreground">{userStats.bombsRevealed}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Bombs Revealed</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Activity className="h-4 w-4 text-tertiary" />
                      <p className="text-2xl font-bold text-foreground">{userStats.totalLikes}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Total Likes</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <p className="text-2xl font-bold text-foreground">{userStats.streak}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline" className="border-primary text-primary">
                    <Timer className="h-3 w-3 mr-1" />
                    Bomb Master
                  </Badge>
                  <Badge variant="outline" className="border-secondary text-secondary">
                    <Zap className="h-3 w-3 mr-1" />
                    Early Adopter
                  </Badge>
                  <Badge variant="outline" className="border-tertiary text-tertiary">
                    <Activity className="h-3 w-3 mr-1" />
                    Active Creator
                  </Badge>
                </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-surface border border-border">
            <TabsTrigger 
              value="posts" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Timer className="h-4 w-4 mr-2" />
              Posts ({userTimebombs.length})
            </TabsTrigger>
            <TabsTrigger 
              value="activity"
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              <Activity className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger 
              value="saved"
              className="data-[state=active]:bg-tertiary data-[state=active]:text-tertiary-foreground"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Saved ({savedTimebombs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {userTimebombs.length > 0 ? (
              <div className="space-y-4">
                {userTimebombs.map((timebomb) => (
                  <TimebombCard key={timebomb.id} timebomb={timebomb} variant="profile" />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-surface/30 rounded-lg border border-border">
                <Timer className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Start creating timebombs to share your thoughts and moments with the world.
                </p>
                <Button 
                  onClick={() => navigate('/create')}
                  className="btn-timebomb text-primary-foreground"
                >
                  Create Your First Bomb
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-surface/50 rounded-lg">
                    <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Your timebomb "Weekend Plans" was revealed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-surface/50 rounded-lg">
                    <div className="h-8 w-8 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Timer className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">You created a new timebomb</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-surface/50 rounded-lg">
                    <div className="h-8 w-8 bg-tertiary/20 rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4 text-tertiary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">You reached a 7-day posting streak!</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            {savedTimebombs.length > 0 ? (
              <div className="space-y-4">
                {savedTimebombs.map((timebomb) => (
                  <TimebombCard key={timebomb.id} timebomb={timebomb} variant="saved" />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-surface/30 rounded-lg border border-border">
                <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-2">No Saved Posts</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Save interesting timebombs to read them later. Look for the bookmark icon on posts.
                </p>
                <Button 
                  onClick={() => navigate('/home')}
                  variant="outline"
                  className="border-border hover:bg-surface-hover"
                >
                  Explore Feed
                </Button>
              </div>
            )}
          </TabsContent>
            </Tabs>
          </>
        )}
      </section>
    </div>
  );
};

export default Profile;