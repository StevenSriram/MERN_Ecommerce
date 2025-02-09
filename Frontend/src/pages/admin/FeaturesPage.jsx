import { AdminBanner, AdminCategory } from "./layout";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AccountPage = () => {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue={"banner"}>
            <TabsList>
              <TabsTrigger value="banner">Banners</TabsTrigger>
              <TabsTrigger value="category">Categorys</TabsTrigger>
            </TabsList>
            <TabsContent value="banner">
              <AdminBanner />
            </TabsContent>
            <TabsContent value="category">
              <AdminCategory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
