import React, { useEffect, useState } from "react";
import './text.css'
import logo from '../../assets/logo.jpg'

export default function TextGenerate() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const message = "hi, im lynette";
  
  useEffect(() => {
    if (index < message.length) {
      const timer = setInterval(() => {
        setText((prevText) => prevText + message[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 100);

      return () => clearInterval(timer);
    }
  }, [index, message]);

  return (
    <section id="text">
      <img src={logo} alt="logo" className="flower"/>
      <div className="text">
      {text}.<span className="cursor">|</span>
      <p className="textPara">a sophomore computer science major at the university of florida.</p>
      </div>
    </section>
    
  );
}
