import { lazy } from "react";

const AuthLayout = lazy(() => import("./layout/AuthLayout"));
const LoginPage = lazy(() => import("./LoginPage"));
const SignupPage = lazy(() => import("./SignupPage"));

export { AuthLayout, LoginPage, SignupPage };
