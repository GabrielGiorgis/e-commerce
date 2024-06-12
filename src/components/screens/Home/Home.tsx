import { useState } from "react";
import { Loader } from "../../ui/Loader/Loader";
import Categories from "../Categories/Categories";
// import AllProducts from "../AllProducts/AllProducts";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  
  
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Categories />
          {/* <AllProducts /> */} {/* FIXME: No funciona */}
        </>
      )}
    </div>
  );
};
