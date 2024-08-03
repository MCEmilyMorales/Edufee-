import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const fileBuffer = Buffer.from(await req.arrayBuffer());

    return new NextResponse("PDF uploaded successfully", { status: 200 });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    return new NextResponse("Failed to upload PDF", { status: 500 });
  }
}
