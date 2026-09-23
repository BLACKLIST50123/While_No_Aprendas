export default function HUD({ actual, com, racha, icono, onPerfil, onLogros, onExtras }) {
  return (
    <>
      <div className="hud">
        <div className="box lv">{icono && <span className="ava">{icono}</span>}<span>Nivel actual<b>{actual + 1}</b></span></div>
        <button className="ico" onClick={onPerfil} aria-label="Ajustes y perfil">⚙</button>
      </div>
      <div className="mid">
        <div className="box">Comodines<br /><b>x {com}</b></div>
        <div className="box">Racha<br /><b>{racha} {racha === 1 ? 'día' : 'días'}</b></div>
      </div>
      <div className="bot">
        <button className="ico" onClick={onPerfil}>Perfil</button>
        <button className="ico" onClick={onExtras}>Extras</button>
        <button className="ico" onClick={onLogros}>Logros</button>
      </div>
    </>
  );
}
