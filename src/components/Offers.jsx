function Offers() {
  return (
    <section className="offers-section">

      <div className="offer-content">

        <p className="offer-label">
          🔥 LIMITED TIME OFFER
        </p>

        <h2>
          Get up to <span>30% OFF</span>
        </h2>

        <p>
          Grab your favourite products before
          the offer ends. Don't miss out!
        </p>

        <button className="offer-btn">
          Shop Deals →
        </button>

      </div>


      <div className="offer-box">

        <div className="offer-circle">
          🛍️
        </div>

        <div className="offer-discount">
          30%
          <small>OFF</small>
        </div>

      </div>

    </section>
  );
}

export default Offers;