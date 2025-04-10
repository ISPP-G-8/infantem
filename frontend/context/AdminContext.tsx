import React, { createContext, useState, useContext } from "react";
import { User, AdminContext, Recipe } from "../types";

const adminInfo = createContext<AdminContext>({
  userToModify: null,
  recipeToModify: null,
  setUserToModify: () => {},
  setRecipeToModify: () => {},
});

export const useAdmin = () => useContext(adminInfo);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToModify, setUserToModify] = useState<User | null>(null);
  const [recipeToModify, setRecipeToModify] = useState<Recipe | null>(null);

  const value = {
    userToModify,
    recipeToModify,
    setUserToModify,
    setRecipeToModify,
  };

  return <adminInfo.Provider value={value}>{children}</adminInfo.Provider>;
}
