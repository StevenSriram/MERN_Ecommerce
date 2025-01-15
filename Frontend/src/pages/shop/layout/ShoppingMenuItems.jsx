import { useDispatch, useSelector } from "react-redux";
import { LogOut, ShoppingCart, User } from "lucide-react";

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

import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/store/slices/authSlice";

const menuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop",
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
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
];

const ShoppingMenuItems = ({ setOpenMenu }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col mb-10 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {menuItems.map((menuItem) => (
        <Label
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
          onClick={() => {
            setOpenMenu(false);
            navigate(menuItem.path);
          }}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

const ShoppingMenuContents = ({ setOpenMenu }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenMenu(false);
    dispatch(logoutUser()).then(() => {
      navigate("/auth/login");
      window.location.reload();
    });
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <Button variant="outline" size="sm">
        <ShoppingCart className="w-8 h-8 " />
      </Button>

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
              navigate("/shop/account");
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
