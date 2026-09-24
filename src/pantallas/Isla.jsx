import { useEffect, useRef, useState } from 'react';
import { CURSOS, PERSONAJES } from '../data/cursos';
import { useProgreso } from '../useProgreso';
import Mapa from '../components/Mapa';
import HUD from '../components/HUD';
import Nivel from '../components/Nivel';
import PanelNivel from '../components/PanelNivel';
import PantallaTeoria from '../components/PantallaTeoria';
import { Ranking, Objetivo, Perfil, Logros, Ventana } from '../components/Paneles';
import { BackpackIcon, BookIcon, TrophyIcon } from '../components/PixelIcons';
import '../estilos/isla.css';

// Mapea la sección del registro al ID del curso
const CURSO_DE = { 'Algoritmos': 'pseudocodigo' };

export default function Isla({ sesion, onSalir }) {
  const { p, completar, gastarComodin, reiniciar } = useProgreso(sesion.usuario);
  const [cid,    setCid]    = useState(CURSO_DE[sesion.seccion] || CURSOS[0].id);
  const [nivel,  setNivel]  = useState(null); // indice del nivel abierto
  const [leccionActiva, setLeccionActiva] = useState(null); // indice de la lección
  const [mostrarTeoria, setMostrarTeoria] = useState(false);
  const [enEjercicios, setEnEjercicios] = useState(false);
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
    if (!hechos[i]?.completado) { actual = i; break; }
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

  // Callback al elegir lección
  const handleElegirLeccion = (idx) => {
    setLeccionActiva(idx);
    setMostrarTeoria(true);
  };

  // Callback al finalizar una lección
  const alTerminarLeccion = (est) => {
    const nivelIdx = nivel;
    completar(cid, nivelIdx, leccionActiva, est);
    setEnEjercicios(false);
    setLeccionActiva(null);

    // Verificar si se completó el nivel
    const nivelActualizado = p.hechos[cid]?.[nivelIdx] || { lecciones: [] };
    const ahoraCompleto = nivelActualizado.lecciones.every((l, i) => i === leccionActiva ? Math.max(l, est) > 0 : l > 0);
    
    if (ahoraCompleto && !nivelActualizado.completado) {
      // Si hay un nivel siguiente, mostrar flash
      const siguienteIdx = nivelIdx + 1;
      if (siguienteIdx < total) {
        setRecienDesbloqueado(siguienteIdx);
        clearTimeout(flashTimer.current);
        flashTimer.current = setTimeout(() => setRecienDesbloqueado(null), 3500);
      }
    }
  };

  const mensaje = nHechos >= total
    ? '¡Isla completada! Has terminado todos los niveles. ¡Felicitaciones!'
    : nHechos === 0
      ? `¡Hola, ${sesion.usuario}! Toca el Nivel 1 para comenzar.`
      : '¡Sigue aprendiendo y desbloquea nuevos niveles!';

  return (
    <div className="isla">
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
          onRanking={() => setPanel('ranking')}
        />
        <div className="side rpg-board">
          <div className="rivet tl" />
          <div className="rivet tr" />
          <div className="rivet bl" />
          <div className="rivet br" />
          <div className="side-nav-menu">
            <button className="side-nav-item" onClick={() => setPanel('perfil')} aria-label="Perfil">
              <BackpackIcon size={24} />
              <span>Perfil</span>
            </button>
            <button className="side-nav-item" onClick={() => avisar('Extras: próximamente')} aria-label="Extras">
              <BookIcon size={24} />
              <span>Extras</span>
            </button>
            <button className="side-nav-item" onClick={() => setPanel('logros')} aria-label="Logros">
              <TrophyIcon size={24} />
              <span>Logros</span>
            </button>
          </div>
          <Objetivo hechos={nHechos} total={total} />
        </div>
      </Mapa>

      {/* Pantallas del flujo de lecciones */}
      {nivel !== null && !mostrarTeoria && !enEjercicios && (
        <PanelNivel
          nivel={curso.niveles[nivel]}
          nivelIdx={nivel}
          nivelHechos={hechos[nivel]}
          onClose={() => setNivel(null)}
          onElegirLeccion={handleElegirLeccion}
        />
      )}

      {mostrarTeoria && leccionActiva !== null && (
        <PantallaTeoria
          leccion={curso.niveles[nivel].lecciones[leccionActiva]}
          onVolver={() => { setMostrarTeoria(false); setLeccionActiva(null); }}
          onComenzar={() => { setMostrarTeoria(false); setEnEjercicios(true); }}
        />
      )}

      {enEjercicios && leccionActiva !== null && (
        <Nivel
          key={cid + nivel + leccionActiva}
          leccion={curso.niveles[nivel].lecciones[leccionActiva]}
          leccionIdx={leccionActiva}
          nivel={curso.niveles[nivel]}
          nivelIdx={nivel}
          com={p.com}
          gastar={gastarComodin}
          onFin={alTerminarLeccion}
          onCerrar={() => { setEnEjercicios(false); setLeccionActiva(null); }}
        />
      )}

      {/* Modales */}
      {panel === 'ranking' && (
        <div className="velo" onMouseDown={(e) => e.target === e.currentTarget && setPanel(null)}>
          <div className="rpg-board-modal">
            <button 
              onClick={() => setPanel(null)} 
              aria-label="Cerrar"
              style={{
                position: 'absolute', top: '-14px', right: '-14px',
                background: '#d64545', border: '3px solid #fff', borderRadius: '50%',
                width: '32px', height: '32px', color: '#fff', cursor: 'pointer',
                fontWeight: '900', fontSize: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >×</button>
            <div className="rivet tl" />
            <div className="rivet tr" />
            <div className="rivet bl" />
            <div className="rivet br" />
            <Ranking xp={p.xp} nombre={sesion.usuario} />
          </div>
        </div>
      )}
      {panel === 'perfil'  && <Perfil  p={p} sesion={sesion} onReiniciar={reiniciar} onSalir={onSalir} onCerrar={() => setPanel(null)} />}
      {panel === 'logros'  && <Logros  p={p} onCerrar={() => setPanel(null)} />}
    </div>
  );
}
