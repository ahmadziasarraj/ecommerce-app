import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

const protectedRoutes = [
  '/dashboard',
];

export default async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET});

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
    if (!token && isProtected) {      
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
    return NextResponse.next();
}