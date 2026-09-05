import { useMemo, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Offers from "./components/Offers";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";


// ========================================
// PRODUCT DATA
// ========================================

const products = [

  // ==============================
  // FASHION
  // ==============================

  {
    id: 1,
    title: "Classic T-Shirt",
    category: "Fashion",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description:
      "Comfortable and stylish classic t-shirt made for everyday wear."
  },

  {
    id: 2,
    title: "Denim Jacket",
    category: "Fashion",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    description:
      "Premium denim jacket with a modern fit for everyday style."
  },


  // ==============================
  // FOOTWEAR
  // ==============================

  {
    id: 3,
    title: "Running Shoes",
    category: "Footwear",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description:
      "Lightweight running shoes designed for comfort and performance."
  },

  {
    id: 4,
    title: "Casual Sneakers",
    category: "Footwear",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    description:
      "Stylish casual sneakers perfect for everyday outings."
  },


  // ==============================
  // ELECTRONICS
  // ==============================

  {
    id: 5,
    title: "Smart Watch",
    category: "Electronics",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description:
      "Smart watch with a modern design for your everyday activities."
  },

  {
    id: 6,
    title: "Wireless Headphones",
    category: "Electronics",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description:
      "High-quality wireless headphones with clear sound and comfortable design."
  },


  // ==============================
  // ACCESSORIES
  // ==============================

  {
    id: 7,
    title: "Leather Wallet",
    category: "Accessories",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93",
    description:
      "Elegant leather wallet with a compact and practical design."
  },

  {
    id: 8,
    title: "Classic Sunglasses",
    category: "Accessories",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    description:
      "Classic sunglasses with a stylish frame for everyday wear."
  },


  // ==============================
  // HOME & LIVING
  // ==============================

  {
    id: 9,
    title: "Modern Table Lamp",
    category: "Home & Living",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    description:
      "Modern table lamp designed to add warmth and style to your room."
  },

  {
    id: 10,
    title: "Decorative Plant",
    category: "Home & Living",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
    description:
      "Beautiful decorative indoor plant for your home or office."
  },


  // ==============================
  // SPORTS
  // ==============================

  {
    id: 11,
    title: "Football",
    category: "Sports",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    description:
      "Durable football designed for training and recreational matches."
  },

  {
  id: 12,
  title: "Tennis Racket",
  category: "Sports",
  price: 1799,
  image:
    "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",
  description:
    "Lightweight tennis racket designed for control and performance."
},


  // ==============================
  // BEAUTY
  // ==============================

  {
    id: 13,
    title: "Skincare Set",
    category: "Beauty",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    description:
      "Complete skincare set for a simple and refreshing daily routine."
  },

  {
    id: 14,
    title: "Perfume",
    category: "Beauty",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601",
    description:
      "Elegant fragrance with a fresh and long-lasting scent."
  },


  // ==============================
  // EXTRA FASHION / LIFESTYLE
  // ==============================

  {
    id: 15,
    title: "Cotton Hoodie",
    category: "Fashion",
    price: 1399,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    description:
      "Soft cotton hoodie designed for comfort and casual everyday wear."
  },

  {
    id: 16,
    title: "Travel Backpack",
    category: "Accessories",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description:
      "Spacious and durable backpack suitable for travel and daily use."
  }

];

// ========================================
// HOME PAGE
// ========================================

function Home() {

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");


  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;

  });


  return (

    <div className="app">

      <Navbar />


      {/* ==================================
          HERO
      ================================== */}

      <section className="hero">

        <div className="hero-content">

          <p className="small-title">
            WELCOME TO SHOPZONE
          </p>

          <h1>
            Shop Smart.
            <br />
            Live Better.
          </h1>

          <p className="hero-text">
            Discover amazing products at the best prices.
            Everything you need, all in one place.
          </p>

          <a
            href="#products"
            className="shop-btn"
          >
            Shop Now →
          </a>

        </div>


        <div className="hero-image">
          🛍️
        </div>

      </section>




     {/* ==================================
    FEATURED PRODUCTS
================================== */}

<section
  className="home-featured"
  id="products"
>
  <div className="home-featured-header">
    <div>
      <p className="home-section-label">
        SHOPZONE COLLECTION
      </p>

      <h2>
        Featured Products
      </h2>

      <p className="home-section-description">
        Explore our handpicked products made
        for your everyday needs.
      </p>
    </div>

    <Link
      to="/products"
      className="view-all-products"
    >
      View All Products →
    </Link>
  </div>

  <div className="home-product-toolbar">

    <div className="home-search-box">
      <span>🔍</span>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
    </div>

    <select
      value={category}
      onChange={(e) =>
        setCategory(e.target.value)
      }
      className="home-category-select"
    >
      <option value="All">
        All Categories
      </option>

      <option value="Fashion">
        Fashion
      </option>

      <option value="Footwear">
        Footwear
      </option>

      <option value="Electronics">
        Electronics
      </option>

      <option value="Accessories">
        Accessories
      </option>

      <option value="Home & Living">
        Home & Living
      </option>

      <option value="Sports">
        Sports
      </option>

      <option value="Beauty">
        Beauty
      </option>
    </select>

  </div>

  <div className="home-featured-grid">

    {filteredProducts.length > 0 ? (

      filteredProducts
        .slice(0, 8)
        .map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))

    ) : (

      <div className="home-no-products">
        <div>🔍</div>

        <h3>
          No Products Found
        </h3>

        <p>
          Try searching with a different
          product name or category.
        </p>
      </div>

    )}

  </div>

  {filteredProducts.length > 8 && (
    <div className="home-view-all">
      <Link
        to="/products"
        className="home-view-all-btn"
      >
        Explore All Products →
      </Link>
    </div>
  )}

