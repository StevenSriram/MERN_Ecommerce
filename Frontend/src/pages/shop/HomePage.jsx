import { useEffect } from "react";

import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";

import {
  BabyIcon,
  Cat,
  EyeClosed,
  Footprints,
  HousePlug,
  Images,
  Scale,
  ShirtIcon,
  Volleyball,
  Vote,
  WatchIcon,
  Weight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProducts } from "@/store/slices/shopSlice";
import Slideshow from "@/components/custom/SlideShow";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: EyeClosed },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
  { id: "household", label: "Household", icon: HousePlug },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Vote },
  { id: "adidas", label: "Adidas", icon: Volleyball },
  { id: "puma", label: "Puma", icon: Cat },
  { id: "levi", label: "Levi's", icon: Weight },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Scale },
];

const HomePage = () => {
  const slides = [bannerOne, bannerTwo, bannerThree];
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(
      getFilteredProducts({
        filterParams: {},
        sortParams: "newest",
        pageParams: 1,
        limitParams: 8,
      })
    );
  }, [dispatch]);

  console.log(productsList);

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
      <Slideshow slides={slides} />

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
    </div>
  );
};

export default HomePage;
