import { useNavigate } from "react-router-dom";
import {
  FileUser,
  LayoutDashboard,
  ListOrdered,
  ShoppingBasket,
} from "lucide-react";

const AdminSideBarItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/admin/dashboard",
  },
  {
    label: "Orders",
    icon: <ListOrdered />,
    path: "/admin/orders",
  },
  {
    label: "Products",
    icon: <ShoppingBasket />,
    path: "/admin/products",
  },
  {
    label: "Features",
    icon: <FileUser />,
    path: "/admin/features",
  },
];

const AdminMenuItems = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="mt-8 flex-col flex gap-2">
        {AdminSideBarItems.map((item) => (
          <div
            key={item.label}
            className="flex cursor-pointer text-lg items-center gap-2 rounded-md px-3 py-2 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition duration-100 ease-in-out"
            onClick={() => {
              navigate(item.path);

              if (open) setOpen(false);
            }}
          >
            {item.icon}
            <span className="ml-1">{item.label}</span>
          </div>
        ))}
      </nav>
    </>
  );
};

export default AdminMenuItems;
