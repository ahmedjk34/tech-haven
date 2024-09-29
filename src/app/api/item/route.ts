import connectDB from "@/lib/connectDB";
import itemModel from "@/models/itemModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const subCategories = searchParams.getAll("subCategories")[0].split(",");
    const brand = searchParams.get("brand");
    console.log(category, brand, subCategories);
    const query: any = {};

    if (category && category !== "undefined") {
      query.category = category;
    }

    if (subCategories && subCategories[0] !== "undefined") {
      query.subCategories = { $in: subCategories };
    }

    if (brand && brand !== "undefined") {
      query.brand = brand;
    }

    // Fetch items based on the constructed query
    const items = await itemModel.find(query);

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}
