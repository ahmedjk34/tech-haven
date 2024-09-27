import { ItemType } from "@/util/Types";
import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategories: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specifications: {
    type: Map,
    of: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const itemModel =
  mongoose.models.item || mongoose.model<ItemType>("item", itemSchema);
export default itemModel;
