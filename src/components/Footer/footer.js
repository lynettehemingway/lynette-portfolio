import React from 'react';
import './footer.css';
import email from '../../assets/mail.svg';
import resumeIcon from '../../assets/iconmonstr-cv-2.svg';
import linkedin from '../../assets/iconmonstr-linkedin-1.svg';
import resumePDF from '../../assets/LynetteHemingwayResume.pdf'; // Import your PDF here



const Footer = () => {
    return (
        <section id="footer">
            <div className="footer">
                Built and designed by Lynette Hemingway.
                <br></br><br></br>All rights reserved. ©
            </div>

            <div className="contactt">
                <a href={resumePDF} target="_blank" rel="noopener noreferrer"> {/* Use the imported PDF */}
                    <img src={resumeIcon} alt="resume" className="contact"></img>
                </a>

                <a href="https://www.linkedin.com/in/lynette-hemingway/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} alt="linkedin" className="contact"></img>
                </a>
            </div>
        </section>
    );
};

export default Footer;
