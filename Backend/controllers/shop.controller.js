import Product from "../modals/product.modal.js";
import { filterData, sortData } from "../utils/filter_sort.js";

import memoryCache, { generateCacheKey } from "../utils/nodeCache.js";

export const getProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "New Arrivals" } = req.query;

    // * Convert string to number
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const cacheKey = generateCacheKey("products", {
      category,
      brand,
      sortBy,
      page,
      limit,
    });
    const totalCacheKey = generateCacheKey("totalProducts", {
      category,
      brand,
      sortBy,
    });

    // ! check Product Cache Found
    if (memoryCache.has(cacheKey)) {
      const productCache = memoryCache.get(cacheKey);
      const totalCache = memoryCache.get(totalCacheKey);

      return res.status(200).json({
        success: true,
        allProducts: productCache,
        totalProducts: totalCache,
      });
    }

    const filters = filterData(category, brand);
    const sort = sortData(sortBy);

    // ? Count of Products
    const totalProducts = await Product.countDocuments(filters);
    // ? Get filtered Products
    const allProducts = await Product.find(filters)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    // ! Set Product Cache
    if (allProducts.length > 0) {
      memoryCache.set(cacheKey, allProducts);
      memoryCache.set(totalCacheKey, totalProducts);
    }

    res.status(200).json({ success: true, allProducts, totalProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
