import { lazy } from "react";

const Authorization = lazy(() => import("./Authorization"));
const CommonForm = lazy(() => import("./CommonForm"));

const SkeletonLoader = lazy(() => import("./SkeletonLoader"));
const GifLoader = lazy(() => import("./GifLoader"));
const ProductLoader = lazy(() => import("./ProductLoader"));

export { Authorization, CommonForm, SkeletonLoader, GifLoader, ProductLoader };
