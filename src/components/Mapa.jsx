import { useState } from 'react';
import { NODOS } from '../data/cursos';
import messiah from '../assets/messiah.png';
import { PlayerSprite, PadlockIcon } from './PixelIcons';

export default function Mapa({
  niveles, hechos, actual, pos, onElegir,
  mensaje, aviso, children,
  recienDesbloqueado = null, // índice del nodo recién desbloqueado (flash dorado)
}) {
  const [info, setInfo] = useState(null);
  const i = info ?? actual;
  const leccionesCompletadasInfo = hechos[i]?.lecciones?.filter(l => l > 0).length || 0;
  const totalLeccionesInfo = niveles[i]?.lecciones?.length || 5;
  return (
    <div className="wrap">
      <div className="stage" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}mapa1.jpg)` }}>
        {/* HUD y Paneles laterales */}
        {children}

        {/* Mascota ángel y bocadillo */}
        <div className="angel-container">
          <div className="bub">
            {mensaje || '¡Sigue aprendiendo y desbloquea nuevos niveles!'}
          </div>
          <img src={messiah} className="angel-sprite" alt="El Mesías del Pront" />
        </div>

        {/* Nodos del Mapa */}
        {niveles.map((n, k) => {
          const esHecho = Boolean(hechos[k]?.completado);
          const esActual = k === actual;
          const esBloqueado = k > actual;

          // Estado visual del nodo
          let st;
          if (esBloqueado) st = 'lock';
          else if (esHecho) st = 'gold-medallion';
          else if (esActual) st = 'now';
          else st = 'open';

          const esNuevo = k === recienDesbloqueado;
          const lecciones = hechos[k]?.lecciones || [0, 0, 0, 0, 0];
          const totalLecciones = n.lecciones?.length || 5;

          return (
            <button
              key={k}
              className={`node ${st} ${esNuevo ? 'node-flash' : ''}`}
              style={{ left: NODOS[k][0] + '%', top: NODOS[k][1] + '%' }}
              aria-label={`Nivel ${k + 1}: ${n.t}${esBloqueado ? ' (bloqueado)' : ''}`}
              onMouseEnter={() => setInfo(k)}
              onMouseLeave={() => setInfo(null)}
              onFocus={() => setInfo(k)}
              onBlur={() => setInfo(null)}
              onClick={() => onElegir(k)}
            >
              {/* Etiqueta superior */}
              <div className="tag">{k + 1}</div>

              {/* Plataforma 3D */}
              <div className={`disc ${st}`}>
                {st === 'lock' ? (
                  <PadlockIcon size={18} />
                ) : st === 'gold-medallion' ? (
                  <div className="gold-star-medallion">★</div>
                ) : null}
              </div>

              {/* Barra circular particionada de progreso */}
              {(!esBloqueado && st !== 'gold-medallion') && (() => {
                const step = 360 / totalLecciones;
                const gap = 8;
                let stops = [];
                for (let i = 0; i < totalLecciones; i++) {
                  const start = i * step;
                  const end = (i + 1) * step;
                  const color = lecciones[i] > 0 ? '#4ee86a' : 'rgba(80, 100, 120, 0.6)';
                  stops.push(`${color} ${start}deg ${end - gap}deg`);
                  stops.push(`transparent ${end - gap}deg ${end}deg`);
                }
                return (
                  <div style={{
                    position: 'absolute', inset: '-10px', borderRadius: '50%',
                    background: `conic-gradient(${stops.join(', ')})`,
                    WebkitMask: 'radial-gradient(closest-side, transparent calc(100% - 6px), black calc(100% - 5px))',
                    zIndex: -1
                  }} />
                );
              })()}
            </button>
          );
        })}

        {/* Sprite del Jugador */}
        <div
          className="player"
          style={{ left: NODOS[pos][0] + '%', top: NODOS[pos][1] + '%' }}
        >
          <PlayerSprite width={34} />
        </div>

        {/* Tarjeta inferior derecha: info del nivel seleccionado */}
        <div className="info-card">
          <div className="info-level-title">Nivel {i + 1}</div>
          <div className="info-level-subtitle">{niveles[i]?.t || '—'}</div>
          <div className="info-stars-row" style={{ fontSize: '14px', color: '#6ec4ff', fontWeight: 'bold' }}>
            Progreso: {leccionesCompletadasInfo} / {totalLeccionesInfo} lecciones
          </div>
        </div>

        {/* Toast / Aviso */}
        {aviso && <div className="toast" role="status">{aviso}</div>}
      </div>
    </div>
  );
}
