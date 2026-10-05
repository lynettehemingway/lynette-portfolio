import DesignSketch from './designSketch';

export default function Intro() {
  return (
    <section id="intro" className="about-section" aria-labelledby="about-title">
      <div className="about-copy">
        <h2 id="about-title" className="section-label">{'// a little more about me'}</h2>
        <p>I’m Lynette, a senior computer science student at the University of Florida finding my place in product design.</p>
        <p>My work connects user experience, visual design, and front-end development. I enjoy untangling complex problems and building things that feel natural to use.</p>
        <p>I’m also studying Digital Arts &amp; Sciences and GIS. Away from my screen, you’ll find me sharing food photos, reading manga, or playing one more game of badminton.</p>
        <div className="about-socials">
          <a href="https://www.linkedin.com/in/lynette-hemingway/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/lynettehemingway" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.instagram.com/foodwnet/" target="_blank" rel="noreferrer">Food diary ↗</a>
        </div>
      </div>
      <DesignSketch />
    </section>
  );
}
