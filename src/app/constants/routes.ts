export const ROUTES = {
  home: "/",
  auth: {

    /* AUTH */
    signUp: "/sign-up",
    signIn: "/sign-in",
    logout: "/logout",

    /* OAUTH */
    oauthCallback: "/oauth-callback",

    /* CONFIRM ACCOUNT */
    confirmAccount: "/confirm-account",

    /* RESET  PASSWORD */
    resetPassword: "/reset-password",
  },

  application: {
    list: "/applications",
    create: "/applications/create",
  },
} as const ;
