import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { User } from "../types/types";
import { db } from "@/firebase.js";

export async function saveUser(user : User)
{
  await setDoc(doc(db, "users" ,user.uid ), 
  {
   name: user.displayName,
   uid: user.uid,
   photoURL: user.photoURL || null,
   email: user.email,
   lastLogin: serverTimestamp(),
   provider: user.provider,
  },
  {merge: true}
  );

}