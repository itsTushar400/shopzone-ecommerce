import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


function Cart() {

  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartCount,
    cartTotal
  } = useCart();

  const {
    isLoggedIn
  } = useAuth();


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
     DISCOUNT AMOUNT
     
     Only Offer products
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
     NORMAL CART DISCOUNT
     
     Keep existing ₹200 discount
     for normal products only.
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
     EMPTY CART
  ======================================== */

  if (cart.length === 0) {

    return (

      <div className="app">

        <Navbar />

        <main className="cart-page">

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

        </main>

        <Footer />

      </div>

    );

  }


  /* ========================================
     MAIN CART
  ======================================== */

  return (

    <div className="app">

      <Navbar />


      <main className="cart-page">


        {/* ==================================
            CART HEADER
        ================================== */}

        <div className="cart-header">

          <div>

            <p className="cart-subtitle">
              YOUR SHOPPING BAG
            </p>

            <h1>
              Shopping Cart
            </h1>

            <p>
              {cartCount}{" "}
              {cartCount === 1
                ? "product"
                : "products"}{" "}
              in your cart
            </p>

          </div>


          <Link
            to="/products"
            className="continue-shopping-btn"
          >
            ← Continue Shopping
          </Link>

        </div>


        {/* ==================================
            CART LAYOUT
        ================================== */}

        <div className="cart-layout">


          {/* ==================================
              CART PRODUCTS
          ================================== */}

          <section className="cart-products">

            {cart.map((item) => {

              const isOffer =
                !!item.originalPrice;


              return (

                <div
                  className="cart-product"
                  key={item.id}
                >


                  {/* PRODUCT IMAGE */}

                  <Link
                    to={`/product/${item.id}`}
                    className="cart-product-image"
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                    />

                  </Link>


                  {/* PRODUCT DETAILS */}

                  <div className="cart-product-details">

                    <p className="cart-category">
                      {item.category}
                    </p>


                    <h3>
                      {item.title}
                    </h3>


                    {/* ==========================
                        OFFER PRODUCT PRICE
                    ========================== */}

                    {isOffer ? (

                      <div className="cart-deal-price">

                        <span className="cart-original-price">
                          ₹
                          {item.originalPrice.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span className="cart-sale-price">
                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                    ) : (

                      /* NORMAL PRODUCT */

                      <p className="cart-price">

                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    )}


                    {/* QUANTITY + REMOVE */}

                    <div className="cart-bottom">


                      <div className="quantity-box">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.id
                            )
                          }
                        >
                          −
                        </button>


                        <span>
                          {item.quantity}
                        </span>


                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.id
                            )
                          }
                        >
                          +
                        </button>

                      </div>


                      <button
                        className="remove-product"
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
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

              );

            })}

          </section>


          {/* ==================================
              ORDER SUMMARY
          ================================== */}

          <aside className="order-summary">

            <h2>
              Order Summary
            </h2>


            {/* ==================================
                OFFER PRODUCT SUMMARY
            ================================== */}

            {hasOfferProduct ? (

              <>


                {/* ORIGINAL PRICE */}

                <div className="summary-line">

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

                <div className="summary-line discount">

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

                <div className="summary-line">

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

              /* ==================================
                 NORMAL PRODUCT
              ================================== */

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

            )}


            {/* ==================================
                SHIPPING
            ================================== */}

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


            {/* ==================================
                NORMAL ₹200 DISCOUNT
            ================================== */}

            {normalDiscount > 0 && (

              <div className="summary-line discount">

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


            {/* DIVIDER */}

            <div className="summary-divider"></div>


            {/* ==================================
                TOTAL
            ================================== */}

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


            {/* CHECKOUT */}

            <Link
              to="/checkout"
              className="checkout-btn"
            >
              Proceed to Checkout →
            </Link>


            <p className="secure-checkout">
              🔒 Secure Checkout
            </p>

          </aside>

        </div>


        {/* ==================================
            CART BENEFITS
        ================================== */}

        <div className="cart-benefits">


          <div>

            <strong>
              📦 Fast Delivery
            </strong>

            <span>
              Quick & reliable shipping
            </span>

          </div>


          <div>

            <strong>
              🔄 Easy Returns
            </strong>

            <span>
              Hassle-free returns
            </span>

          </div>


          <div>

            <strong>
              🔒 Secure Payment
            </strong>

            <span>
              100% secure checkout
            </span>

          </div>


        </div>

      </main>


      <Footer />

    </div>

  );

}


export default Cart;