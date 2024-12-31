import { lazy } from "react";

const NotFoundPage = lazy(() => import("./NotFoundPage"));
const UnAuthPage = lazy(() => import("./UnAuthPage"));

export { NotFoundPage, UnAuthPage };
