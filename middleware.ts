import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // xall.in domain → rewrite to /xall routes
  if (hostname.includes('xall.in')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/xall', request.url));
    }
    if (pathname === '/deck') {
      return NextResponse.rewrite(new URL('/xall/deck', request.url));
    }
    if (pathname.startsWith('/api/xall') || pathname.startsWith('/xall')) {
      return NextResponse.next();
    }
    // Serve static files normally
    if (pathname.startsWith('/_next') || pathname.startsWith('/XALL-Pitch-Deck')) {
      return NextResponse.next();
    }
    // Redirect anything else on xall.in to root
    return NextResponse.redirect(new URL('/', request.url));
  }

  // xquit.in domain → protect /program and /day routes with auth
  if (pathname.startsWith('/program') || pathname.startsWith('/day/')) {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  // Block /xall routes from being accessed on xquit.in directly (allow on localhost for dev)
  if (pathname.startsWith('/xall') && !hostname.includes('localhost') && !hostname.includes('127.0.0.1')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
