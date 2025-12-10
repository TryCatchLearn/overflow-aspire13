import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    if (req.auth) return NextResponse.next();

    const { nextUrl } = req;
    const callback = encodeURIComponent(nextUrl.pathname + nextUrl.search);

    return NextResponse.redirect(new URL(`/auth-gate?callbackUrl=${callback}`, nextUrl));
});

export const config = {
    matcher: [
        "/questions/ask",
        "/questions/:id/edit",
        "/session",
    ],
};