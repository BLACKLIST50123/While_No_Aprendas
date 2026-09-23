import { useEffect, useRef, useState } from 'react';
import { CURSOS, PERSONAJES } from '../data/cursos';
import { useProgreso } from '../useProgreso';
import Mapa from '../components/Mapa';
import HUD from '../components/HUD';
import Nivel from '../components/Nivel';
import { Ranking, Objetivo, Perfil, Logros } from '../components/Paneles';
import '../estilos/isla.css';

// La "sección" elegida en el registro decide el curso inicial
const CURSO_DE = { Algoritmos: 'algoritmos' };

export default function Isla({ sesion, onSalir }) {
  const { p, completar, gastarComodin, reiniciar } = useProgreso(sesion.usuario);
  const [cid, setCid] = useState(CURSO_DE[sesion.seccion] || CURSOS[0].id);
  const [nivel, setNivel] = useState(null);
  const [panel, setPanel] = useState(null);
  const [aviso, setAviso] = useState('');
  const timer = useRef();

  const curso = CURSOS.find((c) => c.id === cid);
  const hechos = p.hechos[cid] || {};
  const total = curso.niveles.length;
  const nHechos = Object.keys(hechos).length;
  let actual = total - 1;
  for (let i = 0; i < total; i++) if (!hechos[i]) { actual = i; break; }
  const [pos, setPos] = useState(actual);
  useEffect(() => setPos(actual), [actual, cid]);

  const avisar = (m) => { setAviso(m); clearTimeout(timer.current); timer.current = setTimeout(() => setAviso(''), 1800); };
  const elegir = (i) => {
    if (i > actual) return avisar('Completa el nivel anterior para desbloquearlo');
    setPos(i); setTimeout(() => setNivel(i), 650);
  };
  const mensaje = nHechos >= total ? '¡Isla completada! Prueba otro curso.' : nHechos === 0
    ? `¡Hola, ${sesion.usuario}! Toca el nivel 1 para empezar.` : '¡Sigue aprendiendo y desbloquea nuevos niveles!';

  return (
    <div className="isla">
      <header className="top">
        <h1>while(no_aprendas)</h1>
        <label>Curso{' '}
          <select value={cid} onChange={(e) => setCid(e.target.value)}>
            {CURSOS.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </label>
      </header>
      <Mapa niveles={curso.niveles} hechos={hechos} actual={actual} pos={pos} onElegir={elegir} mensaje={mensaje} aviso={aviso}>
        <HUD actual={actual} com={p.com} racha={p.racha} icono={PERSONAJES[sesion.personaje]}
          onPerfil={() => setPanel('perfil')} onLogros={() => setPanel('logros')} onExtras={() => avisar('Extras: próximamente')} />
        <div className="side">
          <Ranking xp={p.xp} nombre={sesion.usuario} />
          <Objetivo hechos={nHechos} total={total} />
        </div>
      </Mapa>
      {nivel !== null && (
        <Nivel key={cid + nivel} curso={curso} idx={nivel} com={p.com} gastar={gastarComodin}
          onFin={(est) => completar(cid, nivel, est)} onCerrar={() => setNivel(null)} />
      )}
      {panel === 'perfil' && <Perfil p={p} sesion={sesion} onReiniciar={reiniciar} onSalir={onSalir} onCerrar={() => setPanel(null)} />}
      {panel === 'logros' && <Logros p={p} onCerrar={() => setPanel(null)} />}
    </div>
  );
}
