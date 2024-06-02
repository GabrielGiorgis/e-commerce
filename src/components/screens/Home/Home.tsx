import { useState } from "react";
import { Loader } from "../../ui/Loader/Loader";
import Header from "../../ui/Bars/Header/Header";
import Categories from "../Categories/Categories";
import { Footer } from "../../ui/Bars/Footer/Footer";

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
