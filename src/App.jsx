import { useState } from 'react';
import Inicio from './pantallas/Inicio.jsx';
import SeleccionPersonaje from './pantallas/SeleccionPersonaje.jsx';
import Registro from './pantallas/Registro.jsx';
import Isla from './pantallas/Isla.jsx';

const KEY = 'wna-sesion';
const leer = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } };

// Flujo: home → character → register → map (isla). Si ya hay sesión, "Iniciar partida" va directo al mapa.
export default function App() {
  const [sesion, setSesion] = useState(leer);
  const [pantalla, setPantalla] = useState('home');
  const [personaje, setPersonaje] = useState('');

  const guardar = (datos) => {
    const s = { ...datos, personaje };
    setSesion(s);
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* sin storage */ }
  };
  const salir = () => {
    setSesion(null);
    try { localStorage.removeItem(KEY); } catch { /* sin storage */ }
    setPantalla('home');
  };
  const desdeInicio = (destino) => setPantalla(destino === 'character' && sesion ? 'map' : destino);

  return (
    <div className="app">
      {pantalla === 'home' && <Inicio go={desdeInicio} />}
      {pantalla === 'character' && <SeleccionPersonaje go={setPantalla} onPick={setPersonaje} />}
      {pantalla === 'register' && <Registro go={setPantalla} onDone={guardar} />}
      {pantalla === 'map' && sesion && <Isla sesion={sesion} onSalir={salir} />}
    </div>
  );
}
