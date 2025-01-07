import { useState } from "react";
import { CommonForm, ImageUploader } from "@/components/custom";
import { addProductFormControls } from "@/utils/formControls";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const ProductsPage = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button className="ml-3" onClick={() => setOpenAddProduct(true)}>
          Add Product
        </Button>
      </div>
      <Sheet open={openAddProduct} onOpenChange={setOpenAddProduct}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="border-b pt-0 pb-2">
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>

          <ImageUploader
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageURL={uploadedImageURL}
            setUploadedImageURL={setUploadedImageURL}
          />

          <div className="py-6">
            <CommonForm
              formControls={addProductFormControls}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              buttonText={"Add"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProductsPage;
