import React from "react";
import './intro.css';
import me from "../../assets/me.jpg";

const Intro = () => {
    return (
        <section id="intro">
            <div className="introContent">
                <span className="about">// about<span className="dash"></span></span>
                
                <p className="introPara">
                    I am a junior Computer Science student currently working towards a minor in DAS and a certificate in GIS.
                </p>

                <p className="introPara">Skills:</p>

                <div className="skills-container">
                    <ul className="section1">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>C++</li>
                    </ul>
                    <ul className="section1">
                        <li>Python</li>
                        <li>JavaScript</li>
                        <li>MATLAB</li>
                    </ul>
                </div>

                <p className="introPara">
                    Outside of my academic pursuits, I have a passion for food blogging and exploring the intersection of data analysis and computer science. I am particularly interested in how these fields can be combined to create engaging and interactive experiences.
                </p>                         

                <img src={me} alt="profile" className="img-mobile" />
            </div>

            <div className="img">
                <img src={me} alt="profile" className="img" />
            </div>
        </section>
    );
};

export default Intro;
