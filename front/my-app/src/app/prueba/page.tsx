'use client'
import React, { useEffect } from 'react'
import { InstitutionsData } from '@/store/institutionsData'

const Prueba = () => {
  const getInstitutions  = InstitutionsData((state) => state.getInstitutions);
  const institutions = InstitutionsData((state) => state.institutions);
  useEffect(() => {
    getInstitutions()
  }, [getInstitutions])

  console.log("institutions", institutions)

  return (
    <div>
        
    </div>
  )
}

export default Prueba