import { Fragment, useEffect } from "react";
import { getAddresses } from "@/store/slices/addressSlice";

import checkOutImg from "../../assets/checkout.webp";
import { CircleDollarSign, MapPinPlus } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CartContents = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const computeCartTotal = () => {
    const total = cartItems?.items?.reduce(
      (acc, cur) => acc + cur?.quantity * (cur?.salePrice || cur?.price),
      0
    );
    return total.toFixed(2);
  };

  return (
    <div className="mt-6 space-y-4">
      {cartItems && cartItems.items?.length > 0 && (
        <Fragment>
          <div className="space-y-4 pl-1 pr-4">
            {cartItems.items.map((cartItem) => (
              <div
                className="flex items-center space-x-4"
                key={cartItem?.title}
              >
                <img
                  src={cartItem?.image}
                  alt={cartItem?.title}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-extrabold text-md">{cartItem?.title}</h3>
                  <p className="text-sm text-gray-500">x{cartItem?.quantity}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-semibold">
                    $
                    {(
                      (cartItem?.salePrice > 0
                        ? cartItem?.salePrice
                        : cartItem?.price) * cartItem?.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4 pr-4">
            <div className="flex items-center justify-between">
              <span className="text-mg font-bold">Total</span>
              <span className="text-mg font-bold">${computeCartTotal()}</span>
            </div>
          </div>
          <Button
            className="w-full mt-8 bg-emerald-700 hover:bg-emerald-900"
            onClick={() => alert("Order Placed Successfully")}
          >
            <CircleDollarSign /> Checkout
          </Button>
        </Fragment>
      )}
    </div>
  );
};

const AddressContents = () => {
  const { addresses } = useSelector((state) => state.address);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Shipping Address</h1>
        <Button
          className="w-10 h-10 bg-violet-600 hover:bg-violet-800"
          onClick={() => {
            navigate("/shop/account", { state: { tab: "address" } });
          }}
        >
          <MapPinPlus />
        </Button>
      </div>
      <p className="text-sm text-center mb-3 text-gray-500">
        Please select your shipping address to proceed.
      </p>
      <div className="mb-5 p-3 grid grid-cols-1 lg:grid-cols-2  gap-2">
        {addresses.length > 0 &&
          addresses.map((addressItem) => (
            <Card
              key={addressItem._id}
              className="flex flex-col gap-2 p-3 border border-violet-600 rounded-md"
            >
              <CardContent className="grid p-4 gap-4">
                <Label>Address: {addressItem?.address}</Label>
                <Label>City: {addressItem?.city}</Label>
                <Label>pincode: {addressItem?.pincode}</Label>
                <Label>Phone: {addressItem?.phone}</Label>
                <Label>Notes: {addressItem?.notes}</Label>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddresses({ userId: user._id }));
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <div className="relative h-[250px] w-full overflow-hidden">
        <img
          src={checkOutImg}
          className="h-full w-full object-cover"
          alt="checkout"
        />
      </div>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <AddressContents />
        <CartContents />
      </div>
    </div>
  );
};

export default CheckoutPage;
