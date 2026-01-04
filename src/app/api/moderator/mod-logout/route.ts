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
      try {
          const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string };
          if (decoded) {
              await User.findByIdAndUpdate(decoded.id, { refreshToken: "" }, { new: true });
          }
        } catch (error) {
            console.error("refresh token expired:", error);
        }
        const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
        response.cookies.delete("refreshToken");
        return response;
    } catch (error) {
        console.error("LOGOUT ERROR:", error);
        return NextResponse.json({ message: "Logout failed" }, { status: 500 });
    }
}