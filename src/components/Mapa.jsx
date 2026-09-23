import { useState } from 'react';
import { NODOS, estrellas } from '../data/cursos';

const sprite = (r) => r.map(([x, y, w, h, c], i) => <rect key={i} x={x} y={y} width={w} height={h} fill={c} />);
const JUGADOR = [[2,0,6,1,'#111'],[1,1,8,2,'#111'],[2,3,6,3,'#f2c9a0'],[3,4,1,1,'#111'],[6,4,1,1,'#111'],[0,6,1,3,'#c8742b'],[1,6,8,4,'#2d5bd6'],[2,10,2,3,'#23306b'],[6,10,2,3,'#23306b'],[1,13,3,1,'#5a3a1a'],[6,13,3,1,'#5a3a1a']];
const ANGEL = [[4,0,6,1,'#ffd24a'],[0,6,3,4,'#fff'],[11,6,3,4,'#fff'],[4,2,6,2,'#111'],[4,4,6,4,'#f2c9a0'],[5,5,1,1,'#111'],[8,5,1,1,'#111'],[3,8,8,6,'#f4f0e0'],[6,8,2,6,'#3a5bd0']];

export default function Mapa({ niveles, hechos, actual, pos, onElegir, mensaje, aviso, children }) {
  const [info, setInfo] = useState(null);
  const i = info ?? actual;
  return (
    <div className="wrap">
      <div className="stage" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}mapa1.jpg)` }}>
        {children}
        <div className="bub">{mensaje}</div>
        <svg className="angel" viewBox="0 0 14 16" aria-hidden="true">{sprite(ANGEL)}</svg>
        {niveles.map((n, k) => {
          const st = hechos[k] ? 'done' : k === actual ? 'now' : k < actual ? 'open' : 'lock';
          return (
            <button key={k} className={`node ${st}`} style={{ left: NODOS[k][0] + '%', top: NODOS[k][1] + '%' }}
              aria-label={`Nivel ${k + 1}: ${n.t}${st === 'lock' ? ' (bloqueado)' : ''}`}
              onMouseEnter={() => setInfo(k)} onMouseLeave={() => setInfo(null)} onFocus={() => setInfo(k)} onBlur={() => setInfo(null)}
              onClick={() => onElegir(k)}>
              <i className="tag">{k + 1}</i>
              <span className="disc">{st === 'lock' ? '🔒' : hechos[k] ? '★' : ''}</span>
              {hechos[k] && <em className="st">{estrellas(hechos[k])}</em>}
            </button>
          );
        })}
        <div className="player" style={{ left: NODOS[pos][0] + '%', top: NODOS[pos][1] + '%' }}>
          <svg viewBox="0 0 10 14" aria-hidden="true">{sprite(JUGADOR)}</svg>
        </div>
        <div className="info"><b>Nivel {i + 1}</b>{niveles[i].t}<br /><span className="gold">{estrellas(hechos[i] || 0)}</span></div>
        {aviso && <div className="toast" role="status">{aviso}</div>}
      </div>
    </div>
  );
}
