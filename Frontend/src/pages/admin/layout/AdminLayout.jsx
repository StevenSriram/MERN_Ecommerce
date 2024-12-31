import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSideBar />

      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader />

        <section className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default AdminLayout;
