
import type { User } from "@/types/entity";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthInterfaceProps {
  user: User;
  accessToken: string;
}

interface AuthStoreProps {
  accessToken: string | null;
  user: User | null;
  setUser: (user: User) => void;
  setPartialUser: (user: Partial<User>) => void;
  setAccessToken: (accessToken: string) => void;
  setAuth: (auth: AuthInterfaceProps) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setUser: (user: User) => set({ user }),
      setPartialUser: (user: Partial<User>) =>
        set((state) => ({ ...state, ...user })),
      setAccessToken: (accessToken: string) => set({ accessToken }),
      setAuth: (auth: AuthInterfaceProps) =>
        set({
          user: auth.user,
          accessToken: auth.accessToken,
        }),
      resetAuth: () =>
        set({
          user: null,
          accessToken: null,
        }),
    }),

    {
      name: "auth-storage",
    }
  )
);

