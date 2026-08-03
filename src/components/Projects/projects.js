import React, { useEffect, useState } from "react";
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
import pickle from "../../assets/pickleportal.png";
import classmail from "../../assets/classmail.png";

const projects = [
    {
        name: "NaviGator",
        description: "UF's autonomous maritime system, built with the Machine Intelligence Laboratory.",
        skills: ["UX Research", "Interaction Design", "Figma"],
        image: nav,
        imagePosition: "center",
        size: "tall",
        liveLink: "https://navigatoruf.org/",
    },
    {
        name: "PicklePortal",
        description: "An IoT-powered court monitor that helps players check availability, queues, and live court status.",
        skills: ["Figma", "TypeScript", "React", "ESP32"],
        image: pickle,
        imagePosition: "center",
        size: "medium",
        githubLink: "https://github.com/RJ-Tabelon/PicklePortal"
    },
    {
        name: "UFFSA",
        description: "A home for the Filipino Student Association's events, programs, and community.",
        skills: ["Visual Design", "Figma", "React"],
        image: uffsa,
        imagePosition: "top",
        size: "short",
        liveLink: "https://uffsa.net/",
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
        size: "tall",
        githubLink: "https://github.com/NivedhaaS/uweather"
    },
    {
        name: "Deadbeat",
        description: "An original pixel-art horror game where rhythm mechanics build tension and trigger scares.",
        skills: ["Game UX", "Visual Design", "Unity"],
        image: db,
        size: "short",
        githubLink: "https://github.com/TiniToni/winghacks2025"
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
        size: "short",
        liveLink: "https://www.ufldt.com/"
    }
];

