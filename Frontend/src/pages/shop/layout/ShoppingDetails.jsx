import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

import { useSelector } from "react-redux";

const ShoppingDetails = ({ openDetails, setOpenDetails }) => {
  const { productDetails } = useSelector((state) => state.shop);

  return (
    <Dialog open={openDetails} onOpenChange={setOpenDetails}>
      <DialogContent className="grid grid-cols-2 gap-6 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <DialogTitle className="sr-only">Products Details</DialogTitle>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={650}
            height={650}
            className="aspect-square rounded-lg w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-bold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-md mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 && "line-through"
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Button className="w-full">Add to Cart</Button>
          </div>

          <hr className="border-t mt-4 border-muted-foreground" />

          <div className="max-h-[200px] mt-2 p-2 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Steven Sriram</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is Good Product
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Steven Sriram</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is Good Product
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Steven Sriram</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is Good Product
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Steven Sriram</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is Good Product
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input type="text" placeholder="Write a review..." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingDetails;
