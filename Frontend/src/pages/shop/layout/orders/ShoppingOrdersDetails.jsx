import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Orbit } from "lucide-react";

const ShoppingOrdersDetails = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View</Button>
      </DialogTrigger>
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
              <Label>Paid</Label>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingOrdersDetails;
