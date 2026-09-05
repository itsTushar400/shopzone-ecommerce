import { useEffect } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useCart } from "../context/CartContext";

import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";


function Cart() {

  const navigate = useNavigate();


  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal
  } = useCart();


  const {
    isLoggedIn
  } = useAuth();


  // ==============================
  // PROTECT CART PAGE
  // ==============================

  useEffect(() => {

    if (!isLoggedIn) {

      navigate("/login");

    }

  }, [isLoggedIn, navigate]);


  const shipping =
    cartTotal >= 999 ? 0 : 99;


  const discount =
    cartTotal >= 2000 ? 200 : 0;


  const finalTotal =
    cartTotal + shipping - discount;


  // ==============================
  // NOT LOGGED IN
  // ==============================

  if (!isLoggedIn) {

    return null;

  }


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
            Looks like you haven't added
            anything to your cart yet.
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
  // CART PAGE
  // ==============================

  return (

    <>

      {/* NAVBAR */}

      <Navbar />


      <div className="cart-page">


        {/* HEADER */}

        <div className="cart-header">

          <div>

            <p className="cart-subtitle">
              YOUR SHOPPING BAG
            </p>


            <h1>
              Shopping Cart
            </h1>


            <p>
              {cart.length} product
              {cart.length > 1 ? "s" : ""}
              {" "}in your cart
            </p>

          </div>


          <Link
            to="/products"
            className="continue-shopping-btn"
          >
            ← Continue Shopping
          </Link>

        </div>


        {/* CART LAYOUT */}

        <div className="cart-layout">


          {/* CART PRODUCTS */}

          <div className="cart-products">

            {cart.map((item) => (

              <div
                className="cart-product"
                key={item.id}
              >


                {/* IMAGE */}

                <div className="cart-product-image">

                  <img
                    src={item.image}
                    alt={item.title}
                  />

                </div>


                {/* DETAILS */}

                <div className="cart-product-details">

                  <p className="cart-category">
                    {item.category}
                  </p>


                  <h3>
                    {item.title}
                  </h3>


                  <p className="cart-price">
                    ₹
                    {item.price.toLocaleString(
                      "en-IN"
                    )}
                  </p>


                  {/* QUANTITY + REMOVE */}

                  <div className="cart-bottom">

                    <div className="quantity-box">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>


                      <span>
                        {item.quantity}
                      </span>


                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>


                    <button
                      className="remove-product"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      🗑 Remove
                    </button>

                  </div>

                </div>


                {/* ITEM TOTAL */}

                <div className="item-total">

                  <span>
                    Item Total
                  </span>


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

              </div>

            ))}

          </div>


          {/* ORDER SUMMARY */}

          <div className="order-summary">

            <h2>
              Order Summary
            </h2>


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


            <Link
              to="/checkout"
              className="checkout-btn"
            >
              Proceed to Checkout →
            </Link>


            <div className="secure-checkout">
              🔒 Secure Checkout
            </div>

          </div>

        </div>


        {/* BENEFITS */}

        <div className="cart-benefits">


          <div>

            🚚

            <strong>
              Free Shipping
            </strong>

            <span>
              On orders above ₹999
            </span>

          </div>


          <div>

            🔄

            <strong>
              Easy Returns
            </strong>

            <span>
              7 days return policy
            </span>

          </div>


          <div>

            🔒

            <strong>
              Secure Payment
            </strong>

            <span>
              100% secure checkout
            </span>

          </div>


        </div>

      </div>

    </>

  );

}


export default Cart;