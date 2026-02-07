import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    response.cookies.set("authToken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Logout failed", success: false },
      { status: 500 }
    );
  }
};
