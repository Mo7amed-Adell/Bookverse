// app/api/books/route.js
import { db } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// GET: fetch all books
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "books"));
    const books = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(books), { status: 200 });
  } catch (err : unknown) {
   
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}

// POST: add a new book
export async function POST(req :NextRequest) {
  try {
    const body = await req.json();
    const { title, author, genre, image, description } = body;

    // validate inputs
    if (!title || !author) {
      return new Response(JSON.stringify({ error: "Missing title or author" }), { status: 400 });
    }

    const docRef = await addDoc(collection(db, "books"), {
      title,
      author,
      genre,
      image,
      description,
    });

    return new Response(JSON.stringify({ id: docRef.id }), { status: 200 });
  } catch (err : unknown) {
    const message = err instanceof Error ? err.message : "unknown error"
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}     