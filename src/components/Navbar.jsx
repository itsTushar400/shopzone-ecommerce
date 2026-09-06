import { useState } from "react";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";


function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);


  /* ==========================================
     CART
  ========================================== */

  const {
    cartCount,
    clearCart
  } = useCart();


  /* ==========================================
     WISHLIST
  ========================================== */

  const {
    wishlistCount
  } = useWishlist();


  /* ==========================================
     THEME
  ========================================== */

  const {
    darkMode,
    toggleTheme
  } = useTheme();


  /* ==========================================
     AUTH
  ========================================== */

  const {
    isLoggedIn,
    userEmail,
    logout
  } = useAuth();


  /* ==========================================
     CLOSE MOBILE MENU
  ========================================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* ==========================================
     LOGOUT
  ========================================== */

  const handleLogout = () => {

    logout();

    clearCart();

    closeMenu();

    navigate("/");

  };


  /* ==========================================
     THEME TOGGLE
  ========================================== */

  const handleTheme = () => {
    toggleTheme();
  };


  /* ==========================================
     OFFER PRODUCT IDs
  ========================================== */

  const offerProductIds = [
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112
  ];


  /* ==========================================
     CURRENT PRODUCT ID
  ========================================== */

  const currentProductId =
    Number(
      location.pathname
        .split("/")
        .pop()
    );


  /* ==========================================
     PRODUCTS ACTIVE
  ========================================== */

  const isProductsActive =
    location.pathname === "/products" ||
    (
      location.pathname.startsWith("/product/") &&
      !offerProductIds.includes(
        currentProductId
      )
    );


  /* ==========================================
     OFFERS ACTIVE
  ========================================== */

  const isOffersActive =
    location.pathname === "/offers" ||
    (
      location.pathname.startsWith("/product/") &&
      offerProductIds.includes(
        currentProductId
      )
    );


  return (

    <header className="navbar">


      {/* ==================================
          LOGO
      ================================== */}

      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        ShopZone
      </Link>



      {/* ==================================
          DESKTOP NAVIGATION
      ================================== */}

      <nav className="nav-links">


        {/* HOME */}

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "active"
              : ""
          }
        >
          Home
        </NavLink>



        {/* PRODUCTS */}

        <NavLink
          to="/products"
          className={
            isProductsActive
              ? "active"
              : ""
          }
        >
          Products
        </NavLink>



        {/* OFFERS */}

        <NavLink
          to="/offers"
          className={
            isOffersActive
              ? "offers-link active"
              : "offers-link"
          }
        >
          🔥 Offers
        </NavLink>



        {/* WISHLIST */}

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `wishlist-link ${
              isActive
                ? "active"
                : ""
            }`
          }
        >

          ❤️ Wishlist

          {wishlistCount > 0 && (

            <span className="wishlist-badge">
              {wishlistCount}
            </span>

          )}

        </NavLink>



        {/* CART */}

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `cart-link ${
              isActive
                ? "active"
                : ""
            }`
          }
        >

          🛒 Cart

          {cartCount > 0 && (

            <span className="cart-badge">
              {cartCount}
            </span>

          )}

        </NavLink>


      </nav>



      {/* ==================================
          RIGHT AREA
      ================================== */}

      <div className="nav-buttons">


        {/* DESKTOP THEME */}

        <button
          className="theme-btn desktop-theme-btn"
          onClick={handleTheme}
          aria-label="Toggle theme"
        >

          {darkMode
            ? "☀️"
            : "🌙"}

        </button>



        {/* LOGIN / LOGOUT */}

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



        {/* MOBILE HAMBURGER */}

        <button
          className={`mobile-menu-btn ${
            menuOpen
              ? "open"
              : ""
          }`}
          onClick={() =>
            setMenuOpen(
              (previous) =>
                !previous
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



      {/* ==================================
          MOBILE MENU
      ================================== */}

      <div
        className={`mobile-menu ${
          menuOpen
            ? "show"
            : ""
        }`}
      >


        {/* MOBILE HOME */}

        <NavLink
          to="/"
          end
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "active"
              : ""
          }
        >

          <span>
            🏠 Home
          </span>

          <span className="menu-arrow">
            →
          </span>

        </NavLink>



        {/* MOBILE PRODUCTS */}

        <NavLink
          to="/products"
          onClick={closeMenu}
          className={
            isProductsActive
              ? "active"
              : ""
          }
        >

          <span>
            🛍️ Products
          </span>

          <span className="menu-arrow">
            →
          </span>

        </NavLink>



        {/* MOBILE OFFERS */}

        <NavLink
          to="/offers"
          onClick={closeMenu}
          className={
            isOffersActive
              ? "active offers-mobile-link"
              : "offers-mobile-link"
          }
        >

          <span>
            🔥 Offers
          </span>

          <span className="menu-arrow">
            →
          </span>

        </NavLink>



        {/* MOBILE WISHLIST */}

        <NavLink
          to="/wishlist"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "active"
              : ""
          }
        >

          <span>
            ❤️ Wishlist
          </span>


          {wishlistCount > 0 && (

            <span className="mobile-badge">
              {wishlistCount}
            </span>

          )}


          <span className="menu-arrow">
            →
          </span>

        </NavLink>



        {/* MOBILE CART */}

        <NavLink
          to="/cart"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "active"
              : ""
          }
        >

          <span>
            🛒 Cart
          </span>


          {cartCount > 0 && (

            <span className="mobile-badge">
              {cartCount}
            </span>

          )}


          <span className="menu-arrow">
            →
          </span>

        </NavLink>



        {/* MOBILE DARK MODE */}

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



        {/* MOBILE USER */}

        {isLoggedIn ? (

          <>

            <div className="mobile-user">

              <span>
                👤
              </span>


              <div>

                <small>
                  Logged in as
                </small>


                <strong>
                  {userEmail}
                </strong>

              </div>

            </div>


            {/* LOGOUT */}

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

          /* MOBILE LOGIN */

          <NavLink
            to="/login"
            onClick={closeMenu}
            className={({ isActive }) =>
              `mobile-login ${
                isActive
                  ? "active"
                  : ""
              }`
            }
          >

            <span>
              🔐 Login
            </span>


            <span className="menu-arrow">
              →
            </span>

          </NavLink>

        )}


      </div>


    </header>

  );

}


export default Navbar;