</section> 

    


      {/* ==================================
          OFFERS
      ================================== */}

      <Offers />


      {/* ==================================
          WHY CHOOSE US
      ================================== */}

      <WhyChooseUs />


      {/* ==================================
          TESTIMONIALS
      ================================== */}

      <Testimonials />


      {/* ==================================
          CATEGORIES
      ================================== */}

      <section className="categories">

        <h2>
          Shop by Category
        </h2>


        <div className="category-container">

          <div className="category-card">
            <div>👕</div>
            <h3>Fashion</h3>
          </div>


          <div className="category-card">
            <div>📱</div>
            <h3>Electronics</h3>
          </div>


          <div className="category-card">
            <div>👟</div>
            <h3>Footwear</h3>
          </div>


          <div className="category-card">
            <div>🏠</div>
            <h3>Home</h3>
          </div>

        </div>

      </section>


      <Footer />

    </div>

  );

}


// ========================================
// PROFESSIONAL PRODUCTS PAGE
// ========================================

function Products() {

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All");

  const [sort, setSort] =
    useState("featured");


  const categories = [
    "All",
    "Fashion",
    "Footwear",
    "Electronics",
    "Accessories",
    "Home & Living",
    "Sports",
    "Beauty"
  ];


  // ========================================
  // SEARCH + FILTER + SORT
  // ========================================

  const filteredProducts = useMemo(() => {

    let result = products.filter((product) => {

      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );

    });


    if (sort === "low") {

      result.sort(
        (a, b) => a.price - b.price
      );

    }


    if (sort === "high") {

      result.sort(
        (a, b) => b.price - a.price
      );

    }


    if (sort === "name") {

      result.sort(
        (a, b) =>
          a.title.localeCompare(
            b.title
          )
      );

    }

    if (sort === "name-desc") {

      result.sort(
        (a, b) =>
          b.title.localeCompare(
            a.title
          )
      );

    }


    return result;

  }, [
    search,
    category,
    sort
  ]);


  // ========================================
  // CLEAR FILTERS
  // ========================================

  const clearFilters = () => {

    setSearch("");

    setCategory("All");

    setSort("featured");

  };


  return (

    <div className="products-page">

      <Navbar />


      {/* ==================================
          PRODUCTS HERO
      ================================== */}

      <section className="products-hero">

  <div className="products-hero-content">

    <p className="collection-label">
      SHOPZONE COLLECTION
    </p>

    <h1>
      All Products
    </h1>

    <p className="hero-description">
      Discover our complete collection
      of high-quality products.
    </p>

  </div>


  <div className="hero-decoration">

    <div className="hero-bag">
      🛍️
    </div>

    <div className="hero-plant">
      🌿
    </div>

  </div>

</section>


      {/* ==================================
          PRODUCTS CONTENT
      ================================== */}

      <section className="products-content">


        {/* SEARCH + SORT */}

        <div className="products-toolbar">


          <div className="product-search">

            <span>
              🔍
            </span>


            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="toolbar-right">


            <span className="product-count">

              Showing{" "}

              <strong>
                {filteredProducts.length}
              </strong>{" "}

              products

            </span>


            <div className="sort-box">

              <label>
                Sort by
              </label>


              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
              >

                <option value="featured">
                  Featured
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

                <option value="name">
                  Name: A-Z
                </option>

                <option value="name-desc">
                  Name: Z-A
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* ==================================
            CATEGORY CHIPS
        ================================== */}

        <div className="category-chips">

          {categories.map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory(item)
              }
            >

              {item}

            </button>

          ))}

        </div>


        {/* ==================================
            MAIN PRODUCTS AREA
        ================================== */}

        <div className="products-main">


          {/* ==================================
              SIDEBAR
          ================================== */}

          <aside className="products-sidebar">


            <div className="sidebar-header">

              <h3>
                ⚙ Filters
              </h3>


              <button
                onClick={clearFilters}
              >
                Clear All
              </button>

            </div>


            {/* CATEGORIES */}

            <div className="filter-section">

              <h4>
                Categories
              </h4>


              {categories
                .slice(1)
                .map((item) => {

                  const count =
                    products.filter(
                      (product) =>
                        product.category === item
                    ).length;


                  return (

                    <label
                      className="filter-option"
                      key={item}
                    >

                      <input
                        type="checkbox"
                        checked={
                          category === item
                        }
                        onChange={() =>
                          setCategory(
                            category === item
                              ? "All"
                              : item
                          )
                        }
                      />


                      <span>
                        {item}
                      </span>


                      <small>
                        ({count})
                      </small>

                    </label>

                  );

                })}

            </div>


            {/* PRICE */}

            <div className="filter-section">

              <h4>
                Price Range
              </h4>


              <div className="price-range-line">

                <span></span>

                <span></span>

              </div>


              <div className="price-values">

                <span>
                  ₹0
                </span>

                <span>
                  ₹5,000
                </span>

              </div>

            </div>


            {/* AVAILABILITY */}

            <div className="filter-section">

              <h4>
                Availability
              </h4>


              <label className="filter-option">

                <input
                  type="checkbox"
                  defaultChecked
                />


                <span>
                  In Stock
                </span>


                <small>
                  ({products.length})
                </small>

              </label>

            </div>

          </aside>


          {/* ==================================
              PRODUCT RESULTS
          ================================== */}

          <div className="products-results">


            {filteredProducts.length > 0 ? (

              <div className="products-grid">

                {filteredProducts.map(
                  (product) => (

                    <ProductCard
                      key={product.id}
                       product={product}
                    />

                  )
                )}

              </div>

            ) : (

              <div className="no-products">

                <div>
                  🔍
                </div>


                <h2>
                  No Products Found
                </h2>


                <p>
                  Try searching for another
                  product or category.
                </p>


                <button
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

              </div>

            )}


            {/* ==================================
                BENEFITS
            ================================== */}

            <div className="products-bottom-benefits">


              <div>

                <span>
                  🚚
                </span>


                <div>

                  <strong>
                    Free Shipping
                  </strong>

                  <small>
                    On orders above ₹999
                  </small>

                </div>

              </div>


              <div>

                <span>
                  🔄
                </span>


                <div>

                  <strong>
                    Easy Returns
                  </strong>

                  <small>
                    7 days return policy
                  </small>

                </div>

              </div>


              <div>

                <span>
                  🔒
                </span>


                <div>

                  <strong>
                    Secure Payment
                  </strong>

                  <small>
                    100% secure checkout
                  </small>

                </div>

              </div>


            </div>

          </div>

        </div>

      </section>

    </div>

  );

}


