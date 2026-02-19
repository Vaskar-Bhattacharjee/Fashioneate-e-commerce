import { dbConnect } from "@/src/lib/dbConnect";
import User from "@/src/model/auth.model";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string };

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken || user.isBlocked) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );
    const response = NextResponse.json(
      { message: "Token refreshed", user: { email: user.email, role: user.role } }, 
      { status: 200 }
    );
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });
    return response;

  } catch (error) {
    console.error("REFRESH ERROR:", error);
    return NextResponse.json({ message: "Session expired" }, { status: 403 });
  }
}