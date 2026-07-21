import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useClientAuthStore = create(
  persist(
    (set) => ({
      userData: null,
      token: null,
      setUserData: (userData) => set({ userData }),
      setToken: (token) => set({ token }),
      reset: () => set({ userData: null, token: null }),
    }),
    {
      name: "clientAuth",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
