import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { User } from '@/types';
import { Save, X } from 'lucide-react';
import { API_BASE } from '@/lib/api';

interface ProfileProps {
  user: User;
  isOwnProfile: boolean;
  onUpdate?: (updatedUser: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, isOwnProfile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    display_name: user.display_name || user.username || '',
    bio: user.bio || '',
    avatar_url: user.avatar_url || user.avatar || '',
  });

  const handleSave = async () => {
    // Client-side validation
    if (formData.display_name && formData.display_name.length > 100) {
      toast({
        title: 'Validation Error',
        description: 'Display name must be 100 characters or less',
        variant: 'destructive',
      });
      return;
    }

    if (formData.bio && formData.bio.length > 1000) {
      toast({
        title: 'Validation Error',
        description: 'Bio must be 1000 characters or less',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/profile/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update profile');
      }

      const updatedUser = await response.json();
      setIsEditing(false);
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });

      if (onUpdate) {
        onUpdate(updatedUser);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      display_name: user.display_name || user.username || '',
      bio: user.bio || '',
      avatar_url: user.avatar_url || user.avatar || '',
    });
    setIsEditing(false);
  };

  const displayName = user.display_name || user.username || 'User';
  const avatarUrl = user.avatar_url || user.avatar;
  const avatarInitials = displayName.slice(0, 2).toUpperCase();

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-24 w-24 rounded-full object-cover border-2 border-border"
              />
            ) : (
              <div className="h-24 w-24 bg-gradient-timebomb rounded-full flex items-center justify-center text-3xl font-bold text-white">
                {avatarInitials}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 w-full text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input
                    id="display_name"
                    value={formData.display_name}
                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                    placeholder="Your display name"
                    maxLength={100}
                    className="text-black placeholder:text-gray-500"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.display_name.length}/100
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    maxLength={1000}
                    rows={4}
                    className="text-black placeholder:text-gray-500"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.bio.length}/1000
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar_url">Avatar URL (optional)</Label>
                  <Input
                    id="avatar_url"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    placeholder="https://example.com/avatar.jpg"
                    className="text-black placeholder:text-gray-500"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-primary text-primary-foreground"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    disabled={isSaving}
                    className="flex-1 border-border"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-1">{displayName}</h2>
                <p className="text-muted-foreground mb-2">@{user.username}</p>
                {user.bio && (
                  <p className="text-foreground mb-4 whitespace-pre-wrap">{user.bio}</p>
                )}
                {isOwnProfile && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-border hover:bg-surface-hover"
                  >
                    Edit Profile
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;

