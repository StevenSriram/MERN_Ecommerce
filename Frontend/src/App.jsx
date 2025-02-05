import { React, Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import { ShoppingPayment, ShoppingSearch } from "./pages/shop/layout";

import { NotFoundPage, UnAuthPage, PaymentReturnPage } from "./pages/others";
import { Authorization, GifLoader } from "./components/custom";

import { checkAuthentication } from "./store/slices/authSlice";

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  const dispatch = useDispatch();
  const { isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthentication()).finally(() => setIsAppReady(true));
  }, [dispatch]);

  if (!isAppReady || isCheckingAuth) {
    return <GifLoader />;
  }

  return (
    <main className="min-h-screen w-full">
      <Suspense fallback={<GifLoader />}>
        <Routes>
          {/* Authentication Routes */}
          <Route
            path="/auth"
            element={
              <Authorization>
                <AuthLayout />
              </Authorization>
            }
          >
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <Authorization>
                <AdminLayout />
              </Authorization>
            }
          >
            <Route path="dashboard" element={<DashBoardPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="features" element={<FeaturesPage />} />
          </Route>

          {/* Shopping Routes */}
          <Route
            path="/shop"
            element={
              <Authorization>
                <ShoppingLayout />
              </Authorization>
            }
          >
            <Route path="" element={<HomePage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="listing" element={<ListingPage />} />
            <Route path="payment-status" element={<ShoppingPayment />} />
            <Route path="search" element={<ShoppingSearch />} />
          </Route>

          {/* Base route pointing to shop (/) */}
          <Route
            path="/"
            element={
              <Authorization>
                <ShoppingLayout />
              </Authorization>
            }
          >
            <Route path="" element={<HomePage />} />
          </Route>

          {/* Payment Routes */}
          <Route
            path="/payment-return"
            element={
              <Authorization>
                <PaymentReturnPage />
              </Authorization>
            }
          />

          {/* UnAuthorized Routes */}
          <Route path="/un-auth" element={<UnAuthPage />} />

          {/* Not Found Routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
