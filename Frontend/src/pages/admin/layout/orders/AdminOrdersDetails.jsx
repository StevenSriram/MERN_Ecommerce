import { CommonForm } from "@/components/custom";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Orbit } from "lucide-react";

const orderStatusFormControls = [
  {
    label: "Order Status",
    name: "status",
    placeholder: "Update Order Status",
    componentType: "select",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Processing", value: "processing" },
      { label: "Shipped", value: "shipped" },
      { label: "Delivered", value: "delivered" },
      { label: "Rejected", value: "rejected" },
    ],
  },
];

const AdminOrdersDetails = () => {
  const [formData, setFormData] = useState({ status: "" });
  const [openOrderStatus, setOpenOrderStatus] = useState(false);

  const handleStatus = (e) => {
    e.preventDefault();
    setOpenOrderStatus(false);
    alert("Status updated successfully");
  };

  return (
    <Dialog open={openOrderStatus} onOpenChange={setOpenOrderStatus}>
      <Button onClick={() => setOpenOrderStatus(true)}>View</Button>
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
              <Label>126387</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label>12/12/2022</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label>$100</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment method</p>
              <Label>Credit Card</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Label>pending</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Status</p>
              <Label>
                <Badge
                  className={`py-1 px-3 
                  
                    bg-black
                }`}
                >
                  Delivered
                </Badge>
              </Label>
            </div>
          </div>
          <hr className="my-4" />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <p>John Doe</p>
                <p>123 Main Street</p>
                <p>Anytown, USA</p>
                <p>123-456-7890</p>
              </div>
            </div>
          </div>

          <CommonForm
            formControls={orderStatusFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            handleSubmit={handleStatus}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminOrdersDetails;
