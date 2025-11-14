export interface User {
  id: string | number;
  username: string;
  email: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  avatar?: string; // legacy support
  created_at?: string;
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
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
}