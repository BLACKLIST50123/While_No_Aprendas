export function Alternativas({ q, valor, setValor, ocultas, bloq }) {
  return q.o.map((t, i) => !ocultas.includes(i) && (
    <button key={i} disabled={bloq} className={`opt ${valor === i ? 'on' : ''}`} onClick={() => setValor(i)}>{t}</button>
  ));
}

// Sirve para "orden" (texto) y "flujo" (bloques [texto, forma] con flechas)
export function Ordenar({ q, valor, setValor, orden, bloq }) {
  const flujo = q.tipo === 'flujo';
  const chip = (i, puesto) => {
    const [t, f] = [].concat(q.l[i]);
    return (
      <button key={i} disabled={bloq} className={`chip ${flujo ? 'f-' + (f || 'proc') : 'cod'}`}
        onClick={() => setValor(puesto ? valor.filter((v) => v !== i) : [...valor, i])}>{t}</button>
    );
  };
  return (
    <>
      <div className="resp">
        {valor.length
          ? valor.map((i, k) => <span key={i}>{k > 0 && flujo && <b className="flecha">▼</b>}{chip(i, true)}</span>)
          : <span className="ph">Toca los bloques en el orden correcto</span>}
      </div>
      <div>{orden.filter((i) => !valor.includes(i)).map((i) => chip(i, false))}</div>
    </>
  );
}
