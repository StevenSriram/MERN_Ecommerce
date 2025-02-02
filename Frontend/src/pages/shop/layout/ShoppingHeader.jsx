import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Menu, ShoppingBag } from "lucide-react";

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
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCartItems({ userId: user?._id }));
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-slate-50">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-green-500" />
          <span className="font-bold text-lg">Ecommerce</span>
        </Link>

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
                <ShoppingBag className="h-6 w-6 text-green-500" />
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
          <ShoppingMenuContents setOpenMenu={setOpenMenu} />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
