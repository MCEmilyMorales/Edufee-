import { create } from "zustand";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface InstiData{
    accountNumber?: string;
    address?: string;
    banner?: string;
    email?: string;
    id?: string;
    isActive?: boolean;
    logo?: string;
    name?: string;
    phone?: string;
    role?: string;
}

interface InstitucionState {
    institutions: InstiData[];
    getInstitutions: () => Promise<void>;
    updateInstitutionStatus: (id: string, status: boolean) => Promise<void>;
}


export const InstitutionsData = create<InstitucionState>((set) => ({
    institutions: [],
    async getInstitutions() {
        try {
            const response = await fetch(`${apiUrl}/institution`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log("esta son las instis",   data)
            set({ institutions: data });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    },
    updateInstitutionStatus: async (id: string, status: boolean) => {
        const store = localStorage.getItem("user");
        if (!store) {
            throw new Error("No hay token");
        }
        const dataToken = JSON.parse(store);
        const token = dataToken.state?.token;
        try {
            const response = await fetch(`${apiUrl}/institution/approve/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer: ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    },


}))