import { useEffect, useState } from 'react';

const dia = (t) => new Date(t).toISOString().slice(0, 10);

// Estado inicial limpio
const inicial = { hechos: {}, xp: 0, com: 3, racha: 1, ultimo: '' };

// hechos[cid][nivelIdx] = { lecciones: [0,0,0,0,0], completado: false }
// lecciones[i] = 0 (no hecha) | 1..3 (estrellas obtenidas)

function cargar(KEY) {
  let s = {};
  try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { /* sin datos */ }
  s = { ...inicial, ...s };
  const hoy = dia(Date.now());
  if (s.ultimo !== hoy) {
    s.racha = s.ultimo === dia(Date.now() - 864e5) ? s.racha + 1 : 1;
    s.ultimo = hoy;
  }
  return s;
}

export function useProgreso(usuario = 'anon') {
  const KEY = 'wna-v3-' + usuario;
  const [p, setP] = useState(() => cargar(KEY));
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignorar */ }
  }, [p, KEY]);

  // Completar una lección: (cid, nivelIdx, leccionIdx, estrellas)
  const completar = (cid, nivelIdx, leccionIdx, est) => setP(s => {
    const nivelHechos = s.hechos[cid]?.[nivelIdx] || { lecciones: [0,0,0,0,0], completado: false };
    const prev = nivelHechos.lecciones[leccionIdx] || 0;
    if (est <= prev) return s; // no mejora

    const nuevasLecciones = [...nivelHechos.lecciones];
    nuevasLecciones[leccionIdx] = est;
    const completado = nuevasLecciones.every(l => l > 0);
    const xpDelta = (est - prev) * 20; // 20 xp por estrella nueva

    return {
      ...s,
      xp: s.xp + xpDelta,
      com: s.com + (completado && !nivelHechos.completado ? 1 : 0), // +1 comodín al completar nivel
      hechos: {
        ...s.hechos,
        [cid]: {
          ...s.hechos[cid],
          [nivelIdx]: { lecciones: nuevasLecciones, completado },
        },
      },
    };
  });

  const gastarComodin = () => setP(s => s.com > 0 ? { ...s, com: s.com - 1 } : s);
  const reiniciar     = () => setP({ ...inicial, ultimo: dia(Date.now()) });

  return { p, completar, gastarComodin, reiniciar };
}
