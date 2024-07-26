import Navbar from "./components/Navbar/navbar";
import Intro from "./components/Intro/intro";
import TextGenerate from "./components/TextGenerate/text";
import Skills from "./components/Skills/skills";
import Projects from "./components/Projects/projects";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <TextGenerate/>
      <Intro/>
      <Skills/>
      <Projects/>
    </div>
  );
}

export default App;
