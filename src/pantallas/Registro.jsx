import React, { useState } from 'react';
import { PixelButton, SkyBackground } from '../components/UI.jsx';

export default function Registro({ go, onDone }) {
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
            <PixelButton disabled={!valid} onClick={() => { onDone({ seccion: section, usuario: user.trim() }); go("map"); }}>CREAR CUENTA</PixelButton>
          </div>
        </div>
      </div>
    </SkyBackground>
  );
}
