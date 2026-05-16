import cloudinary from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const b64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "nextjs_uploads",
    });

    return NextResponse.json({
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}