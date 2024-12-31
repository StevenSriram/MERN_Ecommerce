import { Outlet } from "react-router-dom";
import ShoppingHeader from "./ShoppingHeader";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />

      <section className="flex flex-col w-full">
        <Outlet />
      </section>
    </div>
  );
}

export default ShoppingLayout;
