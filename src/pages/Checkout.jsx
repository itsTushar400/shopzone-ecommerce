import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useCart } from "../context/CartContext";

import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";


function Checkout() {

  const navigate = useNavigate();


  const {
    cart,
    cartTotal,
    clearCart
  } = useCart();


  const {
    isLoggedIn,
    userEmail
  } = useAuth();


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });


  const [paymentMethod, setPaymentMethod] =
    useState("cod");


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  // ==============================
  // LOGIN PROTECTION
  // ==============================

  useEffect(() => {

    if (!isLoggedIn) {
      navigate("/login");
    }

  }, [isLoggedIn, navigate]);


  // ==============================
  // PRICE CALCULATION
  // ==============================

  const shipping =
    cartTotal >= 999 ? 0 : 99;


  const discount =
    cartTotal >= 2000 ? 200 : 0;


  const finalTotal =
    cartTotal + shipping - discount;


  // ==============================
  // INPUT CHANGE
  // ==============================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    // Phone number only
    if (name === "phone") {

      const numbersOnly =
        value.replace(/\D/g, "");

      setFormData((previousData) => ({
        ...previousData,
        phone: numbersOnly
      }));

      setError("");

      return;
    }


    // Pincode only
    if (name === "pincode") {

      const numbersOnly =
        value.replace(/\D/g, "");

      setFormData((previousData) => ({
        ...previousData,
        pincode: numbersOnly
      }));

      setError("");

      return;
    }


    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));


    setError("");

  };


  // ==============================
  // PLACE ORDER
  // ==============================

  const handleSubmit = (e) => {

    e.preventDefault();


    setError("");


    // Check empty fields

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {

      setError(
        "Please fill all delivery details."
      );

      return;
    }


    // Phone validation

    if (formData.phone.length !== 10) {

      setError(
        "Please enter a valid 10-digit phone number."
      );

      return;
    }


    // Pincode validation

    if (formData.pincode.length !== 6) {

      setError(
        "Please enter a valid 6-digit pincode."
      );

      return;
    }


    setLoading(true);


    // ==============================
    // CREATE ORDER
    // ==============================

    const order = {

      id:
        "ORD-" +
        Date.now(),

      userEmail,

      customer: {
        name: formData.name.trim(),
        phone: formData.phone,
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode
      },

      items: cart,

      subtotal: cartTotal,

      shipping,

      discount,

      total: finalTotal,

      paymentMethod,

      status: "Confirmed",

      date:
        new Date().toLocaleString("en-IN")

    };


    // ==============================
    // SAVE ORDER
    // ==============================

    const previousOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];


    const updatedOrders = [
      ...previousOrders,
      order
    ];


    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );


    // ==============================
    // ORDER SUCCESS
    // ==============================

    setTimeout(() => {

      clearCart();

      setLoading(false);

      navigate("/order-success");

    }, 1200);

  };


  // ==============================
  // EMPTY CART
  // ==============================

  if (cart.length === 0) {

    return (

      <>

        <Navbar />


        <div className="empty-cart-page">

          <div className="empty-cart-icon">
            🛒
          </div>


          <h1>
            Your Cart is Empty
          </h1>


          <p>
            Add some products before
            proceeding to checkout.
          </p>


          <Link
            to="/products"
            className="continue-btn"
          >
            Start Shopping →
          </Link>

        </div>

      </>

    );

  }


  // ==============================
  // CHECKOUT PAGE
  // ==============================

  return (

    <>

      <Navbar />


      <div className="checkout-page">


        {/* HEADER */}

        <div className="checkout-header">

          <p className="checkout-subtitle">
            SECURE CHECKOUT
          </p>


          <h1>
            Complete Your Order
          </h1>


          <p>
            Enter your delivery details
            and choose a payment method.
          </p>

        </div>


        <div className="checkout-layout checkout-layout-vertical">


          {/* =================================
              LEFT SIDE
          ================================= */}

          <div className="checkout-form-card checkout-form-full">

            <form onSubmit={handleSubmit}>


              {/* DELIVERY DETAILS */}

              <div className="checkout-section">

                <h2>
                  📦 Delivery Details
                </h2>


                {/* ERROR */}

                {error && (

                  <div className="checkout-error">
                    ⚠️ {error}
                  </div>

                )}


                <div className="checkout-grid">


                  {/* NAME */}

                  <div className="form-group">

                    <label>
                      Full Name
                    </label>


                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                  </div>


                  {/* PHONE */}

                  <div className="form-group">

                    <label>
                      Phone Number
                    </label>


                    <input
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength="10"
                    />

                  </div>


                  {/* ADDRESS */}

                  <div className="form-group full-width">

                    <label>
                      Address
                    </label>


                    <textarea
                      name="address"
                      placeholder="House no., street, area"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                    />

                  </div>


                  {/* CITY */}

                  <div className="form-group">

                    <label>
                      City
                    </label>


                    <input
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                    />

                  </div>


                  {/* STATE */}

                  <div className="form-group">

                    <label>
                      State
                    </label>


                    <input
                      type="text"
                      name="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={handleChange}
                    />

                  </div>


                  {/* PINCODE */}

                  <div className="form-group">

                    <label>
                      Pincode
                    </label>


                    <input
                      type="text"
                      name="pincode"
                      placeholder="6-digit pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      maxLength="6"
                    />

                  </div>

                </div>

              </div>


              {/* =================================
                  PAYMENT
              ================================= */}

              <div className="checkout-section">

                <h2>
                  💳 Payment Method
                </h2>


                <div className="payment-options">


                  {/* COD */}

                  <label
                    className={`payment-option ${
                      paymentMethod === "cod"
                        ? "selected"
                        : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={
                        paymentMethod === "cod"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                    />


                    <div>

                      <strong>
                        Cash on Delivery
                      </strong>


                      <span>
                        Pay when your order arrives
                      </span>

                    </div>

                  </label>


                  {/* UPI */}

                  <label
                    className={`payment-option ${
                      paymentMethod === "upi"
                        ? "selected"
                        : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={
                        paymentMethod === "upi"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                    />


                    <div>

                      <strong>
                        UPI
                      </strong>


                      <span>
                        Pay securely using UPI
                      </span>

                    </div>

                  </label>


                  {/* CARD */}

                  <label
                    className={`payment-option ${
                      paymentMethod === "card"
                        ? "selected"
                        : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={
                        paymentMethod === "card"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                    />


                    <div>

                      <strong>
                        Credit / Debit Card
                      </strong>


                      <span>
                        Secure card payment
                      </span>

                    </div>

                  </label>


                </div>

              </div>


              {/* =================================
                  PLACE ORDER
              ================================= */}

              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >

                {loading
                  ? "⏳ Placing Order..."
                  : `Place Order • ₹${finalTotal.toLocaleString(
                      "en-IN"
                    )}`}

              </button>


              {/* BACK TO CART */}

              <Link
                to="/cart"
                className="back-cart-link"
              >
                ← Back to Cart
              </Link>


            </form>

          </div>


          {/* =================================
              RIGHT SIDE
          ================================= */}

          <div className="checkout-summary checkout-summary-full">


            <h2>
              Order Summary
            </h2>


            {/* PRODUCTS */}

            <div className="checkout-products">

              {cart.map((item) => (

                <div
                  className="checkout-product"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.title}
                  />


                  <div>

                    <h3>
                      {item.title}
                    </h3>


                    <p>
                      Qty: {item.quantity}
                    </p>

                  </div>


                  <strong>
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              ))}

            </div>


            <div className="summary-divider"></div>


            {/* SUBTOTAL */}

            <div className="summary-line">

              <span>
                Subtotal
              </span>


              <span>
                ₹
                {cartTotal.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>


            {/* SHIPPING */}

            <div className="summary-line">

              <span>
                Shipping
              </span>


              <span>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </span>

            </div>


            {/* DISCOUNT */}

            {discount > 0 && (

              <div className="summary-line discount">

                <span>
                  Discount
                </span>


                <span>
                  -₹{discount}
                </span>

              </div>

            )}


            <div className="summary-divider"></div>


            {/* TOTAL */}

            <div className="summary-total">

              <span>
                Total
              </span>


              <strong>
                ₹
                {finalTotal.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <div className="secure-checkout">
              🔒 Your information is secure
            </div>

          </div>

        </div>

      </div>

    </>

  );

}


export default Checkout;