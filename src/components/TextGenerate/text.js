import React, { useEffect, useState } from "react";
import './text.css';

const Branch = ({ depth, length, level = 0 }) => {
  if (depth === 0) return null;

  const nextLength = length * 0.72;

  return (
    <g>
      <line
        className="tree-branch"
        pathLength="1"
        style={{ "--branch-delay": `${level * 0.13}s` }}
        x1="0"
        y1="0"
        x2="0"
        y2={-length}
      />
      <g transform={`translate(0 ${-length}) rotate(-34)`}>
        <Branch depth={depth - 1} length={nextLength} level={level + 1} />
      </g>
      <g transform={`translate(0 ${-length}) rotate(34)`}>
        <Branch depth={depth - 1} length={nextLength} level={level + 1} />
      </g>
    </g>
  );
};

const BinaryTreeGraphic = () => (
  <svg className="binary-tree" viewBox="0 0 500 500" role="img" aria-label="A geometric binary tree">
    <g transform="translate(250 455)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <Branch depth={8} length={112} />
    </g>
  </svg>
);

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

  useEffect(() => {
    const tree = document.querySelector(".binary-tree");
    const touchCapable = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    if (!tree || !touchCapable) return undefined;
    let resetTimer;

    const moveTree = (event) => {
      const bounds = tree.getBoundingClientRect();
      const horizontal = Math.max(-1, Math.min(1, (event.clientX - (bounds.left + bounds.width / 2)) / (window.innerWidth * .5)));
      const vertical = Math.max(-1, Math.min(1, (event.clientY - (bounds.top + bounds.height / 2)) / (window.innerHeight * .5)));
      tree.style.setProperty("--touch-lean", `${horizontal * 3.5}deg`);
      tree.style.setProperty("--touch-shift", `${vertical * 2}px`);
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        tree.style.setProperty("--touch-lean", "0deg");
        tree.style.setProperty("--touch-shift", "0px");
      }, 500);
    };

    window.addEventListener("pointerdown", moveTree, { passive: true });
    window.addEventListener("pointermove", moveTree, { passive: true });
    return () => {
      window.clearTimeout(resetTimer);
      window.removeEventListener("pointerdown", moveTree);
      window.removeEventListener("pointermove", moveTree);
    };
  }, []);

  const highlightedText = () => {
    const nameStart = message.indexOf("lynette");
    const beforeName = text.slice(0, nameStart);
    const namePart = text.slice(nameStart, nameStart + 7);
    const afterName = text.slice(nameStart + 7);

    return (
      <>
        {beforeName}
        <span className="name-line">
          <span className="highlight-name">{namePart}</span>
          {afterName}
          <span className="cursor">|</span>
        </span>
      </>
    );
  };

  return (
    <section id="text">
      <BinaryTreeGraphic />
      <div className="text">
        <h1>
          {highlightedText()}
        </h1>
        <p className="textPara">
          a senior computer science major at the university of florida.
        </p>
      </div>
    </section>
  );
}
