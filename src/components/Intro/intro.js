import React from "react";
import './intro.css';
import me from "../../assets/me.jpg";
const Intro = () => {
    return (
        <>
            <section id="intro">
                <div className="introContent">
                    <span className="about">// about me<span className="dash"></span></span>
                    <p className="introPara">I am a sophomore Computer Science student currently working towards a minor in DAS and a certificate in GIS.<br></br><br></br>Skills: </p> 
                    <div className="raise">
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
                    <p className="introPara">Beyond school, I enjoy playing otome games and exploring how data analysis and computer science intersect to create engaging, interactive experiences.</p>                         
                    </div>
                 
                </div>
                <div className="img">
                    <img src={me} alt="net" className="img" />
                </div>
            </section>


    
        

        </>
    );
}

export default Intro;
