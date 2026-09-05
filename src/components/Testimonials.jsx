function Testimonials() {

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Verified Customer",
      rating: 5,
      review:
        "Amazing shopping experience! Product quality was excellent and delivery was very fast.",
      avatar: "👨🏻"
    },

    {
      id: 2,
      name: "Priya Verma",
      role: "Verified Customer",
      rating: 5,
      review:
        "I really liked the quality and pricing. The website is simple and easy to use.",
      avatar: "👩🏻"
    },

    {
      id: 3,
      name: "Aman Singh",
      role: "Verified Customer",
      rating: 4,
      review:
        "Good products and smooth checkout experience. I will definitely shop again.",
      avatar: "👨🏻"
    }
  ];


  return (
    <section className="testimonials-section">

      {/* HEADING */}

      <div className="testimonials-heading">

        <p>
          CUSTOMER REVIEWS
        </p>

        <h2>
          What our customers say
        </h2>

        <span>
          Real experiences from our happy customers.
        </span>

      </div>


      {/* REVIEWS */}

      <div className="testimonials-grid">

        {reviews.map((review) => (

          <div
            className="testimonial-card"
            key={review.id}
          >

            {/* TOP */}

            <div className="testimonial-top">

              <div className="customer-avatar">
                {review.avatar}
              </div>

              <div>

                <h3>
                  {review.name}
                </h3>

                <p>
                  ✓ {review.role}
                </p>

              </div>

            </div>


            {/* RATING */}

            <div className="rating">

              {"⭐".repeat(review.rating)}

            </div>


            {/* REVIEW */}

            <p className="review-text">
              "{review.review}"
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Testimonials;