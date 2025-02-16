import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircleOff, LogOut, Search, ShoppingCart, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { logoutUser } from "@/store/slices/authSlice";

import { ShoppingCartTile } from "./";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const menuItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "electronics",
    label: "Electronics",
    path: "/shop/listing",
  },
  {
    id: "household",
    label: "Household",
    path: "/shop/listing",
  },
];

const ShoppingMenuItems = ({ setOpenMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams()
  );

  const handleListing = (value, group) => {
    setOpenMenu(false);
    // ? Navigate to home
    if (value.id === "home" || value.id === "products") {
      sessionStorage.removeItem("filters");
      return navigate(value.path);
    }

    sessionStorage.removeItem("filters");
    // ? create new filters
    const curFilters = {
      [group]: [value.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(curFilters));
    if (location.pathname.includes("listing")) {
      setSearchParams(new URLSearchParams(`?${group}=${value.id}`));
    } else {
      navigate("/shop/listing");
    }
  };

  return (
    <nav className="flex flex-col mb-10 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {menuItems.map((menuItem) => (
        <Label
          className="text-sm font-medium cursor-pointer hover:text-blue-400 transition duration-150 ease-in-out"
          key={menuItem.id}
          onClick={() => {
            handleListing(menuItem, "category");
          }}
        >
          {menuItem.label}
        </Label>
      ))}
      <div
        className="flex items-center justify-between"
        onClick={() => {
          setOpenMenu(false);
          navigate("/shop/search");
        }}
      >
        <span className="lg:hidden inline-block text-blue-600">
          {" "}
          Search Products{" "}
        </span>
        <Search
          className="w-8 h-8 ml-2 max-lg:inline-block max-lg:text-blue-600 cursor-pointer hover:text-blue-600 
        transform hover:scale-105 transition duration-100 ease-in-out"
        />
      </div>
    </nav>
  );
};

const ShoppingMenuContents = ({ setOpenMenu, openCart, setOpenCart }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenMenu(false);
    dispatch(logoutUser()).then(() => {
      navigate("/auth/login");
      window.location.reload();
    });
  };

  const handleOpen = () => {
    setOpenMenu(false);
    setOpenCart(false);
  };

  const computeCartTotal = () => {
    const total = cartItems?.items?.reduce(
      (acc, cur) => acc + cur?.quantity * (cur?.salePrice || cur?.price),
      0
    );
    return total.toFixed(2);
  };

  return (
    <div className="flex justify-end items-center gap-4">
      <Sheet open={openCart} onOpenChange={handleOpen}>
        <Button
          className="relative max-lg:hidden"
          variant="outline"
          size="sm"
          onClick={() => setOpenCart(true)}
        >
          <ShoppingCart className="w-8 h-8 " />

          {cartItems?.items?.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-center text-xs font-semibold text-white">
              {cartItems?.items?.length}
            </span>
          )}
        </Button>
        <SheetContent side="right" className="max-w-md pl-4 pr-0">
          <SheetDescription className="sr-only">Your Cart</SheetDescription>
          <SheetHeader className="border-b pb-1 mb-3">
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {cartItems && cartItems.items?.length > 0 ? (
              <Fragment>
                <div className="space-y-4 pl-1 pr-4 overflow-auto max-h-[400px]">
                  {cartItems.items.map((cartItem) => (
                    <ShoppingCartTile
                      key={cartItem.productId}
                      cartItem={cartItem}
                    />
                  ))}
                </div>

                <div className="mt-8 space-y-4 pr-4">
                  <div className="flex items-center justify-between">
                    <span className="text-mg font-bold">Total</span>
                    <span className="text-mg font-bold">
                      ${computeCartTotal()}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-[96%] mt-8"
                  onClick={() => {
                    setOpenCart(false);
                    setOpenMenu(false);
                    navigate("/shop/checkout");
                  }}
                >
                  Checkout
                </Button>
              </Fragment>
            ) : (
              <div className="text-lg text-muted-foreground">
                <CircleOff className="mx-auto my-10 h-32 w-32 text-red-400" />
                <p className="text-center">
                  {" "}
                  Cart is empty. Add some items to cart to checkout.
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black cursor-default text-lg text-white font-extrabold">
              {user?.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpenMenu(false);
              navigate("/shop/account", {
                state: {
                  tab: "orders",
                },
              });
            }}
          >
            <User className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { ShoppingMenuItems, ShoppingMenuContents };
