import {
  useParams,
  Link,
  useNavigate
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import Navbar from "../components/Navbar";


function ProductDetails({ products }) {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist
  } = useWishlist();


  /* ========================================
     OFFER PRODUCTS
  ======================================== */

  const offerProducts = [
    {
      id: 101,
      title: "Premium Polo Shirt",
      category: "Fashion",
      price: 1399,
      originalPrice: 1999,
      image:
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=800&q=80",
      description:
        "Premium quality polo shirt with a comfortable fit and stylish design."
    },

    {
      id: 102,
      title: "Bluetooth Speaker",
      category: "Electronics",
      price: 1749,
      originalPrice: 2499,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
      description:
        "Portable Bluetooth speaker with powerful sound and modern design."
    },

    {
      id: 103,
      title: "Sports Track Jacket",
      category: "Sports",
      price: 2099,
      originalPrice: 2999,
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
      description:
        "Comfortable sports track jacket designed for active lifestyles."
    },

    {
      id: 104,
      title: "Wireless Mouse",
      category: "Electronics",
      price: 699,
      originalPrice: 999,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
      description:
        "Smooth and responsive wireless mouse for everyday computer use."
    },

    {
      id: 105,
      title: "Travel Backpack",
      category: "Accessories",
      price: 1399,
      originalPrice: 1999,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      description:
        "Spacious and durable travel backpack suitable for work and travel."
    },

    {
      id: 106,
      title: "Fitness Water Bottle",
      category: "Sports",
      price: 559,
      originalPrice: 799,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
      description:
        "Reusable fitness water bottle designed for workouts and outdoor activities."
    },

    {
      id: 107,
      title: "Ceramic Coffee Set",
      category: "Home & Living",
      price: 1049,
      originalPrice: 1499,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
      description:
        "Elegant ceramic coffee set perfect for your home and coffee moments."
    },

    {
      id: 108,
      title: "Smart LED Bulb",
      category: "Home & Living",
      price: 419,
      originalPrice: 599,
      image:
        "https://images.unsplash.com/photo-1550985543-f47d1f5e8e4c?auto=format&fit=crop&w=800&q=80",
      description:
        "Energy-efficient smart LED bulb with a modern design for your home."
    }
  ];


  /* ========================================
     FIND PRODUCT
     
     First search normal products.
     If not found, search offer products.
  ======================================== */

  const normalProduct =
    products?.find(
      (item) => item.id === Number(id)
    );

  const offerProduct =
    offerProducts.find(
      (item) => item.id === Number(id)
    );

  const product =
    normalProduct || offerProduct;


  /* ========================================
     CHECK OFFER PRODUCT
  ======================================== */

  const isOfferProduct =
    !!product?.originalPrice;


  /* ========================================
     WISHLIST
  ======================================== */

  const liked =
    product
      ? isInWishlist(product.id)
      : false;


  const handleWishlist = () => {

    if (!product) {
      return;
    }

    toggleWishlist(product);

  };


  /* ========================================
     ADD TO CART
  ======================================== */

  const handleAddToCart = () => {

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


  /* ========================================
     PRODUCT NOT FOUND
  ======================================== */

  if (!product) {

    return (
      <>

        <Navbar />

        <div className="not-found">

          <h2>
            Product Not Found 😔
          </h2>

          <Link to="/products">
            ← Back to Products
          </Link>

        </div>

      </>
    );

  }


  /* ========================================
     PRODUCT DETAILS
  ======================================== */

  return (

    <>

      <Navbar />

      <div className="details-page">


        {/* ==================================
            PRODUCT IMAGE
        ================================== */}

        <div className="details-image">

          <img
            src={product.image}
            alt={product.title}
          />

        </div>


        {/* ==================================
            PRODUCT INFORMATION
        ================================== */}

        <div className="details-content">

          <p className="product-category">
            {product.category}
          </p>


          <h1>
            {product.title}
          </h1>


          {/* ==================================
              OFFER PRICE
          ================================== */}

          {isOfferProduct ? (

            <div className="details-deal-price">

              <span className="details-original-price">
                ₹
                {product.originalPrice.toLocaleString(
                  "en-IN"
                )}
              </span>

              <span className="details-sale-price">
                ₹
                {product.price.toLocaleString(
                  "en-IN"
                )}
              </span>

              <span className="details-offer-badge">
                30% OFF
              </span>

            </div>

          ) : (

            <h2>
              ₹
              {product.price.toLocaleString(
                "en-IN"
              )}
            </h2>

          )}


          {/* DESCRIPTION */}

          <p>
            {product.description ||
              "High quality product with excellent design and performance."}
          </p>


          {/* ==================================
              WISHLIST BUTTON
          ================================== */}

          <button
            className={`details-wishlist-btn ${
              liked ? "active" : ""
            }`}
            onClick={handleWishlist}
          >

            {liked
              ? "❤️ Added to Wishlist"
              : "♡ Add to Wishlist"}

          </button>


          {/* ==================================
              ADD TO CART
          ================================== */}

          <button
            className="add-cart-btn details-btn"
            onClick={handleAddToCart}
          >

            🛒 Add to Cart

          </button>


          {/* ==================================
              CONTINUE SHOPPING
          ================================== */}

          <div className="continue-shopping">

            <Link to="/products">
              ← Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </>

  );

}


export default ProductDetails;