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

import { ShoppingOrdersDetails } from "..";

const ShoppingOrders = () => {
  return (
    <Card className="mt-2 border border-slate-300 shadow-lg">
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="mt-2">
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>25/06/2023</TableCell>
              <TableCell>
                <Badge className={"bg-green-500 hover:bg-green-700"}>
                  Completed
                </Badge>
              </TableCell>
              <TableCell>₹ 1000</TableCell>
              <TableCell>
                <ShoppingOrdersDetails />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
