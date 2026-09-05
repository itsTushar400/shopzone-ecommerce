import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const {
    cartCount,
    clearCart
  } = useCart();

  const {
    wishlistCount
  } = useWishlist();

  const {
    darkMode,
    toggleTheme
  } = useTheme();

  const {
    isLoggedIn,
    userEmail,
    logout
  } = useAuth();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    clearCart();
    closeMenu();
    navigate("/");
  };

  const handleTheme = () => {
    toggleTheme();
  };

  return (
    <header className="navbar">

      {/* =========================
          LOGO
      ========================= */}

      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        ShopZone
      </Link>


      {/* =========================
          DESKTOP NAVIGATION
      ========================= */}

      <nav className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link
          to="/wishlist"
          className="wishlist-link"
        >
          ❤️ Wishlist

          {wishlistCount > 0 && (
            <span className="wishlist-badge">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          className="cart-link"
        >
          🛒 Cart

          {cartCount > 0 && (
            <span className="cart-badge">
              {cartCount}
            </span>
          )}
        </Link>

      </nav>


      {/* =========================
          DESKTOP RIGHT AREA
      ========================= */}

      <div className="nav-buttons">

        {/* Desktop Theme */}
        <button
          className="theme-btn desktop-theme-btn"
          onClick={handleTheme}
          aria-label="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>


        {/* Desktop Login / Logout */}

        {isLoggedIn ? (

          <div className="user-area">

            <span className="user-email">
              👤 {userEmail}
            </span>

            <button
              className="login-btn logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        ) : (

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

        )}


        {/* =========================
            MOBILE HAMBURGER
        ========================= */}

        <button
          className={`mobile-menu-btn ${
            menuOpen ? "open" : ""
          }`}
          onClick={() =>
            setMenuOpen(
              (previous) => !previous
            )
          }
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >

          <span></span>
          <span></span>
          <span></span>

        </button>

      </div>


      {/* =========================
          MOBILE MENU
      ========================= */}

      <div
        className={`mobile-menu ${
          menuOpen ? "show" : ""
        }`}
      >

        {/* HOME */}

        <Link
          to="/"
          onClick={closeMenu}
        >
          <span>🏠 Home</span>
        </Link>


        {/* PRODUCTS */}

        <Link
          to="/products"
          onClick={closeMenu}
        >
          <span>🛍️ Products</span>
        </Link>


        {/* WISHLIST */}

        <Link
          to="/wishlist"
          onClick={closeMenu}
        >
          <span>❤️ Wishlist</span>

          {wishlistCount > 0 && (
            <span className="mobile-badge">
              {wishlistCount}
            </span>
          )}
        </Link>


        {/* CART */}

        <Link
          to="/cart"
          onClick={closeMenu}
        >
          <span>🛒 Cart</span>

          {cartCount > 0 && (
            <span className="mobile-badge">
              {cartCount}
            </span>
          )}
        </Link>


        {/* =========================
            MOBILE DARK MODE
        ========================= */}

        <button
          className="mobile-menu-action"
          onClick={handleTheme}
        >
          <span>
            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </span>

          <span className="menu-arrow">
            →
          </span>
        </button>


        {/* =========================
            MOBILE USER
        ========================= */}

        {isLoggedIn ? (

          <>
            <div className="mobile-user">
              <span>👤</span>

              <div>
                <small>
                  Logged in as
                </small>

                <strong>
                  {userEmail}
                </strong>
              </div>
            </div>

            <button
              className="mobile-menu-action mobile-logout"
              onClick={handleLogout}
            >
              <span>
                🚪 Logout
              </span>

              <span className="menu-arrow">
                →
              </span>
            </button>
          </>

        ) : (

          <Link
            to="/login"
            onClick={closeMenu}
            className="mobile-login"
          >
            <span>
              🔐 Login
            </span>

            <span className="menu-arrow">
              →
            </span>
          </Link>

        )}

      </div>

    </header>
  );
}

export default Navbar;