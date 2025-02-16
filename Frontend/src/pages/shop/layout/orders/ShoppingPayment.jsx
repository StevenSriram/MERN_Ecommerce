import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import successImg from "../../../../assets/success.webp";
import failureImg from "../../../../assets/failure.webp";
import { Button } from "@/components/ui/button";

import { useDispatch, useSelector } from "react-redux";
import { failedPayment } from "@/store/slices/orderSlice";
import { clearCart } from "@/store/slices/cartSlice";

const ShoppingPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const completed = location.state?.completed ?? false;

  useEffect(() => {
    if (!completed) {
      const orderId = sessionStorage.getItem("orderId");

      dispatch(failedPayment(orderId)).then((data) => {
        if (data.payload?.success) {
          dispatch(clearCart());
          sessionStorage.removeItem("orderId");
        }
      });
    }
  }, []);

  const handleNavigate = () => {
    if (completed) {
      navigate("/shop");
    } else {
      navigate("/shop/account", { state: { tab: "orders" } });
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={`relative h-[500px] w-full overflow-hidden ${
          completed ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <img
          src={completed ? successImg : failureImg}
          className="mx-auto object-cover max-md:object-center max-md:pr-2"
        />
      </div>
      <Button className="mt-4 mx-auto" onClick={handleNavigate}>
        {completed ? "Continue Shopping" : "Check Order"}{" "}
      </Button>
    </div>
  );
};

export default ShoppingPayment;
