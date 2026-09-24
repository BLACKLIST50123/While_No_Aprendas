import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alternativas, Ordenar } from './Ejercicios';
import NivelVictoria from './NivelVictoria';
import HelperOverlay from './HelperOverlay.jsx';
import PantallaTeoria from './PantallaTeoria';
import '../estilos/nivel.css';

// Reacciones del Profesor Capyehein
import capySerio      from '../assets/CapyHein-Serio.PNG';
import capyAcertaste  from '../assets/CapyHein-Acertaste.PNG';
import capyRiendose   from '../assets/CapyHein-Riendose.PNG';
import capyMal        from '../assets/CapyHein-Mal.PNG';
import capyConfundido from '../assets/CapyHein-Confundido.PNG';

const PISTA = {
  alt:   'Descarta primero las opciones que sabes que no encajan con lo que ya vimos.',
  orden: 'Piensa qué paso tiene que ocurrir primero y avanza en orden lógico.',
  flujo: 'Todo diagrama empieza en Inicio, termina en Fin y la decisión va en medio.',
};

function FlujoSuccessModal({ q, onClose }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < q.l.length) {
      const timer = setTimeout(() => setStep(s => s + 1), 700);
      return () => clearTimeout(timer);
    }
  }, [step, q.l.length]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(13, 27, 42, 0.95)', backdropFilter: 'blur(5px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <h2 style={{ color: '#4ee86a', fontSize: 24, marginBottom: 20 }}>¡Diagrama Completado!</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {q.l.map(([txt, forma], i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.5s', opacity: i <= step ? 1 : 0.2, transform: i === step ? 'scale(1.1)' : 'scale(1)' }}>
            {i > 0 && <div style={{ color: '#f5c542', fontSize: 24, margin: '4px 0', textShadow: i <= step ? '0 0 10px #f5c542' : 'none' }}>▼</div>}
            <div className={`chip f-${forma || 'proc'}`} style={{ 
              boxShadow: i === step ? '0 0 20px #4ee86a' : (i < step ? '0 0 5px #6ec4ff' : 'none'),
              borderColor: i <= step ? '#4ee86a' : undefined,
              pointerEvents: 'none'
            }}>
              {txt}
            </div>
          </div>
        ))}
      </div>

      <button onClick={onClose} style={{
        marginTop: 40, background: '#6ec4ff', color: '#0d1b2a', padding: '12px 24px', borderRadius: 8, border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: 16
      }}>
        Continuar
      </button>
    </div>
  );
}

