import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const AdminProductTile = ({
  product,
  setFormData,
  setOpenAddProduct,
  setEditID,
}) => {
  const handleEdit = () => {
    setOpenAddProduct(true);
    setEditID(product?._id);

    // setFormData({
    //   image: null,
    //   title: product?.title,
    //   description: product?.description,
    //   category: product?.category,
    //   brand: product?.brand,
    //   price: product?.price,
    //   salePrice: product?.salePrice,
    //   totalStock: product?.totalStock,
    // });

    setFormData(product);
  };

  const handleDelete = () => {};

  return (
    <Card className="w-full max-w-sm mx-auto hover:border-slate-400 hover:shadow-lg hover:scale-95 transition duration-150">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[250px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={handleEdit}>Edit</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
