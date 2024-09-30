import connectDB from "@/lib/connectDB";
import itemModel from "@/models/itemModel";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    await connectDB();

    // Search for the name as a substring, not just starting with the string
    const items = await itemModel
      .find({ name: { $regex: params.name, $options: "i" } }) // 'i' for case-insensitive
      .limit(3);

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
}
