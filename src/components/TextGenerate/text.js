import React, { useEffect, useState } from "react";
import './text.css';
import logo from '../../assets/logo.jpg';

export default function TextGenerate() {
  const message = "hi, i'm lynette.";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < message.length) {
      const timer = setTimeout(() => {
        setText((prevText) => prevText + message[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [index, message]);

  const highlightedText = () => {
    const nameStart = message.indexOf("lynette");
    const beforeName = text.slice(0, nameStart);
    const namePart = text.slice(nameStart, nameStart + 7);
    const afterName = text.slice(nameStart + 7);

    return (
      <>
        {beforeName}
        <span className="highlight-name">{namePart}</span>
        {afterName}
      </>
    );
  };

  return (
    <section id="text">
      <img src={logo} alt="logo" className="flower" />
      <div className="text">
        <h1>
          {highlightedText()}
          <span className="cursor">|</span>
        </h1>
        <p className="textPara">
          a junior computer science major at the university of florida.
        </p>
      </div>
    </section>
  );
}
