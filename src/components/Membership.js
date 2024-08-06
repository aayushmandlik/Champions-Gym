import React from "react";
// import './Membership.css'; // Ensure you have appropriate styling

const Membership = () => {
  return (
    <section className="membership">
      <div className="section__container membership__container">
        <h2 className="section__header">MEMBERSHIP</h2>
        <div className="membership__grid">
          <div className="membership__card">
            <h4>STANDARD</h4>
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
              <sup>$</sup>30<span>/month</span>
            </h3>
            <button className="btn btn__primary">BUY NOW</button>
          </div>
          <div className="membership__card">
            <h4>PROFESSIONAL</h4>
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
              <sup>$</sup>45<span>/month</span>
            </h3>
            <button className="btn btn__primary">BUY NOW</button>
          </div>
          <div className="membership__card">
            <h4>ULTIMATE</h4>
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
              <sup>$</sup>60<span>/month</span>
            </h3>
            <button className="btn btn__primary">BUY NOW</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
