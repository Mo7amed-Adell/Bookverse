//api/books/[id]/route.js
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/firebase";
import { collection, deleteDoc, updateDoc, doc } from "firebase/firestore";
export async function DELETE(req: NextRequest, {params} : {params: {id : string}})
{
 const {id} = params;
 try {
  await deleteDoc(doc(db, "books", id));
      return new Response(
      JSON.stringify({ message: `Book ${id} deleted successfully` }),
      { status: 200 }
    );
 } catch(err : unknown){
  const message = err instanceof Error ? err.message : "unknown error"
   return new Response(JSON.stringify({ error: message }), { status: 500 });
 }
 
}

export async function PUT(req : NextRequest , {params} : {params : {id: string}})
{
 const {id} = params;
 const data = await req.json();
try {
  const bookRef = doc(db, "books", id);
  await updateDoc(bookRef, data);
  return new Response(JSON.stringify({message : `Book ${id} was updated successfully`}), {status:200});
}catch(err:unknown){
  const message = err instanceof Error ? err.message : "unknown error"
  return new Response(JSON.stringify({error : message}), {status : 500});
}
}
