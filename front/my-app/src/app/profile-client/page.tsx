'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';


export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(user)
  return (
      user && (
          <div className='w-96 text-black border border-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <img src={user.picture!} alt="" />
          </div>
      )
  );
}