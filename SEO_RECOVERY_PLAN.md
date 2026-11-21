# SEO_RECOVERY_PLAN.md — Recuperar la indexación en Google

> Creado 2026-11-21. Situación: 212 URLs conocidas, 46 indexadas, 166 no indexadas, 0 clics desde el 5 de octubre.
> Diagnóstico: contenido plantilla casi duplicado + poca autoridad + sitemap con `lastmod` falso.
> Complementa a `SEO_MAINTENANCE.md` (rutina) — este documento es el plan de ataque.

---

## 0. Principio rector

Google no indexa "todo lo que hay en el sitemap", indexa lo que cree que merece ocupar espacio.
Un sitio nuevo con poca autoridad tiene un presupuesto pequeño. Estrategia:

1. **Indexar solo páginas con valor propio** (el resto `noindex, follow`, siguen siendo útiles para el usuario).
2. **Subir el valor propio** de cada página que se queda.
3. **Crear páginas de intención de búsqueda real** (topics, comparativas, guías).
4. **Ganar autoridad** (backlinks) para que Google confíe en el dominio.

## 1. Ya implementado (técnico)

- [x] Campo `indexable` en el esquema de assets (`velite.config.ts`). Override por frontmatter: `indexable: true|false`.
- [x] Sub-skills de suites (`claude-ads-*`, `claude-seo-*`, `data-analytics-*`) pasan a `noindex, follow` por defecto
  (88 páginas). Solo se indexan los padres: `claude-ads`, `claude-seo`, `data-analytics-skills`.
- [x] Las páginas `noindex` salen del `sitemap.xml` (de 212 a 124 URLs) y de `llms.txt`.
- [x] `lastModified` falso (`new Date()`) eliminado del sitemap. Solo fechas reales en blog/learn y home.
- [x] Los padres de suite listan sus sub-skills (enlazado interno); las sub-skills enlazan a su padre.
- [x] Título de ficha: `{Título} - {Claude Skill | MCP Server | ...}`; helper único `assetMeta()` en `lib/seo.ts`.

Pendiente de desplegar: subir a `preview`, probar, merge a `main`.

## 2. Semana 1 — Diagnóstico y despliegue

- [ ] Vercel → Settings → Environment Variables (Production): confirmar que **no** existen `SITE_GATE_USER` / `SITE_GATE_PASSWORD`.
- [ ] Search Console → Páginas: abrir cada uno de los 3 motivos de "no indexadas" y anotar los ejemplos aquí:
  - Motivo 1: ______  (esperado: "Rastreada: actualmente sin indexar")
  - Motivo 2: ______  (esperado: "Descubierta: actualmente sin indexar" o "Duplicada, Google eligió otra canónica")
  - Motivo 3: ______
- [ ] Inspección de URL → "Probar URL publicada" en 1 asset indexado y 1 no indexado: comparar HTML renderizado y canónica elegida por Google.
- [ ] Confirmar que `www`, `http` y `*.vercel.app` redirigen al dominio canónico.
- [ ] Desplegar los cambios, reenviar `sitemap.xml` en Search Console (debe mostrar ~124 URLs).
- [ ] Pedir indexación manual solo de las 5-10 mejores URLs (home, hubs de categoría, 3 artículos evergreen). No masivo.

## 3. Semanas 1-4 — Calidad de los assets

### 3.1 Estándar mínimo de una ficha indexable
Una ficha solo debe estar `indexable` si cumple **todo**:

- [ ] Algo que no esté en el README original: resultado de **tu prueba real** (qué ejecutaste, qué salió).
- [ ] Un **ejemplo de prompt y salida** concreto.
- [ ] "Cuándo usarlo / cuándo no" (2-4 líneas honestas).
- [ ] **Alternativas** con enlace interno a 2-3 assets similares.
- [ ] Datos frescos: estrellas, fecha de último commit del repo, licencia verificada.
- [ ] `verified: true` solo si lo has probado de verdad.

