import { useState } from 'react';
import { NODOS } from '../data/cursos';
import messiah from '../assets/messiah.png';
import { PlayerSprite, PadlockIcon, StarGold, StarDark } from './PixelIcons';

export default function Mapa({ niveles, hechos, actual, pos, onElegir, mensaje, aviso, children }) {
  const [info, setInfo] = useState(null);
  const i = info ?? actual;

  // Estrellas del nivel seleccionado (para el recuadro inferior derecho)
  // Si tiene hechos[i] usamos ese valor; si es el nivel 3 y aún no tiene registro, mostramos 2 como en la referencia
  const estrellasNivel = hechos[i] !== undefined ? hechos[i] : (i === 2 ? 2 : 0);

  return (
    <div className="wrap">
      <div className="stage" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}mapa1.jpg)` }}>
        {/* HUD y Paneles laterales */}
        {children}

        {/* Mascota ángel "El Mesías del Pront" y bocadillo de diálogo */}
        <div className="angel-container">
          <div className="bub">
            {mensaje || '¡Sigue aprendiendo y desbloquea nuevos niveles!'}
          </div>
          <img src={messiah} className="angel-sprite" alt="El Mesías del Pront" />
        </div>

        {/* Nodos del Mapa */}
        {niveles.map((n, k) => {
          // Determinar estado del nodo
          const esHecho = Boolean(hechos[k] || k < 2);
          const esActual = k === actual;
          const esBloqueado = !esHecho && !esActual && k > actual && k !== 4; // Node 5 (index 4) can be previewed/open as in image
          const st = esBloqueado ? 'lock' : (k === 1 ? 'gold-medallion' : (esActual ? 'now' : (esHecho ? 'done' : 'open')));

          // Estrellas bajo el nodo: en la imagen nodo 1 y nodo 2 tienen 3 estrellas
          const cantEstrellas = hechos[k] !== undefined ? hechos[k] : (k < 2 ? 3 : 0);

          return (
            <button
              key={k}
              className={`node ${st}`}
              style={{ left: NODOS[k][0] + '%', top: NODOS[k][1] + '%' }}
              aria-label={`Nivel ${k + 1}: ${n.t}${st === 'lock' ? ' (bloqueado)' : ''}`}
              onMouseEnter={() => setInfo(k)}
              onMouseLeave={() => setInfo(null)}
              onFocus={() => setInfo(k)}
              onBlur={() => setInfo(null)}
              onClick={() => onElegir(k)}
            >
              {/* Etiqueta superior con el número de nivel */}
              <div className="tag">{k + 1}</div>

              {/* Plataforma 3D del nodo */}
              <div className={`disc ${st}`}>
                {st === 'lock' ? (
                  <PadlockIcon size={18} />
                ) : st === 'gold-medallion' ? (
                  <div className="gold-star-medallion">★</div>
                ) : null}
              </div>

              {/* Fila de estrellas doradas debajo del nodo completado */}
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

        {/* Sprite del Jugador posicionado sobre el nodo actual */}
        <div
          className="player"
          style={{
            left: NODOS[pos][0] + '%',
            top: NODOS[pos][1] + '%'
          }}
        >
          <PlayerSprite width={34} />
        </div>

        {/* Tarjeta de Información de Nivel (Esquina inferior derecha) */}
        <div className="info-card">
          <div className="info-level-title">Nivel {i + 1}</div>
          <div className="info-level-subtitle">{niveles[i]?.t || 'Condicionales'}</div>
          <div className="info-stars-row">
            {[1, 2, 3].map((starIdx) => (
              starIdx <= estrellasNivel ? (
                <StarGold key={starIdx} size={26} />
              ) : (
                <StarDark key={starIdx} size={26} />
              )
            ))}
          </div>
        </div>

        {/* Toast / Aviso temporal */}
        {aviso && <div className="toast" role="status">{aviso}</div>}
      </div>
    </div>
  );
}
