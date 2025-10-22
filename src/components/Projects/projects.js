import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './projects.css';

import nav from "../../assets/navigator.png";
import uffsa from "../../assets/uffsa.png";
import github from "../../assets/mark-github.svg";
import mark from "../../assets/bookmark-fill.svg";
import linkIcon from "../../assets/external-link.png";

const sliderProjects = [
    {
        title: "NaviGator",
        description: "Machine Intelligence Laboratory's autonomous maritime system, NaviGator",
        image: nav,
        liveDemo: "https://navigatoruf.org/"
    },
    {
        title: "UFFSA",
        description: "University of Florida's Filipino Student Association website showcasing events and programs",
        image: uffsa,
        liveDemo: "https://uffsa.net/"
    }
];

const cardProjects = [
    {
        name: "Centsible",
        description: "A responsive web budgeting platform built to address financial challenges faced by students.",
        skills: "React Native Web, Node.js, MongoDB",
        githubLink: "https://github.com/lynettehemingway/centsible"
    },
    {
        name: "uweather ☁",
        description: "Weather tracking platform for year-by-year comparisons to highlight global warming trends.",
        skills: "C++",
        githubLink: "https://github.com/NivedhaaS/uweather"
    },
    {
        name: "Deadbeat",
        description: "Horror game with original pixel art and rhythm mechanics for immersive tension and jumpscares.",
        skills: "C#, Unity",
        githubLink: "https://github.com/TiniToni/winghacks2025"
    },
    {
        name: "UFFSA Wolfbot",
        description: "Discord bot for UF's Filipino Student Association to manage events, reminders, and engagement.",
        skills: "Python",
        githubLink: "https://github.com/lynettehemingway/wolfbot"
    },
    {
        name: "CostCompass",
        description: "GIS-powered platform for real-time cost-of-living insights using Google Maps & Census API.",
        skills: "GIS, Google Maps API, OpenAI API, U.S. Census API",
        githubLink: "https://github.com/CloudRazerz/CostCompass"
    },
    {
        name: "Pantry Management",
        description: "Inventory management tool for adding, editing, and searching items with a clean UI.",
        skills: "Next.js, React, Firebase, GCP, Vercel",
        githubLink: "https://github.com/lynettehemingway/pantry-management"
    }
];

const Projects = () => {
    return (
        <section id="projects">
            <div className="projContent">
                <span className="proj">// projects</span>

                {/* Swiper Slider */}
                <div className="carousel-container">
                    <Swiper
    modules={[Navigation, Pagination]}
    navigation
    pagination={{ clickable: true }}
    spaceBetween={30}
    slidesPerView={1}
>
    {sliderProjects.map((project, index) => (
        <SwiperSlide key={index}>
            <div className="slider-card">
                <img src={project.image} alt={project.title} className="slider-image" />
                <div className="slider-overlay">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p className="tech">{project.tech}</p>
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        <img src={linkIcon} alt="Live Demo" className="link-icon" />
                    </a>
                </div>
            </div>
        </SwiperSlide>
    ))}
</Swiper>

                </div>

                {/* Project Cards */}
                <div className="card-wrapper">
                    {cardProjects.map((project, index) => (
                        <div key={index} className="card">
                            <div className="box">
                                <img src={mark} alt="mark" className="mark-icon" />
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                    <img src={github} alt="github" className="github-icon" />
                                </a>
                            </div>
                            <h2 className="name">{project.name}</h2>
                            <p className="description">
                                {project.description}
                                <br /><br />Skills: {project.skills}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
