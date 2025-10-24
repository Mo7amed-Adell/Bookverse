import Link from "next/link";
import Image from 'next/image';
import BookSearchFilter from "./components/bookSearchFilter";
import NavBar from "./components/navbar";

import { PrismaClient } from '@prisma/client';
import { db } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Book } from "./types/types";



export default async function HomePage() {
  const querySnapshot = await getDocs(collection(db, "books"));
    const featuredBooks = querySnapshot.docs.map(doc => ({
      ...doc.data() as Book
    }));


  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <NavBar/>
      <section className="relative text-center py-16 bg-gradient-to-r from-indigo-600  to-indigo-300 text-white">
        <h1 className="text-4xl font-bold mb-4">📚 BookVerse</h1> 
        <p className="text-lg mb-6">
          Discover, review, and share your favorite books.
        </p>
        <Link
          href=""
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
        >
          Browse Books
        </Link>
      </section>

      {/* Featured Books */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Books</h2>
        <BookSearchFilter books={featuredBooks}/>
      </section>

      {/* Call-to-Action */}
      <section className="text-center py-12 bg-indigo-600 text-white">
        <h2 className="text-2xl font-bold mb-4">Join the Community</h2>
        <p className="mb-6">Share your thoughts on your favorite books.</p>
        <Link
          href=""
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}
