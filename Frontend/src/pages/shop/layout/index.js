import { lazy } from "react";

const ShoppingLayout = lazy(() => import("./ShoppingLayout"));

const ShoppingHeader = lazy(() => import("./ShoppingHeader"));
import { ShoppingMenuItems, ShoppingMenuContents } from "./ShoppingMenuItems";

const ShoppingPagination = lazy(() => import("./ShoppingPagination"));
const ShoppingFilter = lazy(() => import("./ShoppingFilter"));

const ShoppingCartTile = lazy(() => import("./ShoppingCartTile"));

const ShoppingProductTile = lazy(() => import("./ShoppingProductTile"));
const ShoppingDetails = lazy(() => import("./ShoppingDetails"));

const ShoppingFooter = lazy(() => import("./ShoppingFooter"));

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
};
