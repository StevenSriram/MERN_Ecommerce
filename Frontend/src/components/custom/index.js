import { lazy } from "react";

const Authorization = lazy(() => import("./Authorization"));
const CommonForm = lazy(() => import("./CommonForm"));

export { Authorization, CommonForm };
