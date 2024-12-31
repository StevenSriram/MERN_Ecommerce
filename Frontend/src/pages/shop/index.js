import { lazy } from "react";

const ShoppingLayout = lazy(() => import("./layout/ShoppingLayout"));
const HomePage = lazy(() => import("./HomePage"));
const AccountPage = lazy(() => import("./AccountPage"));
const CheckoutPage = lazy(() => import("./CheckoutPage"));
const ListingPage = lazy(() => import("./ListingPage"));

export { ShoppingLayout, HomePage, AccountPage, CheckoutPage, ListingPage };
