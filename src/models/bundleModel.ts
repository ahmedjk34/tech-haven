import { BundleType } from "@/util/Types";
import mongoose from "mongoose";

const { Schema } = mongoose;

const bundleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const bundleModel =
  mongoose.models.bundle || mongoose.model<BundleType>("bundle", bundleSchema);
export default bundleModel;
