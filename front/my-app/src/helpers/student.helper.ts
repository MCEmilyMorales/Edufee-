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
          imgProfile: null
        })
      });
      if (!response.ok) {
        console.log(response)
        throw new Error('Error en el registro');
      }
      const data = await response.json();
      const studentId = data.data.id;
      return studentId;
    } catch (error: any) {
        throw new Error(error.message);
    }
  };
  export const uploadStudentImageProfile = async (studentId: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file as File)
    
    try {
      const response = await fetch(`${apiUrl}/files/uploadUserImage/${studentId}`,{
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }
      const data = await response.json();
      console.log("Student profile image uploaded successfully", data);
    } catch(error: any) {
      throw new Error(error.message);
    }
  }