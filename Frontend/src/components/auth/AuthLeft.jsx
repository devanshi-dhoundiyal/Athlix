/* AuthLeft.jsx – shared left panel for Login & Register */
export default function AuthLeft({ illustration, heading, sub }) {
  return (
    <div className="auth-left">
      <div className="auth-left__bg-circle" />
      <div className="auth-left__bg-circle" />
      <div className="auth-left__bg-circle" />

      <div className="auth-left__logo">
        <span className="auth-left__logo-icon">✦</span>
        Athlix
      </div>

      <div className="auth-left__illo">
        {illustration === 'login' ? <LoginIllo /> : <RegisterIllo />}
      </div>

      <div className="auth-left__tagline">
        <h2>{heading}</h2>
        <p>{sub}</p>
      </div>
    </div>
  );
}

function LoginIllo() {
  return (
    <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="130" cy="230" rx="100" ry="18" fill="rgba(255,255,255,.1)"/>
      <circle cx="80" cy="210" r="20" fill="white" opacity=".9"/>
      <polygon points="80,192 91,202 87,216 69,216 65,202" fill="#1a5c4d" opacity=".8"/>
      <rect x="110" y="178" width="13" height="46" rx="6" fill="#0e5c4d" transform="rotate(-12 116 201)"/>
      <rect x="125" y="175" width="13" height="50" rx="6" fill="#0e5c4d" transform="rotate(14 131 200)"/>
      <ellipse cx="103" cy="222" rx="14" ry="7" fill="#0a3d30" transform="rotate(-12 103 222)"/>
      <ellipse cx="138" cy="220" rx="14" ry="7" fill="#0a3d30" transform="rotate(14 138 220)"/>
      <rect x="106" y="126" width="40" height="54" rx="14" fill="#7fffd4" opacity=".9"/>
      <text x="126" y="157" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0e5c4d">7</text>
      <rect x="82" y="128" width="28" height="11" rx="5" fill="#7fffd4" opacity=".9" transform="rotate(-30 96 133)"/>
      <rect x="148" y="122" width="28" height="11" rx="5" fill="#7fffd4" opacity=".9" transform="rotate(40 162 127)"/>
      <circle cx="126" cy="106" r="26" fill="#FDBCB4"/>
      <ellipse cx="126" cy="84" rx="24" ry="15" fill="#4a2f00"/>
      <ellipse cx="104" cy="93" rx="10" ry="12" fill="#4a2f00"/>
      <ellipse cx="148" cy="93" rx="10" ry="12" fill="#4a2f00"/>
      <circle cx="118" cy="107" r="4" fill="#333"/>
      <circle cx="134" cy="107" r="4" fill="#333"/>
      <circle cx="119" cy="106" r="1.5" fill="white"/>
      <circle cx="135" cy="106" r="1.5" fill="white"/>
      <path d="M118 118 Q126 124 134 118" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="112" cy="114" r="5" fill="#ffb3a7" opacity=".5"/>
      <circle cx="140" cy="114" r="5" fill="#ffb3a7" opacity=".5"/>
      <text x="30" y="80" fontSize="18" fill="#7fffd4" opacity=".7">★</text>
      <text x="200" y="60" fontSize="13" fill="#7fffd4" opacity=".5">★</text>
      <rect x="198" y="155" width="26" height="20" rx="4" fill="#FFD700" opacity=".8"/>
      <rect x="204" y="175" width="4" height="10" rx="2" fill="#FFD700" opacity=".8"/>
      <rect x="212" y="175" width="4" height="10" rx="2" fill="#FFD700" opacity=".8"/>
      <rect x="200" y="185" width="20" height="4" rx="2" fill="#FFD700" opacity=".8"/>
      <text x="211" y="170" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">★</text>
    </svg>
  );
}

