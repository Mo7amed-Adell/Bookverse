"use client";

import { useAuth } from "@/app/components/AuthProvider";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";
type Book = {
  id: string;
  title: string;
  image: string;
};
export default function FavouritesPage() 
{
 const {user , loading} = useAuth();
  const [favourites, setFavourites] = useState<Book[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
   const fetchFavourites = async () => {
       if(!user) return 
       setFetching(true);
       const userSnap  = await getDoc(doc(db , "users" , user.uid));
       if( userSnap.exists()) {
          const favIds = userSnap.data().favourites || [];
          const books = await Promise.all(
            favIds.map(async(bookId : string) => {
             const bookSnap = await getDoc(doc(db , "books" , bookId));
             if(bookSnap.exists()) {
              return {id : bookId , ...bookSnap.data()} as Book
             }
             return null
            })
          );
           setFavourites(books.filter((b): b is Book => b !== null));
           setFetching(false);
       };
       
   }
  if (!loading && user) {
      fetchFavourites();
    } else if (!loading && !user) {
      setFetching(false);
    }
  }
,[loading , user]);

 if (loading || fetching)
    return <p className="text-center mt-10 text-gray-500">Loading favourites...</p>;

  if (!user)
    return <p className="text-center mt-10 text-gray-500">Please log in to view your favourites.</p>;

  if (favourites.length === 0)
    return <p className="text-center mt-10 text-gray-500">No favourites yet!</p>;

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {favourites.map((book) => (
       <Link href = {`/books/${book.id}`} key={book.id}>
        <div
          key={book.id}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
          </div>
        </div>
      </Link> 
      ))}
    </div>
  );
 }

