import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'fr', 'es']; // Your supported languages
const defaultLocale = 'en'; // Default language

function getLocale(request) {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function i18nMiddleware(request) {
  const { pathname } = request.nextUrl;
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}