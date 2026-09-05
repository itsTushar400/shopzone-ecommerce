import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const trimmedEmail = email.trim();

    // Email validation
    if (!trimmedEmail) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    // Check existing subscribers
    const subscribers =
      JSON.parse(
        localStorage.getItem("newsletterSubscribers")
      ) || [];

    const alreadySubscribed = subscribers.includes(
      trimmedEmail
    );

    if (alreadySubscribed) {
      setMessage(
        "This email is already subscribed! 😊"
      );
      setMessageType("error");
      return;
    }

    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      const updatedSubscribers = [
        ...subscribers,
        trimmedEmail
      ];

      localStorage.setItem(
        "newsletterSubscribers",
        JSON.stringify(updatedSubscribers)
      );

      setLoading(false);
      setMessage(
        "Successfully subscribed! 🎉"
      );
      setMessageType("success");
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="footer">

      {/* NEWSLETTER */}
      <div className="footer-newsletter">

        <div>
          <p className="footer-small-title">
            STAY UPDATED
          </p>

          <h2>
            Get the latest offers & updates
          </h2>

          <p>
            Subscribe to our newsletter and never
            miss a great deal.
          </p>
        </div>

        <div className="newsletter-wrapper">

          <form
            className="newsletter-form"
            onSubmit={handleSubscribe}
          >

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Subscribing..."
                : "Subscribe"}
            </button>

          </form>

          {message && (
            <p
              className={`newsletter-message ${messageType}`}
            >
              {message}
            </p>
          )}

        </div>

      </div>

      {/* FOOTER MAIN */}
      <div className="footer-main">

        <div className="footer-brand">

          <h2>ShopZone</h2>

          <p>
            Shop smart. Live better.
          </p>

          <p>
            Your one-stop destination for
            quality products at great prices.
          </p>

        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/wishlist">
            Wishlist
          </Link>

          <Link to="/cart">
            Cart
          </Link>

        </div>

        {/* CUSTOMER SERVICE */}
        <div className="footer-column">

          <h3>Customer Service</h3>

          <a href="#">
            Contact Us
          </a>

          <a href="#">
            Shipping Policy
          </a>

          <a href="#">
            Return Policy
          </a>

          <a href="#">
            FAQ
          </a>

        </div>

        {/* SOCIAL */}
        <div className="footer-column">

          <h3>Follow Us</h3>

          <div className="social-links">

            <a href="#">
              Instagram
            </a>

            <a href="#">
              Facebook
            </a>

            <a href="#">
              Twitter
            </a>

            <a href="#">
              LinkedIn
            </a>

          </div>

        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">

        <p>
          © 2026 ShopZone. All rights reserved.
        </p>

        <div>
          <span>
            Privacy Policy
          </span>

          <span>
            Terms & Conditions
          </span>
        </div>

      </div>

    </footer>
  );
}

export default Footer;