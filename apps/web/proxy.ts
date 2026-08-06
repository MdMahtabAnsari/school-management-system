import { NextRequest, NextResponse } from "next/server";
import { authClient } from "@workspace/auth/client/nextjs-client"

export async function proxy(request: NextRequest) {
    const session = await authClient.getSession()

    if(!session) {
        return NextResponse.redirect(new URL("auth/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Specify the routes the middleware applies to
};