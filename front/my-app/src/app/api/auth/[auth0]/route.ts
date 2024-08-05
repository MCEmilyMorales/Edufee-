import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const GET = handleAuth({
  login: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const url = req.url ? new URL(req.url) : undefined;
        const type = url?.searchParams.get('type');

      if (!type) {
        return NextResponse.json({ error: 'Type is not defined' }, { status: 400 });
      }

      const returnTo = type === 'student' ? '/register/student' : '/register/institution';

      return await handleLogin(req, res, {
        returnTo,
        authorizationParams: {
          screen_hint: 'signup'
        }
      });
    } catch (error) {
      console.error('Error in login handler:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
});
