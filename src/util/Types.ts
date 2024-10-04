import { ObjectId } from "mongoose";

export interface ContextType {
  data: ItemType;
  quantity: number;
}

export interface PurchaseHistory {
  itemWithQuantity: ContextType;
  timeOfPurchase: Date;
}
export interface UserType {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  wishlist: ItemType[];
  purchaseHistory: PurchaseHistory[];
}

export interface SessionUser {
  id: string;
  username: string;
  wishlist: ItemType[];
  purchaseHistory: PurchaseHistory[];
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
