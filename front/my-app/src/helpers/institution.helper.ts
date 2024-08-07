import { FormDataInstitute } from "@/hooks/useFormInstitute";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const registerInstitution = async (formData: FormDataInstitute) => {
  try {
    const response = await fetch(`${apiUrl}/institution/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.nombreInstitucion,
        email: formData.email,
        accountNumber: formData.numeroCuenta,
        address: formData.direccion,
        phone: formData.telefono,
        logo: formData.logo.name,
        banner: formData.banner.name
      }),
    });

    if (!response.ok) {
      throw new Error('Error en el registro');
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getInstitutionsNames = async () => {
  try {
    const response = await fetch(`${apiUrl}/institution`);
    if (!response.ok) {
      throw new Error('Error al obtener las instituciones');
    }
    const institutions = await response.json();
    const institutionsNames = institutions.map((inst: { name: string }) => inst.name);
    return institutionsNames;
  } catch (error) {
    throw error;
  }
}
