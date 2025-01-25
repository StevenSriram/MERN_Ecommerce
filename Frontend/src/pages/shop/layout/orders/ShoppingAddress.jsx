import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
  getAddresses,
} from "@/store/slices/addressSlice";

import { addressFormControls } from "@/utils/formControls";
import { CommonForm } from "@/components/custom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

const AddressCard = ({
  addressItem,
  handleDelete,
  setFormData,
  setEditedId,
}) => {
  return (
    <Card>
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressItem?.address}</Label>
        <Label>City: {addressItem?.city}</Label>
        <Label>pincode: {addressItem?.pincode}</Label>
        <Label>Phone: {addressItem?.phone}</Label>
        <Label>Notes: {addressItem?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button
          onClick={() => {
            setFormData({
              address: addressItem.address,
              city: addressItem.city,
              pincode: addressItem.pincode,
              phone: addressItem.phone,
              notes: addressItem.notes,
            });
            setEditedId(addressItem._id);
          }}
        >
          <Edit />
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleDelete(addressItem._id)}
        >
          <Trash />
        </Button>
      </CardFooter>
    </Card>
  );
};

const ShoppingAddress = () => {
  const { addresses } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  });
  const [editedId, setEditedId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getAddresses({ userId: user._id }));
  }, [dispatch]);

  const handleAddress = (e) => {
    e.preventDefault();

    if (addresses.length >= 3 && !editedId) {
      setFormData({
        address: "",
        city: "",
        pincode: "",
        phone: "",
        notes: "",
      });

      toast({
        title: "You can't add more than 2 Address",
        variant: "destructive",
      });
      return;
    }

    (editedId
      ? dispatch(
          editAddress({ userId: user._id, addressId: editedId, formData })
        )
      : dispatch(addAddress({ userId: user._id, ...formData }))
    ).then((data) => {
      if (data.payload?.success) {
        toast({
          title: data.payload?.message,
        });
        setFormData({
          address: "",
          city: "",
          pincode: "",
          phone: "",
          notes: "",
        });
        setEditedId(null);

        dispatch(getAddresses({ userId: user._id }));
      }
    });
  };

  const handleDelete = (addressId) => {
    dispatch(deleteAddress({ userId: user._id, addressId })).then((data) => {
      if (data.payload?.success) {
        toast({
          title: data.payload?.message,
        });
        dispatch(getAddresses({ userId: user._id }));
      }
    });
  };

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addresses.length > 0 &&
          addresses.map((addressItem) => (
            <AddressCard
              key={addressItem._id}
              addressItem={addressItem}
              handleDelete={handleDelete}
              setFormData={setFormData}
              setEditedId={setEditedId}
            />
          ))}
      </div>

      <CardHeader>
        <CardTitle>
          {editedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={editedId !== null ? "Edit" : "Add"}
          handleSubmit={handleAddress}
        />
      </CardContent>
    </Card>
  );
};

export default ShoppingAddress;
