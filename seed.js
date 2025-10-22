// Load environment variables first - this is crucial!
import dotenv from 'dotenv';
dotenv.config();

// Import Firebase modules directly
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Your book data
const featuredBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "fiction",
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    description: "A tragic tale of wealth, love, and the American Dream, following the mysterious Jay Gatsby and his obsession with Daisy Buchanan in the Roaring Twenties.",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "fiction",
    image: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    description: "A moving story set in the Deep South, told through the eyes of young Scout Finch, as her father Atticus defends an innocent Black man accused of a grave crime.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "dystopian",
    image: "https://covers.openlibrary.org/b/id/8225261-L.jpg",
    description: "A chilling dystopian novel where Big Brother watches every move, exploring themes of surveillance, censorship, and the loss of individuality.",
  },
];

async function seedBooks() {
  try {
    console.log("Starting to seed books...");
    console.log(`Connected to Firebase project: ${firebaseConfig.projectId}`);
    
    for (const book of featuredBooks) {
      console.log(`Adding book: ${book.title}`);
      const docRef = await addDoc(collection(db, "books"), book);
      console.log(`✅ Book added with ID: ${docRef.id}`);
    }
    
    console.log("\n🎉 All books added successfully!");
  } catch (err) {
    console.error("❌ Error seeding books:", err);
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
  }
}

seedBooks();