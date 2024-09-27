import { UserType } from "@/util/Types";
import mongoose from "mongoose";
const { Schema } = mongoose;

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
  cart: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const userModel =
  mongoose.models.user || mongoose.model<UserType>("user", userSchema);
export default userModel;
