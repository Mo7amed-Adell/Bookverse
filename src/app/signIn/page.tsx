"use client"
import { auth, provider } from "@/firebase.js"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";




export default function SignIn() 
{
 const [email , setEmail] = useState("");
 const [password , setPassword] = useState("");
 const router = useRouter();
 const handlePasswordSignIn = async() => {
  const result = await signInWithEmailAndPassword(auth ,email , password);
   router.push("/"); 

 }
 const handleGoogleSignIn = async () => {
  const result = await signInWithPopup(auth, provider); 
  const user = result.user;
 
   router.push("/"); 

 }

 return (
 <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
  <div className="flex flex-col items-center border border-gray-400 bg-white rounded-lg shadow-md p-8 w-96">
    
    
    <h2 className="text-2xl font-bold text-black mb-6">Sign In</h2>


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
      onClick={handlePasswordSignIn}
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
    <span className=" text-black"> dont have an account? {" "}
    <Link href={"/signUp"} className="text-blue-600 hover:underline"> 
       SignUp
    </Link>
   </span>
  </div>
</div>
 )
 
}