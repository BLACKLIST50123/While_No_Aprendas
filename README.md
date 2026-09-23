# while(no_aprendas)

Plataforma de aprendizaje guiado de programación, estética pixel art 16-bit. React + Vite + Tailwind.
Base: prototipo de Inicio, Selección de personaje y Registro + mapa de isla jugable con niveles y ejercicios.

## Flujo
Inicio → Selección de personaje → Registro → Mapa de isla → Nivel (ejercicios) → Comodín (El Mesías da una pista).
Con sesión guardada, "Iniciar partida" entra directo al mapa.

## Ejecutar
```bash
npm install
npm run dev
```

## Estructura (`src/`)
- `main.jsx`, `App.jsx`: arranque y flujo de pantallas + sesión (localStorage).
- `pantallas/`: `Inicio`, `SeleccionPersonaje`, `Registro` (del prototipo original) e `Isla` (mapa jugable).
- `components/`: `UI` (PixelButton, SkyBackground, Title), `HelperOverlay` (comodín animado), `Mapa`, `HUD`, `Nivel` (motor de ejercicios), `Ejercicios`, `Paneles` (Ranking, Objetivo, Perfil, Logros).
- `data/cursos.js`: cursos, niveles, ejercicios, posiciones de nodos y bots del ranking.
- `useProgreso.js`: progreso por jugador (XP, comodines, racha, niveles) en localStorage.
- `index.css`: estilos originales (Tailwind + pantallas de cielo). `estilos/isla.css`: estilos del mapa, todos bajo `.isla` para no chocar.
- `_original/main.original.jsx`: el `main.jsx` original completo, solo de referencia (incluye el mapa vertical y el ejercicio de demo).

## Agregar contenido
- Nivel: nuevo objeto en `niveles` de un curso (máx. 7 con este mapa; ajusta `NODOS` si cambias la imagen).
- Curso: nuevo objeto en `CURSOS`. La sección elegida en el registro define el curso inicial (`CURSO_DE` en `Isla.jsx`).
- Ejercicios: `alt`, `orden`, `flujo` (bloques `[texto, forma]`, forma `ini | fin | proc | dec | io`). Campo opcional `pista` para el comodín.

## Pendiente
Login real y ranking real (Supabase según el informe), ejercicios de código con Piston, pistas con Gemini vía Node/Express, más islas.
