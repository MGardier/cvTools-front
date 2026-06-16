import "./app.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { queryClient } from "./lib/tanstack-query/query-client";
import { ToastContainer } from "react-toastify";
import { HomePage } from "@/app/router/home-page";

import { ROUTES } from "@/app/constants/routes";
import { Layout } from "@/app/router/layout/layout";
import { PrivateRoutes } from "@/app/router/private-routes";
import { RouteLoader } from "@/shared/components/route-loader";
import { ChunkErrorFallback } from "@/shared/components/chunk-error-fallback";
import { lazyNamed } from "@/shared/utils/lazy";

const SignIn = lazyNamed(() => import("./modules/auth/sign-in/sign-in"), "SignIn");
const SignUp = lazyNamed(() => import("./modules/auth/sign-up/sign-up"), "SignUp");
const ConfirmAccount = lazyNamed(
  () => import("./modules/auth/confirm-account/confirm-account"),
  "ConfirmAccount",
);
const ResetPassword = lazyNamed(
  () => import("./modules/auth/reset-password/reset-password"),
  "ResetPassword",
);
const Logout = lazyNamed(() => import("./modules/auth/logout/logout"), "Logout");
const OauthCallback = lazyNamed(
  () => import("./modules/auth/oauth/oauth-callback"),
  "OauthCallback",
);
const AdminRegister = lazyNamed(
  () => import("./modules/auth/admin/admin-register/admin-register"),
  "AdminRegister",
);
const ApplicationList = lazyNamed(
  () => import("@/modules/application/list/application-list"),
  "ApplicationList",
);
const CreateApplication = lazyNamed(
  () => import("@/modules/application/create/create-application"),
  "CreateApplication",
);
const ApplicationDetail = lazyNamed(
  () => import("@/modules/application/detail/application-detail"),
  "ApplicationDetail",
);
const EditApplication = lazyNamed(
  () => import("@/modules/application/edit/edit-application"),
  "EditApplication",
);
const OfferList = lazyNamed(
  () => import("@/modules/offer/list/offer-list"),
  "OfferList",
);
const TestPage = lazyNamed(() => import("@/modules/test/test-page"), "TestPage");

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <ErrorBoundary FallbackComponent={ChunkErrorFallback}>
            <Suspense fallback={<RouteLoader />}>
              <Routes>
                {/* HOME */}
                <Route key="home" path={ROUTES.home} element={<HomePage />} />

                {/* TEST (CV mockup) */}
                <Route key="test" path={ROUTES.test.root} element={<TestPage />} />
                <Route
                  key="testSection"
                  path={ROUTES.test.sectionPattern}
                  element={<TestPage />}
                />

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

                {/* ADMIN REGISTER */}
                <Route
                  key="adminRegister"
                  path={ROUTES.auth.adminRegister}
                  element={<AdminRegister />}
                />

                {/* LOGOUT + PROTECTED ROUTES */}
                <Route element={<PrivateRoutes />}>
                  <Route
                    key="logout"
                    path={ROUTES.auth.logout}
                    element={<Logout />}
                  />

                  {/************************* APPLICATION *************************************** */}

                  {/* APPLICATION LIST */}
                  <Route
                    key="applicationList"
                    path={ROUTES.application.list}
                    element={<ApplicationList />}
                  />

                  {/* APPLICATION CREATE */}
                  <Route
                    key="applicationCreate"
                    path={ROUTES.application.create}
                    element={<CreateApplication />}
                  />

                  {/* APPLICATION EDIT */}
                  <Route
                    key="applicationEdit"
                    path={ROUTES.application.editPattern}
                    element={<EditApplication />}
                  />

                  {/* APPLICATION DETAIL */}
                  <Route
                    key="applicationDetail"
                    path={ROUTES.application.detailPattern}
                    element={<ApplicationDetail />}
                  />

                  {/************************* OFFER *************************************** */}

                  {/* OFFER LIST */}
                  <Route
                    key="offerList"
                    path={ROUTES.offer.list}
                    element={<OfferList />}
                  />
                </Route>

                {/* OAUTH CALLBACK */}
                <Route
                  key="oauthCallback"
                  path={ROUTES.auth.oauthCallback}
                  element={<OauthCallback />}
                />
              </Routes>
            </Suspense>
          </ErrorBoundary>
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
