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
                    I’m a senior Computer Science student at the University of
                    Florida, passionate about building products that simplify complexity and create meaningful, human-centered user experiences.
                </p>

                <p className="introPara">
                    My work lives at the intersection of <span className="about-highlight">product design</span>,{" "}
                    <span className="about-highlight">user experience</span>, and{" "}
                    <span className="about-highlight">front-end development</span>. I’m also pursuing a minor
                    in Digital Arts &amp; Sciences and a certificate in GIS.
                </p>

                <p className="introPara skills-lead">Here are some of my skills:</p>

                <div className="skills-container" id="skills">
                    <ul className="section1">
                        <li>Product Design</li>
                        <li>UX Research</li>
                        <li>Wireframing</li>
                        <li>Prototyping</li>
                    </ul>

                    <ul className="section1">
                        <li>Figma</li>
                        <li>React</li>
                        <li>Typescript / JavaScript</li>
                        <li>HTML & CSS</li>
                    </ul>
                </div>

                <p className="introPara personal-note">
                    Away from my screen, I’m usually microblogging food photos, binge-reading manga,
                    or convincing someone to play one more game of badminton
                    with me.
                </p>

            </div>

            <figure className="portrait-photo">
                <img src={me} alt="Lynette Hemingway" />
            </figure>
        </section>
    );
};

export default Intro;
