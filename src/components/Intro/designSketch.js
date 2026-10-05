export default function DesignSketch() {
  return (
    <figure className="design-sketch">
      <svg viewBox="0 0 520 470" role="img" aria-labelledby="design-sketch-title">
        <title id="design-sketch-title">Product design canvas with wireframes, a polished interface, and a design cursor</title>
        <defs>
          <pattern id="design-grid" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#738568" opacity=".22" /></pattern>
        </defs>
        <rect x="8" y="8" width="504" height="454" rx="24" fill="#eeece2" />
        <rect x="8" y="8" width="504" height="454" rx="24" fill="url(#design-grid)" />
        <circle cx="33" cy="34" r="4" fill="#93a385" /><circle cx="48" cy="34" r="4" fill="#b9c3ac" /><circle cx="63" cy="34" r="4" fill="#d0d6c5" />
        <text x="487" y="39" textAnchor="end" fill="#53634b" fontSize="12" letterSpacing="2">IDEAS IN PROGRESS</text>
        <path d="M27 54H493" stroke="#c7cebb" />

        <g transform="rotate(-7 142 227)">
          <rect x="45" y="99" width="202" height="251" rx="10" fill="#f7f5ee" stroke="#9fae90" />
          <text x="62" y="127" fill="#66765b" fontSize="12">01 / explore</text>
          <path d="M62 140H230" stroke="#c7cebb" />
          <rect x="62" y="156" width="167" height="78" rx="5" fill="#e7eadf" stroke="#b1bca3" />
          <path d="m62 156 167 78m0-78L62 234" stroke="#b1bca3" />
          <rect x="62" y="250" width="96" height="8" rx="4" fill="#b4c0a7" />
          <path d="M62 273H216M62 285H190" stroke="#c7cebb" strokeWidth="4" strokeLinecap="round" />
          <rect x="62" y="306" width="72" height="23" rx="12" fill="none" stroke="#9fae90" />
        </g>

        <path d="M213 116C239 76 284 69 302 104" stroke="#718463" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />
        <path d="m293 101 10 6 2-12" stroke="#718463" strokeWidth="1.5" fill="none" />
        <g transform="rotate(4 351 229)">
          <rect x="247" y="113" width="211" height="262" rx="12" fill="#c3cdb5" opacity=".45" transform="translate(6 7)" />
          <rect x="247" y="113" width="211" height="262" rx="12" fill="#faf9f3" stroke="#9fae90" />
          <text x="265" y="140" fill="#53634b" fontSize="12">02 / bring it to life</text>
          <path d="M263 154H443" stroke="#d5dacb" />
          <rect x="264" y="169" width="177" height="94" rx="8" fill="#233e30" />
          <circle cx="395" cy="196" r="37" fill="#658060" opacity=".5" />
          <path d="M268 239Q302 185 343 222T439 207M268 251Q319 211 350 239T439 228" stroke="#c4ccb0" opacity=".6" fill="none" />
          <text x="278" y="198" fill="#edf0df" fontSize="13">Room to grow.</text>
          <text x="264" y="288" fill="#30432b" fontSize="15" fontWeight="600">A little more clarity.</text>
          <path d="M264 304H430M264 315H388" stroke="#c6cfbb" strokeWidth="4" strokeLinecap="round" />
          <rect x="264" y="332" width="98" height="27" rx="14" fill="#c4d1af" />
          <text x="279" y="350" fill="#30432b" fontSize="11">Get started</text>
          <path d="M337 345h12m-4-4 4 4-4 4" fill="none" stroke="#30432b" />
          <rect x="258" y="326" width="110" height="39" fill="none" stroke="#71875f" strokeDasharray="3 3" />
          {[[255, 323], [365, 323], [255, 362], [365, 362]].map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" fill="#f7f5ee" stroke="#71875f" />)}
        </g>
        <path d="m380 335 10 46 10-14 17-4Z" fill="#344d36" stroke="#f7f5ee" strokeWidth="2" strokeLinejoin="round" />
        <rect x="394" y="385" width="81" height="25" rx="12" fill="#344d36" />
        <text x="434" y="402" textAnchor="middle" fill="#eef0e3" fontSize="12">lynette</text>
        <g fill="#718463"><circle cx="55" cy="404" r="8" /><circle cx="79" cy="404" r="8" fill="#b4c39e" /><circle cx="103" cy="404" r="8" fill="#dfd9c8" /></g>
        <text x="36" y="439" fill="#5a6b50" fontSize="12" letterSpacing="1">RESEARCH → PROTOTYPE → REFINE</text>
      </svg>
      <figcaption>From the first “what if” to the final detail.</figcaption>
    </figure>
  );
}
