# Freelance Studio Kit

Una web educativa en español basada en el ebook de Ashley Rodríguez. Organiza los siete módulos originales en una experiencia de aprendizaje visual, con navegación por carpetas, un flujo de nueve etapas, ejercicios con retroalimentación, calculadora de tarifa y plantillas descargables.

La entrada `/` abre el ebook original en `/guia.html`, con su portada, tipografías Poppins y Fredoka e índice de carpetas. El lector cuenta con enlaces directos a capítulos (`#f1` a `#f7`) y secciones (`#s34`, por ejemplo). El botón de impresión permite guardar los siete módulos como PDF desde el navegador. Los importes de Brisa Café son ejemplos ficticios en soles.

## Tecnologías

TanStack Start, React 19, TypeScript, Tailwind CSS 4, Lucide, Netlify Functions y Netlify Database con Drizzle ORM. El lector conserva HTML y JavaScript independientes para mantener el contenido y las herramientas del documento original.

## Desarrollo local

Usa Node 22.13+ y pnpm:

```sh
pnpm install
netlify dev --port 8889
```

Netlify Dev emula las funciones y los servicios de la plataforma. El guardado de checklists utiliza una cookie anónima HttpOnly y la base de datos; no requiere una cuenta. Borrar las cookies del sitio elimina el acceso al avance asociado a ese navegador. Si el servicio falla, se muestra un estado de error con una opción para reintentar.

El esquema vive en `db/schema.ts`; las migraciones se generan con `pnpm exec drizzle-kit generate --name nombre_descriptivo` y la plataforma las aplica al desplegar. No apliques migraciones manualmente.

Las plantillas de portada están en `public/plantillas`. El lector genera documentos HTML compatibles con Word, archivos de texto y CSV en el navegador. No envía los datos de cotización ni los cálculos al servidor.
