import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MessageSquare, Shield, Eye, EyeOff, Send, AlertTriangle, Heart, MessageCircle } from 'lucide-react';

const Gossip = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('feed');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [postContent, setPostContent] = useState('');

  // Mock gossip posts
  const gossipPosts = [
    {
      id: '1',
      content: 'Did anyone else notice the tension at the office party last week? 👀',
      author: isAnonymous ? 'Anonymous Owl' : 'tea_spiller',
      avatar: '🦉',
      timestamp: '2h ago',
      likes: 23,
      comments: 8,
      isAnonymous: true,
      category: 'workplace'
    },
    {
      id: '2',
      content: 'Someone in my building has been leaving the most beautiful flowers by random doors. So wholesome! 🌸',
      author: 'Secret Admirer',
      avatar: '🌸',
      timestamp: '4h ago',
      likes: 45,
      comments: 12,
      isAnonymous: true,
      category: 'wholesome'
    },
    {
      id: '3',
      content: 'Hot take: pineapple on pizza is actually good and everyone who disagrees is just following the crowd 🍍',
      author: 'Food Truth',
      avatar: '🍕',
      timestamp: '6h ago',
      likes: 78,
      comments: 34,
      isAnonymous: true,
      category: 'opinions'
    },
    {
      id: '4',
      content: 'My neighbor\'s cat has been visiting my balcony every morning for pets. I think I\'ve been adopted! 😸',
      author: 'Cat Parent',
      avatar: '😸',
      timestamp: '8h ago',
      likes: 156,
      comments: 23,
      isAnonymous: true,
      category: 'wholesome'
    }
  ];

  const categories = [
    { name: 'workplace', emoji: '💼', count: 12 },
    { name: 'wholesome', emoji: '💝', count: 28 },
    { name: 'opinions', emoji: '💭', count: 19 },
    { name: 'confessions', emoji: '🤫', count: 7 },
    { name: 'relationships', emoji: '💕', count: 15 }
  ];

  const handlePost = () => {
    if (postContent.trim()) {
      console.log('Posting gossip:', { content: postContent, anonymous: isAnonymous });
      setPostContent('');
    }
  };

  const GossipPost = ({ post }: { post: any }) => (
    <Card className="card-hover bg-card border-border mb-4">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <div className="h-10 w-10 bg-gradient-timebomb rounded-full flex items-center justify-center text-lg">
            {post.avatar}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <p className="font-medium text-foreground">{post.author}</p>
              {post.isAnonymous && (
                <Badge variant="outline" className="border-primary text-primary text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  Anonymous
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {categories.find(c => c.name === post.category)?.emoji} {post.category}
              </Badge>
              <span className="text-sm text-muted-foreground">{post.timestamp}</span>
            </div>
            
            <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
            
            <div className="flex items-center space-x-6 text-muted-foreground">
              <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Heart className="h-4 w-4" />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-secondary transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{post.comments}</span>
              </button>
            </div>
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
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-gradient-timebomb">Spill the Tea</h1>
              </div>
            </div>
            
            <Badge variant="outline" className="border-primary text-primary">
              <Shield className="h-3 w-3 mr-1" />
              Safe Space
            </Badge>
          </div>
        </div>
      </header>

      {/* Guidelines Banner */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <p className="text-foreground">
              <span className="font-medium">Community Guidelines:</span> Be respectful, no harassment, no personal attacks. All posts are moderated.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-surface border border-border">
            <TabsTrigger 
              value="feed" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Tea Feed
            </TabsTrigger>
            <TabsTrigger 
              value="post"
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              <Send className="h-4 w-4 mr-2" />
              Spill Tea
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Badge
                  key={category.name}
                  variant="outline"
                  className="border-border hover:bg-surface cursor-pointer transition-colors"
                >
                  {category.emoji} {category.name} ({category.count})
                </Badge>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {gossipPosts.map((post) => (
                <GossipPost key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="post" className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-foreground mb-2">What's the Tea? ☕</h2>
                    <p className="text-muted-foreground">
                      Share anonymously in a safe, moderated space
                    </p>
                  </div>

                  {/* Anonymous Toggle */}
                  <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      {isAnonymous ? (
                        <EyeOff className="h-5 w-5 text-primary" />
                      ) : (
                        <Eye className="h-5 w-5 text-secondary" />
                      )}
                      <div>
                        <Label htmlFor="anonymous" className="font-medium">
                          {isAnonymous ? 'Anonymous Mode' : 'Public Mode'}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {isAnonymous 
                            ? 'Your identity will be hidden from other users'
                            : 'Your username will be visible to others'
                          }
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="anonymous"
                      checked={isAnonymous}
                      onCheckedChange={setIsAnonymous}
                      className="scale-125"
                    />
                  </div>

                  {/* Post Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Your Tea</Label>
                    <Textarea
                      id="content"
                      placeholder="What's on your mind? Remember to be respectful..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      rows={6}
                      maxLength={500}
                      className="bg-surface border-border focus:ring-primary resize-none"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        All posts are reviewed by moderators before going live
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {postContent.length}/500
                      </p>
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category.name}
                          variant="outline"
                          className="cursor-pointer border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {category.emoji} {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handlePost}
                    disabled={!postContent.trim()}
                    className="w-full btn-timebomb text-primary-foreground"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Spill the Tea
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="bg-surface/30 border-border">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Community Guidelines</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Be respectful and kind to others</li>
                      <li>• No personal attacks or harassment</li>
                      <li>• Don't share personal information about others</li>
                      <li>• Keep it fun and constructive</li>
                      <li>• Posts are moderated for safety</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Gossip;