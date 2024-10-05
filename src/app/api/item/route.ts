import connectDB from "@/lib/connectDB";
import itemModel from "@/models/itemModel";
import { NextRequest, NextResponse } from "next/server";
import { formatPriceAfterDiscount } from "@/util/priceUtil"; // Import the price calculation function

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const subCategories =
      searchParams.getAll("subCategories")[0]?.split(",") || [];
    const brand = searchParams.get("brand");
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "Infinity");

    const query: any = {};

    if (category && category !== "undefined") {
      query.category = category;
    }

    if (subCategories.length && subCategories[0] !== "undefined") {
      query.subCategories = { $in: subCategories };
    }

    if (brand && brand !== "undefined") {
      query.brand = brand;
    }

    // Fetch items based on query
    const items = await itemModel.find(query);

    // Filter items based on price after discount
    const filteredItems = items.filter((item) => {
      const priceAfterDiscount = parseFloat(
        formatPriceAfterDiscount(item.price, item.discount)
      );
      return priceAfterDiscount >= minPrice && priceAfterDiscount <= maxPrice;
    });
    return NextResponse.json(filteredItems);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
}
