import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Search, MessageCircle, Timer, Send, Plus, MoreHorizontal } from 'lucide-react';

const Messenger = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Mock chat data
  const chats = [
    {
      id: '1',
      user: { username: 'alice_wonder', displayName: 'Alice Wonder', avatar: '👩‍🎨' },
      lastMessage: 'Hey! Can\'t wait for your next timebomb 💣',
      timestamp: '2m ago',
      unread: 2,
      isTimebomb: false
    },
    {
      id: '2',
      user: { username: 'bob_builder', displayName: 'Bob Builder', avatar: '👷‍♂️' },
      lastMessage: '⏰ Timebomb message (unlocks in 2h)',
      timestamp: '1h ago',
      unread: 0,
      isTimebomb: true
    },
    {
      id: '3',
      user: { username: 'charlie_chef', displayName: 'Charlie Chef', avatar: '👨‍🍳' },
      lastMessage: 'That recipe was amazing! Thanks for sharing',
      timestamp: '3h ago',
      unread: 0,
      isTimebomb: false
    },
    {
      id: '4',
      user: { username: 'diana_dev', displayName: 'Diana Dev', avatar: '👩‍💻' },
      lastMessage: '⏰ Timebomb message (unlocks in 30m)',
      timestamp: '5h ago',
      unread: 1,
      isTimebomb: true
    }
  ];

  const mockMessages = [
    {
      id: '1',
      senderId: 'alice_wonder',
      message: 'Hey! How are you doing?',
      timestamp: '10:30 AM',
      isTimebomb: false,
      isOwn: false
    },
    {
      id: '2',
      senderId: user?.id,
      message: 'I\'m great! Just working on some new timebombs',
      timestamp: '10:32 AM',
      isTimebomb: false,
      isOwn: true
    },
    {
      id: '3',
      senderId: 'alice_wonder',
      message: 'Can\'t wait for your next timebomb 💣',
      timestamp: '10:35 AM',
      isTimebomb: false,
      isOwn: false
    },
    {
      id: '4',
      senderId: user?.id,
      message: '⏰ Timebomb message (unlocks in 1h 30m)',
      timestamp: '10:37 AM',
      isTimebomb: true,
      isOwn: true,
      unlockTime: '12:07 PM'
    }
  ];

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const ChatItem = ({ chat }: { chat: any }) => (
    <Card 
      className={`card-hover cursor-pointer transition-all ${selectedChat === chat.id ? 'ring-2 ring-primary bg-primary/5' : 'bg-card hover:bg-surface/50'} border-border`}
      onClick={() => setSelectedChat(chat.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="h-12 w-12 bg-gradient-timebomb rounded-full flex items-center justify-center text-lg">
              {chat.user.avatar}
            </div>
            {chat.unread > 0 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">{chat.unread}</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-foreground truncate">{chat.user.displayName}</h3>
              <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
            </div>
            <div className="flex items-center space-x-2">
              {chat.isTimebomb && (
                <Timer className="h-3 w-3 text-primary flex-shrink-0" />
              )}
              <p className={`text-sm truncate ${chat.isTimebomb ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {chat.lastMessage}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MessageBubble = ({ message: msg }: { message: any }) => (
    <div className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        msg.isOwn 
          ? msg.isTimebomb 
            ? 'bg-gradient-timebomb text-white' 
            : 'bg-primary text-primary-foreground'
          : 'bg-surface border border-border text-foreground'
      }`}>
        {msg.isTimebomb ? (
          <div className="flex items-center space-x-2">
            <Timer className="h-4 w-4" />
            <div>
              <p className="font-medium">Timebomb Message</p>
              <p className="text-sm opacity-90">Unlocks at {msg.unlockTime}</p>
            </div>
          </div>
        ) : (
          <p>{msg.message}</p>
        )}
        <p className={`text-xs mt-1 ${msg.isOwn ? 'text-white/70' : 'text-muted-foreground'}`}>
          {msg.timestamp}
        </p>
      </div>
    </div>
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
              <h1 className="text-xl font-bold text-gradient-timebomb">Messages</h1>
            </div>
            
            <Button
              size="sm"
              className="btn-timebomb text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Chat List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-surface border-border focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
              {chats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            {selectedChat ? (
              <Card className="h-full bg-card border-border flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gradient-timebomb rounded-full flex items-center justify-center">
                        {selectedChatData?.user.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{selectedChatData?.user.displayName}</h3>
                        <p className="text-sm text-muted-foreground">@{selectedChatData?.user.username}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border hover:bg-surface-hover">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {mockMessages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="pr-12 bg-surface border-border focus:ring-primary"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 border-border hover:bg-surface-hover"
                      >
                        <Timer className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="btn-timebomb text-primary-foreground"
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Click the timer icon to send a timebomb message
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="h-full bg-card border-border flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">Select a Chat</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation to start messaging
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;