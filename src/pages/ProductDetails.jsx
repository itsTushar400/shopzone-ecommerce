import {
  useParams,
  Link,
  useNavigate
} from "react-router-dom";

import { useCart } from "../context/CartContext";

import Navbar from "../components/Navbar";


function ProductDetails({ products }) {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();


  // Find product using URL id

  const product = products.find(
    (item) => item.id === Number(id)
  );


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


  // Product not found

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


  // Product Details

  return (

    <>

      <Navbar />

      <div className="details-page">


        {/* PRODUCT IMAGE */}

        <div className="details-image">

          <img
            src={product.image}
            alt={product.title}
          />

        </div>


        {/* PRODUCT INFORMATION */}

        <div className="details-content">

          <p className="product-category">
            {product.category}
          </p>


          <h1>
            {product.title}
          </h1>


          <h2>
            ₹{product.price.toLocaleString("en-IN")}
          </h2>


          <p>
            {product.description}
          </p>


          {/* ADD TO CART */}

          <button
            className="add-cart-btn details-btn"
            onClick={handleAddToCart}
          >

            🛒 Add to Cart

          </button>


          {/* CONTINUE SHOPPING */}

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