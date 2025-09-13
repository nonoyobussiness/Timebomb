import { Timebomb, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'demo_user',
    email: 'demo@timebomb.app',
  },
  {
    id: '2',
    username: 'alex_crypto',
    email: 'alex@example.com',
  },
  {
    id: '3',
    username: 'sarah_dev',
    email: 'sarah@example.com',
  },
  {
    id: '4',
    username: 'mike_artist',
    email: 'mike@example.com',
  },
];

export const mockTimebombs: Timebomb[] = [
  {
    id: '1',
    title: '🎉 Big Announcement Coming!',
    content: 'I have some incredible news to share with everyone! This is going to change everything...',
    author: mockUsers[1],
    createdAt: new Date('2024-01-15T10:00:00Z'),
    unlockAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    isPublic: true,
    isUnlocked: false,
    previewText: 'Something amazing is about to be revealed...',
  },
  {
    id: '2',
    title: 'Secret Project Reveal',
    content: 'After months of hard work, I can finally share what I\'ve been building in secret!',
    author: mockUsers[2],
    createdAt: new Date('2024-01-15T08:30:00Z'),
    unlockAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    isPublic: false,
    isUnlocked: false,
    previewText: 'The secret project I\'ve been working on...',
  },
  {
    id: '3',
    title: 'Travel Photos from Japan',
    content: 'These photos from my trip to Tokyo will blow your mind! The cherry blossoms were incredible.',
    author: mockUsers[3],
    createdAt: new Date('2024-01-15T06:00:00Z'),
    unlockAt: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    isPublic: true,
    isUnlocked: false,
    media: {
      type: 'image',
      url: '/api/placeholder/400/300',
    },
    previewText: 'Amazing photos from the land of the rising sun...',
  },
  {
    id: '4',
    title: 'Weekend Memories',
    content: 'What an incredible weekend! The concert was absolutely amazing and the after-party was wild.',
    author: mockUsers[1],
    createdAt: new Date('2024-01-14T20:00:00Z'),
    unlockAt: new Date(Date.now() - 1000), // Already unlocked
    isPublic: true,
    isUnlocked: true,
  },
  {
    id: '5',
    title: 'Career Update',
    content: 'I got the job! Starting next month at my dream company. Thank you all for the support!',
    author: mockUsers[2],
    createdAt: new Date('2024-01-14T16:00:00Z'),
    unlockAt: new Date(Date.now() - 1000), // Already unlocked
    isPublic: false,
    isUnlocked: true,
  },
];

export const getFriendsTimebombs = (userId: string): Timebomb[] => {
  // In a real app, this would filter based on user's friends
  return mockTimebombs.filter(tb => !tb.isPublic && tb.author.id !== userId);
};

export const getPublicTimebombs = (): Timebomb[] => {
  return mockTimebombs.filter(tb => tb.isPublic);
};