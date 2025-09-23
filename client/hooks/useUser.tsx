import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const UsersContext = createContext<any>(null);

export const UsersProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await getCurrentUserDataInLocalStorage();
    };

    getData();
  }, []);

  const registerUser = async (userData) => {
    try {
      let response = await api.post(`/users/`, userData);

      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (err: any) {
      if (err.response.data.message) {
        alert(err.response.data.message);
        console.error("REQUEST ERROR: ", err.response.data.message);
      } else {
        console.error("GENERIC ERROR: ", err.message);
      }
      return null;
    }
  };

  const updateUser = async (userData, userId) => {
    try {
      if (!userData.password || userData.password.trim() === "") {
        delete userData.password;
      }

      console.log("UD BEFORE UPDATE :", userData);

      let response = await api.put(`/users/${userId}`, userData);
      // let response = await api.patch(`/users/${userId}`, userData);

      if (response.data.success) {
        if (currentUser._id === userId) {
          await saveCurrentUserDataInLocalStorage(response.data.data);
          await getCurrentUserDataInLocalStorage();
        }

        return response.data.data;
      }
      return null;
    } catch (err: any) {
      if (err.response.data.message) {
        alert(err.response.data.message);
        console.error("REQUEST ERROR DATA: ", err.response.data);
        console.error("REQUEST ERROR MESSAGE: ", err.response.data.message);
        console.error("REQUEST ERROR : ", err.response.data.error);
      } else {
        console.error("GENERIC ERROR: ", err.message);
      }
      return null;
    }
  };

  const loginUser = async (userData) => {
    try {
      let response = await api.post(`/users/login`, userData);

      if (response.data.success) {
        await saveCurrentUserDataInLocalStorage(response.data.data);
        console.log("User saved!");
        return response.data.data;
      }
      return null;
    } catch (err: any) {
      if (err.response.data.message) {
        alert(err.response.data.message);
        console.error("REQUEST ERROR: ", err.response.data.message);
      } else {
        console.error("GENERIC ERROR: ", err.message);
      }
      return null;
    }
  };

  const getCurrentUserDataInLocalStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("currentUser");
      setCurrentUser(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      console.error("Error reading user", e);
      return null;
    }
  };

  const saveCurrentUserDataInLocalStorage = async (user) => {
    try {
      await AsyncStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      console.log("User saved!");
    } catch (e) {
      console.error("Error saving user", e);
    }
  };

  const deleteUserDataInLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem("currentUser");
      console.log("User deleted!");
      setCurrentUser(null);
      router.replace("/login");
    } catch (e) {
      console.error("Error deleting user", e);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        currentUser,
        registerUser,
        loginUser,
        deleteUserDataInLocalStorage,
        getCurrentUserDataInLocalStorage,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
