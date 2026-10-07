import React, { useEffect, useRef, useState } from "react";
import "./projects.css";
import { createPortal } from "react-dom";


import carto from "../../assets/carto.jpg";
import classmail from "../../assets/classmail.png";

import nav from "../../assets/navigator.png";
import uffsa from "../../assets/uffsa.png";
import centsible from "../../assets/centsible.jpg";
import ldt from "../../assets/ldt.png";
import db from "../../assets/db.png";
import cc from "../../assets/cc.png";
import uweather from "../../assets/uweather.png";
import pickle from "../../assets/pickleportal.png";

const projects = [
    {
        name: "NaviGator",
        description: "UF's autonomous maritime system, built with the Machine Intelligence Laboratory.",
        skills: ["UX Research", "Interaction Design", "Figma"],
        image: nav,
        imagePosition: "center",        liveLink: "https://navigatoruf.org/",
    },
    {
        name: "PicklePortal",
        description: "An IoT-powered court monitor that helps players check availability, queues, and live court status.",
        skills: ["Figma", "TypeScript", "React", "ESP32"],
        image: pickle,
        imagePosition: "center",        githubLink: "https://github.com/RJ-Tabelon/PicklePortal"
    },
    {
        name: "UFFSA",
        description: "A home for the Filipino Student Association's events, programs, and community.",
        skills: ["Visual Design", "Figma", "React"],
        image: uffsa,
        imagePosition: "top",        liveLink: "https://uffsa.net/",
    },
    {
        name: "Centsible",
        description: "A responsive budgeting platform designed around the financial challenges students face.",
        skills: ["Product Design", "Prototyping", "React Native"],
        image: centsible,        githubLink: "https://github.com/lynettehemingway/centsible"
    },
    {
        name: "uweather ☁",
        description: "Year-over-year weather comparisons that make long-term climate trends easier to see.",
        skills: ["Data Visualization", "UX Design", "C++"],
        image: uweather,        githubLink: "https://github.com/NivedhaaS/uweather"
    },
    {
        name: "Deadbeat",
        description: "An original pixel-art horror game where rhythm mechanics build tension and trigger scares.",
        skills: ["Game UX", "Visual Design", "Unity"],
        image: db,        githubLink: "https://github.com/TiniToni/winghacks2025"
    },
    {
        name: "CostCompass",
        description: "Real-time cost-of-living context powered by maps, census data, and AI.",
        skills: ["Information Architecture", "Map UX", "Figma"],
        image: cc,        githubLink: "https://github.com/CloudRazerz/CostCompass"
    },
    {
        name: "Lion Dance Team",
        description: "A website for the UF Lion Dance Team, showcasing their performances, history, and community.",
        skills: ["UI Design", "Prototyping", "JS"],
        image: ldt,        liveLink: "https://www.ufldt.com/"
    }
];

