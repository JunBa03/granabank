# GranaBank

Mi resolución del challenge técnico de Club Atlético Lanús. Es una app con login, una home con el balance y los últimos movimientos, un listado con búsqueda y filtros, y el detalle de cada movimiento.

- **Deploy:** https://granabank-blond.vercel.app
- **Usuario de prueba:** `soygranate@clublanus.com` / `GRANATE1@`

## Stack

Next.js 16 con TypeScript, Tailwind para los estilos, PostgreSQL en Neon y Prisma como ORM. El backend son API routes de Next.

## Cómo correrlo

Hace falta Node 20.19 o superior y una base de PostgreSQL.

```bash
npm install
cp .env.example .env        # completar con la URL de la base y un SESSION_SECRET
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Y queda andando en http://localhost:3000.

## Decisiones que tomé

**Todo en un solo proyecto.** Como la consigna permitía usar las API routes de Next, preferí eso antes que armar un backend aparte. Para una app de este tamaño es más simple de mantener y de deployar.

**Montos en centavos.** Los guardo como enteros (`97885` en vez de `978.85`) para no tener problemas de redondeo con los decimales.

**Login y sesión.** La contraseña está hasheada con bcrypt y la sesión es un JWT firmado que va en una cookie `httpOnly`. Si tildás "Recordarme" dura 30 días, si no, se borra al cerrar el navegador. Si el login falla, el mensaje es el mismo para email o contraseña incorrectos, así no se puede averiguar qué usuarios existen.

**Rutas protegidas.** `proxy.ts` redirige al login si no hay sesión, pero además cada página y endpoint la vuelve a chequear. Y todas las consultas filtran por el usuario logueado, así que nadie puede ver movimientos de otro aunque tenga el id.

**Home en el servidor, búsqueda en el cliente.** La Home se arma en el servidor y llega lista. La pantalla de Movimientos consulta la API desde el navegador porque la búsqueda es en vivo. Le puse un debounce para no hacer un request por cada tecla, y cancelo los pedidos viejos para que no pisen a los nuevos.

**Estados.** Cada pantalla tiene su carga (skeleton), su error con botón para reintentar y su estado vacío. Para validar uso Zod, y el mismo schema del login sirve para el formulario y para la API.

**Sobre el diseño.** Los colores y las fuentes están como tokens con los mismos nombres que en Figma. Algunas cosas que decidí sobre la marcha:

- El Figma no tenía pantalla de detalle, así que la armé con los mismos componentes del resto.
- El placeholder usa Rockwell, que es paga, así que usé Roboto Slab, que ya aparece en otras partes del diseño.
- El botón dice radio 6px en la descripción pero se ve como píldora. Seguí lo que se ve.
- Corregí "Subscripción" por "Suscripción".

## Qué mejoraría con más tiempo

- Tests, sobre todo del login y de la búsqueda.
- Que la búsqueda ignore los acentos (hoy "jose" no encuentra "José").
- Paginación para cuando haya muchos movimientos.
- Guardar los filtros en la URL para no perderlos al volver del detalle.
- Rate limiting en el login.
- Separar la base de desarrollo de la de producción.
