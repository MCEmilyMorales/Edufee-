import { create } from "zustand";


interface Data {
    name?: string,
    lastname?: string,
    email?: string,
    dni?: number,
    address?: string,
    phone?: string,
    imgProfile?: string | null,
    role?: string,
}

interface UserState {
    userData: Data;
    getDataUser: () => Promise<void>;
}

export const DataUser = create<UserState>((set) => ({
    userData: {},
    async getDataUser() {
        try {
            const store = localStorage.getItem('user');
            if (!store) {
                throw new Error('No hay token');
            }
            const dataToken = JSON.parse(store);
            const token = dataToken.state?.token
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log(payload.id)
            console.log("llega esto del token",token)

            const response = await fetch(`http://localhost:3005/users/${payload.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer: ${token}`
                    },
                }
            );
            const data = await response.json();
            set({ userData: data });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    },
}))