import { lazy } from "react";

import { AdminLayout } from "./layout";

const DashBoardPage = lazy(() => import("./DashBoardPage"));
const OrdersPage = lazy(() => import("./OrdersPage"));
const ProductsPage = lazy(() => import("./ProductsPage"));
const FeaturesPage = lazy(() => import("./FeaturesPage"));

export { AdminLayout, DashBoardPage, OrdersPage, ProductsPage, FeaturesPage };
