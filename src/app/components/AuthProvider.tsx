"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase.js";
export type AuthContextType = {
  user: User | null;
  loading: boolean;
};
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =  useContext(AuthContext);
    if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context

}
