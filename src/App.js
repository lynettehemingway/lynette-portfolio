import Navbar from "./components/Navbar/navbar";
import Intro from "./components/Intro/intro";
import TextGenerate from "./components/TextGenerate/text";
import Footer from "./components/Footer/footer";
import Projects from "./components/Projects/projects";
import KoiPond from "./components/KoiPond/koiPond";
import Experience from "./components/Experience/experience";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const Section = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
};



function App() {
  const [gameMode, setGameMode] = useState(false);

  return (
    <div className={`App ${gameMode ? "game-active" : ""}`}>
      <KoiPond gameMode={gameMode} onExitGame={() => setGameMode(false)} onPlayAgain={() => setGameMode(true)} />
      <Navbar gameMode={gameMode} onGameModeChange={setGameMode} />
      <TextGenerate />
      <Section>
        <Intro />
      </Section>
      <Section>
        <Experience />
      </Section>
      <Section>
        <Projects />
      </Section>
      <Footer />
    </div>
  );
}

export default App;