// ========================================
// MAIN APP
// ========================================

function App() {

  return (

    <ThemeProvider>

      <AuthProvider>

        <CartProvider>

          <WishlistProvider>

            <BrowserRouter>

              <Routes>


                {/* HOME */}

                <Route
                  path="/"
                  element={
                    <Home />
                  }
                />


                {/* PRODUCTS */}

                <Route
                  path="/products"
                  element={
                    <Products />
                  }
                />


                {/* PRODUCT DETAILS */}

                <Route
                  path="/product/:id"
                  element={
                    <ProductDetails
                      products={products}
                    />
                  }
                />


                {/* CART */}

                <Route
                  path="/cart"
                  element={
                    <Cart />
                  }
                />


                {/* WISHLIST */}

                <Route
                  path="/wishlist"
                  element={
                    <Wishlist />
                  }
                />


                {/* LOGIN */}

                <Route
                  path="/login"
                  element={
                    <Login />
                  }
                />


                {/* CHECKOUT */}

                <Route
                  path="/checkout"
                  element={
                    <Checkout />
                  }
                />


                {/* ORDER SUCCESS */}

                <Route
                  path="/order-success"
                  element={
                    <OrderSuccess />
                  }
                />


              </Routes>

            </BrowserRouter>

          </WishlistProvider>

        </CartProvider>

      </AuthProvider>

    </ThemeProvider>

  );

}


export default App;