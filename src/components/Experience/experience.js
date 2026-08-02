import { useState } from "react";
import "./experience.css";

const roles = [
    {
        company: "Esri",
        title: "Software Developer Intern",
        dates: "May 2026 — Present",
        bullets: [
            "Designed high-fidelity Figma prototypes and user flows for an ArcGIS Utility Network splice editor used by telecom engineers.",
            "Built ColorFinder, reducing a multi-step telecom fiber color lookup workflow into a single interactive interface.",
            "Collaborated with engineers to transform UX concepts into production-ready React and TypeScript components.",
        ],
    },
    {
        company: "TechSol",
        title: "Technical Writer",
        dates: "January 2026 — Present",
        bullets: [
            "Authored documentation and onboarding resources for collaboration tools supporting more than 7,000 users.",
            "Organized Markdown guides, FAQs, and troubleshooting workflows to improve navigation and information accessibility.",
            "Documented Zoom, Microsoft Teams, and learning-platform workflows using ongoing feedback from users and IT staff.",
        ],
    },
    {
        company: "University of Florida",
        tab: "UF",
        title: "Information Technology Assistant",
        dates: "April 2025 — Present",
        bullets: [
            "Provide first-line technical support for 300+ students and faculty across classrooms, labs, and academic environments.",
            "Resolve recurring technical issues through accessible documentation, troubleshooting, and clear communication with end users.",
        ],
    },
    {
        company: "EduTrend",
        title: "Frontend Developer",
        dates: "December 2025 — March 2026",
        bullets: [
            "Built reusable React components that improved design consistency across the platform.",
            "Translated UI mockups into responsive, production-ready React experiences within an Agile development environment.",
            "Refactored frontend architecture to improve scalability, maintainability, and long-term code quality.",
        ],
    },
];

export default function Experience() {
    const [activeRole, setActiveRole] = useState(0);
    const role = roles[activeRole];

    return (
        <section id="experience" aria-labelledby="experience-title">
            <header className="experience-heading">
                <h2 id="experience-title">{"// experience"}</h2>
            </header>

            <div className="experience-layout">
                <div className="experience-tabs" role="tablist" aria-label="Workplaces">
                    {roles.map((item, index) => (
                        <button
                            key={item.company}
                            type="button"
                            role="tab"
                            aria-selected={activeRole === index}
                            className={activeRole === index ? "active" : ""}
                            onClick={() => setActiveRole(index)}
                        >
                            {item.tab || item.company}
                        </button>
                    ))}
                </div>

                <article className="experience-role" role="tabpanel" key={role.company}>
                    <h3>{role.title} <span>@ {role.company}</span></h3>
                    <p className="experience-date">{role.dates}</p>
                    <ul>
                        {role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                </article>
            </div>
        </section>
    );
}
