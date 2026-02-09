
import type { IUserResponse } from "@/shared/types/entity";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthInterfaceProps {
  user: IUserResponse;
  accessToken: string;
}

interface IAuthStoreProps {
  accessToken: string | null;
  user: IUserResponse | null;
  setUser: (user: IUserResponse) => void;
  setPartialUser: (user: Partial<IUserResponse>) => void;
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
      setUser: (user: IUserResponse) => set({ user }),
      setPartialUser: (user: Partial<IUserResponse>) =>
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
