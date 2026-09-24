import React, { useState } from 'react';
import capySerio from '../assets/CapyHein-Serio.PNG';
import capyAcertaste from '../assets/CapyHein-Acertaste.PNG';
import '../estilos/nivel.css';

export default function PantallaTeoria({ leccion, onVolver, onComenzar, isModal = false }) {
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

  const renderGrafico = (grafico) => {
    if (!grafico) return null;

    if (grafico === 'diagrama_figuras') {
      return (
        <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 80, height: 40, background: '#4ee86a', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d1b2a', fontWeight: 'bold' }}>Inicio/Fin</div>
            <div style={{ fontSize: 11, color: '#8aaec8', marginTop: 4 }}>Óvalo</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 80, height: 40, background: '#6ec4ff', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d1b2a', fontWeight: 'bold' }}>Proceso</div>
            <div style={{ fontSize: 11, color: '#8aaec8', marginTop: 4 }}>Rectángulo</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 80, height: 40, background: '#f5c542', transform: 'skew(-20deg)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ transform: 'skew(20deg)', color: '#0d1b2a', fontWeight: 'bold', fontSize: 14 }}>Entrada/Salida</div>
            </div>
            <div style={{ fontSize: 11, color: '#8aaec8', marginTop: 4 }}>Paralelogramo</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, background: '#ff6e6e', transform: 'rotate(45deg)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ transform: 'rotate(-45deg)', color: '#0d1b2a', fontWeight: 'bold' }}>Decisión</div>
            </div>
            <div style={{ fontSize: 11, color: '#8aaec8', marginTop: 4 }}>Rombo</div>
          </div>
        </div>
      );
    }
    
    if (grafico === 'esquema_eps') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
           <div style={{ padding: '8px 16px', background: '#375586', borderRadius: 8, fontWeight: 'bold', color: '#fff' }}>Entrada</div>
           <div style={{ color: '#4ee86a', fontWeight: 'bold' }}>→</div>
           <div style={{ padding: '8px 16px', background: '#6ec4ff', color: '#0d1b2a', borderRadius: 8, fontWeight: 'bold' }}>Proceso</div>
           <div style={{ color: '#4ee86a', fontWeight: 'bold' }}>→</div>
           <div style={{ padding: '8px 16px', background: '#f5c542', color: '#0d1b2a', borderRadius: 8, fontWeight: 'bold' }}>Salida</div>
        </div>
      );
    }

    if (grafico === 'ejemplo_doble_flujo') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
           <div className="chip f-ini" style={{ pointerEvents: 'none', transform: 'scale(0.85)' }}>Inicio</div>
           <div style={{ color: '#f5c542', fontSize: 20 }}>▼</div>
           <div className="chip f-io" style={{ pointerEvents: 'none', transform: 'scale(0.85)' }}>Leer n</div>
           <div style={{ color: '#f5c542', fontSize: 20 }}>▼</div>
           <div className="chip f-proc" style={{ pointerEvents: 'none', transform: 'scale(0.85)' }}>doble ← n × 2</div>
           <div style={{ color: '#f5c542', fontSize: 20 }}>▼</div>
           <div className="chip f-io" style={{ pointerEvents: 'none', transform: 'scale(0.85)' }}>Escribir doble</div>
           <div style={{ color: '#f5c542', fontSize: 20 }}>▼</div>
           <div className="chip f-fin" style={{ pointerEvents: 'none', transform: 'scale(0.85)' }}>Fin</div>
        </div>
      );
    }

    if (grafico === 'variable_caja') {
      return (
        <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
          <div style={{ border: '3px solid #6ec4ff', borderRadius: 8, padding: 12, width: 100, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: '#8aaec8', marginBottom: 8, borderBottom: '1px solid #1e3250' }}>edad</div>
            <div style={{ fontSize: 24, color: '#fff', fontWeight: 'bold' }}>15</div>
          </div>
          <div style={{ border: '3px solid #f5c542', borderRadius: 8, padding: 12, width: 120, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: '#8aaec8', marginBottom: 8, borderBottom: '1px solid #1e3250' }}>nombre</div>
            <div style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>"Leo"</div>
          </div>
        </div>
      );
    }

    return null;
  };

  const modalOverlayStyle = {
    position: 'fixed', inset: 0, zIndex: 400,
    background: 'rgba(13, 27, 42, 0.9)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'Nunito, sans-serif'
  };

  const contentBoxStyle = isModal ? {
    background: '#112240', border: '3px solid #375586', borderRadius: 16,
    padding: '32px 40px', width: '90%', maxWidth: 600, color: '#fff',
    display: 'flex', flexDirection: 'column', gap: 24, position: 'relative'
  } : {
    display: 'flex', flexDirection: 'column', gap: 24, padding: '20px', flex: 1, justifyContent: 'center'
  };

  const renderContent = () => (
    <div style={contentBoxStyle}>
      {/* Botón cerrar */}
      {isModal ? (
        <button onClick={onVolver} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'none', border: 'none', color: '#8aaec8', fontSize: 24, cursor: 'pointer', padding: 0
        }}>×</button>
      ) : (
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          <button onClick={onVolver} style={{
            background: 'none', border: 'none', color: '#8aaec8', fontSize: 24, cursor: 'pointer', padding: 0
          }}>×</button>
        </div>
      )}

      {/* Título de la Lección */}
      <div style={{ textAlign: 'center', borderBottom: '1px solid #1e3250', paddingBottom: 16 }}>
        <div style={{ fontSize: 12, color: '#8aaec8', letterSpacing: 1.5, fontWeight: 800 }}>TEORÍA</div>
        <h2 style={{ fontSize: 22, margin: '4px 0 0 0', color: '#fdfbf5' }}>{leccion.titulo}</h2>
      </div>

        {/* Contenido de la Diapositiva */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {slide.grafico === 'ejemplo_doble_flujo' ? (
            <>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <img src={esUltima ? capyAcertaste : capySerio} style={{ width: 90, objectFit: 'contain' }} alt="CapyHein" />
                 </div>
                 <h3 style={{ margin: 0, color: '#6ec4ff', fontSize: 18 }}>{slide.titulo}</h3>
                 <p style={{ margin: 0, color: '#aac4e0', fontSize: 15, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                   {slide.texto}
                 </p>
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: 12 }}>
                 {renderGrafico(slide.grafico)}
              </div>
            </>
          ) : (
            <>
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
                {renderGrafico(slide.grafico)}
              </div>
            </>
          )}
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
            onClick={esUltima ? (isModal ? onVolver : onComenzar) : handleNext}
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
            {esUltima ? (isModal ? 'CERRAR' : '¡A PRACTICAR! 🚀') : 'Siguiente →'}
          </button>
        </div>
    </div>
  );

  if (isModal) {
    return (
      <div style={modalOverlayStyle}>
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="nivel-screen">
      {/* Tokens de fondo */}
      <span className="bg-code-token bg-token-1">0101</span>
      <span className="bg-code-token bg-token-2">&#123; &#125;</span>
      <span className="bg-code-token bg-token-3">&#123; &#125;</span>
      <span className="bg-code-token bg-token-4">&lt;/&gt;</span>
      <span className="bg-code-token bg-token-5">⚙</span>

      <div className="nivel-container">
        {renderContent()}
      </div>
    </div>
  );
}
