import { NextResponse } from "next/server";
const protectedRoutes = ['/']
const publicRoutes = ['/signin', '/signup']
export default async function middleware(req, res) {
  // Skip static files (anything under _next/static/ or similar)
  const path = req.nextUrl.pathname
  if (path.startsWith('/_next/static') || path.endsWith('.map')) {
    return NextResponse.next();
  }
  const token = req.cookies.get('token')
  console.log("middleware token", token);
  if (!token && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  } else {
    return NextResponse.next()
  }
}