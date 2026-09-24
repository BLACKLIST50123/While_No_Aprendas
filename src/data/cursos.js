// Posiciones (%) de los nodos sobre public/mapa1.jpg — 7 niveles
export const NODOS = [
  [18, 86], [25, 71], [33.5, 61], [42, 53.5],
  [52, 49], [64, 48.4], [74.4, 48.4],
];

export const BOTS = [
  { n: 'Ana',  x: 950, avatar: 'ana'  },
  { n: 'Leo',  x: 760, avatar: 'leo'  },
  { n: 'Mia',  x: 680, avatar: 'mia'  },
  { n: 'Alex', x: 640, avatar: 'alex' },
];
export const PERSONAJES = { girl: '👩‍💻', boy: '🧑‍💻', dog: '🐶' };
export const estrellas = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);

// =====================================================================
//   CURSOS — tipos: alt {p,o,a} | orden {p,l} | flujo {p,l:[[t,f]]}
// =====================================================================
export const CURSOS = [
  {
    id: 'pseudocodigo',
    nombre: 'Principios de Algoritmos',
    descripcion: 'Pseudocódigo, algoritmos y diagramas de flujo desde cero',
    niveles: [

      // ------------------------------------------------------------------
      // NIVEL 1 — ¿Qué es un Algoritmo? (8 ejercicios)
      // ------------------------------------------------------------------
      { t: '¿Qué es un Algoritmo?', ej: [
        { tipo: 'alt', p: '¿Qué es un algoritmo?',
          o: ['Una secuencia finita de pasos para resolver un problema',
              'Un lenguaje de programación como Python',
              'Un tipo de computadora especial',
              'Una base de datos con información'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuál característica significa que un algoritmo siempre termina?',
          o: ['Finito', 'Preciso', 'General', 'Eficiente'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuál de estas opciones es un algoritmo de la vida real?',
          o: ['Los pasos para hacer una tortilla', 'El nombre de un archivo', 'El color de una pantalla', 'Un número telefónico'],
          a: 0 },
        { tipo: 'alt', p: '¿Qué significa que un algoritmo sea "preciso"?',
          o: ['Cada paso está definido sin ambigüedad', 'Termina en pocos segundos', 'Usa muchos pasos', 'Funciona solo en computadoras'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuántas entradas puede tener un algoritmo?',
          o: ['Cero o más', 'Exactamente una', 'Exactamente dos', 'Siempre tres'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuántas salidas debe producir un algoritmo?',
          o: ['Al menos una', 'Ninguna', 'Exactamente dos', 'Depende del idioma'],
          a: 0 },
        { tipo: 'orden', p: 'Ordena los pasos del algoritmo para hacer jugo de naranja.',
          l: ['Tomar las naranjas', 'Partirlas por la mitad', 'Exprimir el jugo', 'Verter en un vaso y servir'] },
        { tipo: 'flujo', p: 'Ordena el diagrama para el algoritmo de "Cruzar la calle".',
          l: [['Inicio', 'ini'], ['Llegar al cruce', 'proc'], ['¿Luz en verde?', 'dec'], ['Cruzar la calle', 'proc'], ['Fin', 'fin']] },
      ]},

      // ------------------------------------------------------------------
      // NIVEL 2 — Variables y Tipos de Datos (8 ejercicios)
      // ------------------------------------------------------------------
      { t: 'Variables y Datos', ej: [
        { tipo: 'alt', p: '¿Qué es una variable en pseudocódigo?',
          o: ['Un espacio con nombre para guardar un dato', 'Un paso del algoritmo', 'Un tipo de diagrama', 'Una instrucción de salida'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuál es el tipo de dato del valor "Hola mundo"?',
          o: ['Cadena (texto)', 'Entero', 'Real', 'Lógico'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuál es el tipo de dato del valor 3.14?',
          o: ['Real', 'Entero', 'Cadena', 'Lógico'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuál es el tipo de dato del valor VERDADERO?',
          o: ['Lógico (booleano)', 'Cadena', 'Entero', 'Real'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuál instrucción se usa en pseudocódigo para que el usuario ingrese un dato?',
          o: ['LEER', 'ESCRIBIR', 'DECLARAR', 'RETORNAR'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuál instrucción muestra información al usuario?',
          o: ['ESCRIBIR', 'LEER', 'CALCULAR', 'GUARDAR'],
          a: 0 },
        { tipo: 'orden', p: 'Ordena el pseudocódigo para pedir la edad del usuario y mostrarla.',
          l: ['INICIO', 'DECLARAR edad: ENTERO', 'ESCRIBIR "¿Cuál es tu edad?"', 'LEER edad', 'ESCRIBIR "Tu edad es: ", edad', 'FIN'] },
        { tipo: 'flujo', p: 'Ordena el diagrama: pide el nombre del usuario y lo saluda.',
          l: [['Inicio', 'ini'], ['Leer nombre', 'io'], ['Escribir "Hola, " + nombre', 'io'], ['Fin', 'fin']] },
      ]},

      // ------------------------------------------------------------------
      // NIVEL 3 — Operadores y Expresiones (8 ejercicios)
      // ------------------------------------------------------------------
      { t: 'Operadores y Expresiones', ej: [
        { tipo: 'alt', p: '¿Cuánto es 17 DIV 5? (División entera en pseudocódigo)',
          o: ['3', '2', '4', '3.4'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuánto es 17 MOD 5? (Módulo o residuo)',
          o: ['2', '3', '1', '4'],
          a: 0 },
        { tipo: 'alt', p: '¿Qué resultado devuelve: 8 > 3?',
          o: ['VERDADERO', 'FALSO', '5', '8'],
          a: 0 },
        { tipo: 'alt', p: '¿Qué resultado devuelve: (4 > 2) Y (1 > 5)?',
          o: ['FALSO', 'VERDADERO', 'Error', '4'],
          a: 0 },
        { tipo: 'alt', p: '¿Qué resultado devuelve: NO (10 > 20)?',
          o: ['VERDADERO', 'FALSO', '10', 'Error'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuál operador verifica si dos valores son IGUALES?',
          o: ['= =  (igual a)', '= (asignación)', '<> (diferente)', '> (mayor que)'],
          a: 0 },
        { tipo: 'orden', p: 'Ordena el pseudocódigo para calcular el área de un rectángulo.',
          l: ['INICIO', 'LEER base, altura', 'area ← base * altura', 'ESCRIBIR "Área = ", area', 'FIN'] },
        { tipo: 'flujo', p: 'Ordena el diagrama: lee precio y cantidad, calcula el total y lo muestra.',
          l: [['Inicio', 'ini'], ['Leer precio, cantidad', 'io'], ['total ← precio * cantidad', 'proc'], ['Escribir total', 'io'], ['Fin', 'fin']] },
      ]},

      // ------------------------------------------------------------------
      // NIVEL 4 — Condicionales SI / SINO (10 ejercicios)
      // ------------------------------------------------------------------
      { t: 'Condicionales SI/SINO', ej: [
        { tipo: 'alt', p: '¿Para qué sirve la estructura SI/SINO?',
          o: ['Ejecutar código sólo si una condición es verdadera', 'Repetir un bloque muchas veces', 'Declarar variables', 'Mostrar texto'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuándo se ejecuta el bloque SINO?',
          o: ['Cuando la condición del SI es FALSA', 'Siempre', 'Cuando la condición es VERDADERA', 'Solo en bucles'],
          a: 0 },
        { tipo: 'alt', p: 'Con x = 8, ¿entra al bloque SI?   →   SI x > 10 ENTONCES ...',
          o: ['No, porque 8 no es mayor que 10', 'Sí, porque 8 es un número', 'Sí, porque 10 > 8', 'Error, falta FIN_SI'],
          a: 0 },
        { tipo: 'alt', p: '¿Para qué sirve SINO SI (o SEGUN SEA)?',
          o: ['Para evaluar múltiples condiciones en cadena', 'Para salir del programa', 'Para declarar más variables', 'Para leer datos del usuario'],
          a: 0 },
        { tipo: 'alt', p: 'Con nota = 14, ¿qué imprime este pseudocódigo?\n  SI nota >= 11 ENTONCES ESCRIBIR "Aprobó" SINO ESCRIBIR "Reprobó"',
          o: ['"Aprobó"', '"Reprobó"', 'Nada', 'Error'],
          a: 0 },
        { tipo: 'alt', p: '¿Qué condición compuesta significa: "x es mayor que 0 Y menor que 10"?',
          o: ['(x > 0) Y (x < 10)', '(x > 0) O (x < 10)', 'NO (x > 0)', 'x > 0 > 10'],
          a: 0 },
        { tipo: 'orden', p: 'Ordena el pseudocódigo: si temperatura > 30 mostrar "Hace calor", sino "Temperatura agradable".',
          l: ['INICIO', 'LEER temperatura', 'SI temperatura > 30 ENTONCES', '  ESCRIBIR "Hace calor"', 'SINO', '  ESCRIBIR "Temperatura agradable"', 'FIN_SI', 'FIN'] },
        { tipo: 'orden', p: 'Ordena el pseudocódigo para clasificar un número como par o impar.',
          l: ['INICIO', 'LEER numero', 'SI numero MOD 2 == 0 ENTONCES', '  ESCRIBIR "Es par"', 'SINO', '  ESCRIBIR "Es impar"', 'FIN_SI', 'FIN'] },
        { tipo: 'flujo', p: 'Ordena el diagrama: determina si un número es positivo, negativo o cero.',
          l: [['Inicio', 'ini'], ['Leer n', 'io'], ['¿n > 0?', 'dec'], ['Escribir "Positivo"', 'io'], ['Fin', 'fin']] },
        { tipo: 'flujo', p: 'Ordena el diagrama: verifica si una persona puede votar (≥ 18 años).',
          l: [['Inicio', 'ini'], ['Leer edad', 'io'], ['¿edad >= 18?', 'dec'], ['Escribir "Puede votar"', 'io'], ['Fin', 'fin']] },
      ]},

      // ------------------------------------------------------------------
      // NIVEL 5 — Bucle MIENTRAS (8 ejercicios)
      // ------------------------------------------------------------------
      { t: 'Bucle MIENTRAS', ej: [
        { tipo: 'alt', p: '¿Cuándo se ejecuta el cuerpo de un bucle MIENTRAS?',
          o: ['Mientras la condición sea VERDADERA', 'Siempre una sola vez', 'Mientras la condición sea FALSA', 'Solo cuando hay LEER'],
          a: 0 },
        { tipo: 'alt', p: '¿Qué ocurre si la condición del MIENTRAS nunca se hace FALSA?',
          o: ['Bucle infinito: el programa nunca termina', 'El bucle se detiene al tercer intento', 'Se ejecuta el bloque SINO', 'El programa da error'],
          a: 0 },
        { tipo: 'alt', p: 'Con i = 1:\n  MIENTRAS i <= 3 HACER\n    i ← i + 1\n  FIN_MIENTRAS\n¿Cuántas veces se ejecuta el cuerpo?',
          o: ['3 veces', '4 veces', '2 veces', 'Infinitas'],
          a: 0 },
        { tipo: 'alt', p: '¿Qué instrucción permite salir de un bucle antes de que su condición sea falsa?',
          o: ['SALIR (o BREAK)', 'CONTINUAR', 'RETORNAR', 'FIN'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuál es la diferencia entre MIENTRAS y REPETIR...HASTA?',
          o: ['MIENTRAS evalúa antes; REPETIR...HASTA evalúa al final (siempre se ejecuta al menos una vez)', 'Son exactamente iguales', 'REPETIR es más rápido', 'MIENTRAS nunca puede ser infinito'],
          a: 0 },
        { tipo: 'orden', p: 'Ordena el pseudocódigo para mostrar los números del 1 al 5 con MIENTRAS.',
          l: ['INICIO', 'i ← 1', 'MIENTRAS i <= 5 HACER', '  ESCRIBIR i', '  i ← i + 1', 'FIN_MIENTRAS', 'FIN'] },
        { tipo: 'orden', p: 'Ordena el pseudocódigo para sumar números hasta que el usuario ingrese 0.',
          l: ['INICIO', 'suma ← 0', 'LEER numero', 'MIENTRAS numero <> 0 HACER', '  suma ← suma + numero', '  LEER numero', 'FIN_MIENTRAS', 'ESCRIBIR "Suma total: ", suma', 'FIN'] },
        { tipo: 'flujo', p: 'Ordena el diagrama: pide la contraseña hasta que sea correcta.',
          l: [['Inicio', 'ini'], ['Leer contraseña', 'io'], ['¿contraseña correcta?', 'dec'], ['Escribir "¡Bienvenido!"', 'io'], ['Fin', 'fin']] },
      ]},

      // ------------------------------------------------------------------
      // NIVEL 6 — Bucle PARA (8 ejercicios)
      // ------------------------------------------------------------------
      { t: 'Bucle PARA', ej: [
        { tipo: 'alt', p: '¿Qué estructura define el bucle PARA en pseudocódigo?',
          o: ['PARA variable ← inicio HASTA fin HACER', 'MIENTRAS variable HACER', 'SI variable ENTONCES', 'REPETIR variable HASTA'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuántas veces se ejecuta?\n  PARA i ← 1 HASTA 5 HACER ...',
          o: ['5 veces', '4 veces', '6 veces', '1 vez'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuándo es mejor usar PARA en vez de MIENTRAS?',
          o: ['Cuando se conoce de antemano cuántas veces se repite', 'Cuando no se sabe cuántas veces se repite', 'Cuando hay una decisión doble', 'Cuando se leen muchos datos'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuántas veces se ejecuta?\n  PARA i ← 0 HASTA 8 CON PASO 2 HACER ...',
          o: ['5 veces (0,2,4,6,8)', '4 veces', '8 veces', '9 veces'],
          a: 0 },
        { tipo: 'alt', p: '¿Qué es el "paso" (incremento) en un bucle PARA?',
          o: ['El valor que se suma al contador en cada vuelta', 'El valor inicial del contador', 'El valor final del contador', 'La condición de parada'],
          a: 0 },
        { tipo: 'alt', p: '¿Qué imprime este pseudocódigo?\n  PARA i ← 1 HASTA 3 HACER\n    ESCRIBIR i * i',
          o: ['1, 4, 9', '1, 2, 3', '2, 4, 6', '3, 6, 9'],
          a: 0 },
        { tipo: 'orden', p: 'Ordena el pseudocódigo para mostrar la tabla de multiplicar del 5.',
          l: ['INICIO', 'PARA i ← 1 HASTA 10 HACER', '  ESCRIBIR "5 x ", i, " = ", 5 * i', 'FIN_PARA', 'FIN'] },
        { tipo: 'flujo', p: 'Ordena el diagrama: recorre 5 notas y cuenta cuántas aprueban (>= 11).',
          l: [['Inicio', 'ini'], ['aprobados ← 0, i ← 1', 'proc'], ['¿i <= 5?', 'dec'], ['Leer nota', 'io'], ['Escribir aprobados', 'io'], ['Fin', 'fin']] },
      ]},

      // ------------------------------------------------------------------
      // NIVEL 7 — Subalgoritmos: Procedimientos y Funciones (10 ejercicios)
      // ------------------------------------------------------------------
      { t: 'Subalgoritmos', ej: [
        { tipo: 'alt', p: '¿Qué es un subalgoritmo?',
          o: ['Un bloque de código con nombre que realiza una tarea específica', 'Una variable de tipo especial', 'Un tipo de bucle', 'Un diagrama de flujo completo'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuál es la diferencia entre PROCEDIMIENTO y FUNCIÓN?',
          o: ['La función retorna un valor; el procedimiento no', 'Son exactamente iguales', 'El procedimiento retorna un valor; la función no', 'La función usa PARA; el procedimiento usa MIENTRAS'],
          a: 0 },
        { tipo: 'alt', p: '¿Para qué sirve un parámetro en un subalgoritmo?',
          o: ['Recibir datos desde donde se llama el subalgoritmo', 'Declarar variables locales', 'Mostrar resultados al usuario', 'Repetir el subalgoritmo'],
          a: 0 },
        { tipo: 'alt', p: '¿Qué hace la instrucción RETORNAR dentro de una función?',
          o: ['Devuelve un valor y termina la función', 'Muestra un valor en pantalla', 'Reinicia la función', 'Declara una variable'],
          a: 0 },
        { tipo: 'alt', p: '¿Cuándo es útil dividir un algoritmo en subalgoritmos?',
          o: ['Cuando el algoritmo es largo y se puede separar en tareas reutilizables', 'Solo cuando hay bucles', 'Cuando hay menos de 3 pasos', 'Cuando no se usan variables'],
          a: 0 },
        { tipo: 'alt', p: '¿Qué significa que un subalgoritmo sea "reutilizable"?',
          o: ['Puede ser llamado múltiples veces desde distintas partes del algoritmo', 'Solo se usa una vez', 'Siempre necesita parámetros', 'No puede tener MIENTRAS'],
          a: 0 },
        { tipo: 'orden', p: 'Ordena el pseudocódigo de un PROCEDIMIENTO que saluda a un nombre dado.',
          l: ['PROCEDIMIENTO saludar(nombre: CADENA)', '  ESCRIBIR "¡Hola, ", nombre, "!"', 'FIN_PROCEDIMIENTO', 'INICIO', '  saludar("Marcos")', 'FIN'] },
        { tipo: 'orden', p: 'Ordena el pseudocódigo de una FUNCIÓN que calcula el cuadrado de un número.',
          l: ['FUNCIÓN cuadrado(n: ENTERO): ENTERO', '  RETORNAR n * n', 'FIN_FUNCIÓN', 'INICIO', '  resultado ← cuadrado(7)', '  ESCRIBIR resultado', 'FIN'] },
        { tipo: 'flujo', p: 'Ordena el diagrama del algoritmo principal que llama a un subalgoritmo "calcular área".',
          l: [['Inicio', 'ini'], ['Leer base, altura', 'io'], ['Llamar calcularÁrea(base,altura)', 'proc'], ['Escribir área', 'io'], ['Fin', 'fin']] },
        { tipo: 'flujo', p: 'Ordena el diagrama de una función que determina si un número es primo.',
          l: [['Inicio función', 'ini'], ['Leer n', 'io'], ['¿n tiene divisores entre 2 y n-1?', 'dec'], ['Retornar FALSO (no es primo)', 'proc'], ['Fin función', 'fin']] },
      ]},

    ],
  },
];
