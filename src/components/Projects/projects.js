import React from 'react'
import './projects.css'
import logo from '../../assets/logo.jpg'

import { Link } from 'react-scroll';


const Projects = () => {
    return (
    <section id="projects">
        <div className="projContent">
            <span className="proj"># projects</span>
            <div class="slide-content">
                <div class="card-wrapper">
                    <div class="card">
                        <div class="image-content">
                            <span class="overlay"></span>

                            <div class="card-image">
                                <img src={logo} alt="" class="card-img"></img>
                            </div>
                        </div>
                        <div class="card-content">
                            <h2 class="name">Minesweeper</h2>
                            <p class="description">This project aims to copy the actual version of Minesweeper.</p>
                       
                            <button class="button">Github Repo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}
export default Projects

