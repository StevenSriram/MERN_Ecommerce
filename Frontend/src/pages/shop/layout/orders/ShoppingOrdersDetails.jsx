import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Orbit } from "lucide-react";

import { getOrderDetails } from "@/store/slices/orderSlice";

const ShoppingOrdersDetails = ({ orderId, orderStatusColors }) => {
  const dispatch = useDispatch();
  const { orderDetails } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const handleOrderDetails = () => {
    dispatch(getOrderDetails(orderId));

    if (!openOrderDetails) setOpenOrderDetails(true);
  };

  return (
    <Dialog open={openOrderDetails} onOpenChange={setOpenOrderDetails}>
      <DialogDescription className="sr-only">
        Order Details of Order ID: {orderDetails?._id}
      </DialogDescription>

      <Button onClick={handleOrderDetails}>View</Button>
      <DialogContent className="sm:max-w-[600px] pr-2 pb-3">
        <DialogHeader>
          <DialogTitle>
            <Orbit className="text-2xl font-bold inline mr-3" />
            Order Details
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 pr-5 overflow-auto max-h-[500px]">
          <div className="grid gap-2">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label>{orderDetails?._id}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label>${orderDetails?.totalAmount}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Label>{orderDetails?.paymentStatus}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Status</p>
              <Label>
                <Badge
                  className={`py-1 px-3 
                ${orderStatusColors[orderDetails?.orderStatus]}
                }`}
                >
                  {orderDetails?.orderStatus}
                </Badge>
              </Label>
            </div>
          </div>
          <hr className="my-2" />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium mb-2">Products Info</div>
              <div className="grid gap-2 text-muted-foreground">
                {orderDetails?.cartItems.map((item) => (
                  <div
                    key={item?.productId}
                    className="flex items-center justify-between mb-2"
                  >
                    <img
                      src={item?.image}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <Label className="text-md">
                      {item?.title}
                      <span className="ml-2 text-xs">x {item?.quantity}</span>
                    </Label>
                    <Label className="text-md">${item?.price}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium mb-2">Shipping Info</div>
              <div className="grid gap-2 text-muted-foreground">
                <Label className="mb-3">UserName : {user?.name}</Label>
                <Label>{orderDetails?.addressInfo?.address}</Label>
                <Label>{orderDetails?.addressInfo?.city}</Label>
                <Label>{orderDetails?.addressInfo?.phone}</Label>
                <Label>{orderDetails?.addressInfo?.pincode}</Label>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingOrdersDetails;
