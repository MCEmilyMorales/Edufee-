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
        accountNumber: formData.numeroCuenta,
        address: formData.direccion,
        phone: formData.telefono,
        logo: formData.logo,
        email: formData.email,
        banner: formData.banner
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