// Copia de referencia del main.jsx original (no se usa). Sus pantallas ahora viven en src/pantallas y src/components.
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Settings, Flame, UserRound, ChevronDown, LockKeyhole, Star, Gift, ArrowLeft, Check } from "lucide-react";
import "./index.css";

import messiah from "./assets/messiah.png";
import helperSearch from "./assets/helper-search.png";
import helperTablet from "./assets/helper-tablet.png";

const levels = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  status: i < 4 ? "done" : i === 4 ? "available" : "locked",
  title: ["Variables", "Tipos de datos", "Operadores", "Condicionales", "Bucles", "Funciones"][i % 6],
}));

const answers = [
  "Un espacio para guardar un dato",
  "Un tipo de bucle",
  "Una función matemática",
  "Un archivo del programa",
];

function PixelButton({ children, onClick, disabled=false, className="" }) {
  return (
    <button disabled={disabled} onClick={onClick}
      className={`pixel-button ${disabled ? "pixel-disabled" : ""} ${className}`}>
      {children}
    </button>
  );
}

function SkyBackground({ children }) {
  const bits = useMemo(() => [
    ["< >", "12%", "17%"], ["0 1", "30%", "10%"], ["1 0", "76%", "18%"],
    ["< >", "86%", "34%"], ["0 1", "54%", "27%"], ["1 1", "19%", "38%"],
    ["< >", "68%", "8%"], ["0 0", "91%", "13%"], ["1 0", "41%", "42%"],
  ], []);
  return (
    <div className="sky-world">
      <div className="sky-gradient" />
      <div className="cloud cloud-a" /><div className="cloud cloud-b" /><div className="cloud cloud-c" />
      {bits.map(([t, left, top], i) => (
        <span key={i} className="code-firefly" style={{left, top}}>{t}</span>
      ))}
      <div className="hill hill-back" /><div className="hill hill-front" />
      <div className="grass-ground">
        {Array.from({length: 70}, (_, i) => <span key={i} className="grass-tuft" style={{left: `${(i*37)%100}%`, bottom: `${6+(i%4)*4}px`}} />)}
      </div>
      <div className="relative z-10 min-h-full">{children}</div>
    </div>
  );
}

function Title({ children }) {
  return <h1 className="pixel-title">{children}<span className="terminal-cursor">_</span></h1>;
}

function Home({ go }) {
  return (
    <SkyBackground>
      <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="order-2 md:order-1 text-center">
            <Title>while(no_aprendas)</Title>
            <p className="pixel-subtitle">APRENDE · PRACTICA · SUBE DE NIVEL</p>
            <div className="mt-7 flex flex-col gap-4 w-72 mx-auto">
              <PixelButton onClick={() => go("character")}>▶ INICIAR PARTIDA</PixelButton>
              <PixelButton onClick={() => alert("Opciones de ejemplo")}>⚙ OPCIONES</PixelButton>
              <PixelButton onClick={() => alert("Extras de ejemplo")}>★ EXTRAS</PixelButton>
            </div>
          </div>
          <div className="order-1 md:order-2 character-pedestal">
            <img src={messiah} className="hero-sprite" alt="El Mesías del Pront" />
            <div className="nameplate">EL MESÍAS<br/>DEL PRONT</div>
          </div>
        </div>
      </div>
    </SkyBackground>
  );
}

function CharacterSelect({ go }) {
  const [selected, setSelected] = useState("");
  const chars = [
    {id:"girl", name:"CHICA", icon:"👩‍💻"},
    {id:"boy", name:"CHICO", icon:"🧑‍💻"},
    {id:"dog", name:"PERRO", icon:"🐶"},
  ];
  return (
    <SkyBackground>
      <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10">
        <div className="panel w-full max-w-5xl">
          <div className="panel-header">SELECCIONA TU PERSONAJE</div>
          <p className="pixel-small text-center my-5">ELIGE TU COMPAÑERO DE AVENTURA</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {chars.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                className={`inventory-card ${selected===c.id ? "selected" : ""}`}>
                <div className="sprite-placeholder">{c.icon}</div>
                <div className="pixel-small">{c.name}</div>
                {selected===c.id && <div className="selected-check"><Check size={16}/></div>}
              </button>
            ))}
          </div>
          <div className="mt-7 flex justify-center gap-4">
            <PixelButton onClick={() => go("home")} className="secondary">← VOLVER</PixelButton>
            <PixelButton disabled={!selected} onClick={() => go("register")}>CONTINUAR →</PixelButton>
          </div>
        </div>
      </div>
    </SkyBackground>
  );
}

