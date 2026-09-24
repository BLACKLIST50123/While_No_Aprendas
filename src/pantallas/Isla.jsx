import { useEffect, useRef, useState } from 'react';
import { CURSOS, PERSONAJES } from '../data/cursos';
import { useProgreso } from '../useProgreso';
import Mapa from '../components/Mapa';
import HUD from '../components/HUD';
import Nivel from '../components/Nivel';
import { Ranking, Objetivo, Perfil, Logros } from '../components/Paneles';
import '../estilos/isla.css';

// Mapea la sección del registro al ID del curso
const CURSO_DE = { 'Algoritmos': 'pseudocodigo' };

export default function Isla({ sesion, onSalir }) {
  const { p, completar, gastarComodin, reiniciar } = useProgreso(sesion.usuario);
  const [cid,    setCid]    = useState(CURSO_DE[sesion.seccion] || CURSOS[0].id);
  const [nivel,  setNivel]  = useState(null);
  const [panel,  setPanel]  = useState(null);
  const [aviso,  setAviso]  = useState('');
  const [recienDesbloqueado, setRecienDesbloqueado] = useState(null);
  const timer = useRef();
  const flashTimer = useRef();

  const curso    = CURSOS.find(c => c.id === cid) || CURSOS[0];
  const hechos   = p.hechos[cid] || {};
  const total    = curso.niveles.length;
  const nHechos  = Object.keys(hechos).length;

  // Primer nivel sin completar = nivel "actual" disponible
  let actual = 0;
  for (let i = 0; i < total; i++) {
    if (!hechos[i]) { actual = i; break; }
    if (i === total - 1) actual = total - 1; // todos completados
  }

  const [pos, setPos] = useState(actual);
  useEffect(() => setPos(actual), [actual, cid]);

  // Limpiar timers al desmontar
  useEffect(() => () => { clearTimeout(timer.current); clearTimeout(flashTimer.current); }, []);

  const avisar = (m) => {
    setAviso(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAviso(''), 2000);
  };

  const elegir = (i) => {
    if (i > actual) return avisar('Completa el nivel anterior para desbloquearlo.');
    setPos(i);
    setTimeout(() => setNivel(i), 500);
  };

  // Callback al finalizar un nivel: guarda progreso y activa flash en nuevo nodo
  const alTerminarNivel = (est) => {
    const nivelIdx = nivel;
    completar(cid, nivelIdx, est);
    setNivel(null);

    // Si hay un nivel siguiente, mostrar flash
    const siguienteIdx = nivelIdx + 1;
    if (siguienteIdx < total) {
      setRecienDesbloqueado(siguienteIdx);
      clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setRecienDesbloqueado(null), 3500);
    }
  };

  const mensaje = nHechos >= total
    ? '¡Isla completada! Has terminado todos los niveles. ¡Felicitaciones!'
    : nHechos === 0
      ? `¡Hola, ${sesion.usuario}! Toca el Nivel 1 para comenzar.`
      : '¡Sigue aprendiendo y desbloquea nuevos niveles!';

  return (
    <div className="isla">
      {/* Header con selector de curso */}
      <header className="top">
        <h1>while(no_aprendas)</h1>
        <label>Curso{' '}
          <select value={cid} onChange={e => setCid(e.target.value)}>
            {CURSOS.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </label>
      </header>

      {/* Mapa de la isla */}
      <Mapa
        niveles={curso.niveles}
        hechos={hechos}
        actual={actual}
        pos={pos}
        onElegir={elegir}
        mensaje={mensaje}
        aviso={aviso}
        recienDesbloqueado={recienDesbloqueado}
      >
        <HUD
          actual={actual}
          com={p.com}
          racha={p.racha}
          icono={PERSONAJES[sesion.personaje]}
          onPerfil={() => setPanel('perfil')}
          onLogros={() => setPanel('logros')}
          onExtras={() => avisar('Extras: próximamente')}
        />
        <div className="side rpg-board">
          <div className="rivet tl" />
          <div className="rivet tr" />
          <div className="rivet bl" />
          <div className="rivet br" />
          <Ranking xp={p.xp} nombre={sesion.usuario} />
          <Objetivo hechos={nHechos} total={total} />
        </div>
      </Mapa>

      {/* Pantalla de nivel (y pantalla de victoria al terminar) */}
      {nivel !== null && (
        <Nivel
          key={cid + nivel}
          curso={curso}
          idx={nivel}
          com={p.com}
          gastar={gastarComodin}
          onFin={alTerminarNivel}
          onCerrar={() => setNivel(null)}
        />
      )}

      {/* Modales */}
      {panel === 'perfil'  && <Perfil  p={p} sesion={sesion} onReiniciar={reiniciar} onSalir={onSalir} onCerrar={() => setPanel(null)} />}
      {panel === 'logros'  && <Logros  p={p} onCerrar={() => setPanel(null)} />}
    </div>
  );
}
