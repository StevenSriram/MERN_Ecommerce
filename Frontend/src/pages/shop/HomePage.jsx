import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ArrowUp,
  BabyIcon,
  EyeClosed,
  Dumbbell,
  House,
  PlugZap,
  ShirtIcon,
  Volleyball,
  Vote,
  WashingMachine,
  Headphones,
  Shapes,
  HandHeart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  getFilteredProducts,
  getProductDetails,
  getRecommendedProducts,
} from "@/store/slices/shopSlice";
import { getBanners } from "@/store/slices/featureSlice";

import { SlideShow } from "@/components/custom";
import { ShoppingProductTile, ShoppingDetails, ShoppingFooter } from "./layout";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: EyeClosed },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "electronics", label: "Electronics", icon: PlugZap },
  { id: "household", label: "Household", icon: House },
  { id: "sports", label: "Sports", icon: Dumbbell },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Vote },
  { id: "zara", label: "Zara", icon: HandHeart },
  { id: "disney", label: "Disney Store", icon: Shapes },
  { id: "samsung", label: "Samsung", icon: Headphones },
  { id: "bosch", label: "Bosch", icon: WashingMachine },
  { id: "adidas", label: "Adidas", icon: Volleyball },
];

const HomePage = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { bannerList } = useSelector((state) => state.feature);
  const { productsList, productsForYou } = useSelector((state) => state.shop);
  // * Reviews Updated then Render Home
  const { reviewList } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getBanners());
    dispatch(
      getFilteredProducts({
        filterParams: {},
        sortParams: "newest",
        pageParams: 1,
        limitParams: 8,
      })
    );
    dispatch(getRecommendedProducts());
  }, [dispatch, reviewList]);

  const handleProductDetails = (productId) => {
    dispatch(getProductDetails(productId));
    if (!openDetails) setOpenDetails(true);
  };

  const handleListing = (value, group) => {
    sessionStorage.removeItem("filters");

    // ? create new filters
    const curFilters = {
      [group]: [value],
    };

    sessionStorage.setItem("filters", JSON.stringify(curFilters));
    navigate("/shop/listing");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Slide Show */}
      <SlideShow slides={bannerList.map((banner) => banner.image)} />
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleListing(categoryItem.id, "category")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-slate-700" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleListing(brandItem.id, "brand")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-gray-700" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-left">Latest Products</h2>
            <Button
              variant="outline"
              onClick={() => {
                sessionStorage.removeItem("filters");
                navigate("/shop/listing");
              }}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {productsList.map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleProductDetails={handleProductDetails}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-left">Products For You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {productsForYou.map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleProductDetails={handleProductDetails}
              />
            ))}
          </div>
        </div>
      </section>
      <ShoppingDetails
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
      />

      <Button
        variant="destructive"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`fixed bottom-4 right-4 px-3 rounded-full`}
      >
        <ArrowUp className="w-8 h-8 mx-auto" />
      </Button>

      {/* Footer */}
      <ShoppingFooter />
    </div>
  );
};

export default HomePage;
