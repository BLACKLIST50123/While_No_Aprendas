import { useEffect } from 'react';
import { BOTS, CURSOS } from '../data/cursos';
import { AvatarPixel, StarGold } from './PixelIcons';

export function Ventana({ titulo, onCerrar, children }) {
  useEffect(() => {
    const f = (e) => e.key === 'Escape' && onCerrar();
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, [onCerrar]);
  return (
    <div className="velo" onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={titulo}>
        <h2>{titulo}</h2>
        {children}
      </div>
    </div>
  );
}

export function Ranking({ xp, nombre = 'Tú' }) {
  const filas = [...BOTS, { n: nombre.slice(0, 9), x: xp, yo: true, avatar: 'tu' }].sort((a, b) => b.x - a.x);
  return (
    <div className="rk-card">
      <div className="rk-header-ribbon">
        <span>Ranking de Sección</span>
      </div>
      <div className="rk-list">
        {filas.slice(0, 5).map((r, i) => (
          <div key={r.n + i} className={`rk-row ${r.yo ? 'me' : ''}`}>
            <span className="rk-pos">{i + 1}</span>
            <div className="rk-avatar-box">
              <AvatarPixel tipo={r.avatar || (r.yo ? 'tu' : 'leo')} size={18} />
            </div>
            <span className="rk-name">{r.yo ? 'Tú' : r.n}</span>
            <span className="rk-score">{r.x}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Objetivo({ hechos, total }) {
  const pct = Math.min(100, Math.round((hechos / (total || 1)) * 100));
  return (
    <div className="obj-card">
      <div className="side-divider" />
      <div className="obj-header">Objetivo de Sección</div>
      <div className="obj-star-icon">
        <StarGold size={26} />
      </div>
      <div className="obj-subtitle">Completa {total} niveles</div>
      <div className="obj-bar-wrapper">
        <div className="obj-bar-track">
          <div className="obj-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="obj-counter">{hechos} / {total}</div>
    </div>
  );
}

const vals = (s) => Object.values(s.hechos).flatMap((h) => Object.values(h));
const LOGROS = [
  { id: 'primero', t: 'Primer paso', d: 'Completa tu primer nivel', ok: (s) => vals(s).length >= 1 },
  { id: 'perfecto', t: 'Perfeccionista', d: 'Saca 3 estrellas en un nivel', ok: (s) => vals(s).includes(3) },
  { id: 'racha3', t: 'Constancia', d: 'Llega a 3 días de racha', ok: (s) => s.racha >= 3 },
  { id: 'xp200', t: 'Aprendiz', d: 'Reúne 200 XP', ok: (s) => s.xp >= 200 },
  { id: 'isla', t: 'Isla completada', d: 'Completa todos los niveles de un curso',
    ok: (s) => CURSOS.some((c) => Object.keys(s.hechos[c.id] || {}).length >= c.niveles.length) },
];

export function Logros({ p, onCerrar }) {
  return (
    <Ventana titulo="Logros" onCerrar={onCerrar}>
      {LOGROS.map((l) => (
        <p key={l.id} className={`logro ${l.ok(p) ? 'si' : ''}`}>{l.ok(p) ? '🏆' : '🔒'} <b>{l.t}</b> - {l.d}</p>
      ))}
      <div className="row"><button className="sec" onClick={onCerrar}>Cerrar</button></div>
    </Ventana>
  );
}

export function Perfil({ p, sesion, onReiniciar, onSalir, onCerrar }) {
  const v = vals(p);
  return (
    <Ventana titulo="Perfil" onCerrar={onCerrar}>
      <p>Jugador: {sesion.usuario} ({sesion.seccion})</p>
      <p>XP total: {p.xp}</p>
      <p>Niveles completados: {v.length}</p>
      <p>Estrellas: {v.reduce((a, b) => a + b, 0)}</p>
      <p>Racha: {p.racha} {p.racha === 1 ? 'día' : 'días'}</p>
      <p>Comodines: {p.com}</p>
      <div className="row">
        <button className="sec" onClick={() => window.confirm('¿Borrar todo tu progreso?') && onReiniciar()}>Reiniciar progreso</button>
        <button className="sec" onClick={onSalir}>Cerrar sesión</button>
        <button className="go" onClick={onCerrar}>Cerrar</button>
      </div>
    </Ventana>
  );
}
