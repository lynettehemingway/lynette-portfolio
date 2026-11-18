import { useEffect, useState } from "react";


const roles = [
    {
        "company": "EduTrend",
        "title": "Product Design Intern",
        "dates": "December 2025 — March 2026",
        "timelineDates": "Dec 2025–Mar 2026",
        "start": "2025-12",
        "bullets": [
            "Designed responsive screens for desktop and mobile.",
            "Built reusable React components with engineers."
        ]
    },
    {
        "company": "TechSol",
        "title": "Technical Writer",
        "dates": "January 2026 — September 2026",
        "timelineDates": "Jan–Sep 2026",
        "start": "2026-01",
        "bullets": [
            "Reorganized 30+ guides, FAQs, and troubleshooting resources.",
            "Updated onboarding documentation used by 7,000+ people."
        ]
    },
    {
        "company": "Esri",
        "title": "Frontend Software Development Intern",
        "dates": "May 2026 — August 2026",
        "timelineDates": "May–Aug 2026",
        "start": "2026-05",
        "bullets": [
            "Designed 10+ Figma screens for an ArcGIS splice editor and implemented interfaces in React and TypeScript.",
            "Designed ColorFinder, an interactive tool for identifying fiber strands."
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
        return <article id={selected ? 'work-role-panel' : undefined} className="work-role-panel" role="tabpanel" aria-labelledby={'work-tab-' + index} aria-hidden={!selected} hidden={!selected} inert={selected ? undefined : ''} data-active={selected} tabIndex={selected ? 0 : -1} key={entry.company}>
        <header className="work-role-intro">
          <p className="work-role-company">{entry.company}</p>
          <h3>{entry.title}</h3>
          <p className="work-role-dates">{entry.dates}</p>
        </header>
        <ul className="work-role-contributions work-role-bullets">
          {entry.bullets.map(bullet => <li key={bullet}><p>{bullet}</p></li>)}
        </ul>
      </article>;
      })}</div>
    </section>;
}
