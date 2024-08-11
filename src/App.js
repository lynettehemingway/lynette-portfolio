import Navbar from "./components/Navbar/navbar";
import Intro from "./components/Intro/intro";
import TextGenerate from "./components/TextGenerate/text";
import Footer from "./components/Footer/footer";
import Projects from "./components/Projects/projects";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Section = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4, 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <TextGenerate />
      <Section>
        <Intro />
      </Section>
      <Section>
        <Projects />
      </Section>
      <Footer />
    </div>
  );
}

export default App;
