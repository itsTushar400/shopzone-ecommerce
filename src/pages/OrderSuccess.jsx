import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";


function OrderSuccess() {

  return (
    <>

      <Navbar />


      <div className="order-success-page">

        <div className="success-card">

          {/* SUCCESS ICON */}

          <div className="success-icon">
            ✓
          </div>


          <p className="success-small-title">
            ORDER CONFIRMED
          </p>


          <h1>
            Thank You For Your Order! 🎉
          </h1>


          <p className="success-message">
            Your order has been placed successfully.
            We will process your order and deliver it
            to you soon.
          </p>


          {/* ORDER INFO */}

          <div className="order-info">

            <div>

              <span>
                Order Status
              </span>

              <strong>
                Confirmed ✓
              </strong>

            </div>


            <div>

              <span>
                Payment
              </span>

              <strong>
                Cash on Delivery
              </strong>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="success-actions">

            <Link
              to="/products"
              className="continue-btn"
            >
              Continue Shopping →
            </Link>


            <Link
              to="/"
              className="back-home-btn"
            >
              ← Back to Home
            </Link>

          </div>


          <p className="success-note">
            🔒 Thank you for shopping with ShopZone.
          </p>

        </div>

      </div>

    </>

  );

}


export default OrderSuccess;