### 3.2 Prioridad de trabajo
| Grupo | Nº aprox. | Acción |
|---|---|---|
| Suites padre (`claude-ads`, `claude-seo`, `data-analytics-skills`) | 3 | Convertir en guías completas: para qué sirve cada sub-skill, flujo recomendado, ejemplo de auditoría real. Son las únicas páginas indexables de las 91 skills de las suites. |
| MCP servers (github, playwright, supabase, neon, context7...) | ~25 | Prioridad máxima: es lo que más se busca. Añadir config para Claude Code / Cursor / VS Code, errores comunes y alternativas. |
| Copilot agents (`github/awesome-copilot`) | ~38 | Son copias del repo. Mantener indexables solo los 10 que enriquezcas; resto `indexable: false` hasta que lo hagas. |
| Skills propias/verificadas (humanizer, frontend-design...) | ~10 | Ya son lo más fuerte. Añadir ejemplos antes/después. |
| 65 fichas `verified: false` restantes | — | Si en 4 semanas no las has probado ni enriquecido: `indexable: false`. |

Ritmo realista: **5 fichas enriquecidas por semana**. Calidad antes que cantidad.

### 3.3 Cambios de producto en la ficha (siguiente iteración)
- [ ] Campos opcionales en frontmatter: `testedWith`, `lastChecked`, `alternatives`, `exampleOutput`.
- [ ] Mostrar "Last checked: fecha" y "Last commit: fecha" (GitHub API en build, con caché).
- [ ] Sección FAQ por ficha (2-3 preguntas) con schema `FAQPage` solo si son reales.

## 4. Semanas 3-8 — Páginas de intención (lo que hacen los grandes)

Observado en mcpservers.org (≈9.800 servers): no se apoya en las fichas sueltas. Tiene
**hubs temáticos de alta intención** ("Browser Automation MCP", "RAG MCP", "OpenAPI MCP", "PDF MCP", "Remote MCP servers"),
categorías, un bloque de FAQ con preguntas reales, "Popular searches" como enlaces internos y marcas de oficial/patrocinado.
Esas páginas agregan valor propio (comparan, explican), reciben los enlaces internos y rankean por consultas con demanda.
Y lo que se infiere de cómo funcionan los grandes directorios:

- Autoridad enorme y años de backlinks (listas awesome, menciones, enlaces de los propios proyectos listados).
- Las fichas flojas no son la base del tráfico; lo son los hubs y las búsquedas de marca ("X mcp server").
- Datos estructurados y datos frescos propios (estrellas, tamaño, actualizaciones).
- Muchas de sus fichas tampoco están indexadas; no lo necesitan.

### 4.1 Qué construir
- [ ] Ruta `/topics/[slug]` con 8-10 hubs, cada uno con: intro original (300-500 palabras), tabla comparativa de 5-15 assets (para qué sirve cada uno, instalación, licencia, cuándo elegirlo), FAQ.
  Hubs candidatos: *MCP servers for databases*, *Browser automation MCP*, *MCP servers for GitHub workflows*, *Claude skills for SEO*, *Claude skills for marketing/ads*, *Claude skills for data analysis*, *Cursor rules for React/Next.js*, *Copilot agents for code review/TDD*, *Remote MCP servers*.
- [ ] Cada hub enlaza a sus assets y cada asset enlaza de vuelta a su hub.
- [ ] Bloque "Popular searches / topics" en la home y en los hubs de categoría.
- [ ] Dividir el sitemap por tipo (`sitemap index`: assets, topics, learn, blog) para ver en Search Console cuál se indexa mejor.

## 5. Blog y Learn

