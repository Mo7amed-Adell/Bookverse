import {Book} from "@/app/types/types"
 
export async function addBook(book : Book)
{
  const res = await fetch("api/books"  , 
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  })
  if (!res.ok) throw new Error("Failed to add book");
  return res.json();
}

export async function deleteBook(id : string)
{
 const res = await fetch(`api/books/${id}` , 
 {
  method : "delete",
 });
   if (!res.ok) throw new Error("Failed to delete book");
  return res.json();
}

export async function fetchBooks()
{
 const res = await fetch("api/ books");
 if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}
