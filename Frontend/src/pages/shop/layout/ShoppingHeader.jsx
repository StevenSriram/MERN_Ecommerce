import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Menu, ShoppingCart, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingMenuItems, ShoppingMenuContents } from "./";
import { getCartItems } from "@/store/slices/cartSlice";

const ShoppingHeader = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems({ userId: user?._id }));
  }, [dispatch]);

  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-slate-50">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop" className="flex items-center gap-2">
          <Store className="h-6 w-6 text-green-500" />
          <span className="font-bold text-lg">Ecommerce</span>
        </Link>

        <Button
          className="relative lg:hidden"
          variant="outline"
          size="lg"
          onClick={() => setOpenCart(true)}
        >
          <span className="text-lg font-semibold mr-3">Cart</span>
          <ShoppingCart className="w-12 h-12 " />

          {cartItems?.items?.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-center text-xs font-semibold text-white">
              {cartItems?.items?.length}
            </span>
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpenMenu(true)}
        >
          <Menu className="h-8 w-8" />
        </Button>

        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetContent side="left" className="w-64">
            <SheetDescription className="sr-only">Menu</SheetDescription>
            <SheetHeader className="border-b mb-5 py-2">
              <SheetTitle className="flex items-center">
                <Store className="h-6 w-6 text-green-500" />
                <span className="font-bold text-lg ml-3">Ecommerce</span>
              </SheetTitle>
            </SheetHeader>

            <ShoppingMenuItems setOpenMenu={setOpenMenu} />
            <ShoppingMenuContents setOpenMenu={setOpenMenu} />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <ShoppingMenuItems setOpenMenu={setOpenMenu} />
        </div>
        <div className="hidden lg:block">
          <ShoppingMenuContents
            setOpenMenu={setOpenMenu}
            openCart={openCart}
            setOpenCart={setOpenCart}
          />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
