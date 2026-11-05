# GranaBank

Web app para el challenge técnico de Club Atlético Lanús. Tiene login, una home con el balance y los últimos movimientos, un listado de movimientos con búsqueda y filtros, y el detalle de cada movimiento.

**Deploy:** _pendiente_

**Usuario de prueba:** `soygranate@clublanus.com` / `GRANATE1@`

## Stack

- Next.js 16 (App Router) + TypeScript
- Backend con Route Handlers de Next (`app/api`)
- PostgreSQL (Neon) + Prisma 7
- Tailwind CSS 4
- Zod para validaciones, `jose` para la sesión y `bcryptjs` para las contraseñas

## Cómo correrlo

Necesitás Node 20.19 o superior y una base PostgreSQL (yo usé Neon, que tiene plan gratis).

```bash
npm install
cp .env.example .env        # completar con los datos de tu base y un SESSION_SECRET
npx prisma migrate deploy   # crea las tablas
npx prisma db seed          # carga el usuario y los movimientos de ejemplo
npm run dev
```

La app queda en http://localhost:3000.

## Estructura

```
app/
  (app)/          pantallas privadas (home, movimientos, detalle) + barra de navegación
  login/          pantalla de login
  api/            endpoints: auth, movements, me
components/       componentes de la app y componentes base en ui/
lib/              sesión, acceso a datos, validaciones y formateo
prisma/           schema, migraciones y seed
proxy.ts          redirige según haya sesión o no
```

## Decisiones técnicas

**Un solo proyecto en Next.** La consigna permitía usar las API routes de Next como backend, así que fui por ahí: un solo repo, un solo deploy y los tipos compartidos entre front y back. Para una app de este tamaño, un backend separado sumaba complejidad sin aportar mucho.

**Montos en centavos.** Se guardan como enteros (`97885`) y se formatean al mostrarlos (`978.85`). Así se evitan los errores de redondeo de los decimales en punto flotante.

**Sesión.** Al loguearse se genera un JWT firmado con `jose` y se guarda en una cookie `httpOnly`, `secure` y `sameSite=lax`. Si se tilda "Recordarme" la cookie dura 30 días; si no, se borra al cerrar el navegador. La contraseña está hasheada con bcrypt, y si el login falla el mensaje es el mismo para email o contraseña incorrectos, para no revelar qué usuarios existen.

**Protección en dos capas.** `proxy.ts` hace un chequeo rápido de la cookie para redirigir entre `/login` y `/home`, y además cada página y cada endpoint vuelve a validar la sesión. Todas las consultas a la base filtran por el usuario logueado, así que aunque alguien conozca el id de un movimiento ajeno, recibe un 404.

**Home en el servidor, Movimientos en el cliente.** La Home es un Server Component que consulta la base directamente y llega armada al navegador. La pantalla de Movimientos consume la API desde el cliente porque la búsqueda es interactiva: tiene debounce de 300 ms para no hacer un request por tecla, y cancela el request anterior con `AbortController` para que una respuesta vieja no pise a la nueva.

**Estados de carga, error y vacío.** Cada pantalla tiene su skeleton de carga, un estado de error con botón para reintentar y mensajes de vacío distintos según no haya movimientos o no haya resultados para la búsqueda. El detalle tiene además su propia pantalla de "no encontrado".

**Validaciones.** El schema de Zod del login se usa en el formulario (feedback inmediato) y en la API (lo que realmente protege). Los filtros de la API también se validan.

**Diseño.** Los colores y fuentes están definidos como tokens en `globals.css`, con los mismos nombres que en Figma (`primary`, `surface-1`, `text-medium`, etc.). Algunas decisiones:

- La pantalla de detalle no estaba en el Figma, así que la armé con los mismos componentes y estilos del resto.
- El placeholder usa Rockwell, que es una fuente paga. Usé Roboto Slab, que ya está en el diseño (checkbox y botón) y es del mismo estilo.
- La descripción del botón dice radio 6px, pero en el diseño se ve como píldora. Seguí lo que se ve.
- "Subscripción" lo dejé como "Suscripción".
- Los íconos son de Material Symbols, la misma librería que usa el Figma.
- Los placeholders "Placeholder" los cambié por textos que ayudan a completar el campo.

## Qué mejoraría con más tiempo

- **Tests:** unitarios para validaciones y formateo, y e2e con Playwright para el login y la búsqueda.
- **Búsqueda sin acentos:** hoy buscar "jose" no encuentra "José". Se resuelve con la extensión `unaccent` de Postgres.
- **Paginación** o scroll infinito en Movimientos, para cuando haya muchos.
- **Filtros en la URL** (`?search=&type=`), para que se mantengan al volver desde el detalle o al compartir el link.
- **Rate limiting en el login**, para frenar intentos de fuerza bruta.
- **Notificaciones:** la campana de la Home está solo como parte del diseño.
- **Bases separadas** para desarrollo y producción (por ejemplo, con branches de Neon).
- **Tarjeta como modelo propio** en la base, para soportar más de una tarjeta por usuario.