function Register({ go }) {
  const [section, setSection] = useState("Programación");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const valid = user.trim() && pass.trim();
  return (
    <SkyBackground>
      <div className="min-h-screen flex items-center justify-center px-5 py-10">
        <div className="panel w-full max-w-xl">
          <div className="panel-header">CREAR CUENTA</div>
          <div className="pixel-small text-center my-5">TU AVENTURA COMIENZA AQUÍ</div>
          <div className="space-y-4">
            <label className="pixel-label">SECCIÓN
              <select value={section} onChange={e=>setSection(e.target.value)} className="pixel-input">
                <option>Programación</option><option>JavaScript</option><option>Python</option><option>Algoritmos</option>
              </select>
            </label>
            <label className="pixel-label">NOMBRE DE USUARIO
              <input value={user} onChange={e=>setUser(e.target.value)} className="pixel-input" placeholder="escribe_tu_nombre" />
            </label>
            <label className="pixel-label">CONTRASEÑA
              <input type="password" value={pass} onChange={e=>setPass(e.target.value)} className="pixel-input" placeholder="••••••••" />
            </label>
          </div>
          <div className="mt-7 flex justify-center gap-4">
            <PixelButton onClick={() => go("character")} className="secondary">← VOLVER</PixelButton>
            <PixelButton disabled={!valid} onClick={() => go("map")}>CREAR CUENTA</PixelButton>
          </div>
        </div>
      </div>
    </SkyBackground>
  );
}

function MapScreen({ go }) {
  return (
    <div className="map-world">
      <div className="map-topbar">
        <div className="flex items-center gap-2">
          <div className="avatar-box"><UserRound size={22}/></div>
          <button className="icon-button"><Settings size={21}/></button>
        </div>
        <div className="joker-pill"><Gift size={18}/> <span>3</span></div>
        <div className="right-stats">
          <div className="streak"><Flame size={20}/> <b>7</b><span>DÍAS</span></div>
          <div className="ranking-panel">
            <div className="ranking-title">RANKING · SECCIÓN</div>
            <div className="rank-row"><span>🥇</span><b>PixelMaster</b><strong>1240</strong></div>
            <div className="rank-row"><span>🥈</span><b>CodeNinja</b><strong>1080</strong></div>
            <div className="rank-row current"><span>⭐</span><b>TÚ</b><strong>930</strong></div>
          </div>
        </div>
      </div>

      <div className="map-scroll">
        <div className="map-path">
          <div className="guide">
            <img src={messiah} alt="El Mesías del Pront" />
            <div className="guide-bubble">¡Vamos!<br/>Tu siguiente reto<br/>te espera.</div>
          </div>
          {levels.map((l,i) => {
            const positions = ["left","center","right","center"];
            const pos = positions[i%4];
            return (
              <button key={l.id} disabled={l.status==="locked"} onClick={() => go("exercise")}
                className={`level-wrap ${pos}`}>
                <div className={`level-node ${l.status}`}>
                  {l.status==="locked" ? <LockKeyhole size={22}/> : l.status==="done" ? <Check size={24}/> : <Star size={24}/>}
                  <span>{l.id}</span>
                </div>
                <span className="level-label">{l.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}

function Exercise({ go }) {
  const [choice, setChoice] = useState(null);
  const [helper, setHelper] = useState(false);
  return (
    <div className="exercise-world">
      <div className="exercise-top">
        <button className="icon-button" onClick={()=>go("map")}><ArrowLeft size={20}/></button>
        <div className="progress-wrap">
          <div className="progress-label">NIVEL 1 · VARIABLES</div>
          <div className="rpg-progress"><div style={{width:"35%"}}/></div>
        </div>
        <div className="joker-pill dark"><Gift size={18}/> <span>3</span></div>
      </div>
      <div className="exercise-content">
        <div className="exercise-character">
          <img src={messiah} alt="Personaje del nivel"/>
        </div>
        <div className="dialog-box">
          <div className="dialog-name">EL MESÍAS DEL PRONT</div>
          ¿Qué es una variable?
        </div>
        <div className="answers">
          {answers.map((a,i)=>(
            <button key={a} onClick={()=>setChoice(i)}
              className={`answer ${choice===i ? (i===0 ? "correct" : "wrong") : ""}`}>
              <span>{String.fromCharCode(65+i)}</span>{a}
            </button>
          ))}
        </div>
      </div>
      <button className="joker-action" onClick={()=>setHelper(true)}><Gift size={24}/><span>COMODÍN</span></button>
      {helper && <HelperOverlay close={()=>setHelper(false)}/>}
    </div>
  );
}

function HelperOverlay({ close }) {
  const [phase, setPhase] = useState(1);
  useEffect(() => {
    const t = setTimeout(() => setPhase(2), 2800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="helper-overlay">
      <div className="helper-scene">
        <img className="helper-sprite" src={phase===1 ? helperSearch : helperTablet} alt="El Mesías del Pront ayudando"/>
        <div className="helper-dialog">
          <div className="dialog-name">EL MESÍAS DEL PRONT</div>
          {phase===1 ? (
            <>
              <div>Esto es sencillo, dame un momento y lo busco<span className="loading-dots">...</span></div>
              <div className="loading-bar"><span/></div>
            </>
          ) : (
            <>
              <div className="mb-4">Ya sé la respuesta</div>
              <div className="hint">PISTA: Una variable es un espacio con nombre donde el programa puede guardar un valor para utilizarlo o cambiarlo.</div>
              <PixelButton onClick={close} className="mt-4">CONTINUAR →</PixelButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState("home");
  const go = setScreen;
  return (
    <div className="app">
      {screen==="home" && <Home go={go}/>}
      {screen==="character" && <CharacterSelect go={go}/>}
      {screen==="register" && <Register go={go}/>}
      {screen==="map" && <MapScreen go={go}/>}
      {screen==="exercise" && <Exercise go={go}/>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
