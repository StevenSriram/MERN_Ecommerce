import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import paymentImg from "../../assets/payment.gif";
import { useEffect } from "react";
import { capturePayment } from "@/store/slices/orderSlice";

const PaymentReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = sessionStorage.getItem("orderId");

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("orderId");

          navigate("/shop/payment-status", { state: { completed: true } });
        }
      });
    } else {
      navigate("/shop");
    }
  }, [paymentId, payerId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src={paymentImg}
          className="h-full w-full object-cover max-md:object-center max-md:pr-2"
        />
      </div>
    </div>
  );
};

export default PaymentReturnPage;
