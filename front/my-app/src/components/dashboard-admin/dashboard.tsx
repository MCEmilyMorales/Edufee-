import Link from 'next/link'
import React from 'react'

const DashboardAdmin = () => {
    return (
        <div className='pt-16 flex'>
            <div>
                <div className="ml-48 mt-4">
                    <input
                        value={""}

                        className="px-4 py-1 border-2 w-64 border-black rounded-md focus:outline-none"
                        type="search"
                        placeholder={"Buscar..."}
                    />
                </div>
                <div className='w-full border ml-48 mt-4'>
                    <div className='grid grid-cols-4 gap-40'>
                        <div className='grid grid-flow-row '>
                            <div className='text-center'>
                                <h1>Nombre</h1>
                            </div>
                            <div className='grid grid-flow-row mt-6'>
                                <p className='border p-2'>Alumno</p>
                                <p className='border p-2'>Alumno</p>
                                <p className='border p-2'>Alumno</p>
                                <p className='border p-2'>Alumno</p>
                                <p className='border p-2'>Alumno</p>
                            </div>
                        </div>
                        <div className='grid grid-flow-row '>
                            <div className='text-center'>
                                <h1>Institucion</h1>
                            </div>
                            <div className='grid grid-flow-row mt-6'>
                                <p className='border p-2'>Institucion a</p>
                                <p className='border p-2'>Institucion a</p>
                                <p className='border p-2'>Institucion a</p>
                                <p className='border p-2'>Institucion a</p>
                                <p className='border p-2'>Institucion a</p>
                            </div>
                        </div>
                        <div className='grid grid-flow-row '>
                            <div className='text-center'>
                                <h1>Estado</h1>
                            </div>
                            <div className='grid grid-flow-row mt-6'>
                                <p className='border p-2'>Pendiente</p>
                                <p className='border p-2'>Pendiente</p>
                                <p className='border p-2'>Pendiente</p>
                                <p className='border p-2'>Pendiente</p>
                                <p className='border p-2'>Pendiente</p>
                            </div>
                        </div>
                        <div className='grid grid-flow-row '>
                            <div className='text-center'>
                                <h1>Ultimo pago</h1>
                            </div>
                            <div className='grid grid-flow-row mt-6'>
                                <p className='border p-2'>Fecha:</p>
                                <p className='border p-2'>Fecha:</p>
                                <p className='border p-2'>Fecha:</p>
                                <p className='border p-2'>Fecha:</p>
                                <p className='border p-2'>Fecha:</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className='h-full fixed pl-2 w-36 pt-14'>
                <ul className='flex flex-col gap-14 '>
                    <li className='font-bold text-xl  '>
                        <Link className='border py-2 rounded-xl w-full block text-center' href="/dashboard-admin/dashboard">Alumnos</Link>
                    </li>
                    <li className='font-bold text-xl w-full'>
                        <Link className='border py-2 rounded-xl text-center w-full block' href="/dashboard-admin/estadisticas">Instituciones</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default DashboardAdmin