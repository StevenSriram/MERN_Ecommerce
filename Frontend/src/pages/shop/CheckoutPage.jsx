import { Fragment, useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import checkOutImg from "../../assets/checkout.webp";
import {
  CircleDollarSign,
  CircleOff,
  Currency,
  MapPinPlus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { getAddresses } from "@/store/slices/addressSlice";
import { createOrder } from "@/store/slices/orderSlice";
import { getDiscounts } from "@/store/slices/featureSlice";

const CartContents = ({ selectedAddress, selectedDiscount, computedTotal }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoading, approvalURL, orderId } = useSelector(
    (state) => state.order
  );

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
      cartItems: cartItems?.items.map((item) => {
        const price = item?.salePrice > 0 ? item?.salePrice : item?.price;
        const discountedPrice = selectedDiscount
          ? price - (price * selectedDiscount.percent) / 100
          : price;

        return {
          productId: item?.productId,
          title: item?.title,
          image: item?.image,
          price: discountedPrice.toFixed(2), // Ensure price is a string with 2 decimal places
          quantity: item?.quantity,
        };
      }),

      addressInfo: {
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
      totalAmount: computedTotal, // Use the computed total with discount
      paymentId: "",
      payerId: "",
    };

    dispatch(createOrder(orderData));
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="mt-4 space-y-4 min-h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-violet-600 leading-normal font-mono font-bold mb-4">
          Cart to Order
        </h1>
      </div>
      {cartItems && cartItems.items?.length > 0 ? (
        <Fragment>
          <div className="space-y-4 pl-1 pr-4">
            {cartItems.items.map((cartItem) => {
              const price =
                cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price;
              const discountedPrice = selectedDiscount
                ? price - (price * selectedDiscount.percent) / 100
                : price;

              return (
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
                    <h3 className="font-extrabold text-md">
                      {cartItem?.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      x{cartItem?.quantity}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-semibold">
                      ${(discountedPrice * cartItem?.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 space-y-4 pr-4">
            <div className="flex items-center justify-between">
              <span className="text-mg font-bold">Total</span>
              <span className="text-mg font-bold">${computedTotal}</span>
            </div>
          </div>
          <Button
            className="w-full mt-8 bg-emerald-700 hover:bg-emerald-900"
            onClick={handlePayment}
          >
            {isLoading ? (
              <Currency className="text-center animate-spin w-10 h-10" />
            ) : (
              <span className="flex items-center">
                <CircleDollarSign className="w-12 h-12 inline-block mr-2" />{" "}
                Checkout
              </span>
            )}
          </Button>
        </Fragment>
      ) : (
        <div className="text-lg text-muted-foreground">
          <CircleOff className="mx-auto my-10 h-32 w-32 text-red-400" />
          <p className="text-center text-xl">
            {" "}
            Cart is empty.
            <Link
              to="/shop"
              className="ml-1 hover:underline transition duration-200 ease-in-out"
            >
              Add some items to cart{" "}
            </Link>
            to checkout.
          </p>
        </div>
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
          className="w-10 h-10 mr-3 bg-violet-600 hover:bg-violet-800"
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

const DiscountContents = ({ selectedDiscount, setSelectedDiscount }) => {
  const { discountList } = useSelector((state) => state.feature);

  return (
    <div className="flex flex-col mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Discount Coupons</h1>
      </div>
      <div className="mb-2 p-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
        {discountList.length > 0 ? (
          discountList.map((discountItem) => (
            <Card
              className={`border ${
                selectedDiscount?._id === discountItem._id
                  ? "border-orange-500 border-2 shadow-orange-400"
                  : ""
              } py-4 px-2 rounded-lg shadow-lg hover:shadow-xl 
                transition-shadow duration-300 ease-in-out relative`}
              key={discountItem?.code}
              onClick={() => setSelectedDiscount(discountItem)}
            >
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
            </Card>
          ))
        ) : (
          <div className="text-center text-lg text-gray-600 col-span-2">
            No discount coupons right now.
          </div>
        )}
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddresses({ userId: user._id }));
    dispatch(getDiscounts({ userId: user._id }));
  }, [dispatch]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  // ? Memoize the computed cart total
  const computedTotal = useMemo(() => {
    // Calculate the total price with discount
    let total = cartItems?.items
      ?.reduce((acc, cur) => {
        const price = cur?.salePrice > 0 ? cur?.salePrice : cur?.price;
        const discountedPrice = selectedDiscount
          ? price - (price * selectedDiscount.percent) / 100
          : price;

        return acc + cur?.quantity * discountedPrice;
      }, 0)
      .toFixed(2);

    return total;
  }, [cartItems?.items, selectedDiscount]);

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
        <div className="max-h-[350px] overflow-auto">
          <AddressContents
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
          <DiscountContents
            selectedDiscount={selectedDiscount}
            setSelectedDiscount={setSelectedDiscount}
          />
        </div>
        <CartContents
          selectedAddress={selectedAddress}
          selectedDiscount={selectedDiscount}
          computedTotal={computedTotal}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
