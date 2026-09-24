import React, { useEffect, useMemo, useState } from 'react';
import { Alternativas, Ordenar } from './Ejercicios';
import { estrellas } from '../data/cursos';
import HelperOverlay from './HelperOverlay.jsx';
import '../estilos/nivel.css';

// Reacciones del Profesor Capyehein
import capySerio from '../assets/CapyHein-Serio.PNG';
import capyAcertaste from '../assets/CapyHein-Acertaste.PNG';
import capyRiendose from '../assets/CapyHein-Riendose.PNG';
import capyMal from '../assets/CapyHein-Mal.PNG';
import capyConfundido from '../assets/CapyHein-Confundido.PNG';

const PISTA = {
  alt: 'Descarta primero las opciones que sabes que no encajan con lo que ya vimos.',
  orden: 'Piensa qué paso tiene que ocurrir primero y avanza en orden lógico.',
  flujo: 'Todo diagrama empieza en Inicio, termina en Fin y la decisión va en medio.',
};

export default function Nivel({ curso, idx, com, gastar, onFin, onCerrar }) {
  const nivel = curso.niveles[idx];
  const [qi, setQi] = useState(0);
  const [mis, setMis] = useState(0);
  const total = nivel.ej.length;
  const fin = qi >= total;
  const q = nivel.ej[qi];

  // Estado del ejercicio actual
  const alt = q?.tipo === 'alt';
  const [valor, setValor] = useState(alt ? -1 : []);
  const [ocultas, setOcultas] = useState([]);
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState('');
  const [ayuda, setAyuda] = useState(false);
  const [resultado, setResultado] = useState(null); // 'acertado' | 'mal' | null

  // Estado de reacción de CapyHein: 'serio' | 'acertaste' | 'riendose' | 'mal' | 'confundido'
  const [animo, setAnimo] = useState('serio');

  // Orden para preguntas de tipo orden/flujo
  const orden = useMemo(() => (alt ? [] : q.l.map((_, i) => i).sort(() => Math.random() - 0.5)), [q, alt]);

  // Manejo de teclado: tecla Escape para salir
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCerrar();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCerrar]);

  // Reiniciar estado al cambiar de ejercicio
  useEffect(() => {
    if (q) {
      setValor(q.tipo === 'alt' ? -1 : []);
      setOcultas([]);
      setOk(false);
      setMsg('');
      setResultado(null);
      setAnimo('serio');
    }
  }, [qi, q]);

  // Selección de imagen de CapyHein según su estado de ánimo
  const capyImg = useMemo(() => {
    switch (animo) {
      case 'acertaste':
        return capyAcertaste;
      case 'riendose':
        return capyRiendose;
      case 'mal':
        return capyMal;
      case 'confundido':
        return capyConfundido;
      case 'serio':
      default:
        return capySerio;
    }
  }, [animo]);

  // Función de comodín
  const usarComodin = () => {
    if (com < 1) {
      setMsg('No te quedan comodines en este momento.');
      return;
    }
    gastar();
    if (alt) {
      const malas = q.o.map((_, i) => i).filter((i) => i !== q.a && !ocultas.includes(i));
      if (malas.length > 1) {
        setOcultas((prev) => [...prev, malas[0]]);
        if (valor === malas[0]) setValor(-1);
      }
    } else {
      let k = 0;
      while (valor[k] === k) k++;
      if (k < q.l.length) setValor([...valor.slice(0, k), k]);
    }
    setAnimo('confundido');
    setAyuda(true);
  };

  // Comprobar respuesta
  const comprobar = () => {
    const vacio = alt ? valor < 0 : !valor.length;
    if (vacio) {
      setMsg('Por favor selecciona una opción antes de comprobar.');
      return;
    }

    const bien = alt ? valor === q.a : valor.length === q.l.length && valor.every((v, i) => v === i);

    if (bien) {
      setOk(true);
      setResultado('acertado');
      // Reacción de acierto: aleatorio entre Acertaste y Riendose
      const feliz = Math.random() > 0.5 ? 'acertaste' : 'riendose';
      setAnimo(feliz);
      setMsg('¡Excelente trabajo! Has dado en el clavo.');
    } else {
      setMis((m) => m + 1);
      setResultado('mal');
      // Reacción de error: aleatorio entre Mal y Confundido
      const triste = Math.random() > 0.5 ? 'mal' : 'confundido';
      setAnimo(triste);
      setMsg('Mmm, esa opción no es la correcta. ¡Inténtalo de nuevo!');
    }
  };

  // Pasar a la siguiente pregunta o terminar nivel
  const siguiente = () => {
    if (qi + 1 >= total) {
      const estFinal = mis === 0 ? 3 : mis <= 2 ? 2 : 1;
      onFin(estFinal);
      setQi(qi + 1);
    } else {
      setQi((prev) => prev + 1);
    }
  };

  const est = mis === 0 ? 3 : mis <= 2 ? 2 : 1;
  const progresoPorcentaje = Math.round(((qi + (ok ? 1 : 0)) / total) * 100);

  return (
    <div className="nivel-screen">
      {/* Elementos de fondo ambiental estilo tech retro */}
      <span className="bg-code-token bg-token-1">0101</span>
      <span className="bg-code-token bg-token-2">&#123; &#125;</span>
      <span className="bg-code-token bg-token-3">&#123; &#125;</span>
      <span className="bg-code-token bg-token-4">&lt;/&gt;</span>
      <span className="bg-code-token bg-token-5">⚙</span>

      <div className="nivel-container">
        {/* 1. BARRA SUPERIOR */}
        <header className="nivel-topbar">
          <button className="nivel-back-btn" onClick={onCerrar} aria-label="Volver al mapa" title="Volver al mapa">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          <div className="nivel-progress-box">
            <div className="nivel-title-text">
              NIVEL {idx + 1} · {nivel.t.toUpperCase()}
            </div>
            <div className="nivel-track">
              <div className="nivel-fill" style={{ width: `${fin ? 100 : progresoPorcentaje}%` }} />
            </div>
          </div>

          <div className="nivel-gift-badge" title="Tus Comodines">
            <span className="gift-ico">🎁</span>
            <span>{com}</span>
          </div>
        </header>

        {/* 2. CONTENIDO PRINCIPAL: O PANTALLA FINAL O EJERCICIO */}
        {fin ? (
          <div className="nivel-fin-card">
            <img src={capyRiendose} className="nivel-fin-capy" alt="Profesor Capyehein celebrando" />
            <h2 className="nivel-fin-title">¡NIVEL COMPLETADO!</h2>
            <div className="nivel-fin-stars" style={{ fontSize: '38px', color: '#ffcb2b' }}>
              {estrellas(est)}
            </div>
            <div className="nivel-fin-msg">
              {est === 3
                ? '¡Impresionante! Has obtenido las 3 estrellas sin cometer ningún error.'
                : '¡Buen esfuerzo! Continúa practicando para dominar este tema.'}
            </div>
            <button className="btn-primary-action" onClick={onCerrar} style={{ marginTop: '16px' }}>
              VOLVER AL MAPA
            </button>
          </div>
        ) : (
          <>
            {/* ZONA DE CAPYEHEIN Y PREGUNTA */}
            <div className="nivel-stage">
              {/* Tarjeta del Profesor Capyehein */}
              <div className="capy-frame-wrapper">
                <div className="capy-card">
                  <div className="capy-img-box">
                    <img src={capyImg} className="capy-img" alt={`Profesor Capyehein ${animo}`} />
                  </div>
                  <div className="capy-nameplate">Profesor Capyehein</div>
                </div>
                <div className="capy-sub-badge">CAPIBARA</div>
              </div>

              {/* Bocadillo de diálogo */}
              <div className="capy-bubble">
                <div className="capy-bubble-tag">CAPIBARA · GUÍA DEL NIVEL</div>
                <h3 className="capy-bubble-question">{q.p}</h3>
                {msg && (
                  <div className={`capy-bubble-feedback ${ok ? 'feedback-ok' : 'feedback-error'}`}>
                    {msg}
                  </div>
                )}
              </div>
            </div>

            {/* ZONA DE RESPUESTAS (CUADRÍCULA 2X2 U ORDEN) */}
            <div className="nivel-exercise-area">
              {alt ? (
                <Alternativas
                  q={q}
                  valor={valor}
                  setValor={(v) => {
                    setValor(v);
                    setResultado(null);
                    setMsg('');
                    if (animo !== 'serio') setAnimo('serio');
                  }}
                  ocultas={ocultas}
                  bloq={ok}
                  resultado={resultado}
                />
              ) : (
                <Ordenar q={q} valor={valor} setValor={setValor} orden={orden} bloq={ok} />
              )}
            </div>

            {/* 3. BARRA DE ACCIONES INFERIOR */}
            <footer className="nivel-bottom-bar">
              <button
                className="btn-comodin-action"
                onClick={usarComodin}
                disabled={com < 1 || ok}
                title="Gastar 1 comodín para obtener ayuda"
              >
                <span>🎁</span>
                <span>COMODÍN</span>
              </button>

              {ok ? (
                <button className="btn-primary-action" onClick={siguiente}>
                  {qi + 1 >= total ? 'TERMINAR' : 'CONTINUAR'} →
                </button>
              ) : (
                <button
                  className="btn-primary-action check-btn"
                  onClick={comprobar}
                  disabled={alt ? valor < 0 : !valor.length}
                >
                  COMPROBAR
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      {/* Overlay de ayuda con pista del Mesías si se activa comodín */}
      {ayuda && <HelperOverlay pista={q?.pista || PISTA[q?.tipo]} close={() => setAyuda(false)} />}
    </div>
  );
}
