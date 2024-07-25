import {create} from "zustand";
import { persist } from "zustand/middleware";


type Action = {
  setToken: (token: string) => void;
};

type State = {
  token: string;
};

export const tokenStore = create(
  persist<State & Action>(
    (set) => ({
      token: "",
      setToken: (token: string) =>
        set((state) => ({ ...state, token })),
    }),
    {
      name: "user",
    }
  )
);