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
                        <p className="name">Minesweeper</p>
                    <a href="https://github.com/lynettehemingway/minesweeper" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a> </div>
                    <p className="description">Accurately flag all hidden mines to complete the game. The application allows for customizable dimensions, and includes a leaderboard to track and display the top completion times. 
                    <br></br><br></br><br></br>Skills: C++, SFML</p> 
                    <br></br>
                   
                    
                    <div className="box">
                        <h2 className="name">MelodyHub</h2>
                    <a href="https://github.com/lynettehemingway/melodyhub" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a></div>
                        <p className="description">A music recommendation platform designed to deliver a seamless and responsive user experience across all devices.
                        <br></br><br></br><br></br>Skills: HTML, CSS, Python, JavaScript</p><br></br>
                    
                    
                    <div className="box">
                        <h2 className="name">Sudoku</h2>
                    <a href="https://github.com/thadavale/Sudoku" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                    </a></div>
                        <p className="description">A traditional 9x9 Sudoku game featuring dynamic win and loss screens. Developed collaboratively, this project integrates a user-friendly interface with a robust backend, ensuring a smooth and interactive gameplay experience.
                        <br></br><br></br><br></br>Skills: Pygame, Python</p><br></br>
                    
                    <div className="box">
                        <h2 className="name">UFFSA Wolfbot</h2>
                    <a href="https://github.com/lynettehemingway/wolfbot" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                    </a></div>
                        <p className="description">A comprehensive Discord bot tailored for a University of Florida organization, designed to streamline event management and enhance member engagement. This bot handles event reminders, RSVPs, and maintains a ranking system to track member attendance efficiently.
                        <br></br><br></br><br></br>Skills: Python</p><br></br>
                    
                    <div className="box">
                    <h2 className="name">Personal Portfolio</h2>
                    <a href="https://github.com/lynettehemingway/lynette-portfolio" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                    </a></div>   
                        <p className="description">Showcasing sections on my background, skill set, and individual projects.
                        <br></br><br></br><br></br>Skills: React, JS, Python, HTML</p><br></br>

                    <div className="box">
                    <h2 className="name">Pantry Management</h2>
                    <a href="https://github.com/lynettehemingway/pantry-management" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                    </a></div>
                    <p className="description">Dynamic inventory management tool that allows users to seamlessly manage and search through a list of items. Users can add new items to the inventory, adjust the quantity of existing items, and remove items when necessary.
                    <br></br><br></br><br></br>Skills: Next.js, React, Firebase, GCP, Vercel</p>
                    </div>


                <div className="card-wrapper">
                    
                    <div className="card">
                        <div className="box">
                        <img src={mark} alt="mark" className="mark-icon" />
                        
                        <a href="https://github.com/lynettehemingway/minesweeper" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a>
                    

                        </div>
                        <h2 className="name">Minesweeper Game</h2>
                        <p className="description">Accurately flag all hidden mines to complete the game. The application allows for customizable dimensions, and includes a leaderboard to track and display the top completion times. 
                        <br></br><br></br><br></br>Skills: C++, SFML</p>
                    </div>

                    <div className="card">
                        <div className="box">
                        <img src={mark} alt="mark" className="mark-icon" />
                        
                        <a href="https://github.com/lynettehemingway/melodyhub" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a>

                        </div>
                        <h2 className="name">MelodyHub</h2>
                        <p className="description">A music recommendation platform designed to deliver a seamless and responsive user experience across all devices.
                        <br></br><br></br><br></br>Skills: HTML, CSS, Python, JavaScript</p>
                    </div>

                    <div className="card">
                        <div className="box">
                        <img src={mark} alt="mark" className="mark-icon" />
                        
                        <a href="https://github.com/thadavale/Sudoku" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a>
                        </div>
                        <h2 className="name">Sudoku</h2>
                        <p className="description">A traditional 9x9 Sudoku game featuring dynamic win and loss screens. Developed collaboratively, this project integrates a user-friendly interface with a robust backend, ensuring a smooth and interactive gameplay experience.
                        <br></br><br></br><br></br>Skills: Pygame, Python</p>
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
                        
                        <a href="https://github.com/lynettehemingway/lynette-portfolio" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="github" className="github-icon" />
                        </a>                       

                        </div>
                        <h2 className="name">Personal Portfolio</h2>
                        <p className="description">Showcasing sections on my background, skill set, and individual projects.
                        <br></br><br></br><br></br>Skills: React, JS, Python, HTML</p>
                    </div>
                </div> 
            </div>
        </section>
    );
};

export default Projects;
