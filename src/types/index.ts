export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Timebomb {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
  isPublic: boolean;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  previewText?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}