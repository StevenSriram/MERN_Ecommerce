import { useEffect } from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    alert(isAuthenticated);
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
