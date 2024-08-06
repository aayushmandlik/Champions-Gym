import React from "react";
import trainer1 from "../assets/trainer-1.jpg";
import trainer2 from "../assets/trainer-2.jpg";
import trainer3 from "../assets/trainer-3.jpg";
import trainer4 from "../assets/trainer-4.jpg";

const Trainers = () => {
  return (
    <section className="section__container trainer__container" id="trainer">
      <h2 className="section__header">MEET OUR TRAINERS</h2>
      <div className="trainer__grid">
        <div className="trainer__card">
          <img src={trainer1} alt="trainer" />
          <h4>DAVID WILLIAMS</h4>
          <p>Body Builder Coach</p>
          <div className="trainer__socials">
            <a href="#">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#">
              <i className="ri-twitter-fill"></i>
            </a>
            <a href="#">
              <i className="ri-youtube-fill"></i>
            </a>
          </div>
        </div>
        <div className="trainer__card">
          <img src={trainer2} alt="trainer" />
          <h4>ROSY RIVERA</h4>
          <p>Cardio Coach</p>
          <div className="trainer__socials">
            <a href="#">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#">
              <i className="ri-twitter-fill"></i>
            </a>
            <a href="#">
              <i className="ri-youtube-fill"></i>
            </a>
          </div>
        </div>
        <div className="trainer__card">
          <img src={trainer3} alt="trainer" />
          <h4>MATT STONIE</h4>
          <p>Fitness Coach</p>
          <div className="trainer__socials">
            <a href="#">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#">
              <i className="ri-twitter-fill"></i>
            </a>
            <a href="#">
              <i className="ri-youtube-fill"></i>
            </a>
          </div>
        </div>
        <div className="trainer__card">
          <img src={trainer4} alt="trainer" />
          <h4>SOFIA LAUREN</h4>
          <p>Crossfit Coach</p>
          <div className="trainer__socials">
            <a href="#">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#">
              <i className="ri-twitter-fill"></i>
            </a>
            <a href="#">
              <i className="ri-youtube-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trainers;
