import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { ShoppingDetails, ShoppingProductTile } from "../";

import {
  getSearchProducts,
  getProductDetails,
  resetSearch,
} from "@/store/slices/shopSlice";

const ShoppingSearch = () => {
  const [searchKey, setSearchKey] = useState("");
  const [openDetails, setOpenDetails] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams()
  );

  const dispatch = useDispatch();
  const { isLoading, productsSearch } = useSelector((state) => state.shop);
  const { reviewList } = useSelector((state) => state.review);

  useEffect(() => {
    if (searchKey.trim() && searchKey.length >= 3) {
      setSearchParams(new URLSearchParams(`?keyword=${searchKey}`));
      dispatch(getSearchProducts(searchKey));
    } else {
      setSearchParams(new URLSearchParams());
      dispatch(resetSearch());
    }
  }, [searchKey, dispatch, searchParams, reviewList]);

  const handleProductDetails = (productId) => {
    dispatch(getProductDetails(productId));
    if (!openDetails) setOpenDetails(true);
  };

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            name="keyword"
            value={searchKey}
            className="py-6"
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search Products..."
            autoFocus={true}
          />
        </div>
      </div>

      {isLoading && <Loader className="w-10 h-10 mx-auto animate-spin" />}
      {productsSearch?.length === 0 && (
        <h1 className="text-5xl font-mono">No result found!</h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productsSearch?.map((product) => (
          <ShoppingProductTile
            key={product._id}
            product={product}
            handleProductDetails={handleProductDetails}
          />
        ))}
      </div>
      <ShoppingDetails
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
      />
    </div>
  );
};

export default ShoppingSearch;