function RegisterIllo() {
  return (
    <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="130" cy="235" rx="110" ry="18" fill="rgba(255,255,255,.1)"/>
      {/* Kid 1 - wheelchair */}
      <circle cx="58" cy="115" r="20" fill="#FDBCB4"/>
      <ellipse cx="58" cy="100" rx="17" ry="11" fill="#b05c1a"/>
      <rect x="42" y="135" width="32" height="36" rx="10" fill="#e53935" opacity=".9"/>
      <circle cx="38" cy="183" r="14" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="3"/>
      <circle cx="76" cy="183" r="14" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="3"/>
      <rect x="36" y="165" width="42" height="9" rx="4" fill="rgba(255,255,255,.5)"/>
      <circle cx="56" cy="116" r="3.5" fill="#333"/>
      <circle cx="64" cy="116" r="3.5" fill="#333"/>
      <path d="M54 125 Q60 130 66 125" stroke="#333" strokeWidth="1.5" fill="none"/>
      {/* Kid 2 - centre jumping */}
      <circle cx="130" cy="90" r="24" fill="#FDBCB4"/>
      <ellipse cx="130" cy="70" rx="22" ry="14" fill="#3a1a00"/>
      <rect x="112" y="114" width="36" height="50" rx="13" fill="#7fffd4" opacity=".9"/>
      <rect x="90" y="116" width="26" height="10" rx="5" fill="#7fffd4" opacity=".9" transform="rotate(-35 103 121)"/>
      <rect x="144" y="112" width="26" height="10" rx="5" fill="#7fffd4" opacity=".9" transform="rotate(35 157 117)"/>
      <rect x="115" y="163" width="13" height="46" rx="6" fill="#0e3d30" transform="rotate(-15 121 186)"/>
      <rect x="132" y="160" width="13" height="48" rx="6" fill="#0e3d30" transform="rotate(15 138 184)"/>
      <ellipse cx="106" cy="207" rx="14" ry="7" fill="#061f16" transform="rotate(-15 106 207)"/>
      <ellipse cx="144" cy="205" rx="14" ry="7" fill="#061f16" transform="rotate(15 144 205)"/>
      <circle cx="122" cy="90" r="4" fill="#333"/>
      <circle cx="138" cy="90" r="4" fill="#333"/>
      <path d="M122 102 Q130 108 138 102" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Kid 3 - right */}
      <circle cx="202" cy="115" r="20" fill="#FDBCB4"/>
      <ellipse cx="202" cy="100" rx="17" ry="11" fill="#1a3a00"/>
      <rect x="186" y="135" width="32" height="46" rx="11" fill="#3f51b5" opacity=".9"/>
      <rect x="166" y="138" width="24" height="10" rx="5" fill="#3f51b5" opacity=".9" transform="rotate(-25 178 143)"/>
      <rect x="218" y="133" width="24" height="10" rx="5" fill="#3f51b5" opacity=".9" transform="rotate(30 230 138)"/>
      <rect x="189" y="180" width="12" height="44" rx="6" fill="#1a237e" transform="rotate(-8 195 202)"/>
      <rect x="203" y="178" width="12" height="46" rx="6" fill="#1a237e" transform="rotate(8 209 201)"/>
      <ellipse cx="183" cy="222" rx="14" ry="7" fill="#0d1160" transform="rotate(-8 183 222)"/>
      <ellipse cx="213" cy="222" rx="14" ry="7" fill="#0d1160" transform="rotate(8 213 222)"/>
      <circle cx="195" cy="116" r="3.5" fill="#333"/>
      <circle cx="209" cy="116" r="3.5" fill="#333"/>
      <path d="M193 125 Q201 131 209 125" stroke="#333" strokeWidth="1.5" fill="none"/>
      <circle cx="40" cy="50" r="4" fill="#FFD700" opacity=".7"/>
      <circle cx="210" cy="45" r="3" fill="#FF8A65" opacity=".7"/>
      <text x="20" y="145" fontSize="14" fill="#FFD700" opacity=".7">★</text>
      <text x="230" y="130" fontSize="10" fill="#FFD700" opacity=".5">★</text>
    </svg>
  );
}
