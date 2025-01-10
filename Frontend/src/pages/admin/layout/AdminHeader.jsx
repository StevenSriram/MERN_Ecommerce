import { Button } from "@/components/ui/button";
import { AlignLeft, LogOut } from "lucide-react";

import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/slices/authSlice";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        className="w-12 h-12 lg:hidden max-lg:block"
      >
        <AlignLeft />
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="font-medium shadow" onClick={handleLogout}>
          <LogOut />
          <span className="ml-1">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
