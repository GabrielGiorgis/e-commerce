import { useState } from "react";
import { Loader } from "../../ui/Loader/Loader";
import Categories from "../Categories/Categories";
import { Sales } from "../Sales/Sales";
import { AllProducts } from "../AllProducts/AllProducts";
import { RegisterClient } from "../UserCLient/RegisterClient";
import { LoginClient } from "../UserCLient/LoginClient";
import { RutaPrivada } from "../UserCLient/RutaPrivada";
// import AllProducts from "../AllProducts/AllProducts";

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
