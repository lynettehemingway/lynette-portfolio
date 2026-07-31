import React from "react";
import "./intro.css";
import me from "../../assets/me.jpg";

const Intro = () => {
    return (
        <section id="intro">
            <div className="introContent">
                <span className="about">
                    // about<span className="dash"></span>
                </span>

                <p className="introPara">
                    I am a senior Computer Science student focused on product
                    design, user experience, and front-end development. I am
                    also pursuing a minor in Digital Arts & Sciences and a
                    certificate in GIS.
                </p>

                <p className="introPara">
                    I design thoughtful, accessible digital products by
                    combining user research, interaction design, prototyping,
                    and technical implementation.
                </p>

                <p className="introPara">Core skills:</p>

                <div className="skills-container">
                    <ul className="section1">
                        <li>Product Design</li>
                        <li>UX Research</li>
                        <li>Wireframing</li>
                        <li>Prototyping</li>
                    </ul>

                    <ul className="section1">
                        <li>Figma</li>
                        <li>React</li>
                        <li>JavaScript</li>
                        <li>HTML & CSS</li>
                    </ul>
                </div>

                <p className="introPara">
                    I am especially interested in creating intuitive products
                    that turn complex information into clear, engaging
                    experiences. My background in computer science allows me to
                    collaborate effectively with engineers and design solutions
                    that are both user-centered and technically feasible.
                </p>

                <img
                    src={me}
                    alt="Lynette Hemingway"
                    className="img-mobile"
                />
            </div>

            <div className="img">
                <img
                    src={me}
                    alt="Lynette Hemingway"
                    className="img"
                />
            </div>
        </section>
    );
};

export default Intro;