export type Book = {
  uid: number;       
  title: string;    
  author: string;   
  genre: string | " ";   
  image: string; 
  description : string;
}
export type User  = {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  provider: "google.com" | "password"; 
  createdAt: Date; 
  lastLogin: Date; 
  role?: "user" | "admin";
  preferences?: {
    theme?: "light" | "dark";
    notifications?: boolean;
  };
  favourites?: [Book]
  friendList?: [User]
}