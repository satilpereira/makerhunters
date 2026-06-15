import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth.config';

// Paths that require onboarding if user.status === 'pending'
// const ONBOARDING_PATH = '/app/onboarding';

export async function proxy(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);
  const { pathname } = req.nextUrl;

  const session = await auth();
  const user: any = (session as any)?.user;

  // If not signed in, do signin
  if (!user && pathname !== '/auth/signin') {
    const url = new URL('/auth/signin', req.url);
    url.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  // const pending = user.status === 'pending';

  // TODO: implement onboarding
  // // Pending users: force onboarding for any /app route except onboarding itself
  // if (pending && pathname !== ONBOARDING_PATH) {
  //   const url = new URL(ONBOARDING_PATH, req.url);
  //   console.log("Redirecting to onboarding:", url);
  //   return NextResponse.redirect(url);
  // }

  // // Active users: block visiting onboarding
  // if (!pending && pathname === ONBOARDING_PATH) {
  //   const url = new URL('/app', req.url);
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}