const caseStudies = [
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

const caseStudyOrder = ["CARTograph", "ClassMail"];
const visibleCaseStudies = caseStudies
    .sort((a, b) => caseStudyOrder.indexOf(a.name) - caseStudyOrder.indexOf(b.name));

const movingProjects = [
  ...visibleCaseStudies.map(study => ({name: study.name, description: study.name === 'CARTograph' ? 'grocery shopping, simplified' : 'a little less inbox. a lot more clarity.', tag: study.name === 'CARTograph' ? '2nd place · Esri hackathon' : 'product design'})),
  ...projects.map(project => ({name: project.name, description: project.description, tag: project.skills[0]}))
];

const studyHighlights = {
  CARTograph: {
    status: 'Functional proof of concept',
    problem: 'Grocery savings are hard to judge when prices, lists, and driving costs live in separate tools.',
    contribution: 'I mapped the mobile shopping flow and designed the Figma interface. Teammates developed the engineering, AI, and GIS components.',
    result: 'Our team built a functional proof of concept and earned second place at the Esri hackathon.',
    before: 'Build a list → compare retailer prices → plan the trip separately.',
    after: 'Create a list → compare stores → choose a route with cost and travel in view.',
    signal: 'Reviewing the shopping workflow showed that lower grocery prices can come with extra travel costs. Team feedback helped prioritize a complete shopping flow.',
    response: 'I connected list building, price comparison, and route selection in one mobile flow so shoppers could weigh the whole trip.',
    validation: 'The documented result is a team proof of concept and hackathon award. Production release, live pricing, and shopper usability testing are not established outcomes.'
  },
  ClassMail: {
    status: 'Interactive MVP prototype',
    problem: 'Students track academic messages and deadlines across email, Canvas, calendars, and other portals.',
    contribution: 'I helped translate team research and shared student experiences into the academic dashboard and interactive MVP prototype.',
    result: 'We completed the core-feature design in two weeks. In the concept survey, 87.5% of respondents could see themselves using ClassMail.',
    before: 'Check email → check Canvas → check calendars → piece together what needs attention.',
    after: 'Open one dashboard → filter by class, urgency, or deadline → act on the relevant message.',
    signal: 'In our team survey, 62.5% of respondents used multiple platforms, and 62.5% sometimes or often missed messages or deadlines.',
    response: 'We proposed a central dashboard with class, urgency, and deadline filters to make the next action easier to identify.',
    validation: 'These percentages describe the concept survey, not prototype usability results. Student usability testing and integration validation are next steps.'
  }
};

const portfolioProjects = [
  ...visibleCaseStudies.map(study => ({...study, study, destination: study.link || study.figmaLink, action: study.link ? 'Project' : 'Prototype'})),
  ...projects.map(project => ({...project, destination: project.liveLink || project.githubLink, action: project.liveLink ? 'Live' : 'Source'}))
];

const selectedProjects = portfolioProjects.filter(project => project.study || project.name === 'PicklePortal');
const otherProjects = portfolioProjects.filter(project => !selectedProjects.includes(project));

const Projects = ({ theme = 'light', archive = false }) => {
    const [selectedStudy, setSelectedStudy] = useState(() => window.location.hash === '#projects/classmail' ? caseStudies.find(study => study.name === 'ClassMail') : null);
    const dismissStudy = React.useCallback(() => {
      setSelectedStudy(null);
      if (window.location.hash === '#projects/classmail') window.history.replaceState(null, '', '#projects');
    }, []);
    const [motionPaused, setMotionPaused] = useState(false);
    const [view, setView] = useState('index');
    const [spotlightIndex, setSpotlightIndex] = useState(0);

    const dialogRef = useRef(null);

    useEffect(() => {
        if (!selectedStudy) return undefined;
        const previousOverflow = document.body.style.overflow;
        const trigger = document.activeElement;
        const dialog = dialogRef.current;
        const site = document.querySelector('.pond-site');
        site?.setAttribute('inert', '');
        dialog?.querySelector('button')?.focus();
        const closeOnEscape = (event) => {
            if (event.key === "Escape") dismissStudy();
            if (event.key === "Tab" && dialog) {
                const items = [...dialog.querySelectorAll('button, a[href], iframe')];
                const first = items[0];
                const last = items[items.length - 1];
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
            }
        };
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", closeOnEscape);
        

    return () => {
            document.body.style.overflow = previousOverflow;
            site?.removeAttribute('inert');
            if (trigger?.isConnected && trigger !== document.body) trigger.focus({preventScroll: true});
            else document.getElementById('projects-title')?.focus({preventScroll: true});
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [selectedStudy, dismissStudy]);

    if (archive) return <section id="projects" className="project-journal" aria-labelledby="project-journal-title">
      <a className="project-journal-back" href="#projects"><span aria-hidden="true">← </span>Selected projects</a>
      <header className="project-journal-header">
        <p className="page-eyebrow">the project journal</p>
        <h1 id="project-journal-title" className="projects-editorial-title">More projects</h1>
        <p>More things I’ve designed and built, from student communities to maps and games.</p>
      </header>
      <div className="project-journal-entries">
        {otherProjects.map((project, index) => <article className="project-journal-entry" key={project.name}>
          <div className="project-journal-image"><img src={project.image} alt={`${project.name} project preview`} loading="lazy" style={{objectPosition: project.imagePosition || 'center'}} /></div>
          <div className="project-journal-copy">
            <p className="project-journal-number">ENTRY {String(index + 1).padStart(2, '0')} / {project.liveLink ? 'WEBSITE' : 'OPEN SOURCE'}</p>
            <h2>{project.name}</h2>
            <p className="project-journal-description">{project.description}</p>
            <ul className="project-editorial-skills" aria-label={`${project.name} skills`}>{project.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
            <div className="project-editorial-actions"><a href={project.destination} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} project`}>{project.action} ↗</a></div>
          </div>
        </article>)}
      </div>
      <a className="project-journal-back" href="#projects"><span aria-hidden="true">← </span>Back to selected projects</a>
    </section>;

    return (
    <section id="projects" aria-labelledby="projects-title">
        <div className="projContent">
            <header className="projects-editorial-header">
              <h1 id="projects-title" className="projects-editorial-title" tabIndex={-1}>Projects</h1>
              <div className="projects-view-controls" role="group" aria-label="Project layout">
                {['index', 'plates', 'spotlight'].map(layout => <button key={layout} type="button" aria-pressed={view === layout} onClick={() => setView(layout)}>{layout[0].toUpperCase() + layout.slice(1)}</button>)}
              </div>
            </header>
            <section className="project-motion" aria-labelledby="project-motion-title">
              <header className="project-motion-header"><h2 id="project-motion-title">/ selected work, in motion</h2><button type="button" aria-label={motionPaused ? 'Resume project strip' : 'Pause project strip'} aria-pressed={motionPaused} onClick={() => setMotionPaused(value => !value)}>{motionPaused ? 'play →' : 'pause Ⅱ'}</button></header>
              <div className="project-motion-window">
                <div className="project-motion-track" data-paused={motionPaused} style={{animationDuration: `${movingProjects.length * 21}s`}}>
                  {[0, 1].map(copy => <div className="project-motion-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                    {movingProjects.map(project => <div className="project-motion-item" key={project.name}><span className="project-motion-name">{project.name}</span><span className="project-motion-description">{project.description}</span><span className="project-motion-tag">{project.tag}</span></div>)}
                  </div>)}
                </div>
              </div>
            </section>

            <div className={`projects-editorial-grid selected-project-grid selected-project-grid--${view}`}>
              {(view === 'spotlight' ? [selectedProjects[spotlightIndex]] : selectedProjects).map(project => <article className="project-editorial-card" key={project.name}>
                <div className="project-editorial-plate">
                  <div className="project-editorial-image"><img src={project.image} alt={`${project.name} project preview`} loading="lazy" style={{objectPosition: project.imagePosition || 'center', objectFit: project.imageFit || 'cover'}} /></div>
                </div>
                <div className="project-editorial-body">
                  <h2>{project.name}</h2>
                  <p className="project-status">{project.study ? studyHighlights[project.name].status : project.name === 'PicklePortal' ? 'IoT project · Source available' : project.liveLink ? 'Website' : 'Source available'}</p>
                  <p className="project-editorial-description">{project.description}</p>
                  <ul className="project-editorial-skills" aria-label={`${project.name} skills`}>{project.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
                  <div className="project-editorial-actions">
                    <a href={project.destination} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} project`}>{project.action} <span aria-hidden="true">↗</span></a>
                    {project.study && <button type="button" onClick={() => setSelectedStudy(project.study)} aria-label={`Read ${project.name} case study`}>Case study <span aria-hidden="true">↗</span></button>}
                  </div>
                </div>
              </article>)}
            </div>

            {view === 'spotlight' && <div className={`project-spotlight-navigation project-spotlight-navigation--${view}`} aria-label="Browse spotlight projects">
              <button type="button" onClick={() => setSpotlightIndex(value => (value + selectedProjects.length - 1) % selectedProjects.length)}>← Previous project</button>
              <span aria-live="polite">{selectedProjects[spotlightIndex].name}</span>
              <button type="button" onClick={() => setSpotlightIndex(value => (value + 1) % selectedProjects.length)}>Next project →</button>
            </div>}
            <div className="projects-more"><p>Browse through my projects :D</p><a className="projects-more-link" href="#project-journal">View more projects <span aria-hidden="true">↗</span></a></div>

            {selectedStudy && createPortal(
                <div className="pond-site study-portal" data-theme={theme}>
                <div className="case-study-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) dismissStudy(); }}>
                    <section ref={dialogRef} className="case-study-modal" tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="case-study-modal-title">
                        <button className="case-study-modal-close" type="button" onClick={dismissStudy} aria-label="Close case study">×</button>

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

                            <aside className="case-study-snapshot" aria-label="Project at a glance">
                              <p className="case-study-step">At a glance / {studyHighlights[selectedStudy.name].status}</p>
                              <dl className="study-highlights">{[['Problem', 'problem'], ['My contribution', 'contribution'], ['Result', 'result']].map(([label, field]) => <div key={field}><dt>{label}</dt><dd>{studyHighlights[selectedStudy.name][field]}</dd></div>)}</dl>
                            </aside>
                            <section className="study-evidence" aria-labelledby="study-evidence-title">
                              <p className="case-study-step">A closer look at the decision</p><h3 id="study-evidence-title">From scattered steps to a clearer flow</h3>
                              <div className="study-workflow"><article><h4>Existing workflow</h4><p>{studyHighlights[selectedStudy.name].before}</p></article><article><h4>Proposed experience</h4><p>{studyHighlights[selectedStudy.name].after}</p></article></div>
                              <dl className="study-reasoning"><div><dt>What informed it</dt><dd>{studyHighlights[selectedStudy.name].signal}</dd></div><div><dt>The design response</dt><dd>{studyHighlights[selectedStudy.name].response}</dd></div></dl>
                              <p className="study-validation"><strong>Validation so far.</strong> {studyHighlights[selectedStudy.name].validation}</p>
                            </section>
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
                                    {selectedStudy.journey && <section className="case-study-story-block"><p className="case-study-step">User journey</p><h3>The core user flow</h3><ol className="case-study-process">{selectedStudy.journey.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>}
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
                                    {(selectedStudy.image || selectedStudy.figmaLink) && <section className="case-study-final-design">{selectedStudy.figmaEmbed ? <iframe src={selectedStudy.figmaEmbed} title={`${selectedStudy.name} interactive prototype`} allowFullScreen /> : selectedStudy.image ? <img src={selectedStudy.image} alt={`${selectedStudy.name} final interface preview`} /> : <div className="case-study-final-placeholder" aria-hidden="true">{selectedStudy.placeholder}</div>}<div><p className="case-study-step">Final UI</p><h3>The final experience</h3><p>{selectedStudy.name === "CARTograph" ? "Open the Figma file to explore the interface and design details." : "Click through the interactive prototype to explore the experience."}</p>{selectedStudy.figmaLink && <a href={selectedStudy.figmaLink} target="_blank" rel="noopener noreferrer">{selectedStudy.name === "CARTograph" ? "Open in Figma" : "Open prototype in Figma"} <span aria-hidden="true">↗</span></a>}</div></section>}
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
                                    {selectedStudy.link ? <a href={selectedStudy.link} target="_blank" rel="noopener noreferrer">View project on Devpost <span aria-hidden="true">↗</span></a> : <p>{selectedStudy.status}</p>}
                                </footer>
                            )}
                        </div>
                    </section>
                </div>
                </div>, document.body
            )}
        </div>
    </section>
    );
};

export default Projects;
