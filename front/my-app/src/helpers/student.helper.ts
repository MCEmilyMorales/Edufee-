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
          nombre: formData.nombre,
          apellido: formData.apellido,
          dni: formData.dni,
          rol: "",
          email: formData.email,
          imgProfile: formData.fotoPerfil.name
        })
      });
      if (!response.ok) {
        throw new Error('Error en el registro');
      }
      return await response.json()
    } catch (error: any) {
        throw new Error(error.message);
    }
  };