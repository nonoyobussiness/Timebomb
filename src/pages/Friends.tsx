import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Search, UserPlus, Users, Star, Heart } from 'lucide-react';

const Friends = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends');

  // Mock data for friends and suggestions
  const friends = [
    { id: '1', username: 'alice_wonder', displayName: 'Alice Wonder', avatar: '👩‍🎨', isFollowing: true, mutualFriends: 12, bombsCount: 45 },
    { id: '2', username: 'bob_builder', displayName: 'Bob Builder', avatar: '👷‍♂️', isFollowing: true, mutualFriends: 8, bombsCount: 23 },
    { id: '3', username: 'charlie_chef', displayName: 'Charlie Chef', avatar: '👨‍🍳', isFollowing: true, mutualFriends: 15, bombsCount: 67 },
    { id: '4', username: 'diana_dev', displayName: 'Diana Dev', avatar: '👩‍💻', isFollowing: true, mutualFriends: 20, bombsCount: 89 },
  ];

  const suggestions = [
    { id: '5', username: 'eve_explorer', displayName: 'Eve Explorer', avatar: '🧳', isFollowing: false, mutualFriends: 5, bombsCount: 34, reason: 'Mutual friends' },
    { id: '6', username: 'frank_photographer', displayName: 'Frank Photo', avatar: '📸', isFollowing: false, mutualFriends: 3, bombsCount: 78, reason: 'Similar interests' },
    { id: '7', username: 'grace_gamer', displayName: 'Grace Gamer', avatar: '🎮', isFollowing: false, mutualFriends: 7, bombsCount: 56, reason: 'Popular in your area' },
    { id: '8', username: 'henry_hiker', displayName: 'Henry Hiker', avatar: '🥾', isFollowing: false, mutualFriends: 2, bombsCount: 29, reason: 'From your contacts' },
  ];

  const followers = [
    ...friends,
    { id: '9', username: 'iris_artist', displayName: 'Iris Artist', avatar: '🎨', isFollowing: false, mutualFriends: 4, bombsCount: 67 },
    { id: '10', username: 'jack_jogger', displayName: 'Jack Jogger', avatar: '🏃‍♂️', isFollowing: false, mutualFriends: 1, bombsCount: 12 },
  ];

  const handleFollow = (userId: string) => {
    console.log('Following user:', userId);
    // Implementation would update the user's following status
  };

  const handleUnfollow = (userId: string) => {
    console.log('Unfollowing user:', userId);
    // Implementation would update the user's following status
  };

  const UserCard = ({ user: userItem, showReason = false }: { user: any, showReason?: boolean }) => (
    <Card className="card-hover bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-timebomb rounded-full flex items-center justify-center text-xl">
              {userItem.avatar}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{userItem.displayName}</h3>
              <p className="text-sm text-muted-foreground">@{userItem.username}</p>
              {showReason && userItem.reason && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {userItem.reason}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{userItem.bombsCount}</p>
              <p className="text-xs text-muted-foreground">bombs</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{userItem.mutualFriends}</p>
              <p className="text-xs text-muted-foreground">mutual</p>
            </div>
            <Button
              size="sm"
              variant={userItem.isFollowing ? "outline" : "default"}
              onClick={() => userItem.isFollowing ? handleUnfollow(userItem.id) : handleFollow(userItem.id)}
              className={userItem.isFollowing ? "border-border hover:bg-destructive hover:text-destructive-foreground" : "btn-timebomb text-primary-foreground"}
            >
              {userItem.isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
              <h1 className="text-xl font-bold text-gradient-timebomb">Friends</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-surface border-border focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-surface border border-border">
            <TabsTrigger 
              value="friends" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Users className="h-4 w-4 mr-2" />
              Friends ({friends.length})
            </TabsTrigger>
            <TabsTrigger 
              value="suggestions"
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Suggestions
            </TabsTrigger>
            <TabsTrigger 
              value="followers"
              className="data-[state=active]:bg-tertiary data-[state=active]:text-tertiary-foreground"
            >
              <Heart className="h-4 w-4 mr-2" />
              Followers ({followers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Your Friends</h2>
              <Badge variant="outline" className="border-primary text-primary">
                <Star className="h-3 w-3 mr-1" />
                Following {friends.length}
              </Badge>
            </div>
            
            {friends.map((friend) => (
              <UserCard key={friend.id} user={friend} />
            ))}
            
            {friends.length === 0 && (
              <div className="text-center py-16 bg-surface/30 rounded-lg border border-border">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-2">No Friends Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Start following people to see their timebombs and build your network.
                </p>
                <Button 
                  onClick={() => setActiveTab('suggestions')}
                  className="btn-timebomb text-primary-foreground"
                >
                  Find People to Follow
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Suggested for You</h2>
              <Badge variant="outline" className="border-secondary text-secondary">
                <UserPlus className="h-3 w-3 mr-1" />
                {suggestions.length} suggestions
              </Badge>
            </div>
            
            {suggestions.map((suggestion) => (
              <UserCard key={suggestion.id} user={suggestion} showReason={true} />
            ))}
          </TabsContent>

          <TabsContent value="followers" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Your Followers</h2>
              <Badge variant="outline" className="border-tertiary text-tertiary">
                <Heart className="h-3 w-3 mr-1" />
                {followers.length} followers
              </Badge>
            </div>
            
            {followers.map((follower) => (
              <UserCard key={follower.id} user={follower} />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Friends;