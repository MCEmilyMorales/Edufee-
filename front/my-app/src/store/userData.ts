import { create } from "zustand";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


interface institutionData {
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

interface Data {
  userId?: string;
  name?: string;
  lastname?: string;
  email?: string;
  dni?: number;
  address?: string;
  phone?: string;
  status?: string;
  imgProfile?: string | null;
  role?: string;
  institution?: institutionData;
}
interface AllData {
  allUser: {
    id?: string;
    name?: string;
    lastname?: string;
    email?: string;
    dni?: string;
    address?: string;
    phone?: string;
    imgProfile?: string | null;
    role?: string;
    status?: string;
  }[];
}


interface UserState {
  userData: Data[];
  AllData: AllData[]
  getDataUser: () => Promise<void>;
  getAllData: () => Promise<void>;
}

export const DataUser = create<UserState>((set) => ({
  userData: [],
  AllData: [],
  async getDataUser() {
    try {
      const store = localStorage.getItem("user");
      if (!store) {
        throw new Error("No hay token");
      }
      const dataToken = JSON.parse(store);
      const token = dataToken.state?.token;
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log(payload.id);
      console.log("llega esto del token", token);

      const response = await fetch(
        `${apiUrl}/users/${payload.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      set({ userData: Array.isArray(data) ? data : [data] });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },
  getAllData: async () => {
    try {
      const store = localStorage.getItem("user");
      if (!store) {
        throw new Error("No hay token");
      }
      const dataToken = JSON.parse(store);
      const token = dataToken.state?.token;
      const response = await fetch(`${apiUrl}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      set({ AllData: Array.isArray(data) ? data : [data] });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
}));
