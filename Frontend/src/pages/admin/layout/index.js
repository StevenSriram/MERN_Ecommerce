import { lazy } from "react";

const AdminLayout = lazy(() => import("./AdminLayout"));

const AdminHeader = lazy(() => import("./AdminHeader"));
const AdminMenuItems = lazy(() => import("./AdminMenuItems"));

const AdminSideBar = lazy(() => import("./AdminSideBar"));

const AdminImageUploader = lazy(() => import("./products/AdminImageUploader"));
const AdminProductTile = lazy(() => import("./products/AdminProductTile"));

export {
  AdminLayout,
  AdminHeader,
  AdminMenuItems,
  AdminSideBar,
  AdminImageUploader,
  AdminProductTile,
};
