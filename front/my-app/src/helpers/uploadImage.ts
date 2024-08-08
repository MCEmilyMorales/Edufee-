const apiUrl = process.env.NEXT_PUBLIC_API_URL 

export const uploadImage = async (file: File, id: string) => {
    try {
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }

        const response = await fetch(`${apiUrl}/files/uploadUserImage/${id}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error al subir la imagen');
        }

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
