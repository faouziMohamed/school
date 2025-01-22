import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: [
    {
      source: `/((?!assets|legal-assets|images|js|_next/static|_next|pdf|favicon.ico|sw.jss|icon|apple-icon|manifest).*)`,
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

// do not allow js, css, map files, and other assets to be prefetched
const matcherRegex = new RegExp('^(?!/.*(?:map|legal-assets|js|icon|robot)).*');

const corsOptions = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS',
  'Access-Control-Allow-Headers':
    'Accept,Authorization,Cache-Control,Content-Type,DNT,Expires,If-Modified-Since,Pragma,Range,User-Agent,X-Requested-With',
  'Access-Control-Expose-Headers':
    'Cache-Control,Content-Language,Content-Length,Content-Type,Content-Range,Expires,Last-Modified,Pragma',
};

export default withAuth(middleware, {
  callbacks: {
    authorized: () => {
      return true;
    },
  },
});

async function middleware(req) {
  // const reqLogger = new RequestLogger(logger, req);
  const isMiddlewareAllowed = matcherRegex.test(req.nextUrl.pathname);

  if (!isMiddlewareAllowed) {
    return NextResponse.next();
  }

  // TODO: Check the origin from the request

  // Handle preflighted requests
  const isPreflight = req.method === 'OPTIONS';
  if (isPreflight) {
    const preflightHeaders = {
      'Access-Control-Max-Age': '1728000',
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Length': '0',
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Redirect to `login` page if not logged in yet
  const token = req.nextauth.token;
  const shouldSigning = forceToLoginOnProtectedRoutes(req, token);
  if (shouldSigning) return shouldSigning();

  // redirect to the home page if the user is logged in and tries to access the login/signup page
  if (IsAuthPageAndisLoggedIn(req, token)) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  // Handle simple requests
  const response = NextResponse.next();
  for (const [key, value] of Object.entries(corsOptions)) {
    response.headers.set(key, value);
  }
  return response;
}

export function forceToLoginOnProtectedRoutes(req, token) {
  const now = new Date();
  if (
    (!token || new Date(token.expiry).getTime() < now.getTime()) &&
    !['/login', '/register'].includes(req.nextUrl.pathname)
  ) {
    console.log(`   => Path '${req.nextUrl.pathname}' is protected`);
    const nextQueryParams = req.nextUrl.searchParams;
    const nextQuery = new URLSearchParams({
      next: `${req.nextUrl.pathname}${nextQueryParams.toString() ? `?${nextQueryParams}` : ''}`,
    });
    const redirectUrl = new URL(`/login?${nextQuery}`, req.url);
    console.log(`   => Redirecting to '${redirectUrl}'`);
    return () => NextResponse.redirect(redirectUrl);
  }
}

function IsAuthPageAndisLoggedIn(req, token) {
  return (
    (req.nextUrl.pathname.startsWith(`/login`) ||
      req.nextUrl.pathname.startsWith(`/register`)) &&
    token
  );
}
