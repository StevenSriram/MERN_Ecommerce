import { Skeleton } from "@/components/ui/skeleton"; // assuming the Skeleton component is available
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductLoader = () => {
  return (
    <Card className="w-full max-w-sm mx-auto hover:border-slate-400 hover:shadow-lg hover:scale-95 transition duration-150">
      <div>
        <div className="relative">
          <Skeleton className="w-full h-[260px] rounded-t-lg" />
          <Skeleton className="absolute top-2 left-2 w-20 h-6 bg-red-500 rounded-md" />
        </div>
        <CardContent className="p-4">
          <Skeleton className="w-3/4 h-6 mb-2" />
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="w-1/3 h-4" />
            <Skeleton className="w-1/3 h-4" />
          </div>
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="w-1/4 h-4" />
            <Skeleton className="w-1/4 h-4" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Skeleton className="w-full h-8" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductLoader;
