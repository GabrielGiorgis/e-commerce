import "./StyleSheets/StyleCheckout.css";
export const Checkout = () => {
  return (
    <div className="container">
      <div className="card cart">
        <label className="title">CHECKOUT</label>
        <div className="steps">
          <div className="step">
            <div>
              <span>SHIPPING</span>
              <p>221B Baker Street, W1U 8ED</p>
              <p>London, United Kingdom</p>
            </div>
            <hr />
            <div>
              <span>PAYMENT METHOD</span>
              <p>Visa</p>
              <p>**** **** **** 4243</p>
            </div>
            <hr />
            <div className="promo">
              <span>HAVE A PROMO CODE?</span>
              <form className="form">
                <input
                  type="text"
                  placeholder="Enter a Promo Code"
                  className="input_field"
                />
                <button>Apply</button>
              </form>
            </div>
            <hr />
            <div className="payments">
              <span>PAYMENT</span>
              <div className="details">
                <span>Subtotal:</span>
                <span>$240.00</span>
                <span>Shipping:</span>
                <span>$10.00</span>
                <span>Tax:</span>
                <span>$30.40</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card checkout">
        <div className="footer">
          <label className="price">$280.40</label>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
};
