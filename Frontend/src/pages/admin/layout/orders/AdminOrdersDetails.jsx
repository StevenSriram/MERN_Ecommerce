import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommonForm } from "@/components/custom";

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
import { useToast } from "@/hooks/use-toast";

import {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
} from "@/store/slices/orderSlice";

const orderStatusFormControls = [
  {
    label: "Order Status",
    name: "status",
    placeholder: "Update Order Status",
    componentType: "select",
    options: [
      { label: "Processing", value: "processing" },
      { label: "Shipped", value: "shipped" },
      { label: "Delivered", value: "delivered" },
      { label: "Rejected", value: "rejected" },
    ],
  },
];

const AdminOrdersDetails = ({ orderId, orderStatusColors }) => {
  const [formData, setFormData] = useState({ status: "" });
  const [openOrderStatus, setOpenOrderStatus] = useState(false);

  const dispatch = useDispatch();
  const { orderDetails } = useSelector((state) => state.order);
  const { toast } = useToast();

  const handleStatus = (e) => {
    e.preventDefault();
    dispatch(
      updateOrderStatus({ orderId, orderStatus: formData?.status })
    ).then((data) => {
      if (data.payload?.success) {
        toast({
          title: data.payload?.message,
        });
        dispatch(getAllOrders());
      }
    });

    setOpenOrderStatus(false);
    setFormData({ status: "" });
  };

  const handleOrderDetails = () => {
    dispatch(getOrderDetails(orderId));
    setOpenOrderStatus(true);
  };

  return (
    <Dialog open={openOrderStatus} onOpenChange={setOpenOrderStatus}>
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
        <div className="grid gap-6 pl-1 pr-5 overflow-auto max-h-[500px]">
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
              <Label>{orderDetails?.totalAmount}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment method</p>
              <Label>
                {orderDetails?.paymentStatus === "failed"
                  ? "None"
                  : orderDetails?.payerId
                  ? "Paypal"
                  : "Cash on Delivery"}
              </Label>
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
              <div className="font-medium mb-3">Shipping Info</div>
              <div className="grid gap-2 text-muted-foreground">
                <Label>UserId : {orderDetails?.userId}</Label>
                <Label className="mt-2">
                  {orderDetails?.addressInfo?.address}
                </Label>
                <Label>{orderDetails?.addressInfo?.city}</Label>
                <Label>{orderDetails?.addressInfo?.phone}</Label>
                <Label>{orderDetails?.addressInfo?.pincode}</Label>
              </div>
            </div>
          </div>

          {orderDetails?.orderStatus !== "failed" && (
            <CommonForm
              formControls={orderStatusFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Update Order Status"}
              handleSubmit={handleStatus}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminOrdersDetails;
