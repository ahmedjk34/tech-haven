import connectDB from "@/lib/connectDB";
import itemModel from "@/models/itemModel";
import { ItemType } from "@/util/Types";
import { NextRequest, NextResponse } from "next/server";

const array: ItemType[] = [
  {
    name: "AMD Ryzen 7 7800X3D",
    price: 339,
    brand: "AMD",
    category: "CPU",
    subCategories: ["Enthusiast", "AMD", "Core i7"],
    specifications: new Map<string, string>([
      ["core_count", "8"],
      ["core_clock", "4.2"],
      ["boost_clock", "5"],
      ["tdp", "120"],
      ["graphics", "Radeon"],
      ["smt", "true"],
    ]),
    images: [
      "https://c1.neweggimages.com/ProductImageCompressAll1280/19-113-793-03.png",
      "https://c1.neweggimages.com/ProductImageCompressAll1280/19-113-793-02.png",
      "https://c1.neweggimages.com/ProductImageCompressAll1280/19-113-793-01.png",
    ],
    stock: 50,
    discount: 0,
  },
];

export async function POST(request: NextRequest) {
  // await connectDB();
  // array.forEach(async (item) => await itemModel.create(item));
  // return new NextResponse("Success");
}
