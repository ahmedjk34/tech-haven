import { ObjectId } from "mongoose";

export interface UserType {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  wishlist: ItemType[];
  cart: {
    item: ItemType;
    quantity: number;
  }[];
}

export interface ItemType {
  _id?: ObjectId;
  name: string;
  brand: string;
  category: string;
  subCategories: string[];
  price: number;
  specifications: Map<string, string>; // Map of specifications
  images: string[]; // Array of image URLs
  stock: number;
  discount: number;
}

export interface ContextType {
  data: ItemType;
  quantity: number;
}
