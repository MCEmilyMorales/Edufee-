import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const jwtpassword = process.env.JWT_SECRET || 'secret';

export async function middleware(req: NextRequest) {
  const cook = req.cookies.get('authToken');
  const token = cook?.value as string; 
  console.log("esto es el token del middleware", token)

  if (!token) {
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  try {
    const decodedToken: any = jwt.verify(token!, jwtpassword);
    console.log("esto llega del decodedToken", decodedToken)
    if (decodedToken.role !== 'admin') {
      return NextResponse.redirect(new URL('/verify-user', req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard-admin'],
};
