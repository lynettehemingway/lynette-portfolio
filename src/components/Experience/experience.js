import { useEffect, useState } from "react";


const roles = [
    {
        "company": "EduTrend",
        "title": "Product Design Intern",
        "dates": "December 2025 — March 2026",
        "timelineDates": "Dec 2025–Mar 2026",
        "start": "2025-12",
        "focus": [
            "Product design",
            "Design systems",
            "UI engineering"
        ],
        "labels": [
            "Clearer interactions",
            "A reusable foundation",
            "Design intent into React"
        ],
        "bullets": [
            "Elevated responsive interfaces across desktop and mobile through clearer hierarchy and interaction patterns.",
            "Standardized repeated workflows by building reusable UI components across related product screens.",
            "Reconciled technical constraints with design intent alongside engineers to preserve core user flows in React."
        ]
    },
    {
        "company": "TechSol",
        "title": "Technical Writer",
        "dates": "January 2026 — September 2026",
        "timelineDates": "Jan–Sep 2026",
        "start": "2026-01",
        "focus": [
            "Information architecture",
            "Technical writing",
            "User support"
        ],
        "labels": [
            "A clearer starting point",
            "Information that makes sense",
            "Less friction, more clarity"
        ],
        "bullets": [
            "Identified onboarding pain points through stakeholder and user feedback, then redesigned documentation experiences supporting 7,000+ users.",
            "Improved information architecture and usability across 30+ guides, FAQs, and troubleshooting resources, making technical content easier to navigate and understand.",
            "Synthesized user needs and technical constraints to simplify complex workflows, improve content clarity, and reduce friction throughout the support experience."
        ]
    },
    {
        "company": "Esri",
        "title": "Frontend Software Development Intern",
        "dates": "May 2026 — August 2026",
        "timelineDates": "May–Aug 2026",
        "start": "2026-05",
        "focus": [
            "Workflow design",
            "User research",
            "React & TypeScript"
        ],
        "labels": [
            "Research into interfaces",
            "A simpler workflow",
            "Design into production"
        ],
        "bullets": [
            "Revamped an ArcGIS splice editor, translating telecom engineer feedback into 10+ high-fidelity Figma screens.",
            "Conceived ColorFinder, replacing manual fiber-color lookup with an interactive strand-identification tool.",
            "Shipped UX concepts in React and TypeScript, translating Figma interactions into production UI."
        ]
    }
];

export default function Experience() {
    const [activeRole, setActiveRole] = useState(roles.length - 1);
    useEffect(() => {
      const tab = document.getElementById('work-tab-' + activeRole);
      const timeline = tab?.closest('.work-timeline');
      if (timeline && timeline.scrollWidth > timeline.clientWidth) timeline.scrollLeft = Math.max(0, tab.offsetLeft + tab.offsetWidth / 2 - timeline.clientWidth / 2);
    }, [activeRole]);
    const selectWithKeyboard = (event, index) => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % roles.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + roles.length - 1) % roles.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = roles.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      setActiveRole(next);
      document.getElementById('work-tab-' + next)?.focus({preventScroll: true});
    };

    const spacing = 900 / roles.length;
    const points = roles.map((item, index) => ({x: (index + .5) * spacing, y: index % 2 === 0 ? 29 : 13}));
    const thread = points.reduce((path, point, index) => index === 0 ? 'M' + point.x + ' ' + point.y : path + ' C' + (points[index - 1].x + spacing / 3) + ' ' + points[index - 1].y + ' ' + (point.x - spacing / 3) + ' ' + point.y + ' ' + point.x + ' ' + point.y, '');

    return <section id="experience" className="work-experience" aria-labelledby="experience-title">
      <h2 id="experience-title" className="sr-only">Experience</h2>
      <div className="work-timeline" style={{'--workplace-count': roles.length}}><div className="work-timeline-direction" aria-hidden="true"><span>Earlier experience</span><span>Latest →</span></div>
        <svg className="work-timeline-thread" viewBox="0 0 900 96" preserveAspectRatio="none" aria-hidden="true">
          <path className="work-thread-base" d={thread} />
          <path className="work-thread-draw" pathLength="1" d={thread} />
        </svg>
        <div className="work-timeline-tabs" role="tablist" aria-label="Workplaces">
          {roles.map((item, index) => <button id={'work-tab-' + index} key={item.company} type="button" role="tab" aria-selected={activeRole === index} aria-controls="work-role-panel" tabIndex={activeRole === index ? 0 : -1} onClick={() => setActiveRole(index)} onKeyDown={event => selectWithKeyboard(event, index)}>
            <span className="work-timeline-company">{item.company}</span>
            <span className="work-timeline-node" aria-hidden="true"><i /></span>
            <span className="work-timeline-position">{item.title}</span><span className="work-timeline-dates">{item.timelineDates}</span>
          </button>)}
        </div>
      </div>
      <div className="work-role-stack">{roles.map((entry, index) => {
        const selected = index === activeRole;
        return <article id={selected ? 'work-role-panel' : undefined} className="work-role-panel" role="tabpanel" aria-labelledby={'work-tab-' + index} aria-hidden={!selected} inert={selected ? undefined : ''} data-active={selected} tabIndex={selected ? 0 : -1} key={entry.company}>
        <header className="work-role-intro">
          <p className="work-role-company">{entry.company}</p>
          <h3>{entry.title}</h3>
          <p className="work-role-dates">{entry.dates}</p>
          <ul className="work-role-focus" aria-label="Focus areas">{entry.focus.map(item => <li key={item}>{item}</li>)}</ul>
        </header>
        <ol className="work-role-contributions">
          {entry.bullets.map((bullet, index) => <li key={bullet}>
            <span className="work-contribution-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div><h4>{entry.labels[index]}</h4><p>{bullet}</p></div>
          </li>)}
        </ol>
      </article>;
      })}</div>
    </section>;
}
