import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function OffersPage() {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist
  } = useWishlist();

  const offerProducts = [
    {
      id: 101,
      title: "Premium Polo Shirt",
      category: "Fashion",
      price: 1399,
      originalPrice: 1999,
      image:
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 102,
      title: "Bluetooth Speaker",
      category: "Electronics",
      price: 1749,
      originalPrice: 2499,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 103,
      title: "Sports Track Jacket",
      category: "Sports",
      price: 2099,
      originalPrice: 2999,
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 104,
      title: "Wireless Mouse",
      category: "Electronics",
      price: 699,
      originalPrice: 999,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 105,
      title: "Travel Backpack",
      category: "Accessories",
      price: 1399,
      originalPrice: 1999,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 106,
      title: "Fitness Water Bottle",
      category: "Sports",
      price: 559,
      originalPrice: 799,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 107,
      title: "Ceramic Coffee Set",
      category: "Home & Living",
      price: 1049,
      originalPrice: 1499,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 108,
      title: "Smart LED Bulb",
      category: "Home & Living",
      price: 419,
      originalPrice: 599,
      image:
        "https://images.unsplash.com/photo-1550985543-f47d1f5e8e4c?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleAddToCart = (product) => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      alert(
        "Please login first to add products to cart."
      );

      navigate("/login");
      return;
    }

    addToCart(product);

    alert(
      `${product.title} added to cart!`
    );
  };

  const handleWishlist = (product) => {
    toggleWishlist(product);
  };

  return (
    <div className="app">

      <Navbar />

      <main className="offers-page">

        {/* ================================
            PAGE HEADER
        ================================= */}

        <section className="offers-page-header">

          <p className="offer-label">
            🔥 LIMITED TIME OFFER
          </p>

          <h1>
            Shop Deals
          </h1>

          <p>
            Grab amazing products at special prices.
            Get flat <strong>30% OFF</strong> on selected
            products.
          </p>

        </section>


        {/* ================================
            OFFER BANNER
        ================================= */}

        <section className="offers-page-banner">

          <div>

            <span>
              🔥 SPECIAL DEAL
            </span>

            <h2>
              Save More. Shop More.
            </h2>

            <p>
              Limited-time discounts on selected products.
            </p>

          </div>

          <div className="offers-big-discount">

            30%

            <small>
              OFF
            </small>

          </div>

        </section>


        {/* ================================
            PRODUCTS SECTION
        ================================= */}

        <section className="offers-products-section">

          <div className="offers-products-heading">

            <div>

              <p className="product-category">
                SPECIAL OFFERS
              </p>

              <h2>
                Deals You Can't Miss
              </h2>

            </div>

            <Link
              to="/products"
              className="view-all-products"
            >
              View All Products →
            </Link>

          </div>


          {/* ================================
              PRODUCTS GRID
          ================================= */}

          <div className="products-grid">

            {offerProducts.map((product) => {

              const liked =
                isInWishlist(product.id);

              return (

                <div
                  className="offer-product-wrapper"
                  key={product.id}
                >

                  {/* DISCOUNT BADGE */}

                  <div className="offer-product-badge">
                    30% OFF
                  </div>


                  {/* PRODUCT CARD */}

                  <div className="product-card">

                    {/* IMAGE */}

                    <div className="product-card-top">

                      <Link
                        to={`/product/${product.id}`}
                        className="product-link"
                      >

                        <div className="product-image">

                          <img
                            src={product.image}
                            alt={product.title}
                          />

                        </div>

                      </Link>


                      {/* WISHLIST */}

                      <button
                        className={`wishlist-btn ${
                          liked ? "active" : ""
                        }`}
                        onClick={() =>
                          handleWishlist(product)
                        }
                        aria-label="Add to wishlist"
                      >

                        {liked
                          ? "❤️"
                          : "♡"}

                      </button>

                    </div>


                    {/* PRODUCT INFORMATION */}

                    <Link
                      to={`/product/${product.id}`}
                      className="product-link"
                    >

                      <div className="product-info">

                        <p className="product-category">
                          {product.category}
                        </p>

                        <h3>
                          {product.title}
                        </h3>


                        {/* DEAL PRICE */}

                        <div className="deal-price">

                          <span className="deal-original-price">
                            ₹
                            {product.originalPrice.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                          <span className="deal-sale-price">
                            ₹
                            {product.price.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                        </div>

                      </div>

                    </Link>


                    {/* ADD TO CART */}

                    <button
                      className="add-cart-btn"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                    >
                      🛒 Add to Cart
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        </section>


        {/* ================================
            BACK HOME
        ================================= */}

        <div className="offers-back">

          <Link
            to="/"
            className="back-home-btn"
          >
            ← Back to Home
          </Link>

        </div>

      </main>


      <Footer />

    </div>
  );
}

export default OffersPage;