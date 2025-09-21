import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add the paths that should be protected
const protectedRoutes = ['/board', '/settings', '/wallet', '/payouts', '/dashboard', '/messages'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebaseAuthToken');
  const { pathname } = request.nextUrl;

  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
