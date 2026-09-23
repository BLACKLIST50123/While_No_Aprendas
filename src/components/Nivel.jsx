import { useEffect, useMemo, useState } from 'react';
import { Alternativas, Ordenar } from './Ejercicios';
import { estrellas } from '../data/cursos';
import { Ventana } from './Paneles';
import HelperOverlay from './HelperOverlay.jsx';

const PISTA = {
  alt: 'Descarta primero las opciones que sabes que no encajan con lo que ya vimos.',
  orden: 'Piensa qué paso tiene que ocurrir primero y avanza en orden lógico.',
  flujo: 'Todo diagrama empieza en Inicio, termina en Fin y la decisión va en medio.',
};
const TIPO = { alt: 'Selección de alternativas', orden: 'Ordena el algoritmo', flujo: 'Diagrama de flujo' };

function Pregunta({ q, com, gastar, onError, onSiguiente, ultima }) {
  const alt = q.tipo === 'alt';
  const [valor, setValor] = useState(alt ? -1 : []);
  const [ocultas, setOcultas] = useState([]);
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState('');
  const [ayuda, setAyuda] = useState(false);
  const orden = useMemo(() => (alt ? [] : q.l.map((_, i) => i).sort(() => Math.random() - 0.5)), [q, alt]);

  const comodin = () => {
    if (com < 1) return setMsg('No te quedan comodines.');
    gastar();
    if (alt) {
      const malas = q.o.map((_, i) => i).filter((i) => i !== q.a && !ocultas.includes(i));
      if (malas.length > 1) { setOcultas([...ocultas, malas[0]]); if (valor === malas[0]) setValor(-1); }
    } else {
      let k = 0; while (valor[k] === k) k++;
      if (k < q.l.length) setValor([...valor.slice(0, k), k]);
    }
    setAyuda(true);
  };
  const comprobar = () => {
    const vacio = alt ? valor < 0 : !valor.length;
    if (vacio) return setMsg('Elige una respuesta primero.');
    const bien = alt ? valor === q.a : valor.length === q.l.length && valor.every((v, i) => v === i);
    if (bien) { setOk(true); setMsg('¡Correcto!'); } else { onError(); setMsg('Todavía no. Revisa e inténtalo otra vez.'); }
  };

  return (
    <>
      <p className="pr">{q.p}</p>
      {alt ? <Alternativas q={q} valor={valor} setValor={setValor} ocultas={ocultas} bloq={ok} />
        : <Ordenar q={q} valor={valor} setValor={setValor} orden={orden} bloq={ok} />}
      <p className={`msg ${ok ? 'good' : 'bad'}`} role="status">{msg}</p>
      <div className="row">
        {!ok && <button className="sec" onClick={comodin}>Comodín x {com}</button>}
        {ok ? <button className="go" onClick={onSiguiente}>{ultima ? 'Terminar' : 'Siguiente'}</button>
          : <button className="go" onClick={comprobar}>Comprobar</button>}
      </div>
      {ayuda && <HelperOverlay pista={q.pista || PISTA[q.tipo]} close={() => setAyuda(false)} />}
    </>
  );
}

export default function Nivel({ curso, idx, com, gastar, onFin, onCerrar }) {
  const nivel = curso.niveles[idx];
  const [qi, setQi] = useState(0);
  const [mis, setMis] = useState(0);
  const est = mis === 0 ? 3 : mis <= 2 ? 2 : 1;
  const fin = qi >= nivel.ej.length;
  const q = nivel.ej[qi];

  const siguiente = () => { if (qi + 1 >= nivel.ej.length) onFin(est); setQi(qi + 1); };

  return (
    <Ventana titulo={`Nivel ${idx + 1}: ${nivel.t}`} onCerrar={onCerrar}>
      {fin ? (
        <>
          <p className="big">{estrellas(est)}</p>
          <p className="pr" style={{ textAlign: 'center' }}>Nivel completado</p>
          <div className="row"><button className="go" onClick={onCerrar}>Volver al mapa</button></div>
        </>
      ) : (
        <>
          <p className="meta">{TIPO[q.tipo]} - ejercicio {qi + 1} de {nivel.ej.length}</p>
          <Pregunta key={qi} q={q} com={com} gastar={gastar} onError={() => setMis(mis + 1)}
            onSiguiente={siguiente} ultima={qi + 1 >= nivel.ej.length} />
          <div className="row"><button className="sec" onClick={onCerrar}>Salir</button></div>
        </>
      )}
    </Ventana>
  );
}
