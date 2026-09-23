import { useEffect } from 'react';
import { BOTS, CURSOS } from '../data/cursos';

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
  const filas = [...BOTS, { n: nombre.slice(0, 9), x: xp, yo: true }].sort((a, b) => b.x - a.x);
  return (
    <div className="box">
      <h3>Ranking de sección</h3>
      {filas.map((r, i) => (
        <div key={r.n} className={`rk ${r.yo ? 'me' : ''}`}><span>{i + 1} {r.n}</span><span>{r.x}</span></div>
      ))}
    </div>
  );
}

export function Objetivo({ hechos, total }) {
  return (
    <div className="box">
      <h3>Objetivo de sección</h3>
      <div className="centro">Completa {total} niveles</div>
      <div className="bar"><i style={{ width: (hechos / total) * 100 + '%' }} /></div>
      <div className="centro">{hechos} / {total}</div>
    </div>
  );
}

const vals = (s) => Object.values(s.hechos).flatMap((h) => Object.values(h));
export const LOGROS = [
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
