import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

// The important point here is that the jwt is saved on different places
// on web and native devices. And expo-secure-store doesnt support saving
// content on web
export const storeToken = async (token: string): Promise<void> => {
  if (Platform.OS === "web") {
    window.localStorage.setItem("jwt", token);
  } else {
    await SecureStore.setItemAsync("jwt", token);
  }
};

export const getToken = async (): Promise<string | null> => {
  if (Platform.OS === "web") {
    return window.localStorage.getItem("jwt");
  } else {
    return await SecureStore.getItemAsync("jwt");
  }
};

export const removeToken = async (): Promise<void> => {
  if (Platform.OS === "web") {
    window.localStorage.removeItem("jwt");
  } else {
    await SecureStore.deleteItemAsync("jwt");
  }
};
