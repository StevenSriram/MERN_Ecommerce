import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "../../assets/not-found.webp";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <img
        src={NotFoundImage}
        alt="Page Not Found"
        className="w-full max-w-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-900">Oops! Page Not Found</h1>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved. Let's get
        you back on track!
      </p>
      <Button
        className="mt-6 px-6 py-3 text-lg"
        onClick={() => navigate("/", { replace: true })}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
