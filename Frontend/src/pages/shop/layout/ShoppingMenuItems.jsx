import { Label } from "@/components/ui/label";

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
  return (
    <nav className="flex flex-col mb-10 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {menuItems.map((menuItem) => (
        <Label
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
          onClick={() => setOpenMenu(false)}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

export default ShoppingMenuItems;
