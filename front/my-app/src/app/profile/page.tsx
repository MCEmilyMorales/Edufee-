'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';



export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  console.log(useUser())
  
  useEffect(() => {
    if(!user){
      swal("Error", "Debes iniciar sesión para ver tu perfil", "error");
      router.push('/api/auth/login')
    }
  }, [user,router])

  if (isLoading) return <div className='text-black text-3xl absolute top-1/2 left-1/2 translate-x-0 -translate-y-1/2'>Loading...</div>;
  if (error) return <div className='text-black text-3xl absolute top-1/2 left-1/2 translate-x-0 -translate-y-1/2'>{error.message}</div>;

  return (
    user && (
      <div className='text-black flex justify-evenly pt-24 pl-20'>
        <div className='w-fit rounded-full'>
          <Image 
          className='rounded-full'
          src={user.picture!} 
          alt={user.nickname!} 
          width={100} 
          height={100} />
        </div>
        <div className='flex justify-center gap-16 text-center'>
          <p>{user.nickname}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>
    )
  );
}