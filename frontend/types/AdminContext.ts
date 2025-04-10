import { User } from "./User";
import { Recipe } from "./Recipe";

export type AdminContext = {
  userToModify: User | null;
  recipeToModify: Recipe | null;
  setUserToModify: (user: User | null) => void;
  setRecipeToModify: (recipe: Recipe | null) => void;
};
