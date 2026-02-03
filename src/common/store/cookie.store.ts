
import { create } from "zustand";

interface CookieProps{
  getRefreshToken: () => string | null;
  setRefreshToken: (token: string) => void;
  removeRefreshToken: () => void;
}

export const useCookieStore = create<CookieProps>(() => ({
  getRefreshToken: () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; refreshToken=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  },

  setRefreshToken: (token: string) => {
    const maxAge =import.meta.env.REFRESH_TOKEN_EXPIRATION; 
    document.cookie = `refreshToken=${encodeURIComponent(token)};path=/;secure;samesite=strict;max-age=${maxAge}`;
  },

  removeRefreshToken: () => {
    document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
  }
}));