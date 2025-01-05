import { lazy } from "react";

const Authorization = lazy(() => import("./Authorization"));
const CommonForm = lazy(() => import("./CommonForm"));

const SkeletonLoader = lazy(() => import("./SkeletonLoader"));
const GifLoader = lazy(() => import("./GifLoader"));

const ImageUploader = lazy(() => import("./ImageUploader"));

export { Authorization, CommonForm, SkeletonLoader, GifLoader, ImageUploader };
