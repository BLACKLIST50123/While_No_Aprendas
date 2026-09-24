import { useEffect, useState } from 'react';
const dia = (t) => new Date(t).toISOString().slice(0, 10);
const inicial = { hechos: { basica: { 0: 3, 1: 3 } }, xp: 820, com: 3, racha: 12, ultimo: '' };

function cargar(KEY) {
  let s = {};
  try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { /* sin datos */ }
  s = { ...inicial, ...s };
  const hoy = dia(Date.now());
  if (s.ultimo !== hoy) { s.racha = s.ultimo === dia(Date.now() - 864e5) ? s.racha + 1 : 1; s.ultimo = hoy; }
  return s;
}

export function useProgreso(usuario = 'anon') {
  const KEY = 'wna-v2-' + usuario; // un progreso por jugador
  const [p, setP] = useState(() => cargar(KEY));
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignorar */ } }, [p, KEY]);
  const completar = (curso, nivel, est) => setP((s) => {
    const prev = s.hechos[curso]?.[nivel] || 0;
    if (est <= prev) return s;
    return { ...s, xp: s.xp + (est - prev) * 30, com: s.com + (est === 3 && prev < 3 ? 1 : 0),
      hechos: { ...s.hechos, [curso]: { ...s.hechos[curso], [nivel]: est } } };
  });
  const gastarComodin = () => setP((s) => (s.com > 0 ? { ...s, com: s.com - 1 } : s));
  const reiniciar = () => setP({ ...inicial, ultimo: dia(Date.now()) });
  return { p, completar, gastarComodin, reiniciar };
}
