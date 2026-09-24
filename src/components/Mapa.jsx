import { useState } from 'react';
import { NODOS } from '../data/cursos';
import messiah from '../assets/messiah.png';
import { PlayerSprite, PadlockIcon, StarGold, StarDark } from './PixelIcons';

export default function Mapa({
  niveles, hechos, actual, pos, onElegir,
  mensaje, aviso, children,
  recienDesbloqueado = null, // índice del nodo recién desbloqueado (flash dorado)
}) {
  const [info, setInfo] = useState(null);
  const i = info ?? actual;
  const estrellasNivel = hechos[i] !== undefined ? hechos[i] : 0;

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
          const esHecho    = Boolean(hechos[k]);
          const esActual   = k === actual;
          const esBloqueado = k > actual;

          // Estado visual del nodo
          let st;
          if (esBloqueado)       st = 'lock';
          else if (esHecho)      st = hechos[k] === 3 ? 'gold-medallion' : 'done';
          else if (esActual)     st = 'now';
          else                   st = 'open';

          const cantEstrellas = hechos[k] || 0;
          const esNuevo = k === recienDesbloqueado;

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

              {/* Estrellas debajo del nodo completado */}
              {cantEstrellas > 0 && (
                <div className="node-stars">
                  {Array.from({ length: cantEstrellas }).map((_, sIdx) => (
                    <span key={sIdx} className="mini-gold-star">★</span>
                  ))}
                </div>
              )}
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
          <div className="info-stars-row">
            {[1, 2, 3].map(si => (
              si <= estrellasNivel
                ? <StarGold key={si} size={24} />
                : <StarDark  key={si} size={24} />
            ))}
          </div>
        </div>

        {/* Toast / Aviso */}
        {aviso && <div className="toast" role="status">{aviso}</div>}
      </div>
    </div>
  );
}
