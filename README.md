# TimeCup League — Landing

Sitio web público de [TimeCup League](https://timecupleague.com), la liga de Cross Training online y presencial. Temporadas de 3 meses, formato por parejas, 4 jornadas online y 1 jornada presencial.

Este repositorio contiene la landing, las bases de la liga, las páginas legales y algunas pantallas auxiliares de cuenta (confirmación de email, cambio de contraseña y baja).

## Stack

- [Astro](https://astro.build) 6
- [React](https://react.dev) 19 (islas para formularios interactivos)
- TypeScript
- [Supabase JS](https://supabase.com/docs/reference/javascript) (cambio de contraseña)
- [Swiper](https://swiperjs.com) (galería y encuesta)

Requisito: **Node.js >= 22.12.0**

## Empezar

```sh
npm install
npm run dev
```

El servidor de desarrollo queda en `http://localhost:4321`.

### Variables de entorno

Crea un archivo `.env` en la raíz (está en `.gitignore`). Solo hace falta para el flujo de cambio de contraseña:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

Usa la URL del proyecto y la **anon/public key** de Supabase. No uses service role ni otras claves privadas.

El resto de páginas se pueden desarrollar y construir sin estas variables.

## Scripts

| Comando                | Qué hace                         |
| :--------------------- | :------------------------------- |
| `npm run dev`          | Servidor de desarrollo           |
| `npm run build`        | Build de producción en `./dist/` |
| `npm run preview`      | Previsualiza el build local      |
| `npm run lint`         | ESLint                           |
| `npm run lint:fix`     | ESLint con autocorrección        |
| `npm run format`       | Prettier                         |
| `npm run format:check` | Comprueba el formato (CI)        |
| `npm run type-check`   | TypeScript (`tsc --noEmit`)      |

## Páginas

| Ruta                   | Contenido                             |
| :--------------------- | :------------------------------------ |
| `/`                    | Landing principal                     |
| `/bases`               | Bases de la liga                      |
| `/condiciones`         | Condiciones de uso                    |
| `/politica-privacidad` | Política de privacidad                |
| `/encuesta`            | Encuesta                              |
| `/change-password`     | Cambio de contraseña (Supabase)       |
| `/email-confirmado`    | Callback de confirmación de email     |
| `/eliminar-cuenta`     | Instrucciones para eliminar la cuenta |

## Estructura

```text
/
├── public/                 # Assets estáticos (imágenes, vídeo, favicon)
├── src/
│   ├── components/         # Secciones de la landing, UI y encuesta
│   ├── layouts/            # Layout HTML compartido
│   ├── pages/              # Rutas (file-based routing de Astro)
│   ├── scripts/            # Scripts de cliente (p. ej. confirmación de email)
│   └── styles/             # CSS global
├── astro.config.mjs
└── package.json
```

## Ramas y despliegue

- `develop`: integración. El CI corre lint, formato, types y build.
- `main`: producción.
- Las features van contra `develop` (`feature/...`).

El deploy lo gestiona Vercel: `develop` a staging y `main` a producción.

Hay workflows de release (minor/major) y hotfix en `.github/workflows`. Se lanzan a mano desde GitHub Actions.

## Contribuir

1. Crea una rama desde `develop`.
2. Abre un PR hacia `develop`.
3. El CI tiene que pasar (`lint`, `format:check`, `type-check`, `build`).
