
import type { IUser } from "@/shared/types/entity";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthInterfaceProps {
  user: IUser;
  accessToken: string;
}

interface IAuthStoreProps {
  accessToken: string | null;
  user: IUser | null;
  setUser: (user: IUser) => void;
  setPartialUser: (user: Partial<IUser>) => void;
  setAccessToken: (accessToken: string) => void;
  setAuth: (auth: IAuthInterfaceProps) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<IAuthStoreProps>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setUser: (user: IUser) => set({ user }),
      setPartialUser: (user: Partial<IUser>) =>
        set((state) => ({ ...state, ...user })),
      setAccessToken: (accessToken: string) => set({ accessToken }),
      setAuth: (auth: IAuthInterfaceProps) =>
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
