"use client";
import { useState, useMemo } from "react";
import {Book} from "@/app/types/types";
import Link from "next/link";


export default function BookSearchFilter({ books }: { books: Book[] }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  // Build the genre list dynamically from the incoming books
  const genres = useMemo(() => {
    const unique = Array.from(new Set(books.map(b => b.genre).filter(Boolean)));
    return ["All", ...unique];
  }, [books]);

  const filteredBooks = useMemo(() => {
    const q = search.toLowerCase();
    return books.filter((book) => {
      const matchesSearch =
        book.title?.toLowerCase().includes(q) ||
        book.author?.toLowerCase().includes(q);
      const matchesGenre = genre === "All" || book.genre === genre;
      return matchesSearch && matchesGenre;
    });
  }, [books, search, genre]);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full sm:w-60 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
          <Link href = {`/books/${book.uid}`} key={book.uid}>
            <div
              key={book.uid}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <small className="text-gray-500">{book.genre}</small>
              </div>
            </div>
          </Link>  
          ))
        ) : (
          <p className="text-gray-500">No books found.</p>
        )}
      </div>
    </div>
  );
}

