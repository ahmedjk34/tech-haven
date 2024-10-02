import connectDB from "@/lib/connectDB";
import itemModel from "@/models/itemModel";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const item = await itemModel.findById(params.id);

    const recommendedItems = await itemModel.aggregate([
      { $match: { category: item.category, _id: { $ne: item._id } } }, // Exclude the current item
      { $sample: { size: 3 } }, // Randomly select 3 items
    ]);

    return NextResponse.json({ item, recommendedItems });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
}
