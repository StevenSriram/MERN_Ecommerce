import { useEffect, useState } from "react";
import { CommonForm, SkeletonLoader } from "@/components/custom";
import { addProductFormControls } from "@/utils/formControls";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  editProduct,
  clearImageURL,
  getProducts,
  getLowStockProducts,
} from "@/store/slices/adminSlice";
import { toast } from "@/hooks/use-toast";

import { AdminImageUploader, AdminProductTile } from "./layout";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const ProductsPage = () => {
  const [productReady, setProductReady] = useState(false);

  const [editID, setEditID] = useState(null);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const { isLoading, uploadedImageURL, productsList } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getProducts()).finally(() => setProductReady(true));
  }, [dispatch]);

  if (isLoading || !productReady) return <SkeletonLoader />;

  const handleSubmit = (e) => {
    e.preventDefault();

    (editID
      ? dispatch(editProduct({ productId: editID, formData }))
      : dispatch(addProduct({ ...formData, image: uploadedImageURL }))
    ).then((data) => {
      if (data.payload?.success) {
        toast({
          title: data.payload?.message,
        });

        dispatch(getProducts()).finally(() => {
          setProductReady(true);
          setEditID(null);
        });

        setOpenAddProduct(false);
        setFormData(initialFormData);
        setImageFile(null);
        dispatch(clearImageURL());
      }
    });
  };

  return (
    <>
      <div className="mb-5 w-full flex justify-between">
        <Button
          className="rounded-full bg-red-700 hover:bg-red-800"
          onClick={() => dispatch(getLowStockProducts())}
        >
          Low Stock
        </Button>
        <Button
          className="ml-3"
          onClick={() => {
            setOpenAddProduct(true);

            setFormData(initialFormData);
            setImageFile(null);
            dispatch(clearImageURL());
            setEditID(null);
          }}
        >
          Add Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productsList?.map((product) => (
          <AdminProductTile
            key={product._id}
            product={product}
            setFormData={setFormData}
            setOpenAddProduct={setOpenAddProduct}
            setEditID={setEditID}
          />
        ))}
      </div>

      <Sheet open={openAddProduct} onOpenChange={setOpenAddProduct}>
        <SheetContent side="right" className="overflow-auto">
          <SheetDescription className="sr-only">Add Product</SheetDescription>
          <SheetHeader className="border-b pt-0 pb-2">
            <SheetTitle>
              {editID ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <AdminImageUploader
            imageFile={imageFile}
            setImageFile={setImageFile}
            editMode={editID !== null}
          />

          <div className="py-6">
            <CommonForm
              formControls={addProductFormControls}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              buttonText={editID ? "Edit" : "Add"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProductsPage;
