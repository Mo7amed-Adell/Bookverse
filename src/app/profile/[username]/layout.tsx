"use client";

import { useAuth } from "@/app/components/AuthProvider";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { Star } from 'lucide-react';
import { Settings } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { username } = useParams();

   const handleSignOut = async() => {
    await signOut(auth);
    router.push("/signUp");
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signIn");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading...</p>
    );
  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-200 flex flex-col text-gray-800" >
        {/* Top-left title */}
        <div className="p-4">
          <Link href="/" className="text-2xl font-bold tracking-wide">
            📚 BookVerse
          </Link>
        </div>

        {/* Centered content */}
        <div className="flex-1 flex flex-col   space-y-2  mt-8 w-full">

          {/* Links */}
          <ul className="flex flex-col  space-y-4 w-full ">
            <li>
              <Link
                href={`/profile/${username}/favourites`}
                className="flex items-center gap-3 text-gray-800 hover:text-blue-700 font-bold text-xl transition-colors ml-5 rounded-md 
                 border-transparent hover:bg-white/20  hover:border-white  w-full p-2 mr-3 "
              >
                <Star className="w-6 h-6" />
                 Favourites
              </Link>
            </li>
            <li>
              <Link
                href={`/profile/${username}/settings`}
                className="flex items-center gap-3 text-gray-800 hover:text-blue-700 font-bold text-xl transition-colors ml-5 rounded-md 
                 border-transparent hover:bg-white/20  hover:border-white  w-full p-2"
              >
                <Settings className="w-6 h-6" />
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut} // replace with real sign-out logic later
                className="flex items-center gap-3 text-red-600 hover:text-red-700  transition-colors text-xl font-bold   w-full ml-5
                p-2 rounded-md border-transparent hover:bg-white/20  hover:border-white text-left "
              >
                <LogOut className="w-6 h- text-black" />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">{children}</div>
    </div>
  );
}

