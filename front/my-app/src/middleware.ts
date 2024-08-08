import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const jwtpassword = process.env.JWT_SECRET || 'secret';

export async function middleware(req: NextRequest) {
    console.log('entra aqui')
  const token = req.cookies.get('authToken') as string | undefined;

  if (!token) {
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  try {
    const decodedToken: any = jwt.verify(token, jwtpassword);
    if (decodedToken.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard-admin'],
};
