import "./app.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { queryClient } from "./lib/tanstack-query/query-client";
import { ToastContainer } from "react-toastify";
import { HomePage } from "@/app/router/home-page";

import { ROUTES } from "@/app/constants/routes";
import { SignIn } from "./modules/auth/sign-in/sign-in";
import { SignUp } from "./modules/auth/sign-up/sign-up";
import { ConfirmAccount } from "./modules/auth/confirm-account/confirm-account";
import { ResetPassword } from "./modules/auth/reset-password/reset-password";
import { Logout } from "./modules/auth/logout/logout";
import { GetOauthSession } from "./modules/auth/oauth/get-oauth-session";
import { Layout } from "@/app/layout/layout";
import { PrivateRoutes } from "@/app/router/private-routes";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* HOME */}
            <Route key="home" path={ROUTES.home} element={<HomePage />} />

            {/************************* AUTH ******************************************* */}
            {/* SIGNUP */}
            <Route
              key="signUp"
              path={ROUTES.auth.signUp}
              element={<SignUp />}
            />

            {/* CONFIRM ACCOUNT */}
            <Route
              key="confirmAccount"
              path={ROUTES.auth.confirmAccount}
              element={<ConfirmAccount />}
            />

            {/*  RESET PASSWORD */}
            <Route
              key="resetPassword"
              path={ROUTES.auth.resetPassword}
              element={<ResetPassword />}
            />

            {/* SIGNIN */}
            <Route
              key="signIn"
              path={ROUTES.auth.signIn}
              element={<SignIn />}
            />

            {/* LOGOUT */}
            <Route element={<PrivateRoutes />}>
              <Route
                key="logout"
                path={ROUTES.auth.logout}
                element={<Logout />}
              />
            </Route>

            {/* GET OAUTH  SESSION */}
            <Route
              key="getOauthSession"
              path={ROUTES.auth.getOauthSession}
              element={<GetOauthSession />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <button onClick={() => setIsOpen(!isOpen)}>{`${
        isOpen ? "Close" : "Open"
      } Query Tanstack devtools`}</button>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
    </QueryClientProvider>
  );
}

export default App;
