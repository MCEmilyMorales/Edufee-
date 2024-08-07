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
        logo: null,
        banner: null
      }),
    });

    if (!response.ok) {
      throw new Error('Error en el registro');
    }
    const data = await response.json();
    const institutionId = data.institutionResponse.id;
    return institutionId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const uploadLogoBanner = async (formDataInstitute: FormDataInstitute, institutionId: string) => {
  const formData = new FormData();

  if (formDataInstitute.logo) {
    formData.append('logo', formDataInstitute.logo);
  }
  if (formDataInstitute.banner) {
    formData.append('banner', formDataInstitute.banner);
  }

  try {
    const response = await fetch(`${apiUrl}/files/uploadInstitutionImages/${institutionId}`, {
      method: 'POST',
      body: formData
    })
    const data = await response.json();
    console.log("Institution images uploaded successfully", data);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

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
