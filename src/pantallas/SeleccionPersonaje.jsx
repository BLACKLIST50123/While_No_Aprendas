import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { PixelButton, SkyBackground } from '../components/UI.jsx';

export default function SeleccionPersonaje({ go, onPick }) {
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
            <PixelButton disabled={!selected} onClick={() => { onPick(selected); go("register"); }}>CONTINUAR →</PixelButton>
          </div>
        </div>
      </div>
    </SkyBackground>
  );
}
