import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../store/slices/featureSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkeletonLoader } from "@/components/custom";
import { NotepadText } from "lucide-react";

const DashBoardPage = () => {
  const dispatch = useDispatch();
  const { dashboardData, isLoading } = useSelector((state) => state.feature);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  if (isLoading) return <SkeletonLoader />;

  const {
    totalRevenue,
    totalCustomers,
    totalOrders,
    avgOrderValue,
    categoriesWithStock = [],
    topSellingProduct,
    salesOverTime = [],
    categoryWiseSales = [],
    orderStatusDistribution = [],
  } = dashboardData || {};

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 space-y-6 bg-gray-150">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="max-xl:col-span-4 col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">
              ${totalRevenue?.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="max-xl:col-span-2 max-sm:col-span-4 shadow-md">
          <CardHeader>
            <CardTitle>Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{totalCustomers}</p>
          </CardContent>
        </Card>

        <Card className="max-xl:col-span-2 max-sm:col-span-4 shadow-md">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">{totalOrders}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Top Selling Product */}
        <Card className="max-2xl:col-span-2 max-md:col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Top-Selling Product</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {topSellingProduct ? (
              <>
                <img
                  src={topSellingProduct?.image}
                  alt={topSellingProduct?.title}
                  className="w-full max-md:h-[350px] md:h-48 object-cover rounded-md mt-2 border-2 border-gray-300"
                />
                <p className="mt-2 text-lg font-bold">
                  {topSellingProduct?.title}
                </p>
                <p className="text-sm text-gray-500">
                  {topSellingProduct?.sales} Sales
                </p>
              </>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </CardContent>
        </Card>

        {/* Average Order Value */}
        <Card className="max-2xl:col-span-2 max-md:col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <NotepadText className="w-36 h-36 mt-6 mx-auto text-gray-400" />
            <p className="mt-6 text-3xl font-bold">${avgOrderValue}</p>
          </CardContent>
        </Card>

        {/* Categories with Stock */}
        <Card className="max-2xl:col-span-4 col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Categories in Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesWithStock.map((category) => (
                  <SelectItem key={category.name} value={category}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Display Stock Below */}
            <div className="mt-4 p-4 bg-gray-100 rounded">
              {selectedCategory ? (
                <>
                  <h4 className="text-lg font-semibold">
                    {selectedCategory.name}
                  </h4>
                  <p className="text-xl font-bold">
                    {selectedCategory.stock} Items
                  </p>
                </>
              ) : (
                <p className="text-gray-500">Select a category to view stock</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Sales Over Time (Line Chart) */}
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesOverTime}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Wise Sales (Bar Chart) */}
        <Card className="col-span-2 max-2xl:col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Category Wise Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryWiseSales}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalSales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution (Pie Chart) */}
        <Card className="col-span-2 max-2xl:col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusDistribution}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {orderStatusDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashBoardPage;
