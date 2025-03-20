import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AdminOrdersDetails } from "./layout";
import { getAllOrders } from "@/store/slices/orderSlice";

const orderStatusColors = {
  confirmed: "bg-emerald-500 hover:bg-emerald-600",
  failed: "bg-red-500 hover:bg-red-600",
  processing: "bg-orange-500 hover:bg-orange-600",
  shipped: "bg-blue-500 hover:bg-blue-600",
  delivered: "bg-green-500 hover:bg-green-600",
  rejected: "bg-rose-500 hover:bg-rose-600",
};

const OrdersPage = () => {
  const { orderList } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
      <Card className="mt-2 w-full rounded-md border border-slate-300 shadow-lg">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Order Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderList?.length > 0 &&
                  orderList?.map((orderItem) => (
                    <TableRow key={orderItem?._id}>
                      <TableCell>{orderItem?._id}</TableCell>
                      <TableCell>
                        {orderItem?.orderDate.split("T")[0]}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            orderStatusColors[orderItem?.orderStatus]
                          }`}
                        >
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>${orderItem?.totalAmount}</TableCell>
                      <TableCell>
                        <AdminOrdersDetails
                          orderId={orderItem?._id}
                          orderStatusColors={orderStatusColors}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
