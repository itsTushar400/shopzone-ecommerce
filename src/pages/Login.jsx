import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const {
    login
  } = useAuth();


  const [isRegister, setIsRegister] =
    useState(false);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  const [showPassword, setShowPassword] =
    useState(false);


  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const [rememberMe, setRememberMe] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const [success, setSuccess] =
    useState("");


  // Handle input change
  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));


    setError("");
    setSuccess("");

  };


  // Handle form submit
  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    // Email validation
    if (!formData.email.includes("@")) {

      setError(
        "Please enter a valid email address."
      );

      return;

    }


    // Password validation
    if (formData.password.length < 6) {

      setError(
        "Password must be at least 6 characters."
      );

      return;

    }


    // Register validation
    if (isRegister) {

      if (!formData.name.trim()) {

        setError(
          "Please enter your full name."
        );

        return;

      }


      if (
        formData.password !==
        formData.confirmPassword
      ) {

        setError(
          "Passwords do not match."
        );

        return;

      }

    }


    setLoading(true);


    // Simulate API request
    setTimeout(() => {

      login(formData.email);

      setLoading(false);


      setSuccess(
        isRegister
          ? "Account created successfully! 🎉"
          : "Login successful! 🎉"
      );


      // Redirect to Home
      setTimeout(() => {

        navigate("/");

      }, 1000);

    }, 1200);

  };


  // Switch Login / Register
  const switchMode = () => {

    setIsRegister(
      (previousMode) => !previousMode
    );


    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });


    setError("");
    setSuccess("");

  };


  return (

    <div className="login-page">

      <div className="auth-container">


        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="auth-left">

          <div className="auth-brand">

            <Link
              to="/"
              className="auth-logo"
            >
              ShopZone
            </Link>

            <p className="auth-tagline">
              Shop smart. Live better.
            </p>

          </div>


          <div className="auth-visual">

            <div className="auth-circle">
              🛍️
            </div>

            <h2>
              {isRegister
                ? "Join ShopZone"
                : "Welcome Back"}
            </h2>

            <p>
              {isRegister
                ? "Create your account and start shopping."
                : "Login to continue your shopping journey."}
            </p>

          </div>


          <div className="auth-features">

            <span>
              ✓ Quality Products
            </span>

            <span>
              ✓ Fast & Secure Delivery
            </span>

            <span>
              ✓ Easy Returns
            </span>

          </div>

        </div>


        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="auth-card">


          {/* Header */}

          <div className="auth-header">

            <p className="auth-small-title">
              {isRegister
                ? "CREATE ACCOUNT"
                : "ACCOUNT LOGIN"}
            </p>

            <h1>
              {isRegister
                ? "Create Account"
                : "Welcome Back"}
            </h1>

            <p>
              {isRegister
                ? "Create your ShopZone account"
                : "Login to continue shopping"}
            </p>

          </div>


          {/* Error Message */}

          {error && (

            <div className="auth-message error">
              {error}
            </div>

          )}


          {/* Success Message */}

          {success && (

            <div className="auth-message success">
              {success}
            </div>

          )}


          {/* Form */}

          <form
            onSubmit={handleSubmit}
          >


            {/* Name */}

            {isRegister && (

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

            )}


            {/* Email */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>


            {/* Password */}

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>


            {/* Confirm Password */}

            {isRegister && (

              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <div className="password-wrapper">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) =>
                          !previous
                      )
                    }
                  >
                    {showConfirmPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

              </div>

            )}


            {/* Options */}

            {!isRegister && (

              <div className="form-options">

                <label className="remember">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                  />

                  Remember me

                </label>


                <button
                  type="button"
                  className="forgot-btn"
                >
                  Forgot Password?
                </button>

              </div>

            )}


            {/* Submit Button */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading
                ? "Please wait..."
                : isRegister
                  ? "Create Account"
                  : "Login"}

            </button>

          </form>


          {/* Divider */}

          <div className="auth-divider">

            <span>
              OR
            </span>

          </div>


          {/* Google Button */}

          <button
            type="button"
            className="google-btn"
            onClick={() => {
              setError(
                "Google login is not connected yet."
              );
            }}
          >

            <span>
              G
            </span>

            Continue with Google

          </button>


          {/* Switch Login/Register */}

          <div className="auth-switch">

            <span>
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </span>

            <button
              type="button"
              onClick={switchMode}
            >
              {isRegister
                ? "Login"
                : "Create Account"}
            </button>

          </div>


          {/* Back Home */}

          <Link
            to="/"
            className="back-home"
          >
            ← Back to Home
          </Link>


        </div>

      </div>

    </div>

  );

}


export default Login;