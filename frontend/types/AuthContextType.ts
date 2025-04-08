import { User } from "./User";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  userToModify: User | null;
  setUserToModify: (user: User | null) => void;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
};
