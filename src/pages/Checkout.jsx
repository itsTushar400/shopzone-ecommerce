import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


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


  /* ========================================
     FORM STATE
  ======================================== */

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


  /* ========================================
     LOGIN PROTECTION
  ======================================== */

  useEffect(() => {

    if (!isLoggedIn) {
      navigate("/login");
    }

  }, [isLoggedIn, navigate]);


  /* ========================================
     CHECK OFFER PRODUCTS
  ======================================== */

  const hasOfferProduct = cart.some(
    (item) => item.originalPrice
  );


  /* ========================================
     ORIGINAL PRICE
     
     Offer product:
     originalPrice

     Normal product:
     price
  ======================================== */

  const originalPriceTotal = cart.reduce(
    (total, item) => {

      const price =
        item.originalPrice || item.price;

      return (
        total +
        price * item.quantity
      );

    },
    0
  );


  /* ========================================
     OFFER DISCOUNT
  ======================================== */

  const offerDiscount = cart.reduce(
    (total, item) => {

      if (!item.originalPrice) {
        return total;
      }

      const discountPerItem =
        item.originalPrice - item.price;

      return (
        total +
        discountPerItem * item.quantity
      );

    },
    0
  );


  /* ========================================
     DISCOUNT PERCENTAGE
  ======================================== */

  const discountPercentage =
    originalPriceTotal > 0
      ? Math.round(
          (offerDiscount /
            originalPriceTotal) *
            100
        )
      : 0;


  /* ========================================
     SHIPPING
  ======================================== */

  const shipping =
    cartTotal >= 999
      ? 0
      : 99;


  /* ========================================
     NORMAL PRODUCT DISCOUNT
     
     ₹200 discount ONLY for normal products.
     
     If offer product exists,
     don't apply another ₹200 discount.
  ======================================== */

  const normalDiscount =
    !hasOfferProduct &&
    cartTotal >= 2000
      ? 200
      : 0;


  /* ========================================
     FINAL TOTAL
  ======================================== */

  const finalTotal =
    cartTotal +
    shipping -
    normalDiscount;


  /* ========================================
     HANDLE INPUT
  ======================================== */

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    if (
      name === "phone" ||
      name === "pincode"
    ) {

      const numbersOnly =
        value.replace(/\D/g, "");

      setFormData(
        (previous) => ({
          ...previous,
          [name]:
            name === "phone"
              ? numbersOnly.slice(0, 10)
              : numbersOnly.slice(0, 6)
        })
      );

      return;
    }


    setFormData(
      (previous) => ({
        ...previous,
        [name]: value
      })
    );

  };


  /* ========================================
     PLACE ORDER
  ======================================== */

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");


    /* ==============================
       VALIDATION
    ============================== */

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {

      setError(
        "Please fill all delivery details."
      );

      return;
    }


    if (formData.phone.length !== 10) {

      setError(
        "Please enter a valid 10-digit phone number."
      );

      return;
    }


    if (formData.pincode.length !== 6) {

      setError(
        "Please enter a valid 6-digit pincode."
      );

      return;
    }


    setLoading(true);


    /* ==================================
       CREATE ORDER
    ================================== */

    const order = {

      id:
        `ORD-${Date.now()}`,

      userEmail,

      customer: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },

      items: cart,

      /* Original product value */
      originalPrice:
        originalPriceTotal,

      /* Offer discount */
      discount:
        hasOfferProduct
          ? offerDiscount
          : normalDiscount,

      discountPercentage:
        hasOfferProduct
          ? discountPercentage
          : 0,

      /* Actual product price after offer */
      subtotal:
        cartTotal,

      shipping,

      total:
        finalTotal,

      paymentMethod,

      status:
        "Confirmed",

      date:
        new Date().toISOString()

    };


    /* ==================================
       SAVE ORDER
    ================================== */

    const existingOrders =
      JSON.parse(
        localStorage.getItem("orders") || "[]"
      );


    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...existingOrders,
        order
      ])
    );


    /* ==================================
       ORDER SUCCESS
    ================================== */

    setTimeout(() => {

      clearCart();

      navigate("/order-success");

    }, 1200);

  };


  /* ========================================
     EMPTY CART
  ======================================== */

  if (cart.length === 0) {

    return (

      <div className="app">

        <Navbar />

        <main className="checkout-page">

          <div className="empty-checkout">

            <h1>
              Your Cart is Empty
            </h1>

            <p>
              Add some products before checkout.
            </p>

            <Link
              to="/products"
              className="continue-btn"
            >
              Start Shopping →
            </Link>

          </div>

        </main>

      </div>

    );

  }


  /* ========================================
     CHECKOUT PAGE
  ======================================== */

  return (

    <div className="app">

      <Navbar />


      <main className="checkout-page">


        {/* ==================================
            HEADER
        ================================== */}

        <div className="checkout-header">

          <p className="checkout-label">
            SECURE CHECKOUT
          </p>

          <h1>
            Complete Your Order
          </h1>

          <p>
            Review your order and enter
            your delivery details.
          </p>

        </div>


        {/* ==================================
            CHECKOUT LAYOUT
        ================================== */}

        <div className="checkout-layout">


          {/* ==================================
              ORDER SUMMARY
          ================================== */}

          <section className="checkout-summary">

            <h2>
              Order Summary
            </h2>


            {/* PRODUCTS */}

            <div className="checkout-items">

              {cart.map((item) => (

                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.title}
                  />


                  <div className="checkout-item-info">

                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      Qty: {item.quantity}
                    </span>

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


            {/* ==================================
                PRICE DETAILS
            ================================== */}

            <div className="checkout-price-details">


              {hasOfferProduct ? (

                <>

                  {/* ORIGINAL PRICE */}

                  <div className="checkout-price-row">

                    <span>
                      Original Price
                    </span>

                    <span>
                      ₹
                      {originalPriceTotal.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>


                  {/* DISCOUNT */}

                  <div className="checkout-price-row checkout-discount">

                    <span>
                      Discount ({discountPercentage}%)
                    </span>

                    <span>
                      -₹
                      {offerDiscount.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>


                  {/* DISCOUNT PRICE */}

                  <div className="checkout-price-row">

                    <span>
                      Discount Price
                    </span>

                    <span>
                      ₹
                      {cartTotal.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                </>

              ) : (

                /* NORMAL PRODUCTS */

                <div className="checkout-price-row">

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

              )}


              {/* SHIPPING */}

              <div className="checkout-price-row">

                <span>
                  Shipping
                </span>

                <span>
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping}`}
                </span>

              </div>


              {/* NORMAL ₹200 DISCOUNT */}

              {normalDiscount > 0 && (

                <div className="checkout-price-row checkout-discount">

                  <span>
                    Extra Discount
                  </span>

                  <span>
                    -₹
                    {normalDiscount.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              )}

            </div>


            {/* TOTAL */}

            <div className="checkout-total">

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


            <p className="checkout-secure">
              🔒 Your information is secure
            </p>

          </section>


          {/* ==================================
              DELIVERY + PAYMENT
          ================================== */}

          <section className="checkout-form-card">

            <form
              onSubmit={handleSubmit}
            >


              {/* ==================================
                  DELIVERY DETAILS
              ================================== */}

              <h2>
                📦 Delivery Details
              </h2>


              <div className="checkout-form-grid">


                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                  />

                </div>


                <div className="form-group full-width">

                  <label>
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House no, street, area"
                    rows="4"
                  ></textarea>

                </div>


                <div className="form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />

                </div>


                <div className="form-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                  />

                </div>

              </div>


              {/* ==================================
                  PAYMENT METHOD
              ================================== */}

              <h2 className="payment-heading">
                💳 Payment Method
              </h2>


              <div className="payment-options">


                <label
                  className={
                    paymentMethod === "cod"
                      ? "payment-option active"
                      : "payment-option"
                  }
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

                  <span>
                    💵 Cash on Delivery
                  </span>

                </label>


                <label
                  className={
                    paymentMethod === "online"
                      ? "payment-option active"
                      : "payment-option"
                  }
                >

                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={
                      paymentMethod === "online"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <span>
                    💳 Online Payment
                  </span>

                </label>

              </div>


              {/* ERROR */}

              {error && (

                <p className="checkout-error">
                  {error}
                </p>

              )}


              {/* ==================================
                  PLACE ORDER
              ================================== */}

              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >

                {loading
                  ? "Placing Order..."
                  : "Place Order →"}

              </button>


              {/* BACK TO CART */}

              <Link
                to="/cart"
                className="back-cart-btn"
              >
                ← Back to Cart
              </Link>


            </form>

          </section>

        </div>

      </main>

    </div>

  );

}


export default Checkout;