export default function Nivel({ leccion, leccionIdx, nivel, nivelIdx, com, gastar, onFin, onCerrar }) {
  const total = leccion.ejercicios.length;

  // ── Progreso del nivel ──────────────────────────────────────────────
  const [qi,          setQi]          = useState(0);
  const [erroresTotal, setErroresTotal] = useState(0);
  const [directosOK,  setDirectosOK]  = useState(0); // sin errores en esa pregunta

  // ── Estado del ejercicio actual ─────────────────────────────────────
  const q   = leccion.ejercicios[qi];
  const alt = q?.tipo === 'alt';
  const [valor,     setValor]     = useState(alt ? -1 : []);
  const [ocultas,   setOcultas]   = useState([]);
  const [ok,        setOk]        = useState(false);
  const [msg,       setMsg]       = useState('');
  const [ayuda,     setAyuda]     = useState(false);
  const [resultado, setResultado] = useState(null);  // 'acertado' | 'mal' | null
  const [animo,     setAnimo]     = useState('serio');
  const [tuvoError, setTuvoError] = useState(false); // ¿este ejercicio tuvo al menos 1 error?
  const [viendoTeoria, setViendoTeoria] = useState(false);
  const [showFlujoSuccessModal, setShowFlujoSuccessModal] = useState(false);

  // ── Cronómetro ──────────────────────────────────────────────────────
  const startTime = useRef(Date.now());

  // ── Orden aleatorio para tipo "orden"/"flujo" — guarda si q es undefined al terminar
  const orden = useMemo(
    () => (alt || !q?.l ? [] : q.l.map((_, i) => i).sort(() => Math.random() - 0.5)),
    [q, alt]
  );

  // Tecla ESC para salir
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCerrar(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
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
      setTuvoError(false);
    }
  }, [qi, q]);

  // ── Imagen de CapyHein según ánimo ──────────────────────────────────
  const capyImg = useMemo(() => {
    switch (animo) {
      case 'acertaste':  return capyAcertaste;
      case 'riendose':   return capyRiendose;
      case 'mal':        return capyMal;
      case 'confundido': return capyConfundido;
      default:           return capySerio;
    }
  }, [animo]);

  // ── Comodín ─────────────────────────────────────────────────────────
  const usarComodin = () => {
    if (com < 1) { setMsg('No te quedan comodines en este momento.'); return; }
    gastar();
    if (alt) {
      const malas = q.o.map((_, i) => i).filter(i => i !== q.a && !ocultas.includes(i));
      if (malas.length > 1) {
        setOcultas(prev => [...prev, malas[0]]);
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

  // ── Comprobar respuesta ──────────────────────────────────────────────
  const comprobar = () => {
    const vacio = alt ? valor < 0 : !valor.length;
    if (vacio) { setMsg('Por favor selecciona una opción antes de comprobar.'); return; }

    const bien = alt
      ? valor === q.a
      : valor.length === q.l.length && valor.every((v, i) => v === i);

    if (bien) {
      setOk(true);
      setResultado('acertado');
      setAnimo(Math.random() > 0.5 ? 'acertaste' : 'riendose');
      setMsg('¡Excelente! Has dado en el clavo.');
      if (!tuvoError) setDirectosOK(d => d + 1);

      if (q.tipo === 'flujo') {
        setShowFlujoSuccessModal(true);
      }
    } else {
      setErroresTotal(e => e + 1);
      setTuvoError(true);
      setResultado('mal');
      setAnimo(Math.random() > 0.5 ? 'mal' : 'confundido');
      setMsg('Mmm, esa opción no es la correcta. ¡Inténtalo de nuevo!');
    }
  };

  // ── Siguiente pregunta ───────────────────────────────────────────────
  const siguiente = () => {
    setQi(prev => prev + 1);
  };

  // ── Fin: mostrar pantalla de victoria ───────────────────────────────
  const fin = qi >= total;
  const est = erroresTotal === 0 ? 3 : erroresTotal <= 2 ? 2 : 1;
  const tiempoMs = Date.now() - startTime.current;
  const precision = total > 0 ? Math.round((directosOK / total) * 100) : 0;
  const xpGanada  = est * 30;

  if (fin) {
    // nivel completado
    return (
      <NivelVictoria
        leccion={leccion}
        leccionIdx={leccionIdx}
        nivel={nivel}
        nivelIdx={nivelIdx}
        estrellas={est}
        tiempoMs={tiempoMs}
        precision={precision}
        errores={erroresTotal}
        xpGanada={xpGanada}
        onVolver={() => onFin(est)}
      />
    );
  }

  // ── Barra de progreso ────────────────────────────────────────────────
  const progresoPct = Math.round((qi / total) * 100);

  return (
    <div className="nivel-screen">
      {/* Tokens de fondo */}
      <span className="bg-code-token bg-token-1">0101</span>
      <span className="bg-code-token bg-token-2">&#123; &#125;</span>
      <span className="bg-code-token bg-token-3">&#123; &#125;</span>
      <span className="bg-code-token bg-token-4">&lt;/&gt;</span>
      <span className="bg-code-token bg-token-5">⚙</span>

      <style>{`
        @keyframes pulse-teoria {
          0% { box-shadow: 0 0 0 0 rgba(245, 197, 66, 0.7); border-color: #f5c542; }
          70% { box-shadow: 0 0 0 10px rgba(245, 197, 66, 0); border-color: #ffd84e; }
          100% { box-shadow: 0 0 0 0 rgba(245, 197, 66, 0); border-color: #f5c542; }
        }
        .btn-teoria-blink {
          animation: pulse-teoria 1.5s infinite;
          border: 2px solid #f5c542 !important;
          color: #ffd84e !important;
        }
        .capy-bubble.flujo-mode::before {
          display: none !important;
        }
      `}</style>

      <div className="nivel-container" style={{
        maxWidth: q?.tipo === 'flujo' ? '1400px' : '1150px',
        width: '100%',
        transition: 'max-width 0.3s ease'
      }}>
        {/* ── BARRA SUPERIOR ── */}
        <header className="nivel-topbar">
          <button className="nivel-back-btn" onClick={onCerrar} aria-label="Volver al mapa">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>

          <div className="nivel-progress-box">
            <div className="nivel-title-text">
              NIVEL {nivelIdx + 1} · LECCIÓN {leccionIdx + 1}
            </div>
            <div className="nivel-track">
              <div className="nivel-fill" style={{ width: `${progresoPct}%` }} />
            </div>
          </div>

          <button
            className={tuvoError ? 'btn-teoria-blink' : ''}
            onClick={() => setViendoTeoria(true)}
            style={{
              background: '#1e3250', border: '2px solid #375586', color: '#aac4e0',
              borderRadius: 8, padding: '6px 12px', fontSize: 13, fontWeight: 800,
              cursor: 'pointer', marginLeft: 16, transition: 'all 0.3s'
            }}
          >
            📖 TEORÍA
          </button>

          <div className="nivel-gift-badge" title="Tus Comodines" style={{ marginLeft: 16 }}>
            <span className="gift-ico">🎁</span>
            <span>{com}</span>
          </div>
        </header>

        {/* ── CONTENIDO PRINCIPAL (FLEX DEPENDIENDO DE TIPO) ── */}
        <div style={{
          display: 'flex', 
          flexDirection: q?.tipo === 'flujo' ? 'row' : 'column',
          flex: 1, 
          gap: 16,
          overflow: 'hidden',
          minHeight: 0
        }}>
          {/* ── CAPYEHEIN + BOCADILLO ── */}
          <div className="nivel-stage" style={{
            flex: q?.tipo === 'flujo' ? '0 0 340px' : 'none',
            display: q?.tipo === 'flujo' ? 'flex' : undefined,
            flexDirection: q?.tipo === 'flujo' ? 'column' : 'row',
            margin: q?.tipo === 'flujo' ? '0' : undefined,
            alignItems: q?.tipo === 'flujo' ? 'center' : 'center',
            overflowY: q?.tipo === 'flujo' ? 'auto' : 'visible'
          }}>
          <div className="capy-frame-wrapper">
            <div className="capy-card">
              <div className="capy-img-box">
                <img src={capyImg} className="capy-img" alt={`Profesor Capyehein ${animo}`} />
              </div>
              <div className="capy-nameplate">Profesor Capyehein</div>
            </div>
            <div className="capy-sub-badge">CAPIBARA</div>
          </div>

          <div className={`capy-bubble ${q?.tipo === 'flujo' ? 'flujo-mode' : ''}`} style={{ 
            width: q?.tipo === 'flujo' ? '100%' : 'auto',
            marginTop: q?.tipo === 'flujo' ? '16px' : '0',
            textAlign: q?.tipo === 'flujo' ? 'center' : 'left'
          }}>
            <div className="capy-bubble-tag">CAPIBARA · GUÍA DEL NIVEL</div>
            <h3 className="capy-bubble-question" style={{ fontSize: q?.tipo === 'flujo' ? '16px' : '20px', lineHeight: 1.3 }}>{q.p}</h3>
            {msg && (
              <div className={`capy-bubble-feedback ${ok ? 'feedback-ok' : 'feedback-error'}`}>
                {msg}
              </div>
            )}
          </div>
        </div>

        {/* ── ZONA DE RESPUESTAS ── */}
        <div className="nivel-exercise-area" style={{ 
          flex: q?.tipo === 'flujo' ? 1 : 'none', 
          display: 'flex', 
          flexDirection: 'column',
          overflowY: 'auto',
          paddingRight: '8px',
          minWidth: 0,
          background: q?.tipo === 'flujo' ? '#0d1b2a' : 'transparent',
          borderRadius: 12,
          padding: q?.tipo === 'flujo' ? '16px' : '0',
          marginTop: q?.tipo === 'flujo' ? '0' : '16px'
        }}>
          {alt ? (
            <Alternativas
              q={q}
              valor={typeof valor === 'number' ? valor : -1}
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
            <Ordenar q={q} valor={Array.isArray(valor) ? valor : []} setValor={setValor} orden={orden} bloq={ok} />
          )}
        </div>
      </div>

      {/* ── BARRA INFERIOR ── */}
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
      </div>

      {/* Overlay de ayuda */}
      {ayuda && (
        <HelperOverlay pista={q?.pista || PISTA[q?.tipo]} close={() => setAyuda(false)} />
      )}

      {viendoTeoria && (
        <PantallaTeoria
          isModal={true}
          leccion={leccion}
          onVolver={() => setViendoTeoria(false)}
          onComenzar={() => setViendoTeoria(false)}
        />
      )}

      {showFlujoSuccessModal && (
        <FlujoSuccessModal q={q} onClose={() => setShowFlujoSuccessModal(false)} />
      )}
    </div>
  );
}