const caseStudies = [
    {
        name: "ArcGIS Utility Network",
        hidden: true,
        eyebrow: "Enterprise software - Flagship case study",
        description: "Redesigning enterprise software to simplify telecom splice editing while preserving the power and context engineers need.",
        skills: ["Product Design", "UX Research", "React"],
        image: null,
        imagePosition: "center",
        meta: { role: "Frontend Developer", timeline: "May-August 2026", team: "Utility Networks & Geodatabase Team", tools: "Figma, FigJam, React, TypeScript" },
        problem: "Telecom engineers needed to edit complex utility-network connections without losing context across a powerful enterprise workflow.",
        users: "Telecom engineers who edit utility-network connections in ArcGIS.",
        goals: ["Reduce unnecessary navigation", "Keep editing context visible", "Make common actions easier to discover", "Preserve advanced capabilities"],
        approach: ["Mapped the existing splice-editing workflow", "Partnered with designers, engineers, and product stakeholders", "Explored flows and interaction patterns in Figma", "Translated approved patterns into production-facing React UI"],
        decisions: [
            { title: "Keep work in context", text: "Organized editing controls around the active task so engineers could make changes with fewer disruptive context switches." },
            { title: "Design for expert users", text: "Favored predictability and information clarity over novelty, while retaining access to advanced functionality." },
            { title: "Connect design and implementation", text: "Worked across Figma and React to keep interaction intent aligned with technical constraints." }
        ],
        outcome: "Delivered high-fidelity workflows and implementation work through cross-functional collaboration. Detailed visuals and measured results will be added when the work can be shared publicly.",
        reflection: "Enterprise tools taught me that simplifying an experience does not mean removing its power. The strongest solution makes complexity easier to navigate.",
        status: "Private work - process overview available"
    },
    {
        name: "ClassMail",
        eyebrow: "Academic communication - MVP concept",
        description: "Bringing email, Canvas announcements, and academic deadlines into one clear dashboard so students can see what needs attention.",
        skills: ["Product Design", "User Research", "Figma"],
        image: classmail,
        placeholder: "CM",
        imagePosition: "center",
        imageFit: "contain",
        figmaLink: "https://www.figma.com/proto/FLob460o8DWzCK0HrIhopz/Minimum-Viable-Product?node-id=1-6&t=cwzKIRnFokg0UOys-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A5",
        figmaEmbed: "https://embed.figma.com/proto/FLob460o8DWzCK0HrIhopz/Minimum-Viable-Product?node-id=1-6&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A5&embed-host=share",
        meta: { role: "Product Designer", timeline: "Two-week design phase", team: "Five-person student team", tools: "Figma" },
        roleSummary: "I worked on ClassMail as a product designer, helping turn our team's research and shared student experiences into a clear, usable MVP prototype.",
        problem: "Students had to monitor university email, Canvas, calendars, and other portals at the same time, making important announcements and deadlines easy to miss.",
        users: "College students managing multiple classes and digital platforms, especially students with heavy course loads, online or hybrid students, and students balancing school with other responsibilities.",
        research: ["The team surveyed college students about their academic communication habits", "62.5% of respondents used multiple platforms to track school information", "62.5% sometimes or often missed important messages or deadlines", "87.5% said they could see themselves using ClassMail"],
        insights: ["The problem was fragmentation, not a lack of communication tools", "Urgency, class, and deadline were the most useful ways to organize messages", "Students wanted one clear view without adding another system they had to manage"],
        howMightWe: "Help students notice and act on important academic messages without replacing the tools their schools already use?",
        goals: ["Bring academic communication into one dashboard", "Make urgent messages and new deadlines easy to notice", "Reduce inbox overload and decision fatigue", "Keep navigation clean and familiar"],
        journey: ["Sign in with a university email", "See messages and deadlines in one dashboard", "Filter by class, urgency, or deadline", "Open the information that needs attention", "Return to a clearer academic overview"],
        informationArchitecture: ["Central dashboard", "Class-based message filters", "Urgency and priority states", "Assignment deadlines", "Message details", "Account and notification controls"],
        wireframes: "The team completed the wireframing and core-feature design phase in two weeks, moving the concept into an interactive MVP prototype.",
        decisions: [
            { title: "Work with existing tools", text: "ClassMail brings information from systems like Outlook and Canvas together instead of asking students to replace them." },
            { title: "Organize around action", text: "Messages are grouped by class, urgency, and deadline so students can quickly understand what needs attention." },
            { title: "Keep the interface calm", text: "Simple layouts, readable filters, and color-coded states reduce the decision fatigue common in crowded academic tools." }
        ],
        constraints: ["Reliable Canvas and Outlook integrations", "Student privacy and FERPA considerations", "Consistent data syncing across platforms", "Avoiding feature creep and another overwhelming interface"],
        outcome: "Completed an interactive MVP covering the core experience. In the concept survey, every respondent said the idea was easy to understand and 87.5% could see themselves using it.",
        nextSteps: ["Test the prototype with college students", "Iterate from usability feedback", "Validate integrations and privacy requirements", "Pilot with a university", "Explore smart summaries and collaborative features"]
    },
    {
        name: "CARTograph",
        eyebrow: "Grocery planning - 2nd place hackathon winner",
        description: "Helping shoppers compare grocery prices and plan multi-store routes that balance savings, travel time, distance, and gas costs.",
        skills: ["Product Design", "UX Strategy", "Figma"],
        image: carto,
        imagePosition: "center",
        link: "https://devpost.com/software/cartograph",
        figmaLink: "https://www.figma.com/design/XistMiifyOV3QTsQ6Caufa/cartograph?node-id=0-1&p=f&t=yQQsfgHBFYQhmXn6-0",
        meta: { role: "Product Designer", timeline: "Hackathon sprint", team: "Cross-disciplinary hackathon team", tools: "Figma" },
        roleSummary: "I was the product designer on the team. I shaped the mobile experience, mapped the main shopping flow, and designed the interface in Figma while my teammates handled engineering, AI, and GIS.",
        problem: "Planning a grocery trip meant juggling lists, retailer apps, prices, and navigation without knowing whether visiting another store would actually save enough money to justify the drive.",
        users: "Grocery shoppers balancing budget, travel time, meal planning, and convenience.",
        research: ["I reviewed the grocery-planning workflow across lists, retailer pricing, and navigation", "The team evaluated store and product data through an ArcGIS proof of concept"],
        insights: ["Savings are only useful when the extra travel still feels worthwhile", "Shopping and meal-planning features must remain convenient and simple", "Users benefit when price, route, and list decisions live in one experience"],
        howMightWe: "Help shoppers compare the true cost of a grocery trip and confidently choose the best combination of stores?",
        goals: ["Compare prices across nearby stores", "Balance savings with distance and gas costs", "Combine meal planning and grocery planning", "Keep an ambitious workflow simple"],
        journey: ["Create a list or import a recipe", "Compare prices across nearby stores", "Review recommended route options", "Choose a route based on savings and travel", "Navigate the shopping trip"],
        informationArchitecture: ["Home and recent activity", "Map, nearby stores, and deals", "Lists and recipe import", "Route recommendations", "Carter AI assistant", "Profile and shopping preferences"],
        approach: ["Designed the mobile experience and core shopping flow in Figma", "Organized price comparison, lists, routes, and assistance into one product", "Used team feedback to prioritize the end-to-end experience", "Collaborated with developers responsible for implementation, AI, and GIS"],
        decisions: [
            { title: "Optimize total trip value", text: "Recommendations consider product prices alongside driving time, distance, and estimated gas cost—not price alone." },
            { title: "Connect meals to the list", text: "Recipe import and an Azure OpenAI assistant help users move from meal ideas to ingredients and a usable shopping list in one flow." },
            { title: "Adapt when deployment was blocked", text: "After licensing prevented publishing the ArcGIS Pro model as a web tool, the team identified a path using ArcGIS routing services and the Maps SDK." }
        ],
        features: ["Manual shopping lists and recipe import", "Cross-store grocery price comparison", "Routes based on savings, time, distance, and gas", "Nearby deals and preference-based recommendations", "AI shopping and meal-planning assistant"],
        constraints: ["Reliable real-time grocery pricing was not available across retailers", "ArcGIS licensing blocked deployment of the original ModelBuilder workflow", "Mobile emulators and multi-technology integration consumed sprint time", "The proof of concept used a limited Redlands, California service area"],
        outcome: "Built a functional proof of concept combining grocery planning, hosted product data, geographic analysis, AI assistance, and multi-store route optimization. CARTograph earned second place at the Esri hackathon.",
        reflection: "The project reinforced that a technically exciting feature only matters when it stays convenient for the user. It also showed how strongly product storytelling, frontend systems, and geographic analysis depend on one another.",
        nextSteps: ["Integrate live grocery prices and traffic", "Expand beyond Redlands, California", "Personalize budgeting and meal-planning support", "Explore shared savings goals and social challenges", "Release CARTograph as a production mobile app"]
    }
];

