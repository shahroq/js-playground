import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// This function can be marked `async` if using `await` inside
/*
export function proxy(request: NextRequest) {
  // console.log(request);
  // console.log("here i am at proxy");
  return NextResponse.redirect(new URL("/", request.url));
}
*/

export const proxy = auth;

export const config = {
  matcher: "/account/:path*",
};
