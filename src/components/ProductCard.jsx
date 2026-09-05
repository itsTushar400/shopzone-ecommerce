import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";


function ProductCard({ product }) {

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist
  } = useWishlist();


  // Add To Cart
  const handleAddToCart = () => {

    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";


    // User is not logged in
    if (!isLoggedIn) {

      alert(
        "Please login first to add products to cart."
      );

      navigate("/login");

      return;
    }


    // User is logged in
    addToCart(product);

    alert(
      `${product.title} added to cart!`
    );

  };


  // Wishlist
  const handleWishlist = () => {

    toggleWishlist(product);

  };


  const liked = isInWishlist(product.id);


  return (

    <div className="product-card">


      {/* Product Image + Wishlist */}
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


        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${
            liked ? "active" : ""
          }`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >

          {liked ? "❤️" : "♡"}

        </button>

      </div>


      {/* Product Information */}
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


          <p className="product-price">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

        </div>

      </Link>


      {/* Add To Cart */}
      <button
        className="add-cart-btn"
        onClick={handleAddToCart}
      >

        🛒 Add to Cart

      </button>


    </div>

  );

}


export default ProductCard;