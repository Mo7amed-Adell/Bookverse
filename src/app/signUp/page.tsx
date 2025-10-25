"use client";
import { auth, provider, db } from "@/firebase.js"
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { saveUser } from "../utils/saveUser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function  SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [errMessage , setErrMessage] = useState("");
  const router = useRouter();

 const handleGoogleSignIn = async () => {
  const result = await signInWithPopup(auth, provider); 
  const user = result.user;
  saveUser(
    {
      displayName: user.displayName || "",
      uid: user.uid,
      photoURL :user.photoURL || null,
      email :user.email || "",
      provider: "google.com",
      createdAt: new Date(),
      lastLogin: new Date(),

    }
  )
      router.push("/"); 
 }

 const handlePasswordSignUP = async() => {
  try{
  if (!name.trim()) throw new Error("missing-name");
   const result = await createUserWithEmailAndPassword(auth, email, password);
   const user = result.user;
   await updateProfile(user, {displayName : name});
  saveUser({
    displayName: name,
    uid: user.uid,
    email: user.email,
    provider: "password",
    createdAt: new Date(),
    lastLogin: new Date(),
    });
      router.push("/"); 
     }catch(error) {
    if (error && typeof error === "object" && "code" in error) {
      const code = (error as { code: string }).code;
      switch (code) {
       case "missing-name":
        setErrMessage("Please enter your name.");
        break;
       case "auth/popup-closed-by-user":
        setErrMessage("Sign-in window closed before completing. Please try again.");
        break;
       case "auth/cancelled-popup-request":
        setErrMessage("Multiple sign-in requests. Please wait a moment.");
        break;
       case "auth/popup-blocked":
        setErrMessage("Popup was blocked by your browser. Please allow popups for this site.");
        break;
       case "auth/network-request-failed":
        setErrMessage("Network error. Check your internet connection and try again.");
        break;
       case "auth/email-already-in-use":
        setErrMessage("this email is already in use") ;
        break;
      case "auth/missing-email":
        setErrMessage("please enter your email") ;
        break;
      case "auth/invalid-email":
        setErrMessage("this email is invalid") ;
        break;
      case "auth/missing-password":
        setErrMessage("please enter a password") ;
        break; 
      case "auth/weak-password":
        setErrMessage("very weak password, password should contain atleast 6 characters ") ;
        break; 
    
    }
  }
  } 
 }
 return (
 <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
  <div className="flex flex-col items-center border border-gray-400 bg-white rounded-lg shadow-md p-8 w-96">
    
    
    <h2 className="text-2xl font-bold text-black mb-6">Sign up</h2>

    <input 
      type="text" 
      placeholder="Name"
      onChange={(e) => {setName(e.target.value)}}
      className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
    />
    <input 
      type="email" 
      placeholder="Email"
      onChange={(e) => {setEmail(e.target.value)}}
      className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
    />
    <input 
      type="password" 
      placeholder="Password"
      onChange={(e) => {setPassword(e.target.value)}}
      className="w-full mb-5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
    />
      <button 
      className="w-60 px-8 py-2 border border-blue-500 text-blue-600 font-medium rounded-md cursor-pointer hover:bg-blue-50 transition"
      onClick={handlePasswordSignUP}
    >
      Submit
    </button>

    
    <span className="text-gray-500 mb-5">───── or ─────</span>

    
    <button 
      onClick={handleGoogleSignIn} 
      className="w-full px-4 py-2 border border-blue-500 text-blue-600 font-medium rounded-md cursor-pointer hover:bg-blue-50 transition"
    >
      Sign in with Google
    </button>
    <span className=" text-black"> already have an account? {" "}
    <Link href={"/signIn"} className="text-blue-600 hover:underline"> 
       SignIn
    </Link>
    </span>
    {errMessage && <span className="text-red-700">{errMessage}</span>}
  </div>
  
</div>
 )

}