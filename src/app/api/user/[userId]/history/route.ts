import userModel from "@/models/userModel";
import { ContextType } from "@/util/Types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid User ID");
    }

    const body = await request.json();
    const cart: ContextType[] = body.cart;

    if (!cart || cart.length === 0) {
      throw new Error("Cart is empty");
    }

    const purchaseHistory = cart.map((item) => ({
      itemWithQuantity: {
        data: item.data._id,
        quantity: item.quantity,
      },
      timeOfPurchase: new Date(),
    }));

    await userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          purchaseHistory: { $each: purchaseHistory },
        },
      },
      { new: true, useFindAndModify: false }
    );

    return NextResponse.json({
      message: "Purchase history updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred during the purchase",
        userId,
      },
      { status: 400 }
    );
  }
}
