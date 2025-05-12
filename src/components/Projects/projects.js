import React from 'react';
import './projects.css';
import github from "../../assets/mark-github.svg";
import mark from "../../assets/bookmark-fill.svg";

const projectList = [
  {
    name: "Centsible",
    description: "A responsive web budgeting platform built to directly address the financial challenges faced by students. Features automation, gamification, and clear visual feedback to help students stay informed with their finances.",
    skills: "React Native Web, Node.js, MongoDB",
    githubLink: "https://github.com/lynettehemingway/centsible"
  },
  {
    name: "uweather ☁",
    description: "Developed a weather tracking platform aimed at providing year-by-year comparisons of temperature and precipitation changes to highlight global warming trends and significant weather shifts.",
    skills: "Data Structures (Hash Map, Heap), Climate Data Analysis, Web Development",
    githubLink: "https://github.com/NivedhaaS/uweather"
  },
  {
    name: "Deadbeat",
    description: "Developed a horror game that features original pixeled art designs and integrates rhythm-based mechanics to immerse players in a chilling narrative filled with tension and jump scares.",
    skills: "C#, Unity",
    githubLink: "https://github.com/TiniToni/winghacks2025"
  },
  {
    name: "UFFSA Wolfbot",
    description: "A comprehensive Discord bot tailored for a University of Florida organization, designed to streamline event management and enhance member engagement. This bot handles event reminders, RSVPs, and maintains a ranking system to track member attendance efficiently.",
    skills: "Python",
    githubLink: "https://github.com/lynettehemingway/wolfbot"
  },
  {
    name: "CostCompass",
    description: "Designed a GIS-powered platform integrating Google Maps API, U.S. Census API, and OpenAI API to provide real-time cost-of-living insights for informed relocation decisions.",
    skills: "GIS, Google Maps API, OpenAI API, U.S. Census API",
    githubLink: "https://github.com/CloudRazerz/CostCompass"
  },
  {
    name: "Pantry Management",
    description: "Dynamic inventory management tool that allows users to seamlessly manage and search through a list of items. Users can add new items to the inventory, adjust the quantity of existing items, and remove items when necessary.",
    skills: "Next.js, React, Firebase, GCP, Vercel",
    githubLink: "https://github.com/lynettehemingway/pantry-management"
  }
];

const Projects = () => {
  return (
    <section id="projects">
      <div className="projContent">
        <span className="proj">// projects</span>
        <br /><br />

        <div className="mobileproj">
          {projectList.map((project, index) => (
            <div key={index}>
              <div className="box">
                <h2 className="name">{project.name}</h2>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <img src={github} alt="github" className="github-icon" />
                </a>
              </div>
              <p className="description">
                {project.description}
                <br /><br /><br />Skills: {project.skills}
              </p>
              <br />
            </div>
          ))}
        </div>

        <div className="card-wrapper">
          {projectList.map((project, index) => (
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
                <br /><br /><br />Skills: {project.skills}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
