import { create } from "zustand";

interface AuthStore {
  userRole: string | null;
  setUserRole: (role: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
      userRole: null,
      setUserRole: (role) => set({ userRole: role }),
}))