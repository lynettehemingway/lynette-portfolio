import React from "react";
import './intro.css';
import net from "../../assets/net.jpg"


const Intro = () => {
    return (
        <section id="intro">
            <div className="introContent">
                <span className="about">/ about me<span className="dash"> </span></span>
                <p className="introPara">i am a sophomore computer science student currently working towards a minor in DAS and a certificate in GIS."</p>
            </div>
            <div className="img">
                <img src={net} alt="net" className="img" />
            </div>
        </section>
    )
}



export default Intro;