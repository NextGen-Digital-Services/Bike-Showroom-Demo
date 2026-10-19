import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  theme: "light" | "dark";
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  isCommandPaletteOpen: boolean;
  isShortcutsOpen: boolean;
  isTourActive: boolean;
  tourStep: number;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setShortcutsOpen: (open: boolean) => void;
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  endTour: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: "dark",
      isSidebarCollapsed: false,
      isMobileMenuOpen: false,
      isCommandPaletteOpen: false,
      isShortcutsOpen: false,
      isTourActive: false,
      tourStep: 0,
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === "dark" ? "light" : "dark";
          if (typeof document !== "undefined") {
            if (next === "dark") {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }
          return { theme: next };
        }),
      setTheme: (theme) => {
        if (typeof document !== "undefined") {
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
        set({ theme });
      },
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
      setShortcutsOpen: (open) => set({ isShortcutsOpen: open }),
      startTour: () => set({ isTourActive: true, tourStep: 0 }),
      nextTourStep: () => set((state) => ({ tourStep: state.tourStep + 1 })),
      prevTourStep: () => set((state) => ({ tourStep: Math.max(0, state.tourStep - 1) })),
      endTour: () => set({ isTourActive: false, tourStep: 0 }),
    }),
    {
      name: "apexmoto_ui_storage",
    }
  )
);
