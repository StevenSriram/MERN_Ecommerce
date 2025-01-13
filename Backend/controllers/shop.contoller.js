import Product from "../modals/product.modal.js";
import { filterData, sortData } from "../utils/filter_sort.js";

import memoryCache from "./../utils/nodeCache.js";

export const getProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "New Arrivals" } = req.query;

    const cacheKey = `products-${JSON.stringify({ category, brand, sortBy })}`;

    // ! check Product Cache Found
    if (memoryCache.has(cacheKey)) {
      const productCache = memoryCache.get(cacheKey);

      return res.status(200).json({ success: true, allProducts: productCache });
    }

    const filters = filterData(category, brand);
    const sort = sortData(sortBy);

    const allProducts = await Product.find(filters).sort(sort);

    // ! Set Product Cache
    if (allProducts.length > 0) {
      memoryCache.set(cacheKey, allProducts);
    }

    res.status(200).json({ success: true, allProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
