import { useState } from "react";
import { Loader } from "../../ui/Loader/Loader";
import { Sales } from "../Sales/Sales";
import { AllProducts } from "../AllProducts/AllProducts";

export const Home = () => {
  const [loading, setLoading] = useState(false);


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
