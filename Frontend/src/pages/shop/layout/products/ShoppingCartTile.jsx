import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, Trash } from "lucide-react";

import {
  deleteFromCart,
  editCartQuantity,
  getCartItems,
} from "@/store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const ShoppingCartTile = ({ cartItem }) => {
  const { isLoading } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const handleDeleteCartItem = (productId) => {
    dispatch(deleteFromCart({ userId: user?._id, productId })).then((data) => {
      if (data.payload?.success) {
        dispatch(getCartItems({ userId: user?._id }));
        toast({
          title: "Item deleted from Cart",
        });
      }
    });
  };

  const handleEditCart = (productId, quantity) => {
    dispatch(editCartQuantity({ userId: user?._id, productId, quantity })).then(
      (data) => {
        if (data.payload?.success) {
          dispatch(getCartItems({ userId: user?._id }));
        }
      }
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() =>
              handleEditCart(cartItem?.productId, cartItem?.quantity - 1)
            }
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              cartItem?.quantity
            )}
          </span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === cartItem?.totalStock}
            onClick={() =>
              handleEditCart(cartItem?.productId, cartItem?.quantity + 1)
            }
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          className="cursor-pointer mt-3 text-red-700"
          size={20}
          onClick={() => {
            handleDeleteCartItem(cartItem?.productId);
          }}
        />
      </div>
    </div>
  );
};

export default ShoppingCartTile;
