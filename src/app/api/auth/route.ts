import { dbConnect } from "@/src/lib/dbConnect";
import User from "@/src/model/auth.model";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      id: string;
    };

    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 },
    );
  }
}
