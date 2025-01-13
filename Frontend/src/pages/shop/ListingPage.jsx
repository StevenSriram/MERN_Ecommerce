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

const ListingPage = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

  const dispatch = useDispatch();
  const { isLoading, productsList } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(getFilteredProducts());
  }, [dispatch]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

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
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-2 md:p-4">
      <ShoppingFilter filters={filters} handleFilter={handleFilter} />

      <div
        className="bg-background w-full rounded-lg shadow-sm overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 97px)" }}
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
