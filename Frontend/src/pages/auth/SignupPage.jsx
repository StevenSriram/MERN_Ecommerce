import { useState } from "react";
import { Link } from "react-router-dom";

import { registerFormControls } from "../../utils/formControls";
import { CommonForm } from "../../components/custom";
import { useDispatch } from "react-redux";
import { useToast } from "../../hooks/use-toast";

import { signupUser } from "../../store/slices/authSlice";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signupUser(formData)).then((data) => {
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
        <h1 className="text-3xl mb font-bold tracking-tight text-foreground">
          Create an account
        </h1>
      </div>

      <div className="mt-8 space-y-6">
        {/* Common Form Component */}
        <CommonForm
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          buttonText={"Sign Up"}
        />
      </div>

      <p className="mt-2 text-center">
        Already have an account
        <Link
          className="font-medium ml-2 text-slate-900 hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
