import { useState } from "react";
import "./experience.css";

const roles = [
    {
        company: "Esri",
        title: "Software Developer Intern",
        dates: "May 2026 — August 2026",
bullets: [
    "Identified inefficiencies in telecom fiber color lookup and designed ColorFinder, simplifying a multi-step workflow into a faster, more intuitive experience.",
    "Synthesized feedback from telecom engineers to uncover workflow pain points and redesigned the ArcGIS Utility Network Splice Editor, producing 10+ high-fidelity Figma screens and end-to-end user flows.",
    "Partnered with engineers and stakeholders to refine interactions, validate design decisions, and translate UX concepts into production-ready React and TypeScript interfaces.",
],
},
{
    company: "TechSol",
    title: "Technical Writer",
    dates: "January 2026 — September 2026",
    bullets: [
        "Identified onboarding pain points through stakeholder and user feedback, then redesigned documentation experiences supporting 7,000+ users.",
        "Improved information architecture and usability across 30+ guides, FAQs, and troubleshooting resources, making technical content easier to navigate and understand.",
        "Synthesized user needs and technical constraints to simplify complex workflows, improve content clarity, and reduce friction throughout the support experience.",
    ],
},
{
    company: "EduTrend",
    title: "Product Design Intern",
    dates: "December 2025 — March 2026",
    bullets: [
        "Collaborated with designers to translate product requirements and UX concepts into responsive, polished interfaces across key user flows.",
        "Designed and built reusable UI components that strengthened the product’s design system and improved consistency across experiences.",
        "Refined component patterns and interaction behaviors to improve usability, scalability, and handoff between design and engineering.",
    ],
},
];

export default function Experience() {
    const [activeRole, setActiveRole] = useState(0);
    const role = roles[activeRole];

    return (
        <section id="experience" aria-labelledby="experience-title">
            <header className="experience-heading">
                <h2 id="experience-title" className="section-label">{"// experience"}</h2>
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
