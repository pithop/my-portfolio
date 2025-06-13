import { NextResponse } from 'next/server';
import { i18nMiddleware } from './i18n-middleware';
export function middleware(request) {
    const i18nResponse = i18nMiddleware(request);
  if (i18nResponse) {
    return i18nResponse;
  }
    const response = NextResponse.next();
    
    if (process.env.NODE_ENV === 'development') {
        response.headers.set(
            'Content-Security-Policy',
            "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data: blob:; " +
            "font-src 'self' data:; " +
            "connect-src 'self' ws: https://api.github.com https://gitlab.com http://34.29.82.146:11434 https://formspree.io;"
        );
    } else {
        response.headers.set(
            'Content-Security-Policy',
            "default-src 'self'; " +
            "script-src 'self' https://va.vercel-scripts.com; " +
            "style-src 'self'; " +
            "img-src 'self'; " +
            "font-src 'self'; " +
            "connect-src 'self' https://api.github.com https://gitlab.com https://formspree.io;"
        );
    }

    return response;
}

export const config = {
    matcher: '/:path*',
};