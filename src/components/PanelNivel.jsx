import React from 'react';
import { Lock, Unlock, CheckCircle } from 'lucide-react'; // Asumiendo que lucide-react se puede usar o los reemplazo por iconos simples

export default function PanelNivel({ nivel, nivelIdx, nivelHechos, onClose, onElegirLeccion }) {
  // nivelHechos es del estilo { lecciones: [0,0,0,0,0], completado: false }
  const lecciones = nivelHechos?.lecciones || [0,0,0,0,0];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(13, 27, 42, 0.9)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Nunito, sans-serif'
    }}>
      <div style={{
        background: '#112240', border: '3px solid #375586', borderRadius: 16,
        padding: '24px 32px', width: '90%', maxWidth: 500, color: '#fff',
        display: 'flex', flexDirection: 'column', gap: 20
      }}>
        {/* Encabezado */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, color: '#8aaec8', letterSpacing: 1.5, fontWeight: 800 }}>NIVEL {nivelIdx + 1}</div>
            <h2 style={{ fontSize: 24, margin: '4px 0 0 0', color: '#fdfbf5' }}>{nivel.t}</h2>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#8aaec8', fontSize: 24, cursor: 'pointer', padding: 0
          }}>×</button>
        </div>

        {/* Progreso del nivel */}
        <div style={{ background: '#0d1b2a', borderRadius: 8, padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 8, background: '#1e3250', borderRadius: 4, overflow: 'hidden', display: 'flex' }}>
            {nivel.lecciones.map((_, i) => (
              <div key={i} style={{
                flex: 1, borderRight: i < 4 ? '1px solid #112240' : 'none',
                background: lecciones[i] > 0 ? '#4ee86a' : 'transparent',
                transition: 'background 0.3s'
              }} />
            ))}
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#aac4e0' }}>
            {lecciones.filter(l => l > 0).length} / {nivel.lecciones.length}
          </div>
        </div>

        {/* Lista de Lecciones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {nivel.lecciones.map((lec, idx) => {
            const completada = lecciones[idx] > 0;
            const disponible = idx === 0 || lecciones[idx - 1] > 0 || completada;
            const estrellasObtenidas = lecciones[idx];

            return (
              <button
                key={idx}
                disabled={!disponible}
                onClick={() => onElegirLeccion(idx)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: 16, borderRadius: 12, border: 'none',
                  background: completada ? 'rgba(78, 232, 106, 0.1)' : disponible ? '#1e3250' : 'rgba(30, 50, 80, 0.4)',
                  color: disponible ? '#fff' : '#6482a0',
                  cursor: disponible ? 'pointer' : 'not-allowed',
                  textAlign: 'left',
                  transition: 'transform 0.1s, background 0.2s',
                  borderLeft: completada ? '4px solid #4ee86a' : disponible ? '4px solid #6ec4ff' : '4px solid transparent'
                }}
                onMouseDown={e => disponible && (e.currentTarget.style.transform = 'scale(0.98)')}
                onMouseUp={e => disponible && (e.currentTarget.style.transform = 'scale(1)')}
                onMouseLeave={e => disponible && (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: completada ? '#4ee86a' : disponible ? '#6ec4ff' : '#263e5c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0d1b2a', fontWeight: 900, fontSize: 16
                }}>
                  {completada ? '✓' : disponible ? (idx + 1) : '🔒'}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: completada ? '#4ee86a' : disponible ? '#6ec4ff' : '#6482a0', marginBottom: 2 }}>
                    LECCIÓN {idx + 1}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{lec.titulo}</div>
                </div>

                {completada && (
                  <div style={{ color: '#ffd84e', letterSpacing: 2 }}>
                    {'⭐'.repeat(estrellasObtenidas)}{'☆'.repeat(3 - estrellasObtenidas)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
