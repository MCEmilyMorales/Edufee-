import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const jwtpassword = process.env.JWT_SECRET || 'secret';

export async function middleware(req: NextRequest) {
  const cook = req.cookies.get('authToken');
  const token = cook?.value as string; 

  if (!token) {
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    if (payload.roles.includes('student') || payload.roles.includes('institution')) {  
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
