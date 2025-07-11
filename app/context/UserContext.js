"use client"
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [idUser, setIdUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserId() {
      try {
        const response = await fetch("http://localhost:8000/ELACO/getUserId", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user ID: ${response.statusText}`);
        }

        const userIdData = await response.json();
        setIdUser(userIdData.id_user);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserId();
  }, []);

  // Add logout function
  const logout = async () => {
    try {
      await fetch("http://localhost:8000/ELACO/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIdUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ idUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
