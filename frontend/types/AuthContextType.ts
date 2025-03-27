import { User } from './User';

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
};

