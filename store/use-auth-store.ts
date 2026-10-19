import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Role } from "@/types";
import { SEED_USERS } from "@/data/seed";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  switchRole: (role: Role) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: SEED_USERS[0], // Defaults to Admin for immediate review
      isAuthenticated: true,
      login: (email: string, pass: string) => {
        const cleanEmail = email.trim().toLowerCase();
        if (cleanEmail === "admin@showroom.com" && pass === "admin123") {
          set({ user: SEED_USERS[0], isAuthenticated: true });
          return { success: true };
        }
        if (cleanEmail === "staff@showroom.com" && pass === "staff123") {
          set({ user: SEED_USERS[1], isAuthenticated: true });
          return { success: true };
        }
        return { success: false, error: "Invalid email or password. Please use the demo credentials below." };
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      switchRole: (role: Role) => {
        const target = SEED_USERS.find((u) => u.role === role) || SEED_USERS[0];
        set({ user: target, isAuthenticated: true });
      },
    }),
    {
      name: "apexmoto_auth_storage",
    }
  )
);
