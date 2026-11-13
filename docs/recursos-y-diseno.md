# Recursos y dirección visual

## Inventario

Se revisaron los tres archivos presentes en la carpeta inicial y el nuevo símbolo `only-logo.png`. Los originales se conservaron sin modificar:

| Recurso original                              | Copia de trabajo                                | Uso                                                                                    |
| --------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| `Logo con texto corregido-2.png`              | `src/assets/images/infinity-original.png`       | Recurso original conservado; retirado de las composiciones para evitar texto duplicado |
| `only-logo.png`                               | `src/assets/images/only-logo.png`               | Símbolo limpio en navbar, intro, cartas, portada, cierre y pie de página               |
| `logo con marca.png`                          | `src/assets/images/theraprohealth-original.png` | Logotipo completo Theraprohealth en el footer                                          |
| `Kit terapéutico verde “Revela tu poder”.png` | `src/assets/images/product-kit.png`             | Imagen principal del producto, detalle de carta fotográfica y Open Graph               |

El recurso del kit contiene el manual Practitioner, el estuche y las cartas. Los reversos dentro del estuche ya incluyen la identidad Reveal Your Power. No contiene fotografías de zapatos o pies en esos reversos.

No había archivos individuales de cartas, un manual PDF ni documentos con contenidos metodológicos. No se añadieron preguntas, conceptos concretos ni contenidos del manual. Las cartas verdes y menta son representaciones de reversos en HTML/CSS con el símbolo original. La carta fotográfica muestra mediante CSS un detalle del recurso suministrado. El manual decorativo en formación es una representación en CSS basada en la portada visible, no una digitalización de su contenido.

La imagen principal se utiliza sin textos, etiquetas ni elementos añadidos sobre la fotografía. Su leyenda la identifica como imagen promocional. No se afirma que sea una fotografía documental; su procedencia exacta no estaba documentada. No se generaron imágenes nuevas.

El favicon es una simplificación vectorial del motivo del infinito para tamaños pequeños; los logotipos visibles mantienen los recursos suministrados.

## Referencia

Referencia solicitada: [Paypath](https://paypath.ai/?ref=land-book.com).

Se obtuvo el HTML de Paypath y se revisó una [captura completa de escritorio](https://designdetails.io/websites/paypath-ai). La versión visible presenta un fondo verde oscuro, grandes titulares, bloques espaciados, superficies claras intercaladas, navegación contenida y un cierre de alto contraste. Se tomó su ritmo editorial y jerarquía como punto de partida, adaptándolos a la paleta clara y al producto físico solicitado.

El entorno impidió iniciar Chromium para observar la referencia en movimiento. No se afirma haber verificado sus animaciones en vivo ni su comportamiento responsive. La órbita de cartas es una implementación original de la dirección de movimiento descrita en el encargo, sin reutilizar código ni recursos de Paypath.

## Decisiones

Fondos `#F7FAF8`, menta suave y una sección de formación `#101C1B` construyen una progresión con contraste. El producto dispone de una imagen amplia y completa, sin recortar el kit en su presentación principal. La lista de perfiles utiliza tipografía y divisores en lugar de tarjetas iguales.

Manrope se usa para interfaz y lectura. Cormorant Garamond variable, en regular e itálica, aporta el carácter editorial de los titulares. Se sirven tres archivos WOFF2 locales: Manrope normal y Cormorant normal/itálica. No se consultan servicios de fuentes en tiempo de ejecución.

La formación tiene un módulo destacado y tres bloques explícitamente pendientes. No se inventaron estadísticas, testimonios, acreditaciones ni información comercial.

## Ajuste de legibilidad e identidad

- Navbar con el símbolo sin texto; las cartas decorativas no añaden texto al símbolo.
- Portada Practitioner con símbolo independiente y una única versión de cada título.
- Cuerpo de lectura a 18 px y controles, notas y etiquetas desde 16 px; escalas en rem y mejor contraste del verde.
- Por debajo de 1280 px, las cartas del hero ocupan un bloque propio y no se superponen con los textos.
- Iconos de interfaz y proceso de `@lucide/astro`, sin dibujos SVG manuales. El favicon de marca se conserva.
- Cuenta 3, 2, 1 de unos cinco segundos, seguida por la entrada del hero; ScrollTrigger, entradas escalonadas, parallax y respuesta en botones y FAQ. Movimiento reducido y pausa global conservados.
- Estilos con Tailwind en los componentes y tokens en `global.css`; CSS específico únicamente para fuentes, accesibilidad y canto del libro.
- WhatsApp activo: `593967588441`, con mensajes por interés.

La compilación y las comprobaciones estáticas se realizan localmente. Chromium no puede iniciarse en esta sesión por restricciones del entorno; la revisión visual y la interacción responsive en navegador quedan pendientes.
