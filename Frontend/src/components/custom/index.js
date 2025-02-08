import { lazy } from "react";

const Authorization = lazy(() => import("./Authorization"));
const CommonForm = lazy(() => import("./CommonForm"));

const SkeletonLoader = lazy(() => import("./SkeletonLoader"));
const GifLoader = lazy(() => import("./GifLoader"));
const ProductLoader = lazy(() => import("./ProductLoader"));

const SlideShow = lazy(() => import("./SlideShow"));

const RatingStars = lazy(() => import("./RatingStars"));

export {
  Authorization,
  CommonForm,
  SkeletonLoader,
  GifLoader,
  ProductLoader,
  SlideShow,
  RatingStars,
};
