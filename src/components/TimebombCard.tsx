import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, Eye, EyeOff } from 'lucide-react';
import { Timebomb } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface TimebombCardProps {
  timebomb: Timebomb;
  variant?: 'friends' | 'public' | 'search' | 'trending' | 'profile'| 'saved';
}

const TimebombCard: React.FC<TimebombCardProps> = ({ timebomb, variant = 'public' }) => {
  const timeAgo = formatDistanceToNow(timebomb.createdAt, { addSuffix: true });

  return (
    <Card className="bg-card border-border shadow-card hover-lift">
      <CardContent className="p-4 space-y-4">
        {/* Author Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={timebomb.author.avatar} alt={timebomb.author.username} />
              <AvatarFallback className="bg-surface text-foreground">
                {timebomb.author.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">{timebomb.author.username}</p>
              <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {timebomb.isPublic ? (
              <Eye className="h-4 w-4 text-muted-foreground" />
            ) : (
              <EyeOff className="h-4 w-4 text-secondary" />
            )}
            <Badge variant={variant === 'friends' ? 'secondary' : 'default'} className="text-xs">
              {variant === 'friends' ? 'Following' : 'For You'}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground text-lg leading-tight">
            {timebomb.title}
          </h3>
          
          {timebomb.previewText && (
            <p className="text-muted-foreground text-sm italic">
              {timebomb.previewText}
            </p>
          )}
          
          <div className="bg-surface/50 rounded-lg p-4 border border-border">
            <p className="text-foreground leading-relaxed">
              {timebomb.content}
            </p>
          </div>

          {/* Media */}
          {timebomb.media && (
            <div className="rounded-lg overflow-hidden bg-surface">
              <div className="aspect-video bg-gradle-subtle flex items-center justify-center">
                <p className="text-xs text-muted-foreground">Media Preview</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary">
              <Heart className="h-4 w-4 mr-1" />
              <span className="text-xs">Like</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">Comment</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
            <Share className="h-4 w-4 mr-1" />
            <span className="text-xs">Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimebombCard;