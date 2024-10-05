import userModel from "@/models/userModel";
import mongoose, { Mongoose } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { userId: string; itemId: string } }
) {
  const { userId, itemId } = params;
  try {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(itemId)
    )
      throw new Error("Not Valid MongoDB Object ID");

    await userModel.findByIdAndUpdate(userId, {
      $addToSet: { wishlist: itemId },
    });
    return NextResponse.json({
      message: `Success`,
    });
  } catch (error) {
    return NextResponse.json({
      message: `User ID: ${userId}, Item ID: ${itemId}`,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; itemId: string } }
) {
  const { userId, itemId } = params;
  try {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(itemId)
    )
      throw new Error("Not Valid MongoDB Object ID");

    await userModel.findByIdAndUpdate(userId, {
      $pull: { wishlist: itemId },
    });
    return NextResponse.json({
      message: `Success`,
    });
  } catch (error) {
    return NextResponse.json({
      message: `User ID: ${userId}, Item ID: ${itemId}`,
    });
  }
}
