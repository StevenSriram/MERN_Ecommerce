import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ShoppingFilter from "./layout/ShoppingFilter";
import { sortOptions } from "@/utils/productsUtils";
import ShoppingProductTile from "./layout/ShoppingProductTile";
import { getFilteredProducts } from "@/store/slices/shopSlice";

import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ProductLoader } from "@/components/custom";

import { ArrowUpDownIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const getQueryParams = (filters) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value?.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
};

const ListingPage = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  const dispatch = useDispatch();
  const { isLoading, productsList } = useSelector((state) => state.shop);

  // ? Retrieving filters from session storage
  useEffect(() => {
    setSort("newest");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [searchParams]);

  // ? Updating query params
  useEffect(() => {
    const queryString = getQueryParams(filters);
    setSearchParams(new URLSearchParams(queryString));
  }, [filters]);

  // ? get filtered products
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0 && sort) {
      dispatch(
        getFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, filters, sort]);

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

      <div
        className="bg-background w-full rounded-lg shadow-sm 
      overflow-y-auto md:max-h-[87vh] max-md:max-h-[55vh]"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productsList.length} Products
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
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductLoader key={index} />
              ))
            : productsList.map((product) => (
                <ShoppingProductTile key={product?._id} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
