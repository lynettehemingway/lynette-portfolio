import React from "react";
import "./projects.css";

import nav from "../../assets/navigator.png";
import uffsa from "../../assets/uffsa.png";
import github from "../../assets/mark-github.svg";
import linkIcon from "../../assets/external-link.png";
import centsible from "../../assets/centsible.jpg";
import carto from "../../assets/carto.jpg";
import ldt from "../../assets/ldt.png";
import db from "../../assets/db.png";
import cc from "../../assets/cc.png";
import uweather from "../../assets/uweather.png";

const projects = [
    {
        name: "NaviGator",
        description: "UF's autonomous maritime system, built with the Machine Intelligence Laboratory.",
        skills: ["UX Research", "Interaction Design", "Figma"],
        image: nav,
        imagePosition: "center",
        size: "tall",
        liveLink: "https://navigatoruf.org/",
        featured: true
    },
    {
        name: "UFFSA",
        description: "A home for the Filipino Student Association's events, programs, and community.",
        skills: ["Visual Design", "Figma", "React"],
        image: uffsa,
        imagePosition: "top",
        size: "medium",
        liveLink: "https://uffsa.net/",
        featured: true
    },
    {
        name: "Centsible",
        description: "A responsive budgeting platform designed around the financial challenges students face.",
        skills: ["Product Design", "Prototyping", "React Native"],
        image: centsible,
        size: "medium",
        githubLink: "https://github.com/lynettehemingway/centsible"
    },
    {
        name: "uweather ☁",
        description: "Year-over-year weather comparisons that make long-term climate trends easier to see.",
        skills: ["Data Visualization", "UX Design", "C++"],
        image: uweather,
        size: "short",
        githubLink: "https://github.com/NivedhaaS/uweather"
    },
    {
        name: "Deadbeat",
        description: "An original pixel-art horror game where rhythm mechanics build tension and trigger scares.",
        skills: ["Game UX", "Visual Design", "Unity"],
        image: db,
        size: "tall",
        githubLink: "https://github.com/TiniToni/winghacks2025"
    },
    {
        name: "Cartograph",
        description: "Grocery-planning optimization that helps users save time and money. Chart your cart!",
        skills: ["Figma", "UI Design", "Esri"],
        image: carto,
        size: "medium",
        liveLink: "https://devpost.com/software/cartograph",
        featured: true
    },
    {
        name: "CostCompass",
        description: "Real-time cost-of-living context powered by maps, census data, and AI.",
        skills: ["Information Architecture", "Map UX", "Figma"],
        image: cc,
        size: "short",
        githubLink: "https://github.com/CloudRazerz/CostCompass"
    },
    {
        name: "Lion Dance Team",
        description: "A website for the UF Lion Dance Team, showcasing their performances, history, and community.",
        skills: ["UI Design", "Prototyping", "JS"],
        image: ldt,
        size: "medium",
        liveLink: "https://www.ufldt.com/"
    }
];

const Projects = () => (
    <section id="projects" aria-labelledby="projects-title">
        <div className="projContent">
            <header className="projects-heading">
                <h2 id="projects-title" className="proj">// projects</h2>
            </header>

            <div className="projects-grid">
                {projects.map((project) => (
                    <article className={`project-card project-card--${project.size}`} key={project.name}>
                        <div className="project-image-wrap">
                            <img
                                src={project.image}
                                alt={`${project.name} project preview`}
                                className="project-image"
                                style={{ objectPosition: project.imagePosition || "center" }}
                                loading="lazy"
                            />
                            <div className="project-image-shade" />
                            {project.featured && <span className="featured-pill">Featured</span>}
                            <div className="project-actions">
                                {project.githubLink && (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} on GitHub`}>
                                        <img src={github} alt="" />
                                        <span>Code</span>
                                    </a>
                                )}
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label={`Visit the ${project.name} website`}>
                                        <img src={linkIcon} alt="" />
                                        <span>Visit</span>
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="project-info">
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            <ul className="project-tags" aria-label={`${project.name} technologies`}>
                                {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

export default Projects;
