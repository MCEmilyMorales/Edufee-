'use client';
import React, { useEffect } from 'react'
import Image from 'next/image'
import BotonLink from '../botonLink/boton'

const Navbar = () => {
  const [token, setToken] = React.useState<string | null>("");

  useEffect(() => {
    setToken("hola");
  }, [token]);

  return (
    <div className='h-16 border bg-white'>
      {
        token ? (
          <nav className='h-full flex items-center justify-between'>
            <div className='ml-14'>
              <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={50} className='text-white' />
            </div>
            <ul className='flex gap-8 pr-14 text-black'>
              <BotonLink link="/instituciones" text="Instituciones" />
              <BotonLink link="/alumnos" text="Alumnos" />
              <BotonLink link="/login" text="Cerrar sesion" />
            </ul>
          </nav>
        ) : (
          <nav className='h-full flex items-center justify-between'>
            <div className='ml-14'>
              <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={50} className='text-white' />
            </div>
            <ul className='flex gap-8 pr-14 text-black'>
              <BotonLink link="/instituciones" text="Instituciones" />
              <BotonLink link="/alumnos" text="Alumnos" />
              <BotonLink link="/login" text="Iniciar Sesion" />
            </ul>
          </nav>
        )
      }
    </div>
  )
}

export default Navbar