import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSideBar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  const [openSideBar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSideBar open={openSideBar} setOpen={setOpenSidebar} />

      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />

        <section className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default AdminLayout;
