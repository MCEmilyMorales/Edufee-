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
    <div className="h-screen pt-20 flex justify-center gap-12 pb-10 bg-gradient-radial from-[#e0f5f3] to-[#ffffff]">
      <form className="flex flex-col bg-white rounded-xl shadow-lg" >
        <h1 className="text-3xl text-black font-medium pt-4 px-4 pb-6">
          Cambiar foto de perfil
        </h1>
        <div className="flex flex-col p-5">
          <img src={userData.imgProfile!} alt="imagen" className="flex mx-auto w-36 h-36 rounded-full" />
          <label className="text-black text-lg pt-5">Cambiar imagen:</label>
          <input
            accept=".jpg,.jpeg,.png,.gif,.webp,.avif"
            placeholder='imagen'
            className="text-black  py-5"
            type="file"
          />
        </div>
        <button type="submit" className="mx-auto flex mt-10 w-fit h-fit px-4 py-2 rounded-xl bg-lightorangeinti text-black border-2 border-[#55A058] font-medium hover:scale-105 transition-all duration-300 ease-in-out">Guardar imagen</button>
      </form>
      <div className="border border-black "></div>
      <form className="w-[750px] rounded-xl shadow-lg bg-white p-3">
        <h1 className="text-3xl text-black font-medium p-3">Configuración de perfil</h1>
        <p className="text-black text-sm font-light px-3">Puedes cambiar tus datos personales</p>
        <div className="py-11">
          <div className="grid grid-cols-3 gap-4">
          <div className="p-3">
              <label className="text-black text-lg">Correo:</label>
              <input
                name="email"

                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder={user?.email!}
                type="email"
              />
              {/* <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.password}</p> */}
            </div>
            <div className="p-3">
              <label className="text-black text-lg">Contraseña actual:</label>
              <input
                name="oldPassword"

                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder="Contraseña"
                type="password"
              />
              {/* <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.password}</p> */}
            </div>
            <div className="p-3">
              <label className="text-black text-lg">Contraseña nueva:</label>
              <input
                name="password"

                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder="Contraseña"
                type="password"
              />
              {/* <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.password}</p> */}
            </div>
            <div className="p-3">
              <label className="text-black text-lg">Nombre :</label>
              <input
                name="name"

                className="h-9 text-black bg-gray-200/40 border-b rounded-t-lg border-black p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder={userData?.name || "Nombre"}
                type="text"
              />
              {/* <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.name}</p> */}
            </div>
            <div className="p-3">
              <label className="text-black text-lg">Dirección :</label>
              <input
                name="address"

                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder={userData?.address || "Dirección"}
                type="text"
              />
              {/* <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.address}</p> */}
            </div>
            <div className="p-3">
              <label className="text-black text-lg">Teléfono :</label>
              <input
                name="phone"


                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                placeholder={userData.phone || "Teléfono"}
                type="text"
              />
              {/* <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.phone}</p> */}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-20 -mt-4">
          <button type="submit" className="px-4 py-2 rounded-xl border-2 border-[#55A058] bg-lightorangeinti text-black font-medium hover:scale-105 transition-all duration-300 ease-in-out">Guardar cambios</button>
          <div className="px-4 py-2 rounded-xl border-2 border-red-500 bg-transparent text-black font-medium hover:scale-105 transition-all duration-300 ease-in- cursor-pointer">
            Cerrar mi cuenta
          </div>
        </div>
      </form>
    </div>
  )
}