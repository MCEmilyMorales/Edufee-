'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const LayerAuth = () => {
    const router = useRouter()
    const { user, isLoading, error } = useUser()

    useEffect(() => {
        console.log(" user data: ", user)
        if (user) {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const checkUser = async () => {
                try {
                    const response = await fetch(`${API_URL}/auth/signin`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: user.email
                        })
                    })
                    const data = await response.json();

                    if (response.ok) {
                        console.log(data)
                        const payload = JSON.parse(atob(data.token.split('.')[1]));
                        
                        if (payload.roles.includes('student')) {
                            router.push('/student/dashboard');
                        } else if (payload.roles.includes('institution')) {
                            router.push('/institution/dashboard');
                        } else if (payload.roles.includes('admin')) {
                            router.push('/dashboard-admin');
                        } else {
                            console.error('Error en la autenticación:', data.message);
                        }
                    }
                } catch (error) {
                    console.error('Error verificando usuario:', error);
                    router.push('/select');
                }
            }

            checkUser()
        }

    },[user, isLoading, error, router])
    return (
        <div className='h-screen grid content-center '>
           <h2 className="text-xl text-center text-blue-700">Cargando...</h2>
        </div>
    )
}


export default LayerAuth;
