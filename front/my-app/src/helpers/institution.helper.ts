export const registerInstitution = async (formData: FormData) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error en el registro');
      }
  
      return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
  };