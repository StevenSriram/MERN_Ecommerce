import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDiscount,
  deleteDiscount,
  getDiscounts,
} from "@/store/slices/featureSlice";

import { discountFormControls } from "@/utils/formControls";
import { CommonForm } from "@/components/custom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";

const DiscountCard = ({ discountItem, handleDelete }) => {
  return (
    <Card className="border py-4 px-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
      <CardContent className="flex flex-col gap-2">
        <div className="mb-3">
          <h2 className="text-xl font-mono font-semibold text-gray-900 mb-3">
            {discountItem?.name}
          </h2>
          <p className="text-sm text-justify text-gray-600">
            {discountItem?.description}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-green-500">
            {discountItem?.percent}% Off
          </div>
          <div className="text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded-md">
            Code : {discountItem?.code}
          </div>
        </div>
      </CardContent>

      <Trash
        className="absolute top-3 right-3 w-6 h-6 text-red-600 cursor-pointer hover:text-red-700"
        onClick={() => handleDelete(discountItem._id)}
      />
    </Card>
  );
};

const DiscountPage = () => {
  const { discountList } = useSelector((state) => state.feature);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase(),
    percent: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getDiscounts({ userId: user._id }));
  }, [dispatch]);

  const handleDiscount = (e) => {
    e.preventDefault();

    dispatch(addDiscount(formData)).then((data) => {
      if (data.payload?.success) {
        toast({
          title: data.payload?.message,
        });
        setFormData({
          name: "",
          description: "",
          code: "",
          percent: "",
        });

        dispatch(getDiscounts({ userId: user._id }));
      }
    });
  };

  const handleDelete = (discountId) => {
    dispatch(deleteDiscount(discountId)).then((data) => {
      if (data.payload?.success) {
        toast({
          title: data.payload?.message,
        });
        dispatch(getDiscounts({ userId: user._id }));
      }
    });
  };

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {discountList.length > 0 &&
          discountList.map((discountItem) => (
            <DiscountCard
              key={discountItem._id}
              discountItem={discountItem}
              handleDelete={handleDelete}
            />
          ))}
      </div>

      <CardHeader>
        <CardTitle>Add New Discount</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={discountFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText="Add Coupon"
          handleSubmit={handleDiscount}
        />
      </CardContent>
    </Card>
  );
};

export default DiscountPage;
