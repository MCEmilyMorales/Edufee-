import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    login: handleLogin({
        returnTo: '/register',
    }),
    signup: handleLogin({
        authorizationParams: {
            screen_hint: 'signup',
        },
        returnTo: '/register',
    })

});