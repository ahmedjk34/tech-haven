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
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
}
