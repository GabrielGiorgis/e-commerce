import { useState } from "react";
import { Loader } from "../../ui/Loader/Loader";
import Categories from "../Categories/Categories";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  
  
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Categories />
        </>
      )}
    </div>
  );
};
