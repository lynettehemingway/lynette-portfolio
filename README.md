# Lynette Hemingway's portfolio

An edge-to-edge React portfolio with a quiet night-water background, reflected stars, and the original koi artwork. One navigation row links About, Projects, Experience, and Contact. The site fills the browser; longer sections scroll within the main content area.

## Development

- npm install installs dependencies.
- npm start runs the development server.
- npm test -- --watchAll=false runs interaction tests.
- npm run build creates the production build.
- npm run deploy uses the existing GitHub Pages deployment script.

The entry point is src/index.js. The current interface is in src/App.js and src/night-portfolio.css. Legacy desktop styles remain in the repository but are not imported.

Projects includes a moving preview strip with a pause control, one clickable card per project, expanded previews, and full CARTograph and ClassMail case studies. External project and source links appear inside expanded previews. Pointer movement creates decorative water ripples and droplets. Reduced-motion preferences disable the pond animations and moving strip.

The portrait is public/lynette-pixel-portrait.png. It uses the supplied coarse pixel style with a flat charcoal-blue background and no stars. The pond uses the original koi artwork, CSS reflections, and a canvas for pointer ripples. The portrait caption has been removed.

Contact: lynette.hemingway@gmail.com
