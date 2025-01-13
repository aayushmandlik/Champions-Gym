import React from "react";
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const navigate = useNavigate();

  const handleBuyNowGym = () => {
    navigate("/paymentdetails", {
      state: { price: 500, planName: "GYM" },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBuyNowCardio = () => {
    navigate("/paymentdetails", {
      state: { price: 700, planName: "CARDIO" },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBuyNowGymCardio = () => {
    navigate("/paymentdetails", {
      state: { price: 1000, planName: "GYM + CARDIO" },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="membership" id="membership">
      <div className="section__container membership__container">
        <h2 className="section__header">MEMBERSHIP</h2>
        <div className="membership__grid">
          {/* GYM Membership */}
          <div className="membership__card">
            <h4>GYM</h4>
            <ul>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Gym floor access and standard equipment.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Group fitness classes: yoga, Zumba, Pilates.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Complimentary fitness consultations.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Locker room and showers.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Nutritional guidance and snacks.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Member discounts on merchandise.
              </li>
            </ul>
            <h3>
              <sup>Rs</sup>500<span>/month</span>
            </h3>

            <button className="btn btn__primary" onClick={handleBuyNowGym}>
              BUY NOW
            </button>
          </div>

          {/* CARDIO Membership */}
          <div className="membership__card">
            <h4>CARDIO</h4>
            <ul>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Standard Membership facilities included.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Priority booking for personal training.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Access to advanced equipment.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Complimentary fitness consultations.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Exclusive member events and workshops.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Discounts on additional services.
              </li>
            </ul>
            <h3>
              <sup>Rs</sup>700<span>/month</span>
            </h3>
            <button className="btn btn__primary" onClick={handleBuyNowCardio}>
              BUY NOW
            </button>
          </div>

          {/* GYM + CARDIO Membership */}
          <div className="membership__card">
            <h4>GYM + CARDIO</h4>
            <ul>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Standard and Professional facilities included.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Unlimited access to premium amenities.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Reserved parking or valet service.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Complimentary premium fitness classes.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Customized workout plans.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Priority access to guest passes and events.
              </li>
            </ul>
            <h3>
              <sup>Rs</sup>1000<span>/month</span>
            </h3>
            <button
              className="btn btn__primary"
              onClick={handleBuyNowGymCardio}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
