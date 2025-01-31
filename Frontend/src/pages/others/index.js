import { lazy } from "react";

const NotFoundPage = lazy(() => import("./NotFoundPage"));
const UnAuthPage = lazy(() => import("./UnAuthPage"));

const PaymentReturnPage = lazy(() => import("./PaymentReturnPage"));

export { NotFoundPage, UnAuthPage, PaymentReturnPage };
