import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, getCartItems } from "@/store/slices/cartSlice";
import { Star } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

const ShoppingDetails = ({ openDetails, setOpenDetails }) => {
  const { productDetails } = useSelector((state) => state.shop);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleAddToCart = (productId, remainingStock) => {
    const existingItem = cartItems?.items?.find(
      (item) => item?.productId === productId
    );
    if (existingItem && existingItem?.quantity >= remainingStock) {
      toast({
        title: `You can't add more than ${remainingStock} of this product`,
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({ userId: user?._id, productId, quantity: 1 })).then(
      (data) => {
        if (data.payload?.success) {
          dispatch(getCartItems({ userId: user?._id }));
          toast({
            title: data.payload?.message,
          });
        }
      }
    );
  };

  return (
    <Dialog open={openDetails} onOpenChange={setOpenDetails}>
      <DialogContent className="grid grid-cols-2 gap-6 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <DialogDescription className="sr-only">
          Product Details of Product ID: {productDetails?._id}
        </DialogDescription>
        <DialogTitle className="sr-only">Products Details</DialogTitle>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={650}
            height={650}
            className="aspect-square rounded-lg w-full object-cover"
          />
          {productDetails?.totalStock <= 10 ? (
            <Badge className="absolute top-2 right-2 px-2 py-1 bg-orange-500 hover:bg-orange-600">
              {`Only ${productDetails?.totalStock} left`}
            </Badge>
          ) : (
            productDetails?.totalStock === 0 && (
              <Badge className="absolute top-2 right-2 px-2 py-1 bg-red-500 hover:bg-red-600">
                Out of Stock
              </Badge>
            )
          )}
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
            <Button
              className="w-full"
              onClick={() =>
                handleAddToCart(productDetails?._id, productDetails?.totalStock)
              }
              disabled={productDetails?.totalStock === 0}
            >
              Add to Cart
            </Button>
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
