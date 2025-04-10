import { User } from "./User";
import { Recipe } from "./Recipe";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  userToModify: User | null;
  recipeToModify: Recipe | null;
  setUserToModify: (user: User | null) => void;
  setRecipeToModify: (recipe: Recipe | null) => void;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  updateToken: (token: string) => Promise<void>;
  checkAuth: () => Promise<boolean>;
};
