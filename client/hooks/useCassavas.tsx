import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";
import { useUsers } from "./useUsers";

const CassavasContext = createContext<any>(null);

export const CassavasProvider = ({ children }: any) => {
  const { currentUser } = useUsers();

  const saveCassavaDetection = async (
    userData,
    configs = null,
    requestType = "insert",
    id = null
  ) => {
    try {
      let response = null;

      if (requestType === "insert") {
        response = await api.post("/cassava", userData, configs);
      } else {
        console.log(userData);
        console.log(requestType);
        console.log(id);
        response = await api.put(`/cassava/${id}`, userData, configs);
      }

      if (response.data.success) {
        return response.data;
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

  const getCassavaDetections = async (date = null) => {
    try {
      console.log(currentUser._id);

      const url = `/cassava?page=1&limit=1000&user=${currentUser._id}&createdAt=${date}`;

      console.log(url);

      let response = await api.get(`${url}`);

      if (response.data.success) {
        return response.data;
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

  const getCassavaDetection = async (id) => {
    try {
      const url = `/cassava/${id}`;

      console.log(url);

      let response = await api.get(`${url}`);

      if (response.data.success) {
        return response.data;
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

  // const updateUser = async (userData, userId) => {
  //   try {
  //     if (!userData.password || userData.password.trim() === "") {
  //       delete userData.password;
  //     }

  //     console.log("UD BEFORE UPDATE :", userData);

  //     let response = await api.put(`/users/${userId}`, userData);
  //     // let response = await api.patch(`/users/${userId}`, userData);

  //     if (response.data.success) {
  //       if (currentUser._id === userId) {
  //         await saveCurrentUserDataInLocalStorage(response.data.data);
  //         await getCurrentUserDataInLocalStorage();
  //       }

  //       return response.data.data;
  //     }
  //     return null;
  //   } catch (err: any) {
  //     if (err.response.data.message) {
  //       alert(err.response.data.message);
  //       console.error("REQUEST ERROR DATA: ", err.response.data);
  //       console.error("REQUEST ERROR MESSAGE: ", err.response.data.message);
  //       console.error("REQUEST ERROR : ", err.response.data.error);
  //     } else {
  //       console.error("GENERIC ERROR: ", err.message);
  //     }
  //     return null;
  //   }
  // };

  // const getCurrentUserDataInLocalStorage = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("currentUser");
  //     setCurrentUser(jsonValue != null ? JSON.parse(jsonValue) : null);
  //   } catch (e) {
  //     console.error("Error reading user", e);
  //     return null;
  //   }
  // };

  // const saveCurrentUserDataInLocalStorage = async (user) => {
  //   try {
  //     await AsyncStorage.setItem("currentUser", JSON.stringify(user));
  //     setCurrentUser(user);
  //     console.log("User saved!");
  //   } catch (e) {
  //     console.error("Error saving user", e);
  //   }
  // };

  // const deleteUserDataInLocalStorage = async () => {
  //   try {
  //     await AsyncStorage.removeItem("currentUser");
  //     console.log("User deleted!");
  //     setCurrentUser(null);
  //     router.replace("/login");
  //   } catch (e) {
  //     console.error("Error deleting user", e);
  //   }
  // };

  return (
    <CassavasContext.Provider
      value={{
        saveCassavaDetection,
        getCassavaDetections,
        getCassavaDetection,
      }}
    >
      {children}
    </CassavasContext.Provider>
  );
};

export const useCassavas = () => useContext(CassavasContext);