### 5.1 Auditoría de lo existente (24 artículos)
- Learn (8): evergreen, la base. Cada uno debe incluir: pasos verificados, capturas o salidas reales, errores comunes, FAQ, enlaces a 3-5 assets.
- Blog evergreen (≈10): `design-skills-for-ai-agents-2026`, `seo-skills-for-ai-agents-2026`, `prompt-engineering-examples-ai-agents`, `how-we-vet-a-skill...`, `why-a-curated-directory`. Mantener y reforzar con enlaces internos.
- Blog "noticia/ranking" (≈7): `claude-fable-5-1-model-ranking`, `gpt-6-astra-*`, `is-grok-really-more-powerful`, `chinese-ai-changing-the-game`, `deepseek-harness-the-future`.
  Todos vencidos (`reviewBy` 7-13 nov). Decisión por artículo: **refrescar de verdad** con datos y fuentes, **fusionar** en uno solo, o **`noindex`** si no puedes sostenerlo.
- [ ] Revisar con `npm run review:mark -- <slug> --changed` solo cuando el contenido haya cambiado de verdad.

### 5.2 Reglas para cada artículo nuevo
- Una consulta objetivo clara (sacada de Search Console, no inventada).
- Experiencia propia visible: lo que hiciste, capturas, resultados, errores.
- 3-5 enlaces internos a assets/hubs, y los assets relacionados enlazan de vuelta.
- Título con la intención ("How to install X in Cursor", "X vs Y", "Best MCP servers for Z").
- Autor real y fecha `updated` honesta.

### 5.3 Calendario (1-2 por semana, mezcla)
| Tipo | Ejemplos |
|---|---|
| Instalar / configurar | *How to install Playwright MCP in Claude Code / Cursor*, *Set up Supabase MCP* |
| Comparativas | *Skills vs MCP vs Cursor rules*, *Neon vs Supabase MCP* |
| Colecciones | *10 MCP servers I actually use*, *Claude skills for SEO audits* |
| Resultado real | *I ran claude-seo on my own site: what it found* (caso real, con tu GSC) |

## 6. Autoridad y señales externas

- [ ] Repo `awesome-claude-skills-mcp-servers`: topics en GitHub, README con enlace al directorio, PR a listas awesome existentes.
- [ ] Contactar a los autores de los repos listados con un enlace a su ficha (muchos añaden "Listed on…").
- [ ] Show HN / Product Hunt / Reddit (r/ClaudeAI, r/mcp, r/cursor), uno por semana, con valor (no solo enlace).
- [ ] Republicar 2-3 artículos en dev.to / Hashnode con `canonical` al sitio.
- [ ] Newsletter: usar la captura de emails ya existente para un envío mensual con novedades.
- [ ] Perfil en Search Console propiedad de dominio (no solo prefijo) + Bing Webmaster Tools (Bing alimenta a Copilot/ChatGPT search).

## 7. Medición

| KPI | Dónde | Ahora | Meta 30 días | Meta 90 días |
|---|---|---|---|---|
| URLs indexadas / URLs en sitemap | GSC → Páginas | 46 / 212 | ≥ 70 % de 124 | ≥ 85 % |
| Clics web (28 días) | GSC → Rendimiento | 0 | 20+ | 150+ |
| Impresiones | GSC | bajas | x3 | x10 |
| Consultas con posición 5-15 | GSC | — | listar | reforzar |
| Backlinks de dominios únicos | GSC → Enlaces | pocos | +10 | +30 |

Rutina: cada lunes anotar en el log de `SEO_MAINTENANCE.md` los 5 números de arriba.
**No reactivar** `indexable` de las sub-skills hasta que el resto del sitio supere el 70 % indexado.

## 8. Cronograma resumido

| Semana | Foco |
|---|---|
| 1 | Desplegar cambios técnicos, diagnóstico GSC, comprobar Vercel/redirecciones |
| 2-3 | Enriquecer 10 fichas (MCP + padres de suite), refrescar los 7 artículos vencidos |
| 3-4 | Construir `/topics` + 3 primeros hubs, sitemap por tipo |
| 5-8 | 5 hubs más, 1-2 artículos/semana, campaña de backlinks |
| 8-12 | Revisar GSC: expandir lo que rankea, `noindex` o fusionar lo que no |
