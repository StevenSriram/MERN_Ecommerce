import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { ProductLoader } from "@/components/custom";
import {
  ShoppingFilter,
  ShoppingProductTile,
  ShoppingPagination,
  ShoppingDetails,
} from "./layout";

import {
  getFilteredProducts,
  getProductDetails,
  resetPage,
} from "@/store/slices/shopSlice";
import { sortOptions } from "@/utils/productsUtils";

const getQueryParams = (filters, page, limit) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value?.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  if (page > 1) {
    queryParams.push(`page=${page}`);
    queryParams.push(`limit=${limit}`);
  }

  return queryParams.join("&");
};

const ListingPage = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  const [openDetails, setOpenDetails] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, productsList, totalProducts, page, limit } = useSelector(
    (state) => state.shop
  );
  const { reviewList } = useSelector((state) => state.review);

  // ? Retrieving filters from session storage
  useEffect(() => {
    // ! Reset page when Filters changed
    dispatch(resetPage());
    setSort("newest");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [searchParams]);

  // ? Updating query params
  useEffect(() => {
    const queryString = getQueryParams(filters, page, limit);
    setSearchParams(new URLSearchParams(queryString));
  }, [filters]);

  // ? get filtered products
  useEffect(() => {
    if (Object.keys(filters).length > 0 || sort) {
      dispatch(
        getFilteredProducts({
          filterParams: filters,
          sortParams: sort,
          pageParams: page,
          limitParams: limit,
        })
      );
    }
  }, [dispatch, filters, sort, page, limit, reviewList]);

  const handleProductDetails = (productId) => {
    dispatch(getProductDetails(productId));
    if (!openDetails) setOpenDetails(true);
  };

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (group, value) => {
    let copyFilters = { ...filters };
    const groupIdx = Object.keys(copyFilters).indexOf(group);

    if (groupIdx === -1) {
      copyFilters = { ...copyFilters, [group]: [value] };
    } else {
      const valueIdx = copyFilters[group].indexOf(value);

      if (valueIdx === -1) {
        copyFilters[group].push(value);
      } else {
        copyFilters[group].splice(valueIdx, 1);
      }
    }
    setFilters(copyFilters);
    // ? Storing filters in session storage
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-2 md:py-1">
      <ShoppingFilter filters={filters} handleFilter={handleFilter} />

      <ShoppingDetails
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
      />

      <div
        className="relative bg-background w-full rounded-lg shadow-sm 
      overflow-y-auto md:max-h-[88vh] max-md:max-h-[55vh]"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productsList.length} Out of {totalProducts}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                      className={`${
                        sortItem.label === "New Arrivals" &&
                        "text-green-500 leading-normal font-semibold"
                      }`}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductLoader key={index} />
            ))
          ) : productsList.length > 0 ? (
            productsList.map((product) => (
              <ShoppingProductTile
                key={product?._id}
                product={product}
                handleProductDetails={handleProductDetails}
              />
            ))
          ) : (
            <p className="text-2xl col-span-2 md:col-span-3 lg:col-span-4 mx-auto font-mono text-gray-800">
              No Products Found. Try others ...
            </p>
          )}
        </div>
        <ShoppingPagination />
      </div>
    </div>
  );
};

export default ListingPage;
