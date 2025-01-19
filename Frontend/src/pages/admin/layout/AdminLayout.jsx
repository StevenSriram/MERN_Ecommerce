import { useState } from "react";
import { Outlet } from "react-router-dom";

import { AdminHeader, AdminSideBar } from "./";

function AdminLayout() {
  const [openSideBar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSideBar open={openSideBar} setOpen={setOpenSidebar} />

      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />

        <section
          className="flex-1 flex-col flex bg-slate-50 p-4 md:p-6 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 65px)" }}
        >
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default AdminLayout;
