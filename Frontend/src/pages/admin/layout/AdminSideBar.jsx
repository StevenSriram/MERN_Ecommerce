import { ChartNoAxesCombined } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AdminMenuItems } from "./";

const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <SheetDescription className="sr-only">Admin Panel</SheetDescription>
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle
                onClick={() => {
                  navigate("/admin/dashboard");
                  if (open) setOpen(false);
                }}
                className="flex gap-3 items-center"
              >
                <ChartNoAxesCombined size={30} />
                <span className="font-bold text-gray-900 text-2xl">
                  Admin Panel
                </span>
              </SheetTitle>
            </SheetHeader>
            <AdminMenuItems open={open} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden lg:flex flex-col border-r py-6 px-5 w-1/6">
        <div
          className="flex justify-center items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="ml-1 font-bold text-gray-900 text-2xl">Admin Panel</h1>
        </div>
        <AdminMenuItems />
      </aside>
    </>
  );
};

export default AdminSideBar;
