import { lazy } from "react";

const AdminLayout = lazy(() => import("./AdminLayout"));

const AdminHeader = lazy(() => import("./AdminHeader"));
const AdminMenuItems = lazy(() => import("./AdminMenuItems"));

const AdminSideBar = lazy(() => import("./AdminSideBar"));

const AdminImageUploader = lazy(() => import("./products/AdminImageUploader"));
const AdminProductTile = lazy(() => import("./products/AdminProductTile"));

const AdminOrdersDetails = lazy(() => import("./orders/AdminOrdersDetails"));

const AdminBanner = lazy(() => import("./features/AdminBanner"));
const AdminCategory = lazy(() => import("./features/AdminCategory"));

export {
  AdminLayout,
  AdminHeader,
  AdminMenuItems,
  AdminSideBar,
  AdminImageUploader,
  AdminProductTile,
  AdminOrdersDetails,
  AdminBanner,
  AdminCategory,
};
