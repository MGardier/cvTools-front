export const EOauthProvider = {
  GOOGLE: "google",
  GITHUB: "github",
} as const;
export type TOauthProvider = (typeof EOauthProvider)[keyof typeof EOauthProvider];

export const startOauthFlow = (provider: TOauthProvider): void => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}auth/${provider}`;
};
