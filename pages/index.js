import Head from 'next/head';
import preguntas from '../data/preguntas.json';
import { useState, useEffect, useRef } from 'react';

import {
  FaCircle,
  FaSquare,
  FaStar,
  FaHeart,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { motion } from 'framer-motion';

function mezclarArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const colores = [
  { bg: 'bg-red-500', icon: <FaSquare /> },
  { bg: 'bg-blue-500', icon: <FaCircle /> },
  { bg: 'bg-yellow-400', icon: <FaStar /> },
  { bg: 'bg-green-500', icon: <FaHeart /> }
];

export default function Home() {
  const [preguntasMezcladas, setPreguntasMezcladas] = useState(() => mezclarArray(preguntas));
  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [seleccion, setSeleccion] = useState(null);
  const [botonHabilitado, setBotonHabilitado] = useState(false);

  // Ref para enfoque en la pregunta al cambiar
  const preguntaRef = useRef(null);

  // Refs para audios (se crean solo en cliente)
  const audioCorrectoRef = useRef(null);
  const audioErrorRef = useRef(null);

  useEffect(() => {
    audioCorrectoRef.current = new Audio('/correct.mp3');
    audioErrorRef.current = new Audio('/error.mp3');
  }, []);

  const pregunta = preguntasMezcladas[actual];

  useEffect(() => {
    if (seleccion === null) {
      setBotonHabilitado(false);
      return;
    }
    const timeoutId = setTimeout(() => {
      setBotonHabilitado(true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [seleccion]);

  // Al cambiar pregunta, hacer foco en el título para mejorar navegación teclado/lector pantalla
  useEffect(() => {
    if (preguntaRef.current) {
      preguntaRef.current.focus();
    }
  }, [actual]);

  // Reproducir sonido cuando el usuario responde
  useEffect(() => {
    if (seleccion === null) return;

    const esCorrecto = seleccion === pregunta.respuesta;
    const audio = esCorrecto ? audioCorrectoRef.current : audioErrorRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = 0.4;
    audio.play().catch(() => {
      // Ignorar error si el navegador bloquea autoplay sin interacción
    });
  }, [seleccion, pregunta.respuesta]);

  const manejarRespuesta = (opcion) => {
    if (seleccion !== null) return; // No cambiar respuesta después de seleccionar
    setSeleccion(opcion);

    if (opcion === pregunta.respuesta) setPuntaje(puntaje + 1);
  };

  const siguientePregunta = () => {
    setSeleccion(null);
    setBotonHabilitado(false);

    if (actual + 1 < preguntasMezcladas.length) {
      if (preguntasMezcladas[actual + 1].pregunta === preguntasMezcladas[actual].pregunta) {
        setActual(actual + 2 < preguntasMezcladas.length ? actual + 2 : actual + 1);
      } else {
        setActual(actual + 1);
      }
    } else {
      setTerminado(true);
    }
  };

  const totalPreguntas = preguntasMezcladas.length;
  const progreso = ((actual + (seleccion !== null ? 1 : 0)) / totalPreguntas) * 100;

  const esRespuestaCorrecta = seleccion === pregunta.respuesta;

  return (
    <>
      <Head>
        <title>Trivia de Programación - Juego Interactivo</title>
        <meta
          name="description"
          content="Pon a prueba tus conocimientos en programación con esta trivia interactiva."
        />
      </Head>

      <div
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4"
        role="main"
        aria-label="Juego de trivia de programación"
      >
        {/* Título visible */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-wide select-none">
            Trivia de Programación
          </h1>
          <p className="mt-2 text-lg text-gray-300 select-none">
            ¡Pon a prueba tus conocimientos y diviértete!
          </p>
        </header>

        {/* Contenedor del juego */}
        <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-3xl">
          {/* Puntuación */}
          <div
            className="mb-6 text-center font-bold text-xl tracking-wide select-none"
            aria-live="polite"
            aria-atomic="true"
          >
            Puntuación: <span className="text-green-600">{puntaje}</span> / {preguntas.length}
          </div>

          {/* Barra progreso */}
          <div
            className="w-full bg-gray-300 rounded-full h-4 mb-8 overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progreso)}
            aria-label="Progreso del juego"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progreso}%` }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="bg-blue-600 h-4 rounded-full"
            />
          </div>

          {terminado ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
              tabIndex={-1}
              aria-live="polite"
              aria-atomic="true"
            >
              <h2 className="text-4xl font-extrabold tracking-wide">¡Juego terminado!</h2>
              <p className="text-2xl">
                Obtuviste <span className="text-green-600">{puntaje}</span> de {preguntas.length} puntos
              </p>
              <button
                className="mt-6 px-8 py-3 bg-green-600 rounded-full text-white font-semibold hover:bg-green-700 active:scale-95 transition-transform select-none focus:outline-none focus:ring-4 focus:ring-green-400"
                onClick={() => {
                  setActual(0);
                  setPuntaje(0);
                  setTerminado(false);
                  setPreguntasMezcladas(mezclarArray(preguntas));
                  setSeleccion(null);
                  setBotonHabilitado(false);
                }}
              >
                Volver a jugar
              </button>
            </motion.div>
          ) : (
            <>
              {/* Título pregunta con focus para lector pantalla */}
              <motion.h2
                key={actual}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xl font-semibold mb-3 select-none"
                tabIndex={-1}
                ref={preguntaRef}
              >
                Pregunta {actual + 1} de {preguntas.length}
              </motion.h2>

              <motion.h3
                key={pregunta.pregunta}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-extrabold mb-8 leading-snug select-text"
              >
                {pregunta.pregunta}
              </motion.h3>

              {/* Lista de opciones con rol list */}
              <div
                role="list"
                aria-label="Opciones de respuesta"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {pregunta.opciones.map((opcion, index) => {
                  const esSeleccionada = seleccion === opcion;
                  const esCorrecta = opcion === pregunta.respuesta;

                  let bgColor = colores[index % colores.length].bg;
                  let cursor = 'cursor-pointer';
                  let icono = colores[index % colores.length].icon;
                  let sombra = 'shadow-md';

                  if (seleccion !== null) {
                    if (esSeleccionada) {
                      bgColor = esCorrecta ? 'bg-green-600' : 'bg-gray-700';
                      cursor = 'cursor-default';
                      icono = esCorrecta ? <FaCheck /> : <FaTimes />;
                      sombra = esCorrecta ? 'shadow-green-500' : 'shadow-red-700';
                    } else if (esCorrecta) {
                      bgColor = 'bg-green-600';
                      icono = <FaCheck />;
                      cursor = 'cursor-default';
                      sombra = 'shadow-green-500';
                    } else {
                      bgColor = 'bg-gray-400';
                      cursor = 'cursor-not-allowed';
                      sombra = '';
                    }
                  }

                  return (
                    <motion.button
                      key={index}
                      role="listitem"
                      disabled={seleccion !== null}
                      onClick={() => manejarRespuesta(opcion)}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      className={`${bgColor} ${cursor} ${sombra} flex items-center justify-between px-6 py-4 rounded-xl text-white font-semibold text-lg select-none focus:outline-none focus:ring-4 focus:ring-blue-400 transition-shadow`}
                      aria-pressed={esSeleccionada}
                      aria-disabled={seleccion !== null}
                      aria-label={`Opción ${opcion} ${
                        esSeleccionada ? (esCorrecta ? 'correcta' : 'incorrecta') : ''
                      }`}
                    >
                      <span>{opcion}</span>
                      <span className="text-3xl">{icono}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Mensaje para lectores de pantalla que anuncia si la respuesta es correcta o incorrecta */}
              <div
                aria-live="assertive"
                aria-atomic="true"
                className="sr-only"
                role="alert"
              >
                {seleccion !== null
                  ? esRespuestaCorrecta
                    ? 'Respuesta correcta'
                    : 'Respuesta incorrecta'
                  : ''}
              </div>

              {/* Botón siguiente solo si está habilitado */}
              {seleccion !== null && botonHabilitado && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-center mt-8"
                >
                  <button
                    onClick={siguientePregunta}
                    className="px-8 py-3 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 active:scale-95 transition-transform select-none focus:outline-none focus:ring-4 focus:ring-blue-400"
                  >
                    Siguiente
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
