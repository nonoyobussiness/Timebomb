import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TimebombCard from '@/components/TimebombCard';
import { getPublicTimebombs } from '@/data/mockData';
import { ArrowLeft, Search as SearchIcon, TrendingUp, Users, Timer, Hash, Clock } from 'lucide-react';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');

  const publicTimebombs = getPublicTimebombs();

  // Mock trending data
  const trendingSearches = [
    { term: 'weekend plans', count: '2.4k searches', icon: '🎉' },
    { term: 'surprise announcement', count: '1.8k searches', icon: '📢' },
    { term: 'secret recipe', count: '1.2k searches', icon: '👨‍🍳' },
    { term: 'travel reveal', count: '956 searches', icon: '✈️' },
    { term: 'birthday surprise', count: '743 searches', icon: '🎂' },
  ];

  const suggestedPeople = [
    { id: '1', username: 'mystery_chef', displayName: 'Mystery Chef', avatar: '👨‍🍳', followers: '12.3k', bio: 'Dropping food secrets daily' },
    { id: '2', username: 'travel_bomber', displayName: 'Travel Bomber', avatar: '🧳', followers: '8.7k', bio: 'Hidden gems & secret spots' },
    { id: '3', username: 'tech_surprises', displayName: 'Tech Surprises', avatar: '💻', followers: '15.1k', bio: 'Tech announcements & reveals' },
    { id: '4', username: 'art_secrets', displayName: 'Art Secrets', avatar: '🎨', followers: '6.2k', bio: 'Behind-the-scenes art content' },
  ];

  const recentSearches = [
    'weekend surprise',
    'cooking reveal',
    'travel announcement',
    'birthday plans'
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implementation would perform actual search
    }
  };

  const UserCard = ({ user }: { user: any }) => (
    <Card className="card-hover bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-timebomb rounded-full flex items-center justify-center text-lg">
              {user.avatar}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{user.displayName}</h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              <p className="text-xs text-muted-foreground mt-1">{user.bio}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{user.followers}</p>
            <p className="text-xs text-muted-foreground">followers</p>
            <Button size="sm" className="btn-timebomb text-primary-foreground mt-2">
              Follow
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TrendingItem = ({ item, index }: { item: any, index: number }) => (
    <Card className="card-hover bg-card border-border cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="font-medium text-foreground">#{item.term}</p>
                <p className="text-sm text-muted-foreground">{item.count}</p>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            #{index + 1}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-glass border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/home')}
              className="border-border hover:bg-surface-hover"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for people, timebombs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 bg-surface border-border focus:ring-primary text-base py-3"
                  autoFocus
                />
                {searchQuery && (
                  <Button
                    onClick={handleSearch}
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-timebomb text-primary-foreground"
                  >
                    Search
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {searchQuery ? (
          // Search Results
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                Search results for "{searchQuery}"
              </h2>
              <p className="text-sm text-muted-foreground">
                {publicTimebombs.length} results found
              </p>
            </div>
            
            <div className="space-y-4">
              {publicTimebombs.slice(0, 3).map((timebomb) => (
                <TimebombCard key={timebomb.id} timebomb={timebomb} variant="search" />
              ))}
            </div>
          </div>
        ) : (
          // Default Search Page
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-surface border border-border">
              <TabsTrigger 
                value="trending" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger 
                value="people"
                className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                <Users className="h-4 w-4 mr-2" />
                People
              </TabsTrigger>
              <TabsTrigger 
                value="recent"
                className="data-[state=active]:bg-tertiary data-[state=active]:text-tertiary-foreground"
              >
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Trending Now</h2>
                  <Badge variant="outline" className="border-primary text-primary">
                    Updated 5m ago
                  </Badge>
                </div>
                
                {trendingSearches.map((item, index) => (
                  <TrendingItem key={item.term} item={item} index={index} />
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                  <Timer className="h-5 w-5 text-secondary" />
                  <span>Popular Timebombs</span>
                </h3>
                {publicTimebombs.slice(0, 2).map((timebomb) => (
                  <TimebombCard key={timebomb.id} timebomb={timebomb} variant="trending" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="people" className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-secondary" />
                <h2 className="text-lg font-semibold text-foreground">Suggested for You</h2>
              </div>
              
              {suggestedPeople.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-tertiary" />
                  <h2 className="text-lg font-semibold text-foreground">Recent Searches</h2>
                </div>
                <Button variant="outline" size="sm" className="border-border hover:bg-surface-hover text-xs">
                  Clear All
                </Button>
              </div>
              
              {recentSearches.length > 0 ? (
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <Card key={index} className="card-hover bg-card border-border cursor-pointer">
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-3">
                          <SearchIcon className="h-4 w-4 text-muted-foreground" />
                          <p className="text-foreground">{search}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-surface/30 rounded-lg border border-border">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Recent Searches</h3>
                  <p className="text-muted-foreground">
                    Your search history will appear here
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Search;