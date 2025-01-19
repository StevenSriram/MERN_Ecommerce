import { lazy } from "react";

import { ShoppingLayout } from "./layout";

const HomePage = lazy(() => import("./HomePage"));
const AccountPage = lazy(() => import("./AccountPage"));
const CheckoutPage = lazy(() => import("./CheckoutPage"));
const ListingPage = lazy(() => import("./ListingPage"));

export { ShoppingLayout, HomePage, AccountPage, CheckoutPage, ListingPage };
