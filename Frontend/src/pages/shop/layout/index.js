import { lazy } from "react";

const ShoppingLayout = lazy(() => import("./ShoppingLayout"));

const ShoppingHeader = lazy(() => import("./ShoppingHeader"));
import { ShoppingMenuItems, ShoppingMenuContents } from "./ShoppingMenuItems";

const ShoppingPagination = lazy(() => import("./products/ShoppingPagination"));
const ShoppingFilter = lazy(() => import("./products/ShoppingFilter"));

const ShoppingCartTile = lazy(() => import("./products/ShoppingCartTile"));

const ShoppingProductTile = lazy(() =>
  import("./products/ShoppingProductTile")
);
const ShoppingDetails = lazy(() => import("./products/ShoppingDetails"));

const ShoppingFooter = lazy(() => import("./ShoppingFooter"));

const ShoppingAddress = lazy(() => import("./orders/ShoppingAddress"));
const ShoppingOrders = lazy(() => import("./orders/ShoppingOrders"));
const ShoppingOrdersDetails = lazy(() =>
  import("./orders/ShoppingOrdersDetails")
);

const ShoppingPayment = lazy(() => import("./orders/ShoppingPayment"));
const ShoppingSearch = lazy(() => import("./products/ShoppingSearch"));

const ShoppingReview = lazy(() => import("./orders/ShoppingReview"));

export {
  ShoppingLayout,
  ShoppingCartTile,
  ShoppingDetails,
  ShoppingFilter,
  ShoppingHeader,
  ShoppingMenuItems,
  ShoppingMenuContents,
  ShoppingPagination,
  ShoppingProductTile,
  ShoppingFooter,
  ShoppingAddress,
  ShoppingOrders,
  ShoppingOrdersDetails,
  ShoppingPayment,
  ShoppingSearch,
  ShoppingReview,
};
