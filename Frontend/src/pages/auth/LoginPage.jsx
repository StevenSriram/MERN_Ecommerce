import { useState } from "react";
import { Link } from "react-router-dom";

import { loginFormControls } from "../../utils/formControls";
import { CommonForm } from "../../components/custom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Email: ${formData.email}, Password: ${formData.password}`);
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
