import { dbConnect } from "@/src/lib/dbConnect";
import User from "@/src/model/auth.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const {email, password} = await req.json();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if(user.isBlocked){
            return NextResponse.json({ message: "You are suspended" }, { status: 403 });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }
        const accessToken = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_ACCESS_SECRET!,
            { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: "365d" }
        );
        user.refreshToken = refreshToken;
        await user.save();
        const response = NextResponse.json(
            
            
            { 
                message: "Login successful",
                accessToken, 
                user: { email: user.email, role: user.role },
                
                 
            }, 
            { status: 200 }
        );

       response.cookies.set("accessToken", accessToken, {
        httpOnly: true, // Crucial for security
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60, 
        path: "/", 
    });
    console.log("response", response);
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax", 
            maxAge: 365 * 24 * 60 * 60, 
            path: "/",
        });

        return response;
    } catch (error: unknown) {
        console.log("Error while logging in:", error);
        return NextResponse.json({ error ,message: "Server error while logging in" }, { status: 500 });
    }
}