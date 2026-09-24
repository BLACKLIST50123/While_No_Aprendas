// Posiciones (%) de los nodos sobre public/mapa1.jpg
export const NODOS = [[18,86],[25,71],[33.5,61],[42,53.5],[52,49],[64,48.4],[74.4,48.4]];
export const BOTS = [
  { n: 'Ana', x: 950, avatar: 'ana' },
  { n: 'Leo', x: 760, avatar: 'leo' },
  { n: 'Mia', x: 680, avatar: 'mia' },
  { n: 'Alex', x: 640, avatar: 'alex' },
];
export const PERSONAJES = { girl: '👩‍💻', boy: '🧑‍💻', dog: '🐶' };
export const estrellas = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);

// tipos: alt {p,o,a} | orden {p,l} | flujo {p,l:[[texto,forma]]}
export const CURSOS = [
  { id: 'basica', nombre: 'Programación básica', niveles: [
    { t: 'Variables', ej: [
      { tipo: 'alt', p: '¿Qué es una variable?', o: ['Un espacio para guardar un dato', 'Un tipo de bucle', 'Una función matemática', 'Un archivo del programa'], a: 0 },
      { tipo: 'alt', p: 'Si escribes edad = 15, ¿qué es "edad"?', o: ['Una variable que guarda un valor', 'Un bucle', 'Un error'], a: 0 },
      { tipo: 'orden', p: 'Ordena los pasos para sumar dos números.', l: ['Leer a', 'Leer b', 'suma = a + b', 'Mostrar suma'] }] },
    { t: 'Operadores', ej: [
      { tipo: 'alt', p: '¿Cuánto es 7 % 3 (módulo)?', o: ['1', '2', '0', '4'], a: 0 },
      { tipo: 'alt', p: '¿Qué operador compara si dos valores son iguales?', o: ['=', '==', '=>'], a: 1 }] },
    { t: 'Condicionales', ej: [
      { tipo: 'alt', p: 'Con x = 3, ¿entra al bloque: if (x > 5)?', o: ['Sí', 'No'], a: 1 },
      { tipo: 'flujo', p: 'Ordena el diagrama: aprobar con nota mínima de 11.', l: [['Inicio', 'ini'], ['Leer nota', 'io'], ['¿nota >= 11?', 'dec'], ['Mostrar "Aprobado"', 'io'], ['Fin', 'fin']] }] },
    { t: 'Bucle while', ej: [
      { tipo: 'alt', p: '¿Cuándo termina un while?', o: ['Cuando su condición es falsa', 'Nunca', 'Después de 10 vueltas'], a: 0 },
      { tipo: 'orden', p: 'Ordena para mostrar 0, 1 y 2.', l: ['i = 0', 'while i < 3:', 'mostrar i', 'i = i + 1'] }] },
    { t: 'Bucle for', ej: [
      { tipo: 'alt', p: '¿Cuántas vueltas da: for i in range(3)?', o: ['2', '3', '4'], a: 1 },
      { tipo: 'orden', p: 'Ordena para sumar del 1 al 3.', l: ['total = 0', 'for i in range(1, 4):', 'total = total + i', 'mostrar total'] }] },
    { t: 'Funciones', ej: [
      { tipo: 'alt', p: '¿Para qué sirve "return"?', o: ['Devuelve un resultado', 'Repite el código', 'Borra variables'], a: 0 },
      { tipo: 'orden', p: 'Ordena la función que duplica un número.', l: ['def doble(n):', 'resultado = n * 2', 'return resultado', 'mostrar doble(4)'] }] },
    { t: 'Listas', ej: [
      { tipo: 'alt', p: 'En nums = [4, 8, 15], ¿cuánto vale nums[0]?', o: ['4', '8', '15'], a: 0 },
      { tipo: 'flujo', p: 'Ordena el diagrama para recorrer una lista.', l: [['Inicio', 'ini'], ['Tomar siguiente elemento', 'proc'], ['Mostrarlo', 'io'], ['¿quedan más?', 'dec'], ['Fin', 'fin']] }] },
  ] },
  { id: 'algoritmos', nombre: 'Algoritmos (principiantes)', niveles: [
    { t: 'Secuencia', ej: [
      { tipo: 'alt', p: '¿Qué es un algoritmo?', o: ['Pasos ordenados para resolver un problema', 'Un lenguaje de programación', 'Un tipo de computadora'], a: 0 },
      { tipo: 'orden', p: 'Ordena los pasos para preparar té.', l: ['Hervir agua', 'Poner la bolsita en la taza', 'Verter el agua', 'Esperar 3 minutos'] }] },
    { t: 'Decisiones', ej: [
      { tipo: 'alt', p: '¿Qué figura representa una decisión en un diagrama de flujo?', o: ['Rombo', 'Óvalo', 'Rectángulo'], a: 0 },
      { tipo: 'flujo', p: 'Ordena el diagrama para saber si un número es par.', l: [['Inicio', 'ini'], ['Leer n', 'io'], ['¿n % 2 == 0?', 'dec'], ['Mostrar "Par"', 'io'], ['Fin', 'fin']] }] },
    { t: 'Repetición', ej: [
      { tipo: 'alt', p: 'Un bucle sirve para...', o: ['Repetir pasos mientras haga falta', 'Guardar un dato', 'Terminar el programa'], a: 0 },
      { tipo: 'orden', p: 'Ordena para contar del 1 al 3.', l: ['n = 1', 'Mientras n <= 3', 'Mostrar n', 'n = n + 1'] }] },
    { t: 'Pseudocódigo', ej: [
      { tipo: 'alt', p: '¿Cuál es un buen primer paso al resolver un problema?', o: ['Entender qué datos entran y qué debe salir', 'Escribir código sin pensar', 'Copiar una solución'], a: 0 },
      { tipo: 'flujo', p: 'Ordena el diagrama para hallar el mayor de dos números.', l: [['Inicio', 'ini'], ['Leer a y b', 'io'], ['¿a > b?', 'dec'], ['Mostrar el mayor', 'io'], ['Fin', 'fin']] }] },
  ] },
];
