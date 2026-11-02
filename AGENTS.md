# Freelance Studio Kit

Web educativa en español para Ashley Rodríguez. Mantén los siete módulos y el contenido del ebook original. Tina Design es una referencia visual; las imágenes adjuntas se presentan como referencias de composición, no como proyectos de Ashley.

## Arquitectura

- `src/routes/index.tsx`: portada React, navegación móvil, carpetas, flujo de nueve etapas, ejercicio inductivo, calculadora y gráfico de distribución mensual, descargas y preguntas frecuentes.
- `src/routes/__root.tsx`: documento en español, metadatos y proveedores compartidos.
- `src/styles.css`: tema y diseño de portada. Paleta crema, tinta y violeta con acentos por módulo; Manrope, DM Sans y DM Serif Display.
- `public/guia.html`: lector completo adaptado del HTML aportado, con herramientas originales y plantillas generadas en el navegador.
- `public/reader.css` y `public/reader.js`: presentación del lector, navegación por hash entre módulos, iconos, barra de lectura e impresión de todos los módulos.
- `public/plantillas`: descargas directas TXT y CSV de la portada.
- `public/img`: imágenes de referencia aportadas por la usuaria; utiliza Netlify Image CDN para mostrarlas.
- `netlify/functions/progress.mts`: GET/PUT de progreso anónimo. Cookie HttpOnly Secure SameSite, identificador almacenado como hash, validación de origen y de seis booleanos por checklist.
- `db/schema.ts`, `db/index.ts`, `drizzle.config.ts`: esquema y cliente Drizzle con adaptador Netlify Database.
- `netlify/database/migrations`: migraciones generadas; la plataforma las aplica durante el despliegue.

## Convenciones

Usa TypeScript estricto y React hooks. Los enlaces al lector son enlaces HTML normales a un recurso público, no rutas TanStack. No edites `src/routeTree.gen.ts`; se genera automáticamente. Conserva los IDs del ebook (`f1`–`f7` y `s11`–`s74`) porque sirven para enlaces directos.

Los datos financieros y de cotización se calculan en el navegador. Solo los checklists persisten en Netlify Database; no uses localStorage ni archivos JSON para progreso. En fallos de red muestra un mensaje y permite reintentar sin afirmar que el guardado tuvo éxito. Los campos libres se escapan antes de generar HTML descargable. Los CSV de usuario deben escapar comillas y prevenir fórmulas.

Mantén foco visible, etiquetas para controles, navegación por teclado, diseño móvil y soporte de movimiento reducido. Anima transform y opacity. No conviertas las referencias visuales en imágenes esenciales para comprender el contenido.

## Desarrollo

`pnpm install` y `netlify dev --port 8889`. Genera migraciones después de editar el esquema: `pnpm exec drizzle-kit generate --name nombre_descriptivo`. Nunca ejecutes migraciones contra la base de datos manualmente ni modifiques migraciones aplicadas. La plataforma realiza la compilación al desplegar; no generes artefactos de build durante cambios asistidos.
