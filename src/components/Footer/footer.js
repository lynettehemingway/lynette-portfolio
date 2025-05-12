import React from 'react';
import './footer.css';
import resumeIcon from '../../assets/iconmonstr-cv-2.svg';
import linkedin from '../../assets/iconmonstr-linkedin-1.svg';
import resumePDF from '../../assets/LynetteHemingway_Resume.pdf';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="contact-links">
                <a href={resumePDF} target="_blank" rel="noopener noreferrer">
                    <img src={resumeIcon} alt="resume" className="contact" />
                </a>
                <a href="https://www.linkedin.com/in/lynette-hemingway/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} alt="linkedin" className="contact" />
                </a>
            </div>

            <div className="footer-text">
                Built and designed by Lynette Hemingway.
            </div>

            <div className="spacer" />
        </footer>
    );
};

export default Footer;
