import { Fragment, useEffect, useState } from "react";
import { getAddresses } from "@/store/slices/addressSlice";
import { createOrder } from "@/store/slices/orderSlice";

import checkOutImg from "../../assets/checkout.webp";
import { CircleDollarSign, Currency, MapPinPlus } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CartContents = ({ selectedAddress }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoading, approvalURL } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const handlePayment = () => {
    if (!selectedAddress) {
      toast({
        title: "Please select an address",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?._id,

      cartId: cartItems?._id,
      cartItems: cartItems?.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),

      addessInfo: {
        addressId: selectedAddress?._id,
        address: selectedAddress?.address,
        city: selectedAddress?.city,
        pincode: selectedAddress?.pincode,
        phone: selectedAddress?.phone,
        notes: selectedAddress?.notes,
      },

      orderStaus: undefined,
      orderDate: undefined,
      orderUpdatedDate: undefined,

      paymentMehod: "Paypal",
      paymentStatus: undefined,
      totalAmount: computeCartTotal(),

      paymentId: "",
      payerId: "",
    };

    dispatch(createOrder(orderData));
  };

  const computeCartTotal = () => {
    const total = cartItems?.items?.reduce(
      (acc, cur) => acc + cur?.quantity * (cur?.salePrice || cur?.price),
      0
    );
    return total.toFixed(2);
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

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
            onClick={handlePayment}
          >
            {isLoading ? (
              <Currency className="text-center animate-spin w-10 h-10" />
            ) : (
              <Fragment>
                <CircleDollarSign />
                <span className="ml-2">Checkout</span>
              </Fragment>
            )}
          </Button>
        </Fragment>
      )}
    </div>
  );
};

const AddressContents = ({ selectedAddress, setSelectedAddress }) => {
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
      <div className="mb-5 p-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
        {addresses.length > 0 &&
          addresses.map((addressItem) => (
            <Card
              key={addressItem._id}
              onClick={() => setSelectedAddress(addressItem)}
              className={`flex flex-col gap-2 p-3 border border-violet-600 rounded-md
              ${
                selectedAddress?._id === addressItem._id &&
                "border-violet-800 border-2 shadow-lg shadow-violet-400"
              }`}
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

  const [selectedAddress, setSelectedAddress] = useState(null);

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
        <AddressContents
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <CartContents selectedAddress={selectedAddress} />
      </div>
    </div>
  );
};

export default CheckoutPage;
