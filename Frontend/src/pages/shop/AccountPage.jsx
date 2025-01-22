import accountImg from "../../assets/account.jpg";
import { ShoppingAddress, ShoppingOrders } from "./layout";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AccountPage = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[250px] w-full overflow-hidden">
        <img
          src={accountImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          {/* // ! orders */}
          <Tabs defaultValue="address">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <ShoppingAddress />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
