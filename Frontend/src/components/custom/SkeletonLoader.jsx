import { Skeleton } from "../ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center space-y-12 bg-white">
      <div className="flex flex-col items-center space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0">
        <Skeleton className="h-20 w-20 rounded-full bg-slate-500" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-[300px] sm:w-[350px] bg-slate-500" />
          <Skeleton className="h-6 w-[250px] sm:w-[300px] bg-slate-500" />
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <Skeleton className="h-[200px] w-[350px] sm:w-[450px] rounded-xl bg-slate-500" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-[300px] sm:w-[390px] bg-slate-500" />
          <Skeleton className="h-6 w-[250px] sm:w-[300px] bg-slate-500" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
