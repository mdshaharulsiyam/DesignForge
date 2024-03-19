import { auth } from '@/auth/auth'
import { Session } from 'next-auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'



export async function middleware(request: NextRequest) {
  const session: Session | null = await auth();
  if ((!request.nextUrl.pathname.startsWith('/api/auth') || request.nextUrl.pathname !== '/') && !session?.user) {

    return NextResponse.rewrite(new URL('/api/auth/signin', request.url))
  }
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}