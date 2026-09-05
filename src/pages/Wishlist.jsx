import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import Navbar from "../components/Navbar";

function Wishlist() {
  const {
    wishlist,
    toggleWishlist
  } = useWishlist();

  return (
    <>
      <Navbar />

      <div className="wishlist-page">

        {/* Header */}
        <div className="wishlist-header">

          <div>
            <p className="wishlist-subtitle">
              YOUR FAVOURITES
            </p>

            <h1>
              ❤️ Wishlist
            </h1>

            <p>
              {wishlist.length} product
              {wishlist.length !== 1 ? "s" : ""} saved
            </p>
          </div>

          <Link
            to="/products"
            className="continue-shopping-btn"
          >
            ← Continue Shopping
          </Link>

        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (

          <div className="empty-wishlist">

            <div className="empty-wishlist-icon">
              ♡
            </div>

            <h2>
              Your Wishlist is Empty
            </h2>

            <p>
              Save your favourite products here
              and buy them later.
            </p>

            <Link
              to="/products"
              className="continue-btn"
            >
              Explore Products →
            </Link>

          </div>

        ) : (

          /* Wishlist Products */
          <div className="wishlist-grid">

            {wishlist.map((product) => (

              <div
                className="wishlist-card"
                key={product.id}
              >

                {/* Image */}
                <div className="wishlist-image">

                  <Link
                    to={`/product/${product.id}`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                    />
                  </Link>

                  <button
                    className="wishlist-remove"
                    onClick={() =>
                      toggleWishlist(product)
                    }
                  >
                    ❤️
                  </button>

                </div>

                {/* Info */}
                <div className="wishlist-info">

                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>
                    {product.title}
                  </h3>

                  <p className="product-price">
                    ₹{product.price}
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    className="view-product-btn"
                  >
                    View Product →
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
}

export default Wishlist;