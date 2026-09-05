function WhyChooseUs() {
  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      text: "Get your orders delivered quickly and safely."
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      text: "Your payment information is protected and secure."
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      text: "Simple and hassle-free returns within 7 days."
    },
    {
      icon: "⭐",
      title: "Quality Products",
      text: "We bring you reliable products at great prices."
    }
  ];

  return (
    <section className="why-section">

      <div className="why-heading">

        <p>
          WHY SHOPZONE
        </p>

        <h2>
          Shopping made simple
        </h2>

        <span>
          Everything you need for a better shopping experience.
        </span>

      </div>


      <div className="why-grid">

        {features.map((feature) => (

          <div
            className="why-card"
            key={feature.title}
          >

            <div className="why-icon">
              {feature.icon}
            </div>

            <h3>
              {feature.title}
            </h3>

            <p>
              {feature.text}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WhyChooseUs;