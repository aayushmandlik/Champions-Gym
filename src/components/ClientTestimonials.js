import React from "react";
// import "./Testimonials.css"; // Ensure you have appropriate styling and Swiper CSS
// import "swiper/swiper-bundle.min.css";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import client1 from "../assets/client-1.jpg";
import client2 from "../assets/client-2.jpg";
import client3 from "../assets/client-3.jpg";

// Install Swiper modules
SwiperCore.use([Pagination]);

const Testimonials = () => {
  return (
    <section className="section__container client__container" id="client">
      <h2 className="section__header">OUR TESTIMONIALS</h2>
      <Swiper pagination={{ clickable: true }} className="swiper">
        <div className="swiper-wrapper">
          <SwiperSlide className="swiper-slide">
            <div className="client__card">
              <img src={client1} alt="client" />
              <div>
                <i className="ri-double-quotes-r"></i>
              </div>
              <p>
                I've been a member at Champions Gym for over a year now, and I
                couldn't be happier with my experience. The range of classes
                offered here is impressive - from high-energy cardio sessions to
                relaxing yoga classes, there's something for everyone.
              </p>
              <h4>Sarah Johnson</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="client__card">
              <img src={client2} alt="client" />
              <div>
                <i className="ri-double-quotes-r"></i>
              </div>
              <p>
                The classes are always well-planned and engaging, and the
                instructors do an excellent job of keeping us motivated
                throughout. I'm so grateful to have found such a supportive and
                inclusive gym.
              </p>
              <h4>Michael Wong</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="client__card">
              <img src={client3} alt="client" />
              <div>
                <i className="ri-double-quotes-r"></i>
              </div>
              <p>
                I've tried many gyms in the past, but none of them compare to
                Champions Gym. From the moment I walked through the doors, I
                felt welcomed and supported by the staff and fellow members
                alike.
              </p>
              <h4>Emily Davis</h4>
            </div>
          </SwiperSlide>
        </div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </section>
  );
};

export default Testimonials;
