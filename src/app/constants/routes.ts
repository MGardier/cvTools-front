export const ROUTES = {
  home: "/",
  auth: {

    /* AUTH */
    signUp: "/sign-up",
    signIn: "/sign-in",
    logout: "/logout",

    /* OAUTH */
    oauthCallback: "/oauth-callback",

    /* ADMIN REGISTER */
    adminRegister: "/admin-register",

    /* CONFIRM ACCOUNT */
    confirmAccount: "/confirm-account",

    /* RESET  PASSWORD */
    resetPassword: "/reset-password",
  },

  offer: {
    list: "/offers",
  },

  test: {
    root: "/test",
    section: (id: string) => `/test/${id}`,
    sectionPattern: "/test/:sectionId",
  },
} as const ;
