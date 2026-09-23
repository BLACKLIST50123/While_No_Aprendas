import React from 'react';
import messiah from '../assets/messiah.png';
import { PixelButton, SkyBackground, Title } from '../components/UI.jsx';

export default function Inicio({ go }) {
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