const caseStudyOrder = ["CARTograph", "ClassMail", "ArcGIS Utility Network"];
const visibleCaseStudies = caseStudies
    .filter((caseStudy) => !caseStudy.hidden)
    .sort((a, b) => caseStudyOrder.indexOf(a.name) - caseStudyOrder.indexOf(b.name));

const Projects = () => {
    const [activeStudy, setActiveStudy] = useState(0);
    const [selectedStudy, setSelectedStudy] = useState(null);
    const study = visibleCaseStudies[activeStudy];
    const showStudy = (direction) => {
        setActiveStudy((current) => (current + direction + visibleCaseStudies.length) % visibleCaseStudies.length);
    };

    useEffect(() => {
        if (!selectedStudy) return undefined;
        const previousOverflow = document.body.style.overflow;
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setSelectedStudy(null);
        };
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [selectedStudy]);

    return (
    <section id="projects" aria-labelledby="projects-title">
        <div className="projContent">
            <header className="projects-heading projects-heading--work">
                <h2 id="projects-title" className="proj">// work</h2>
            </header>

            <div className="case-studies" aria-label="Featured case studies">
                <article className="case-study-feature" aria-live="polite">
                    {study.image ? (
                        <img key={study.name} src={study.image} alt={`${study.name} case study preview`} className={`case-study-image ${study.imageFit === "contain" ? "case-study-image--contained" : ""}`} style={{ objectPosition: study.imagePosition, objectFit: study.imageFit || "cover" }} />
                    ) : (
                        <div key={study.name} className="case-study-image case-study-image--placeholder" aria-hidden="true"><span>{study.placeholder || "UN"}</span></div>
                    )}
                    <div className="case-study-overlay" />
                    <button className="case-study-arrow case-study-arrow--previous" type="button" onClick={() => showStudy(-1)} aria-label="Previous case study">←</button>
                    <button className="case-study-arrow case-study-arrow--next" type="button" onClick={() => showStudy(1)} aria-label="Next case study">→</button>
                    <div className="case-study-content">
                        <p className="case-study-eyebrow">{study.eyebrow}</p>
                        <h3>{study.name}</h3>
                        <p className="case-study-description">{study.description}</p>
                        <ul className="case-study-tags" aria-label={`${study.name} disciplines`}>
                            {study.skills.map((skill) => <li key={skill}>{skill}</li>)}
                        </ul>
                        <button className="case-study-open" type="button" onClick={() => setSelectedStudy(study)}>Read full case study <span aria-hidden="true">↗</span></button>
                    </div>
                    <div className="case-study-pagination" aria-label="Choose a case study">
                        {visibleCaseStudies.map((item, index) => (
                            <button key={item.name} className={index === activeStudy ? "is-active" : ""} type="button" onClick={() => setActiveStudy(index)} aria-label={`Show ${item.name}`} aria-pressed={index === activeStudy} />
                        ))}
                    </div>
                </article>
            </div>

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

            {selectedStudy && (
                <div className="case-study-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedStudy(null); }}>
                    <section className="case-study-modal" role="dialog" aria-modal="true" aria-labelledby="case-study-modal-title">
                        <button className="case-study-modal-close" type="button" onClick={() => setSelectedStudy(null)} aria-label="Close case study">×</button>

                        <header className="case-study-modal-hero">
                            {selectedStudy.image ? (
                                <img className={selectedStudy.imageFit === "contain" ? "case-study-modal-image--contained" : ""} src={selectedStudy.image} alt={`${selectedStudy.name} project overview`} style={{ objectFit: selectedStudy.imageFit || "cover" }} />
                            ) : (
                                <div className="case-study-modal-placeholder" aria-hidden="true">{selectedStudy.placeholder || "UN"}</div>
                            )}
                            <div className="case-study-modal-hero-shade" />
                            <div className="case-study-modal-intro">
                                <p>{selectedStudy.eyebrow}</p>
                                <h2 id="case-study-modal-title">{selectedStudy.name}</h2>
                                <p>{selectedStudy.description}</p>
                            </div>
                        </header>

                        <div className="case-study-modal-body">
                            <dl className="case-study-meta">
                                {Object.entries(selectedStudy.meta).map(([label, value]) => (
                                    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                                ))}
                            </dl>

                            <div className="case-study-phase">
                                <header className="case-study-phase-heading"><span>01</span><p>Context</p></header>
                                <section className="case-study-story-block"><p className="case-study-step">Overview</p><h3>The idea</h3><p>{selectedStudy.description}</p></section>
                                {selectedStudy.roleSummary && <section className="case-study-story-block"><p className="case-study-step">My role</p><h3>My role on the team</h3><p>{selectedStudy.roleSummary}</p></section>}
                                {selectedStudy.problem && <section className="case-study-story-block"><p className="case-study-step">Problem</p><h3>The challenge</h3><p>{selectedStudy.problem}</p></section>}
                                {selectedStudy.users && <section className="case-study-story-block"><p className="case-study-step">Users</p><h3>Who it's for</h3><p>{selectedStudy.users}</p></section>}
                                {selectedStudy.constraints && <section className="case-study-story-block case-study-constraints"><p className="case-study-step">Constraints</p><h3>Challenges and tradeoffs</h3><ol className="case-study-process">{selectedStudy.constraints.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>}
                            </div>

                            {(selectedStudy.research || selectedStudy.insights || selectedStudy.howMightWe) && (
                                <div className="case-study-phase">
                                    <header className="case-study-phase-heading"><span>02</span><p>Discovery</p></header>
                                    {selectedStudy.research && <section className="case-study-story-block"><p className="case-study-step">Research</p><h3>How we explored it</h3><ul className="case-study-goals">{selectedStudy.research.map((item) => <li key={item}>{item}</li>)}</ul></section>}
                                    {selectedStudy.insights && <section className="case-study-story-block"><p className="case-study-step">Insights</p><h3>What stood out</h3><ol className="case-study-process">{selectedStudy.insights.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>}
                                    {selectedStudy.howMightWe && <section className="case-study-story-block case-study-hmw"><p className="case-study-step">How might we...</p><blockquote>{selectedStudy.howMightWe}</blockquote></section>}
                                </div>
                            )}

                            {(selectedStudy.goals || selectedStudy.journey || selectedStudy.informationArchitecture) && (
                                <div className="case-study-phase">
                                    <header className="case-study-phase-heading"><span>03</span><p>Definition</p></header>
                                    {selectedStudy.goals && <section className="case-study-story-block"><p className="case-study-step">Design goals</p><h3>What success looked like</h3><ul className="case-study-goals">{selectedStudy.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul></section>}
                                    {selectedStudy.journey && <section className="case-study-story-block"><p className="case-study-step">User journey</p><h3>From planning to shopping</h3><ol className="case-study-process">{selectedStudy.journey.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>}
                                    {selectedStudy.informationArchitecture && <section className="case-study-story-block case-study-information-architecture"><p className="case-study-step">Information architecture</p><h3>Organizing the experience</h3><ul className="case-study-goals">{selectedStudy.informationArchitecture.map((item) => <li key={item}>{item}</li>)}</ul></section>}
                                </div>
                            )}

                            {(selectedStudy.sketches || selectedStudy.wireframes || selectedStudy.iterations) && (
                                <div className="case-study-phase">
                                    <header className="case-study-phase-heading"><span>04</span><p>Exploration</p></header>
                                    {selectedStudy.sketches && <section className="case-study-story-block"><p className="case-study-step">Sketches</p><h3>Early directions</h3><p>{selectedStudy.sketches}</p></section>}
                                    {selectedStudy.wireframes && <section className="case-study-story-block"><p className="case-study-step">Wireframes</p><h3>Building the structure</h3><p>{selectedStudy.wireframes}</p></section>}
                                    {selectedStudy.iterations && <section className="case-study-story-block"><p className="case-study-step">Iterations</p><h3>How the design evolved</h3><p>{selectedStudy.iterations}</p></section>}
                                </div>
                            )}

                            {(selectedStudy.decisions || selectedStudy.image || selectedStudy.figmaLink) && (
                                <div className="case-study-phase">
                                    <header className="case-study-phase-heading"><span>05</span><p>Resolution</p></header>
                                    {selectedStudy.decisions && <section className="case-study-story-block case-study-decisions-section"><p className="case-study-step">Design decisions</p><h3>Why the interface works this way</h3><div className="case-study-decisions">{selectedStudy.decisions.map((decision) => <article key={decision.title}><h4>{decision.title}</h4><p>{decision.text}</p></article>)}</div></section>}
                                    {(selectedStudy.image || selectedStudy.figmaLink) && <section className="case-study-final-design">{selectedStudy.figmaEmbed ? <iframe src={selectedStudy.figmaEmbed} title={`${selectedStudy.name} interactive prototype`} allowFullScreen /> : selectedStudy.image ? <img src={selectedStudy.image} alt={`${selectedStudy.name} final interface preview`} /> : <div className="case-study-final-placeholder" aria-hidden="true">{selectedStudy.placeholder}</div>}<div><p className="case-study-step">Final UI</p><h3>The final experience</h3><p>Click through the interactive prototype to explore the experience.</p>{selectedStudy.figmaLink && <a href={selectedStudy.figmaLink} target="_blank" rel="noopener noreferrer">Open prototype in Figma <span aria-hidden="true">↗</span></a>}</div></section>}
                                </div>
                            )}

                            {(selectedStudy.outcome || selectedStudy.reflection || selectedStudy.nextSteps) && (
                                <div className="case-study-phase case-study-phase--impact">
                                    <header className="case-study-phase-heading"><span>06</span><p>Impact</p></header>
                                    <div className="case-study-ending">
                                        {selectedStudy.outcome && <section><p className="case-study-step">Outcome</p><h3>Where we landed</h3><p>{selectedStudy.outcome}</p></section>}
                                        {selectedStudy.reflection && <section><p className="case-study-step">Reflection</p><h3>Looking back</h3><p>{selectedStudy.reflection}</p></section>}
                                    </div>
                                    {selectedStudy.nextSteps && <section className="case-study-story-block case-study-next-steps"><p className="case-study-step">Next steps</p><h3>Where it goes next</h3><ul className="case-study-goals">{selectedStudy.nextSteps.map((step) => <li key={step}>{step}</li>)}</ul></section>}
                                </div>
                            )}

                            {(selectedStudy.link || selectedStudy.status) && (
                                <footer className="case-study-modal-footer">
                                    {selectedStudy.link ? <a href={selectedStudy.link} target="_blank" rel="noopener noreferrer">View live project <span aria-hidden="true">↗</span></a> : <p>{selectedStudy.status}</p>}
                                </footer>
                            )}
                        </div>
                    </section>
                </div>
            )}
        </div>
    </section>
    );
};

export default Projects;
