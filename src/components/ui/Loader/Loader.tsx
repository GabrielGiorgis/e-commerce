import "./Loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="load-row">
        <img src="../../pizza_color.png" alt="Pizza" />
        <img src="../../burger_color.png" alt="Burger" />
        <img src="../../sandwich_color.png" alt="Sandwich" />
        <img src="../../drink_color.png" alt="Drink" />
      </div>
    </div>
  );
};
