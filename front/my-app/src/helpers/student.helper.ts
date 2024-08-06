import { FormDataStudent } from "@/hooks/useFormStudent";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const registerStudent = async (formData: FormDataStudent) => {
    try {
      const response = await fetch(`${apiUrl}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nombre,
          lastname: formData.apellido,
          dni: formData.dni,
          email: formData.email,
          institutionName: formData.institucion,
          phone: formData.telefono,
          address: formData.direccion,
          imgProfile: formData.fotoPerfil.name
        })
      });
      if (!response.ok) {
        console.log(response)
        throw new Error('Error en el registro');
      }
      return await response.json()
    } catch (error: any) {
        throw new Error(error.message);
    }
  };