# Reveal Your Power

Landing local en español, hecha con Astro, TypeScript, Tailwind CSS v4, Lucide Astro, GSAP, ScrollTrigger y Lenis. Sin React, Vue, backend, cuentas ni pagos.

## Uso local

Requiere Node.js 22.12 o superior y pnpm 10.

```sh
pnpm install
pnpm dev
```

Abre la dirección local que indica Astro (normalmente `http://localhost:4321`).

```sh
pnpm check
pnpm build
pnpm preview
pnpm format
pnpm format:check
```

Las versiones exactas se conservan en `package.json` y `pnpm-lock.yaml`. Las cachés locales de pnpm están ignoradas por Git y Prettier. No se necesita ningún servicio externo para servir la landing ya compilada; las fuentes, imágenes y scripts son locales.

## WhatsApp y dominio

El WhatsApp comercial está habilitado por defecto para **096 758 8441**, Ecuador: `https://wa.me/593967588441`. Todos los botones usan ese destino y un mensaje según el interés del visitante.

Para cambiarlo, configura `PUBLIC_WHATSAPP_NUMBER` en `.env` con el código de país y solamente dígitos. `src/data/site.ts` centraliza el número y `src/lib/whatsapp/index.ts` valida y codifica los mensajes. Una variable vacía conserva el número comercial; una variable inválida desactiva los enlaces.

`PUBLIC_SITE_URL` es opcional para desarrollo. Complétala con el dominio real antes de publicar para generar la URL canónica y las direcciones absolutas de Open Graph. Después de cambiar variables de entorno, reinicia `pnpm dev` o vuelve a ejecutar `pnpm build`.

Los mensajes están separados por interés: información general, herramienta, Practitioner y formación. Los enlaces abren WhatsApp en otra pestaña.

## Organización

- `src/data/`: configuración y contenido editorial.
- `src/components/layout/`: header, navegación móvil y footer.
- `src/components/sections/`: las secciones de la landing.
- `src/components/cards/`: cartas individuales y composición orbital.
- `src/components/ui/`: marca, iconos, botones, intro y etiquetas.
- `src/lib/animations/`: entradas, órbitas, parallax y controles de movimiento.
- `src/lib/lenis/`: sincronización del scroll con un único ticker de GSAP.
- `src/lib/whatsapp/`: validación del número y construcción de mensajes.
- `src/styles/global.css`: tokens, fuentes locales y estilos compartidos.
- `src/assets/images/`: recursos originales y nuevo símbolo `only-logo.png`, optimizados por Astro con Sharp al compilar.
- `docs/`: inventario de recursos, decisiones visuales y validación.

## Movimiento y accesibilidad

La intro muestra el logo y cuenta **3 → 2 → 1** en aproximadamente cinco segundos, una vez por sesión. La entrada del hero comienza al terminar la intro o al omitirla. Cualquier interacción la omite; no bloquea el scroll ni el foco. La preferencia de movimiento reducido la desactiva.

Las cartas son elementos separados, con transformaciones 3D, entrada escalonada, movimiento orbital y respuesta sutil al cursor. Las capas separan la posición base, el movimiento del cursor, la entrada y la órbita para que las animaciones no compitan por la misma transformación.

Por debajo de 1280 px se muestran tres cartas en un espacio propio debajo del texto, conservando el scroll nativo. Lenis y el parallax amplio se activan únicamente desde 1280 px y con puntero preciso. Su `autoRaf` está desactivado; utiliza el ticker de GSAP y notifica a ScrollTrigger. Las órbitas se pausan fuera del hero y cuando la pestaña está oculta. El botón «Pausar movimiento» restaura la composición estática y el scroll nativo.

Las secciones entran con ScrollTrigger; los grupos de elementos aparecen de forma escalonada. La formación, el producto, las preguntas frecuentes y los botones tienen animaciones con GSAP.

El texto de lectura usa 18 px, las etiquetas y controles al menos 16 px, tamaños relativos en rem e interlineado amplio.

El menú y las preguntas frecuentes usan `details`/`summary`, funcionan sin JavaScript y admiten teclado. Hay enlace para saltar al contenido, foco visible, un H1 y alternativas textuales para las imágenes informativas.

## Contenido pendiente

- Dominio definitivo, si se decide publicar más adelante.
- Nombres y contenidos de los módulos 02, 03 y 04.
- Archivos individuales de cartas y manual completo, si se desea sustituir las representaciones visuales por reproducciones exactas.

La landing no incluye precios ni promesas clínicas, acreditaciones, duraciones o fechas no proporcionadas.

## Personalizar el diseño

Los componentes usan utilidades de Tailwind directamente en el marcado. En `src/styles/global.css`, `@theme` centraliza colores, fuentes y escalas (`text-body`, `text-label`); los patrones compartidos como `.button` usan `@apply`. El CSS específico se limita a fuentes, comportamiento global de accesibilidad y la textura del canto del libro.

`src/components/ui/Icon.astro` reúne las importaciones de `@lucide/astro`. El icono de contacto es `MessageCircle`, acompañado de la etiqueta WhatsApp. El navbar utiliza exclusivamente el símbolo sin texto. Las cartas decorativas usan el símbolo limpio, y la portada contiene una única versión de cada texto.

Para ajustar el ritmo de la cuenta, edita `src/lib/animations/intro.ts`. Las demás animaciones están en `src/lib/animations/index.ts` y `cards.ts`.

## Respaldo anterior a estos cambios

Commit **`934dba0`**: `chore: snapshot landing before requested visual and accessibility updates`.

La sesión de edición no tiene acceso a los metadatos originales de `.git`. Por eso el respaldo se guardó en un repositorio local independiente, `.local-history.git`, antes de instalar dependencias o modificar la landing. No reemplaza el historial del repositorio original.

```sh
git --git-dir=.local-history.git --work-tree=. show --stat 934dba0
git --git-dir=.local-history.git --work-tree=. diff 934dba0
```
# revealyourpower
