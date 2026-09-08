# carlaprieto.com

Sitio en Jekyll, listo para GitHub Pages, con blog integrado y versión en inglés (default) y español (`/es/`).

## Publicarlo (una sola vez)

1. Crea un repositorio nuevo en GitHub, por ejemplo `carlaprieto-com` (puede ser privado o público, GitHub Pages funciona con ambos si tienes cuenta Pro; si es cuenta gratis, tiene que ser público).
2. Sube estos archivos a ese repositorio (arrastra la carpeta en la interfaz web de GitHub, o por línea de comandos: `git init`, `git add .`, `git commit -m "sitio inicial"`, `git remote add origin <url-del-repo>`, `git push -u origin main`).
3. En el repo, ve a Settings → Pages. En "Build and deployment", elige "Deploy from a branch", rama `main`, carpeta `/ (root)`. Guarda.
4. En la misma página, en "Custom domain" escribe `carlaprieto.com` y guarda (ya incluí el archivo `CNAME` con esto, pero GitHub lo confirma aquí).

## Apuntar tu dominio (esto es lo que cambia, dejas de usar el hosting de Canva)

Donde sea que administres el DNS de carlaprieto.com (esto puede ser Canva o el sitio donde compraste el dominio; si lo compraste a través de Canva, probablemente el DNS también se administra ahí), agrega estos registros:

- Cuatro registros **A** para `@` (el dominio raíz, carlaprieto.com) apuntando a:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- Un registro **CNAME** para `www` apuntando a `<tu-usuario-de-github>.github.io`

El cambio de DNS puede tardar desde minutos hasta unas horas en propagarse. Mientras tanto, tu sitio actual en Canva sigue funcionando, no hay tiempo muerto.

En GitHub Pages, activa "Enforce HTTPS" en Settings → Pages en cuanto el dominio verifique (aparece automáticamente ahí, puede tardar un rato).

## Ver cambios antes de publicar (opcional, necesita Ruby)

```
bundle exec jekyll serve
```

y abre `http://localhost:4000`.

## Estructura del sitio

- `/` y `/background/` y `/projects/` y `/blog/` — versión en inglés (default).
- `/es/`, `/es/background/`, `/es/projects/`, `/es/blog/` — versión en español, con el toggle EN/ES en la barra de navegación.
- Cada página tiene `lang`, `es_url` o `en_url` en su front matter para que el toggle apunte a la página correcta en el otro idioma. Si agregas una página nueva, agrega también su contraparte y esos campos.

## Agregar una entrada al blog

Crea un archivo nuevo en `_posts/` con el formato `AAAA-MM-DD-titulo.md`. Incluye `lang: en` o `lang: es` para que aparezca en la lista correcta:

```
---
layout: post
lang: en
title: "Your title"
date: 2026-10-01
tags: [Yoseph]
es_url: /es/blog/2026/10/01/tu-titulo/
---

Your content in markdown.
```

Súbelo al repo (commit + push) y GitHub Pages lo publica solo, no hay que tocar código. Si escribes la versión en español, crea un segundo archivo con `lang: es`, `permalink: /es/blog/...` y `en_url` apuntando de vuelta al post en inglés.

## Pendientes que dejé marcados en el sitio

- Foto: ya la puse (`assets/images/carla.jpg`), redimensionada y sin metadata EXIF.
- **Currículum**: el botón "Download Resume" en `/background/` apunta a `assets/resume.pdf`, que todavía no existe. Coloca tu PDF ahí con ese nombre exacto.
- `[years]` / `[años]` en Mi Trayectoria (US Bank, Amazon, fin de Spectrum Effect) — no tenía las fechas exactas.
- Links de LinkedIn y GitHub en el pie de página (footer), en las cuatro páginas en inglés y español, ahora mismo apuntan a `#`.
- Los cuatro posts del blog (2 en inglés, 2 en español) son de ejemplo, bórralos o reemplázalos cuando tengas los tuyos.
- Traducción de los dos posts de ejemplo: ya están en ambos idiomas, pero cuando escribas contenido real solo vas a tener la versión en el idioma en que lo escribas, la otra la traduces si quieres.
