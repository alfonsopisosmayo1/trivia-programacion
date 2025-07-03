# Trivia de Programación - Juego Interactivo en React

Bienvenido a este proyecto de trivia interactiva diseñado para poner a prueba tus conocimientos en programación de una forma dinámica y entretenida. La aplicación está pensada para ser accesible, rápida y fácil de usar, ideal para aprender jugando o para desafiar tus habilidades técnicas.

---

## Tabla de Contenidos

- [Descripción](#descripción)  
- [Características](#características)  
- [Tecnologías](#tecnologías)    
- [Uso](#uso)  
- [Estructura del Proyecto](#estructura-del-proyecto)  
- [Personalización](#personalización)  
- [Accesibilidad](#accesibilidad)  
- [Mejoras Futuras](#mejoras-futuras)  
- [Contribuciones](#contribuciones)  
- [Licencia](#licencia)  
- [Contacto](#contacto)

---

## Descripción

Este juego de trivia está desarrollado con React y Tailwind CSS, utilizando JSON para almacenar las preguntas y respuestas. El objetivo es responder correctamente el mayor número de preguntas posibles mientras avanzas por el cuestionario. Se incorporaron animaciones suaves mediante Framer Motion y sonidos para mejorar la experiencia del usuario.

Además, se priorizó la accesibilidad para que cualquier persona pueda interactuar sin dificultades, usando roles ARIA, navegación por teclado y soporte para lectores de pantalla.

---

## Características

- **Preguntas aleatorias:** Cada partida mezcla las preguntas para que la experiencia sea diferente cada vez.
- **Sistema de puntuación:** Lleva el conteo de respuestas correctas en tiempo real.
- **Indicadores visuales:** Cambios de color y símbolos que muestran si la respuesta es correcta o incorrecta.
- **Indicadores auditivos:** Sonidos de confirmación para respuestas acertadas y errores.
- **Barra de progreso:** Muestra el avance visual del jugador durante la partida.
- **Botón "Siguiente" activado con retardo:** Para evitar respuestas rápidas sin leer.
- **Reinicio fácil:** Permite volver a jugar con las preguntas mezcladas de nuevo.
- **Totalmente accesible:** Navegación con teclado, enfoque claro, roles y mensajes para lectores de pantalla.
- **Diseño responsive:** Compatible con dispositivos móviles, tablets y escritorio.
- **Animaciones suaves:** Transiciones y efectos para una experiencia fluida.

---

## Tecnologías Utilizadas

- **React**: Biblioteca para construir la interfaz de usuario.
- **Next.js**: Framework React para renderizado eficiente y routing.
- **Tailwind CSS**: Framework CSS utilitario para estilos rápidos y personalizados.
- **Framer Motion**: Librería para animaciones declarativas en React.
- **React Icons**: Iconos vectoriales para mejorar la UI.
- **JSON**: Archivo de datos para almacenar las preguntas y respuestas.

---

## Uso

- Selecciona una respuesta para cada pregunta usando el mouse o el teclado.
- La interfaz indicará si la respuesta es correcta o incorrecta con colores y sonidos.
- Cuando el botón "Siguiente" se active, haz clic o presiona Enter para avanzar.
- Al finalizar el juego, verás tu puntaje total y podrás reiniciar la partida para jugar de nuevo.

---

## Estructura del Proyecto

- `/pages` — Contiene el componente principal de React que maneja la lógica y UI del juego.
- `/data/preguntas.json` — Archivo JSON con las preguntas, opciones y respuestas correctas.
- `/public` — Carpeta para archivos estáticos, como audios de retroalimentación (`correct.mp3`, `error.mp3`).
- `/styles` — Archivos y configuraciones para Tailwind CSS y estilos personalizados.

---

## Personalización

- Puedes modificar o ampliar el archivo `preguntas.json` para agregar nuevas preguntas o cambiar las existentes.
- Cambia los estilos en Tailwind o añade tus propios estilos para ajustar la apariencia.
- Modifica los sonidos o añade nuevos para mejorar la experiencia auditiva.
- Ajusta los tiempos de espera o animaciones según tus preferencias.

---

## Accesibilidad

Este proyecto está diseñado para ser accesible mediante:

- Navegación completa por teclado, con soporte para Tab y Enter.
- Roles ARIA claros para mejorar la experiencia con lectores de pantalla.
- Mensajes en vivo (`aria-live`) que anuncian si la respuesta es correcta o incorrecta.
- Enfoque visible y controlado para que usuarios con discapacidades visuales puedan seguir el juego sin dificultades.

---

## Mejoras Futuras

- Añadir un temporizador para limitar el tiempo de respuesta.
- Implementar niveles de dificultad ajustables.
- Guardar los puntajes en localStorage o una base de datos para ranking.
- Añadir soporte multilingüe para más idiomas.
- Crear un modo multijugador o competitivo.
- Añadir estadísticas detalladas y retroalimentación personalizada.

---

## Contribuciones

Las contribuciones son bienvenidas. Si quieres aportar, puedes:

- Reportar errores mediante issues.
- Proponer mejoras o nuevas funcionalidades.
- Enviar pull requests con código limpio y bien documentado.

Por favor, sigue las buenas prácticas de Git y mantén el código ordenado.

---

## Licencia

Este proyecto está bajo licencia MIT. Puedes usarlo y modificarlo libremente respetando los términos de esta licencia.

---

## Contacto

**Alfonso Pisos Mayo**  
Desarrollador Web  
Correo: alfonsopisosmayo1@gmail.com  
GitHub: [https://github.com/alfonsopisosmayo1](https://github.com/alfonsopisosmayo1)  
LinkedIn: [https://www.linkedin.com/in/alfonso-pisos-mayo-a4828a291/](https://www.linkedin.com/in/alfonso-pisos-mayo-a4828a291/)
