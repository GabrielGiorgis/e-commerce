import { useEffect, useState } from "react";
import { Loader } from "../../ui/Loader/Loader";
import { Sales } from "../Sales/Sales";
import { AllProducts } from "../AllProducts/AllProducts";

export const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
            <AllProducts />
            <Sales />
        </>
      )}
    </div>
  );
};
