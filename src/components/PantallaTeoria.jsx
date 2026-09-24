import React, { useState } from 'react';
import capySerio from '../assets/CapyHein-Serio.PNG';
import capyAcertaste from '../assets/CapyHein-Acertaste.PNG';

export default function PantallaTeoria({ leccion, onVolver, onComenzar }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const total = leccion.teoria.length;
  const slide = leccion.teoria[slideIdx];
  const esUltima = slideIdx === total - 1;

  const handleNext = () => {
    if (esUltima) {
      onComenzar();
    } else {
      setSlideIdx(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (slideIdx > 0) {
      setSlideIdx(i => i - 1);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: '#0d1b2a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Nunito, sans-serif', padding: 20
    }}>
      <div style={{
        background: '#112240', border: '3px solid #375586', borderRadius: 16,
        padding: '32px 40px', width: '100%', maxWidth: 600, color: '#fff',
        display: 'flex', flexDirection: 'column', gap: 24, position: 'relative'
      }}>
        {/* Botón cerrar */}
        <button onClick={onVolver} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'none', border: 'none', color: '#8aaec8', fontSize: 24, cursor: 'pointer', padding: 0
        }}>×</button>

        {/* Título de la Lección */}
        <div style={{ textAlign: 'center', borderBottom: '1px solid #1e3250', paddingBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#8aaec8', letterSpacing: 1.5, fontWeight: 800 }}>TEORÍA</div>
          <h2 style={{ fontSize: 22, margin: '4px 0 0 0', color: '#fdfbf5' }}>{leccion.titulo}</h2>
        </div>

        {/* Contenido de la Diapositiva */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <img 
            src={esUltima ? capyAcertaste : capySerio} 
            alt="CapyHein" 
            style={{ width: 120, objectFit: 'contain' }} 
          />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ margin: 0, color: '#6ec4ff', fontSize: 20 }}>{slide.titulo}</h3>
            <p style={{ margin: 0, color: '#aac4e0', fontSize: 16, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
              {slide.texto}
            </p>
            {slide.codigo && (
              <div style={{
                background: '#0a1420', padding: 12, borderRadius: 8, marginTop: 8,
                fontFamily: 'monospace', color: '#4ee86a', fontSize: 14, whiteSpace: 'pre-wrap'
              }}>
                {slide.codigo}
              </div>
            )}
          </div>
        </div>

        {/* Controles de Navegación */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <button 
            onClick={handlePrev} 
            disabled={slideIdx === 0}
            style={{
              background: 'transparent', border: 'none', color: slideIdx === 0 ? 'transparent' : '#8aaec8',
              fontSize: 16, fontWeight: 700, cursor: slideIdx === 0 ? 'default' : 'pointer', padding: '8px 16px'
            }}
          >
            ← Anterior
          </button>
          
          <div style={{ display: 'flex', gap: 6 }}>
            {leccion.teoria.map((_, i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i === slideIdx ? '#6ec4ff' : '#1e3250'
              }} />
            ))}
          </div>

          <button 
            onClick={handleNext}
            style={{
              background: esUltima ? '#4ee86a' : '#6ec4ff',
              color: '#0d1b2a', border: 'none', borderRadius: 8,
              fontSize: 15, fontWeight: 900, cursor: 'pointer', padding: '10px 20px',
              transition: 'background 0.2s, transform 0.1s'
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {esUltima ? '¡A PRACTICAR! 🚀' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </div>
  );
}
