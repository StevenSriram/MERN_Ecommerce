import { useState } from "react";
import { Link } from "react-router-dom";

import { loginFormControls } from "../../utils/formControls";
import { CommonForm } from "../../components/custom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/use-toast";

import { loginUser } from "../../store/slices/authSlice";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data.payload?.success) {
        toast({
          title: data.payload?.message,
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />

      <p className="mt-2 text-center">
        Don't have an account
        <Link
          className="font-medium ml-2 text-slate-900 hover:underline"
          to="/auth/signup"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
