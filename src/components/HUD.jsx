import React from 'react';
import {
  AvatarPixel,
  GearIcon,
  CardIcon,
  FlameIcon,
  BackpackIcon,
  BookIcon,
  TrophyIcon
} from './PixelIcons';

export default function HUD({ actual, com, racha, icono, onPerfil, onLogros, onExtras }) {
  return (
    <>
      {/* 1. Nivel actual + botón de ajustes (Esquina superior izquierda) */}
      <div className="hud-top-left">
        <div className="hud-level-box" onClick={onPerfil} role="button" tabIndex={0} title="Ver Perfil">
          <div className="hud-avatar-frame">
            <AvatarPixel tipo="tu" size={32} />
          </div>
          <div className="hud-level-info">
            <span className="hud-level-label">Nivel Actual</span>
            <span className="hud-level-num">{actual + 1}</span>
          </div>
        </div>
        <button className="hud-gear-btn" onClick={onPerfil} aria-label="Ajustes y perfil" title="Ajustes">
          <GearIcon size={22} />
        </button>
      </div>

      {/* 2. Píldoras centrales: Comodines y Racha */}
      <div className="hud-top-stats">
        <div className="hud-pill hud-comodines">
          <div className="hud-pill-icon">
            <CardIcon size={20} />
          </div>
          <div className="hud-pill-texts">
            <span className="hud-pill-title">Comodines</span>
            <span className="hud-pill-val">x {com}</span>
          </div>
        </div>

        <div className="hud-pill hud-racha">
          <div className="hud-pill-icon">
            <FlameIcon size={22} />
          </div>
          <div className="hud-pill-texts">
            <span className="hud-pill-title">Racha</span>
            <span className="hud-pill-val racha-gold">{racha} {racha === 1 ? 'día' : 'días'}</span>
          </div>
        </div>
      </div>

      {/* 3. Botones inferiores izquierdos: Perfil, Extras, Logros */}
      <div className="hud-bottom-nav">
        <button className="hud-nav-item" onClick={onPerfil} aria-label="Perfil">
          <div className="hud-nav-box">
            <BackpackIcon size={32} />
          </div>
          <span className="hud-nav-label">Perfil</span>
        </button>

        <button className="hud-nav-item" onClick={onExtras} aria-label="Extras">
          <div className="hud-nav-box">
            <BookIcon size={32} />
          </div>
          <span className="hud-nav-label">Extras</span>
        </button>

        <button className="hud-nav-item" onClick={onLogros} aria-label="Logros">
          <div className="hud-nav-box">
            <TrophyIcon size={32} />
          </div>
          <span className="hud-nav-label">Logros</span>
        </button>
      </div>
    </>
  );
}
