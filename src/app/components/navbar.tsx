"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { AuthContextType } from "./AuthProvider";
import { ChevronDown } from "lucide-react"; 
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export default  function NavBar()  {
  const [isOpen, setIsOpen] = useState(false);
  const {loading , user} = useAuth();
  const router = useRouter();

  const handleSignOut = async() => {
    await signOut(auth);
    router.push("/signUp");
  }
 return (
  <nav className="bg-gray-100 h-15 border-b-4 border-gray-300 flex items-center justify-between px-4 ">

      {/* BookVerse Title */}
      <Link href={"/"}><span className=" font-bold text-black ml-4">📚BookVerse</span> </Link>
      <div className=" mr-8">
        {user ? (
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 cursor-pointer font-bold text-black hover:underline"
          >
            <span>{user.displayName || user.email}</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          
            ) : (
              // Logged-out state
              <Link
                href="/signUp"
                className="font-bold text-black ml-4 hover:underline"
              >
                Sign Up
              </Link>
            )}
          {isOpen && user && (
          <div className="absolute right-6 mt-2 bg-white border border-gray-300 rounded shadow-lg w-40 z-10">
            <Link
              href= {`/profile/${user.displayName?.replace(/\s+/g, "-")}`}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Profile
            </Link>
            <button
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
  </nav>
 );
}