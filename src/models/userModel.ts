import { UserType } from "@/util/Types";
import mongoose from "mongoose";
const { Schema } = mongoose;

const contextSchema = new Schema(
  {
    data: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  purchaseHistory: [
    {
      itemWithQuantity: { type: contextSchema, required: true },
      timeOfPurchase: { type: Date, required: true },
    },
  ],
});

const userModel =
  mongoose.models?.user || mongoose.model<UserType>("user", userSchema);
export default userModel;
