'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';
import { DataUser } from '@/store/userData';


export default function ProfileClient() {
  const getUser = DataUser((state) => state.getDataUser);
  const userData = DataUser((state) => state.userData);
  const { user, error, isLoading, } = useUser();
  const router = useRouter();

  useEffect(() => {
    getUser()
  }, [getUser])

  console.log(userData)

  // useEffect(() => {
  //   if (userData.name === undefined) {
  //     swal("Error", "Debes iniciar sesión para ver tu perfil", "error");
  //     // router.push('/api/auth/login')
  //   }
  // }, [userData])

  if (isLoading) return <div className='text-black text-3xl absolute top-1/2 left-1/2 translate-x-0 -translate-y-1/2'>Loading...</div>;
  
  if (error) return <div className='text-black text-3xl absolute top-1/2 left-1/2 translate-x-0 -translate-y-1/2'>{error.message}</div>;

  

  return (
    user && (
      <div className='text-black flex justify-evenly pt-24 pl-20'>
        <div className='w-fit rounded-full'>
          <Image
            className='rounded-full'
            src={userData.imgProfile ?? user.picture!}
            alt={userData.name + " " + userData.lastname}
            width={100}
            height={100} />
        </div>
        <div className='flex justify-center gap-16 text-center'>
          <p>{userData.name}</p>
          <p>{userData.lastname}</p>
          <p>{userData.email}</p>
          <p>{userData.dni}</p>
          <p>{userData.address}</p>
          <p>{userData.phone}</p>
        </div>
      </div>
    )
  );
}