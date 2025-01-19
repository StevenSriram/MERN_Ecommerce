import { lazy } from "react";

const AdminLayout = lazy(() => import("./AdminLayout"));

const AdminHeader = lazy(() => import("./AdminHeader"));
const AdminMenuItems = lazy(() => import("./AdminMenuItems"));

const AdminSideBar = lazy(() => import("./AdminSideBar"));

const AdminImageUploader = lazy(() => import("./AdminImageUploader"));
const AdminProductTile = lazy(() => import("./AdminProductTile"));

export {
  AdminLayout,
  AdminHeader,
  AdminMenuItems,
  AdminSideBar,
  AdminImageUploader,
  AdminProductTile,
};
