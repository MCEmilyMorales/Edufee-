const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const EditProfile = async (user: any, id: string) => {
    try {
        const response = await fetch(`${apiUrl}/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}