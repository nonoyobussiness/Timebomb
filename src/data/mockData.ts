// in mockData.ts
import { Timebomb, User } from '@/types';



export const mockUsers: User[] = [
  {
    id: '1',
    username: 'demo_user',
    email: 'demo@timebomb.app',
    avatar: '/avatars/demo.png',
  },
  {
    id: '2',
    username: 'alex_crypto',
    email: 'alex@example.com',
    avatar: '/avatars/alex.png',
  },
  {
    id: '3',
    username: 'sarah_dev',
    email: 'sarah@example.com',
    avatar: '/avatars/sarah.png',
  },
  {
    id: '4',
    username: 'mike_artist',
    email: 'mike@example.com',
    avatar: '/avatars/mike.png',
  },
];


export const mockTimebombs: Timebomb[] = [
  {
    id: '1',
    title: '🎉 Big Announcement Coming!',
    content: 'I have some incredible news to share with everyone! This is going to change everything and I can\'t wait for you all to see what we\'ve been working on.',
    author: mockUsers[1],
    createdAt: new Date('2024-01-15T10:00:00Z'),
    isPublic: true,
    previewText: 'Something amazing is about to be revealed...',
  },
  {
    id: '2',
    title: 'Secret Project Reveal',
    content: 'After months of hard work, I can finally share what I\'ve been building in secret! It\'s a revolutionary new app that will change how we connect with each other.',
    author: mockUsers[2],
    createdAt: new Date('2024-01-15T08:30:00Z'),
    isPublic: false,
    previewText: 'The secret project I\'ve been working on...',
  },
  {
    id: '3',
    title: 'Travel Photos from Japan',
    content: 'These photos from my trip to Tokyo will blow your mind! The cherry blossoms were incredible and the food was out of this world. Already planning my next trip back.',
    author: mockUsers[3],
    createdAt: new Date('2024-01-15T06:00:00Z'),
    isPublic: true,
    media: {
      type: 'image',
      url: '/api/placeholder/400/300',
    },
    previewText: 'Amazing photos from the land of the rising sun...',
  },
  {
    id: '4',
    title: 'Weekend Memories',
    content: 'What an incredible weekend! The concert was absolutely amazing and the after-party was wild. Met so many cool people and made memories that will last forever.',
    author: mockUsers[1],
    createdAt: new Date('2024-01-14T20:00:00Z'),
    isPublic: true,
  },
  {
    id: '5',
    title: 'Career Update',
    content: 'I got the job! Starting next month at my dream company. Thank you all for the support and encouragement throughout this journey. Dreams do come true!',
    author: mockUsers[2],
    createdAt: new Date('2024-01-14T16:00:00Z'),
    isPublic: false,
  },
];

export const getFriendsTimebombs = (userId: string): Timebomb[] => {
  // In a real app, this would filter based on user's friends
  return mockTimebombs.filter(tb => !tb.isPublic && tb.author.id !== userId);
};

export const getPublicTimebombs = (): Timebomb[] => {
  return mockTimebombs.filter(tb => tb.isPublic);
};
export const getUserTimebombs = (userId: string): Timebomb[] => {
  return mockTimebombs.filter(tb => tb.author.id === userId);
};
