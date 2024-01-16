import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextFetchEvent } from 'next/server';

const withAuthMiddleware = withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },
});

export default function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
  if (req.nextUrl.pathname !== '/') {
    return withAuthMiddleware(req, event);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|auth/signin).*)'],
};
