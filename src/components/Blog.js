import React from "react";
import blog1 from "../assets/blog-1.jpg";
import blog2 from "../assets/blog-2.jpg";
import blog3 from "../assets/blog-3.jpg";
import blog4 from "../assets/blog-4.jpg";

const Blogs = () => {
  return (
    <section className="blog" id="blog">
      <div className="section__container blog__container">
        <h2 className="section__header">BLOGS</h2>
        <div className="blog__grid">
          <div className="blog__card">
            <img src={blog1} alt="blog" />
            <h4>Fueling Your Body for Optimal Performance</h4>
          </div>
          <div className="blog__card">
            <img src={blog2} alt="blog" />
            <h4>A Guide to Setting and Achieving Fitness Goals</h4>
          </div>
          <div className="blog__card">
            <img src={blog3} alt="blog" />
            <h4>Tips and Techniques for Efficient Exercise</h4>
          </div>
          <div className="blog__card">
            <img src={blog4} alt="blog" />
            <h4>A Beginner's Guide to Starting Your Running Journey</h4>
          </div>
        </div>
        <div className="blog__btn">
          <button className="btn btn__primary">VIEW ALL</button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
