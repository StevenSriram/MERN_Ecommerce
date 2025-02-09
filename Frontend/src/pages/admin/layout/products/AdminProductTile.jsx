import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { useDispatch } from "react-redux";
import {
  deleteProduct,
  deleteImage,
  getProducts,
} from "@/store/slices/adminSlice";
import { useToast } from "@/hooks/use-toast";

const AdminProductTile = ({
  product,
  setFormData,
  setOpenAddProduct,
  setEditID,
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleEdit = () => {
    setOpenAddProduct(true);
    setEditID(product?._id);

    setFormData({
      image: product?.image,
      title: product?.title,
      description: product?.description,
      category: product?.category,
      brand: product?.brand,
      price: product?.price,
      salePrice: product?.salePrice,
      totalStock: product?.totalStock,
    });
  };

  const handleDelete = (productId, productImage) => {
    const [folderName, fileName] = productImage.split("/").slice(-2);
    const publicId = `${folderName}/${fileName.split(".")[0]}`;

    dispatch(deleteProduct(productId)).then((data) => {
      if (data.payload?.success) {
        dispatch(deleteImage(publicId));

        toast({
          title: data.payload?.message,
        });

        dispatch(getProducts());
      }
    });
  };

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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(product?._id, product?.image)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
