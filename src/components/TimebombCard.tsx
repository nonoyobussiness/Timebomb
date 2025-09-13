import React from 'react';
import { Timebomb } from '@/types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Timer, Lock, Unlock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TimebombCardProps {
  timebomb: Timebomb;
  variant?: 'friends' | 'public';
}

const TimebombCard: React.FC<TimebombCardProps> = ({ timebomb, variant = 'public' }) => {
  const isUnlocked = timebomb.isUnlocked || new Date() >= timebomb.unlockAt;
  const timeRemaining = formatDistanceToNow(timebomb.unlockAt, { addSuffix: true });
  
  return (
    <Card className="group bg-card hover:bg-card-elevated transition-all duration-300 hover-lift border-border shadow-card hover:shadow-elevated">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {timebomb.author.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{timebomb.author.username}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(timebomb.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!timebomb.isPublic && (
              <Badge variant="secondary" className="text-xs">
                Private
              </Badge>
            )}
            <div className="flex items-center space-x-1">
              {isUnlocked ? (
                <Unlock className="h-4 w-4 text-success" />
              ) : (
                <Lock className="h-4 w-4 text-warning" />
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {timebomb.title}
        </h3>
        
        {isUnlocked ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {timebomb.content}
            </p>
            {timebomb.media && (
              <div className="rounded-lg overflow-hidden bg-surface">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Media Preview</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-text-dim italic">
              {timebomb.previewText || "This content is locked until the timer expires..."}
            </p>
            
            <div className="flex items-center justify-center p-4 bg-surface-elevated rounded-lg">
              <div className="flex items-center space-x-2 timer-ring">
                <Timer className="h-5 w-5 text-primary" />
                <div className="text-center">
                  <p className="text-sm font-medium text-primary">
                    Unlocks {timeRemaining}
                  </p>
                  <div className="flex items-center justify-center mt-1 space-x-1">
                    <div className="h-1 w-8 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradle-primary transition-all duration-1000"
                        style={{ 
                          width: `${Math.max(0, Math.min(100, 
                            ((Date.now() - timebomb.createdAt.getTime()) / 
                            (timebomb.unlockAt.getTime() - timebomb.createdAt.getTime())) * 100
                          ))}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimebombCard;