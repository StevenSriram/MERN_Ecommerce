import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ShoppingProductTile = ({ product }) => {
  return (
    <Card className="w-full max-w-sm mx-auto hover:border-slate-400 hover:shadow-lg hover:scale-95 transition duration-150">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            loading="lazy"
            className="w-full h-[260px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">{product?.category}</span>
            <span className="text-sm">{product?.brand}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className={`${product?.salePrice > 0 && "line-through"} `}>
              {product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="font-lg font-semibold text-muted-foreground">
                {product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShoppingProductTile;
