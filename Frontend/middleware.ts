import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware runs only for page/data requests.
 * Static assets (_next/static, _next/image, favicon, api, public files) are
 * excluded via matcher so they are never delayed or modified.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Exclude _next (all internals: static, image, chunks), api, favicon,
     * and static file extensions. Middleware must never run for these.
     */
    '/((?!_next|api/|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)',
  ],
}
