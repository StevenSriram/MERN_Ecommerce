import { Routes, Route } from "react-router-dom";

import { AuthLayout, LoginPage, SignupPage } from "./pages/auth";
import {
  AdminLayout,
  DashBoardPage,
  OrdersPage,
  ProductsPage,
  FeaturesPage,
} from "./pages/admin";
import {
  ShoppingLayout,
  HomePage,
  AccountPage,
  CheckoutPage,
  ListingPage,
} from "./pages/shop";

import { NotFoundPage, UnAuthPage } from "./pages/others";

const App = () => {
  return (
    <main className="min-h-screen w-full grid place-items-center">
      <h1 className="text-4xl text-center font-extrabold tracking-tight">
        Welcome to MERN Ecommerce
      </h1>

      <Routes>
        {/* Authentication Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashBoardPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="features" element={<FeaturesPage />} />
        </Route>

        {/* Shopping Routes */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="listing" element={<ListingPage />} />
        </Route>

        {/* UnAuthorized Routes */}
        <Route path="/un-auth" element={<UnAuthPage />} />

        {/* Not Found Routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default App;