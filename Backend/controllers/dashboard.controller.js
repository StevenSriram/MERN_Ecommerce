import Order from "../modals/order.modal.js";
import User from "../modals/user.modal.js";
import Product from "../modals/product.modal.js";

import memoryCache from "../utils/nodeCache.js";

export const getDashboardData = async (req, res) => {
  try {
    // ? Check Cache
    if (memoryCache.has("dashboard")) {
      const dashboardCache = memoryCache.get("dashboard");
      return res
        .status(200)
        .json({ success: true, dashboardStats: dashboardCache });
    }

    // * 1. Total Revenue
    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // * 2. Total Customers
    const totalCustomers = await User.estimatedDocumentCount();

    // * 3. Total Orders
    const totalOrders = await Order.estimatedDocumentCount();

    // * 4. Categories with Stock
    const categoriesWithStock = await Product.aggregate([
      { $group: { _id: "$category", stock: { $sum: "$totalStock" } } },
      { $project: { name: "$_id", stock: 1, _id: 0 } },
    ]);

    // * 5. Top Selling Product
    const topSellingProductResult = await Product.aggregate([
      { $sort: { sales: -1 } },
      { $limit: 1 },
    ]);
    const topSellingProduct =
      topSellingProductResult.length > 0 ? topSellingProductResult[0] : null;

    // * 6. Average Order Value
    const avgOrderValue = totalOrders
      ? (totalRevenue / totalOrders).toFixed(2)
      : 0;

    // * 7. Sales Over Time
    const salesOverTime = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $project: { date: "$_id", revenue: 1, _id: 0 } },
      { $sort: { date: 1 } },
    ]);

    // * 8. Category Wise Sales
    const categoryWiseSales = await Product.aggregate([
      { $group: { _id: "$category", totalSales: { $sum: "$sales" } } },
      { $sort: { totalSales: -1 } },
    ]);

    // * 9. Order Status Distribution
    const orderStatusDistribution = await Order.aggregate([
      { $group: { _id: "$orderStatus", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const dashboardStats = {
      totalRevenue,
      totalCustomers,
      totalOrders,
      categoriesWithStock,
      topSellingProduct,
      avgOrderValue,
      salesOverTime,
      categoryWiseSales,
      orderStatusDistribution,
    };

    // ! Set Dashboard Cache
    memoryCache.set("dashboard", dashboardStats);

    res.status(200).json({ success: true, dashboardStats });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
