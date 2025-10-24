"use client"
import { useState, useMemo, useEffect } from "react";
import {Book} from "@/app/types/types";
import { PrismaClient } from "@prisma/client";
import NavBar from "@/app/components/navbar";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "@/firebase";
import {use} from "react"
import { Star } from "lucide-react"; 
import { UserRoundPlus } from 'lucide-react';
import { useAuth } from "@/app/components/AuthProvider";

type tParams = Promise<{ id: string }>;
export default  function BookDetail({params} : {params : tParams}) {
const {id} = use(params);
const [book , setBook] = useState<Book | null>(null);
const [IsInFavourites , setIsInFavourites] = useState<boolean>(false);
const {loading , user} = useAuth();

useEffect( () => {
  async function fetchBooks() {
    const docRef = doc(db, "books" , id);
    const snapShot = await getDoc(docRef);
    if(snapShot.exists())
    {
      setBook(snapShot.data() as Book);
    }
    if(user) {
      const userRef = doc(db , "users" , user.uid);
      const userSnap = await getDoc(userRef);
      if(userSnap.exists()){
        const userData = userSnap.data();
        const favourites = userData.favourites || [];
        setIsInFavourites(favourites.includes(book?.uid));
      }
    }

    
  }
  fetchBooks();
} , [id])

const handleAddToFavourites = async () => {
  if (!user || !book) return;

  const docRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(docRef);
  const userData = userSnap.data();
  const favourites = userData?.favourites || [];

  if(favourites.includes(book.uid))
  {
    await updateDoc(docRef , {
      favourites : arrayRemove(book.uid)
    });
    setIsInFavourites(false);
  } else {
     if(!userData?.favourites) {
      await updateDoc(docRef , {
        favourites : []
      })
     }
    await updateDoc(docRef , {
        favourites : arrayUnion(book.uid)
    });
    setIsInFavourites(true);

  }
   

   
}
return(
<div className="bg-white w-screen min-h-screen ">
  <NavBar/>
  <div className="flex items-center justify-center p-8">
      {/* Flex container */}
      <div className="flex gap-8 max-w-4xl w-full">
        {/* Book Image */}
        <div className="flex-shrink-0">
          <img
            src={book?.image}
            alt={book?.title}
            className="w-64 h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">{book?.title}</h1>
          <p className="text-lg text-gray-700 mb-1">Author: <span className="text-base font-normal text-gray-600">{book?.author}</span></p>
          <p className="text-lg text-gray-700 mb-1">Genre: <span className="text-base font-normal text-gray-600">{book?.genre}</span></p>
          <p className="text-lg text-gray-700 mb-1">description: <span className="text-base font-normal text-gray-600">{book?.description}</span></p>
          <div className=" flex">
          <Star className={`rounded-full hover:bg-gray-100  duration-200 cursor-pointer mr-4 
           ${IsInFavourites ? "text-yellow-400" : "text-black"}
             hover:bg-gray-100`}
                onClick={handleAddToFavourites}
           />
          <UserRoundPlus className="  rounded-full hover:bg-gray-100  duration-200 cursor-pointer text-black" />
          </div>


        </div>
      </div>
    </div>
   </div> 
);
}