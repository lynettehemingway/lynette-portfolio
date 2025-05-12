import React from 'react';
import './projects.css';
import logo from '../../assets/minesweeper.png';
import github from "../../assets/mark-github.svg";
import mark from "../../assets/bookmark-fill.svg";


const Projects = () => {
    return (
        <section id="projects">
            <div className="projContent">
                <span className="proj">// projects</span>
                <br></br><br></br>

                <div className="mobileproj">
                    <div className="box">
                        <p className="name">Centsible</p>
                    <a href="https://github.com/lynettehemingway/centsible" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a> </div>
                    <p className="description"> A responsive web budgeting platform built to directly address the financial challenges faced by students. Features automation, gamification, and clear visual feedback to help students stay informed with their finances.
                    <br></br><br></br><br></br>Skills: React Native Web, Node.js, MongoDB</p> 
                    <br></br>
                   
                    
                    <div className="box">
                        <h2 className="name">uweather ☁</h2>
                    <a href="https://github.com/NivedhaaS/uweather" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a></div>
                        <p className="description">Developed a weather tracking platform aimed at providing year-by-year comparisons of temperature and precipitation changes to highlight global warming trends and significant weather shifts.
                        <br></br><br></br><br></br>Skills: Data Structures (Hash Map, Heap), Climate Data Analysis, Web Development</p><br></br>
                    

                    <div className="box">
                        <h2 className="name">Deadbeat</h2>
                    <a href="https://github.com/TiniToni/winghacks2025" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                    </a></div>
                        <p className="description">Developed a horror game that features original pixeled art designs and integrates rhythm-based mechanics to immerse players in a chilling narrative filled with tension and jump scares.
                        <br></br><br></br><br></br>Skills: C#, Unity</p><br></br>
                    
                    <div className="box">
                        <h2 className="name">UFFSA Wolfbot</h2>
                    <a href="https://github.com/lynettehemingway/wolfbot" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                    </a></div>
                        <p className="description">A comprehensive Discord bot tailored for a University of Florida organization, designed to streamline event management and enhance member engagement. This bot handles event reminders, RSVPs, and maintains a ranking system to track member attendance efficiently.
                        <br></br><br></br><br></br>Skills: Python</p><br></br>
                    
                    <div className="box">
                    <h2 className="name">CostCompass</h2>
                    <a href="https://github.com/CloudRazerz/CostCompass" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                    </a></div>   
                    <p className="description">Designed a GIS-powered platform integrating Google Maps API, U.S. Census API, and OpenAI API to provide real-time cost-of-living insights for informed relocation decisions.
                    <br></br><br></br><br></br>Skills: GIS, Google Maps API, OpenAI API, U.S. Census API</p><br></br>

                    <div className="box">
                    <h2 className="name">Pantry Management</h2>
                    <a href="https://github.com/lynettehemingway/pantry-management" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                    </a></div>
                    <p className="description">Dynamic inventory management tool that allows users to seamlessly manage and search through a list of items. Users can add new items to the inventory, adjust the quantity of existing items, and remove items when necessary.
                    <br></br><br></br><br></br>Skills: Next.js, React, Firebase, GCP, Vercel</p><br></br><br></br>
                    </div>


                <div className="card-wrapper">
                    
                    <div className="card">
                        <div className="box">
                        <img src={mark} alt="mark" className="mark-icon" />
                        
                        <a href="https://github.com/lynettehemingway/centsible" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a>
                    

                        </div>
                        <h2 className="name">Centsible</h2>
                        <p className="description">A responsive web budgeting platform built to directly address the financial challenges faced by students. Features automation, gamification, and clear visual feedback to help students stay informed with their finances.
                        <br></br><br></br><br></br>Skills: React Native Web, Node.js, MongoDB</p>
                    </div>

                    <div className="card">
                        <div className="box">
                        <img src={mark} alt="mark" className="mark-icon" />
                        
                        <a href="https://github.com/NivedhaaS/uweather" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a>

                        </div>
                        <h2 className="name">uweather ☁</h2>
                        <p className="description">Developed a weather tracking platform aimed at providing year-by-year comparisons of temperature and precipitation changes to highlight global warming trends and significant weather shifts.
                        <br></br><br></br><br></br>Skills: JS, C++</p><br></br>
                    </div>

                    <div className="card">
                        <div className="box">
                        <img src={mark} alt="mark" className="mark-icon" />
                        
                        <a href="https://github.com/TiniToni/winghacks2025" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a>
                        </div>
                        <h2 className="name">Deadbeat</h2>
                        <p className="description">Developed a horror game that features original pixeled art designs and integrates rhythm-based mechanics to immerse players in a chilling narrative filled with tension and jump scares.
                        <br></br><br></br><br></br>Skills: C#, Unity</p>
                    </div>

                    <div className="card">
                        <div className="box">
                        <img src={mark} alt="mark" className="mark-icon" />
                        
                        <a href="https://github.com/lynettehemingway/wolfbot" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a>

                        </div>
                        <h2 className="name">UFFSA Wolfbot</h2>
                        <p className="description">A comprehensive Discord bot tailored for a University of Florida organization, designed to streamline event management and enhance member engagement. This bot handles event reminders, RSVPs, and maintains a ranking system to track member attendance efficiently.
                        <br></br><br></br><br></br>Skills: Python</p>
                    </div>

                    <div className="card">
                        <div className="box">
                        <img src={mark} alt="mark" className="mark-icon" />
                        
                        <a href="https://github.com/lynettehemingway/pantry-management" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a>

                        </div>
                        <h2 className="name">Pantry Management</h2>
                        <p className="description">Dynamic inventory management tool that allows users to seamlessly manage and search through a list of items. Users can add new items to the inventory, adjust the quantity of existing items, and remove items when necessary.
                        <br></br><br></br><br></br>Skills: Next.js, React, Firebase, GCP, Vercel</p>
                    </div>

                    <div className="card">
                        <div className="box">
                        <img src={mark} alt="mark" className="mark-icon" />
                        
                        <a href="https://github.com/CloudRazerz/CostCompass" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a>                       

                        </div>
                        <h2 className="name">CostCompass</h2>
                        <p className="description">Designed a GIS-powered platform integrating Google Maps API, U.S. Census API, and OpenAI API to provide real-time cost-of-living insights for informed relocation decisions.
                        <br></br><br></br><br></br>Skills: JS, C++</p><br></br>
                    </div>


                </div> 
            </div>
        </section>
    );
};

export default Projects;
