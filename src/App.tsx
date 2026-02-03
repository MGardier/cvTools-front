import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { queryClient } from "./lib/tanstack-query/query-client";
import { ToastContainer } from "react-toastify";
import { HomePage } from "./common/router/home-page";

import { Header } from "./common/components/header/header";
import { ROUTES } from "./common/data/routes";
import { SignIn } from "./modules/Auth/SignIn/sign-in";
import { SignUp } from "./modules/Auth/SignUp/sign-up";
import { ConfirmAccount } from "./modules/Auth/ConfirmAccount/confirm-account";
import { ResetPassword } from "./modules/Auth/ResetPassword/reset-password";
import { Logout } from "./modules/Auth/Logout/logout";
import { GetOauthSession } from "./modules/Auth/Oauth/get-oauth-session";

//TODO: Idée ajout un how it works pour montrer l'utilisation de la recherche, candidatures et relances
//TODO: Idée ajout Avoir une recherche qui permettent de regrouper les jobs de plusieurs plateformes
//TODO : Avoir un tableau pour gérer ses candidatures et relances.

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <main className=" w-full  relative flex flex-col min-h-screen bg-white">
        <Header />
        <ToastContainer />
        <BrowserRouter>
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
            <Route
              key="logout"
              path={ROUTES.auth.logout}
              element={<Logout />}
            />

            {/* GET OAUTH  SESSION */}
            <Route
              key="getOauthSession"
              path={ROUTES.auth.getOauthSession}
              element={<GetOauthSession />}
            />
          </Routes>
        </BrowserRouter>
      </main>
      <button onClick={() => setIsOpen(!isOpen)}>{`${
        isOpen ? "Close" : "Open"
      } Query Tanstack devtools`}</button>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
    </QueryClientProvider>
  );
}

export default App;
