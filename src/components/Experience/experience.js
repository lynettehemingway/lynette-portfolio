import { useState } from "react";
import "./experience.css";

const roles = [
    {
        company: "Esri",
        title: "Software Developer Intern",
        dates: "May 2026 — Present",
        bullets: [
            "Prioritized inefficiencies in telecom fiber color lookup and designed ColorFinder, transforming a multi-step workflow into a single intuitive experience.",
            "Synthesized feedback from telecom engineers to identify workflow pain points and redesigned an ArcGIS Utility Network splice editor, creating 10+ high-fidelity Figma screens and user flows.",
            "Collaborated with engineers and stakeholders to translate validated UX concepts into production-ready React and TypeScript components while preserving design fidelity and scalability.",
        ],
    },
    {
        company: "TechSol",
        title: "Technical Writer",
        dates: "January 2026 — Present",
        bullets: [
            "Identified onboarding challenges through stakeholder collaboration and designed documentation supporting 7,000+ users.",
            "Improved knowledge-base usability by maintaining 30+ Markdown guides, FAQs, and troubleshooting resources.",
            "Synthesized user feedback with technical requirements to improve documentation clarity and reduce support friction.",
        ],
    },
    {
        company: "EduTrend",
        title: "Frontend Developer (UI/UX)",
        dates: "December 2025 — March 2026",
        bullets: [
            "Partnered with designers to translate UX concepts into responsive, production-ready React interfaces.",
            "Built reusable React components that supported a scalable design system and improved UI consistency.",
            "Streamlined component architecture to improve maintainability and accelerate future feature development.",
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
