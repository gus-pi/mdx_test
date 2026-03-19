# Documentación del Proyecto: Swanson Reserve Capital por Gustavo Pinedo

## Descripción General

Landing page interactiva para Swanson Reserve Capital, construida con **Next.js**, **GSAP**, **Three.js (React Three Fiber)** y **Tailwind CSS**. La página consta de tres secciones principales con animaciones vinculadas al scroll del usuario, una secuencia de imágenes renderizada , un modelo 3D interactivo y un carrusel con imágenes del equipo.

---

## Enfoque del Proyecto

### Arquitectura de Componentes

Dividí la página en componentes independientes, cada uno responsable de su propia lógica de animación:

- **Hero** — Secuencia de imágenes en canvas con textos animados por scroll. Maneja un timeline de GSAP con ScrollTrigger para sincronizar las transiciones de slides con el progreso del scroll, además de un timeline introductorio que desbloquea el scroll al completarse.
- **Section 2** — Modelo 3D del cisne con tarjetas informativas que se animan durante el scroll. El cisne rota progresivamente mientras las tarjetas entran y salen con movimiento horizontal alternado.
- **Section 3** — Carrusel de equipo con realziado con Embla Carousel y animaciones GSAP (escala, skew, opacidad) que responden al progreso del scroll del carrusel.
- **LoadingScreen** — Pantalla de carga con el logo animado que espera a que toda la secuencia de imágenes se cargue antes de desaparecer.

### Elección de Herramientas

- **GSAP + ScrollTrigger**: La librería más robusta para animaciones vinculadas al scroll. Elegida por su precisión con `scrub`, su sistema de pinning y la capacidad de construir timelines complejos de forma declarativa.
- **React Three Fiber + Drei**: Permite integrar Three.js dentro del flujo de React de forma natural. Drei simplifica la configuración del entorno (iluminación, environment maps).
- **Embla Carousel**: Ligero y altamente personalizable. A diferencia de otras librerías, expone el progreso de scroll interno, lo que permite crear animaciones con GSAP en lugar de depender de transiciones CSS genéricas.
- **Next.js**: Framework elegido por su facilidad y velocidad para hacer un deployment rápido en vercel.

---

## Optimizaciones

### Rendimiento de la Secuencia de Imágenes

- **Formato WebP** para todas las imágenes de la secuencia, reduciendo significativamente el peso respecto a PNG/JPEG.
- **Precarga completa** de todos los frames antes de mostrar el contenido, evitando saltos visuales durante el scroll.
- **`gsap.ticker`** para el loop de renderizado del canvas, aprovechando el sistema de timing interno de GSAP.

### Secuencias Separadas por Dispositivo

- Se mantienen dos carpetas de secuencias: `sequence_desktop` (255 frames) y `sequence_mobile` (238 frames).
- La detección se hace una vez al montar el componente con `window.innerWidth < 768`, evitando cargar imágenes innecesarias en dispositivos móviles.

### Optimización del modelo 3D

- Se utilizó el comando *`gltfjsx`** que genera un componente react y reduce el tamaño del modelo significativamente.

---

## Responsividad

### Estrategia General

- **Detección de viewport al montar**: Los valores de animación (offsets, rotaciones, posición de cámara) se calculan una vez según `window.innerWidth`.
- **Recarga forzada al redimensionar**: Un componente `WindowReloadHandler` detecta cambios en el ancho de ventana y recarga la página, garantizando que todos los cálculos se reinicialicen correctamente. Esto es una práctica común en sitios con animaciones scroll-driven complejas.

### Adaptaciones por Sección

- **Navbar**: Adaptaciones en general, ocultando o cambiando el tamaño de diferentes elementos dependiendo si estamos en pantalla móvil o no.

---

## Problemas Encontrados
 
### Conflicto entre animación de introducción y scroll
 
El Hero tiene dos timelines: uno de introducción que se reproduce automáticamente al cargar la página y otro vinculado al scroll. Al montar el componente, si el scroll no estaba en posición cero, el timeline de scroll interfería con la intro. La solución fue forzar `window.scrollTo(0, 0)` y bloquear el scroll con `overflow: hidden` en el body durante la intro, desbloqueándolo en el `onComplete` del timeline introductorio.
 
### Flicker debido al pinning dinámico
 
Al combinar múltiples secciones con `pin: true` en ScrollTrigger, se producían saltos visuales al entrar y salir de las zonas de pinning, especialmente entre el Hero y Section2. Fue necesario llamar `ScrollTrigger.refresh()` tras configurar los timelines y asegurar que los contenedores tuvieran alturas explícitas para que ScrollTrigger calculara correctamente los offsets.
 
### Z-index de tarjetas en el carrusel
 
En el carrusel de equipo, las tarjetas laterales se superponían visualmente a la tarjeta central debido a que GSAP aplicaba transformaciones CSS pero no alteraba el stacking context del DOM. 
 
---
 
## Posibles Mejoras

### Elementos de diseño pendientes por tiempo
 
El diseño en Figma incluye detalles que no se implementaron por restricciones de tiempo:
 
- **Indicadores de progreso**: Barras o contadores numéricos (`01 — 02 — 03`) visibles durante la secuencia del Hero, indicando en qué slide se encuentra el usuario.
- **Grid overlay decorativo**: Líneas de grilla sutiles presentes como elemento visual de fondo en varias secciones.
- **Borde en el Hero**: La sección Hero con la secuencia de imágenes y la barra de navegación tiene un borde que rodea toda la pantalla, la barra y el elemento de recordatorio de scroll, con esquinas redondeados y un color con blur.
- **Transiciones micro**: Pequeñas animaciones de entrada en elementos secundarios (líneas decorativas, labels) que enriquecerían la experiencia pero requieren ajuste fino por sección.

### Mejor control de sincronización en la secuencia de imágenes
 
- Actualmente la secuencia mapea linealmente el progreso de scroll a frames. Una mejora sería implementar curvas de easing personalizadas por tramos.
 