import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import UnAuthImage from "../../assets/un-auth.webp";

const UnAuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <img
        src={UnAuthImage}
        alt="Unauthorized Access"
        className="w-full max-w-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        You do not have permission to view this page. Please log in with an
        admin account.
      </p>
      <div className="mt-6 space-x-4">
        <Button
          variant="default"
          onClick={() => navigate("/", { replace: true })}
        >
          Go to Home
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/auth/login", { replace: true })}
        >
          Login as Admin
        </Button>
      </div>
    </div>
  );
};

export default UnAuthPage;
