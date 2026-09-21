# Repository Inventory and Distillation Decision Log

## Status

**Initial inventory and surface-reduction batches completed (2026-09-21).**

The repository is still intentionally larger than the target product. The
current product surface is now a focused Home composer with `deck` and `image`
entry points, plus a reduced New Project modal with `deck`, saved `template`,
and `image` tabs. Local Plugins/Skills/template tooling, project persistence,
preview, design systems, assets and export remain. Community/Marketplace pages,
Prototype sub-types, the docked composer and dead type-pill implementation are
removed. Shared daemon contracts, media providers and registry plumbing remain
until their reverse dependencies are mapped.

## Classification values

- `KEEP` — directly useful or required shared infrastructure.
- `ADAPT` — useful foundation that later becomes presentation-specific.
- `REMOVE` — proven unrelated and safe to remove.
- `UNKNOWN` — insufficient evidence; keep until investigated.

## Inventory table

| Area / feature family | User-visible purpose | Entry points | Main paths/packages | Shared/runtime dependencies | Classification | Rationale | Removal order / notes | Validation after change |
|---|---|---|---|---|---|---|---|---|
| Project/workspace shell | Core project creation, opening, and navigation | `apps/web/src/components/EntryShell.tsx`, project routes | `apps/web/`, `apps/daemon/src/projects.ts`, `packages/contracts/src/api/projects.ts` | daemon/IPC, contracts, persistence | KEEP | Required by every retained workflow and validated by web typecheck/tests. | Keep while feature families are removed behind the shell. | Web typecheck; create/open tests |
| File handling/persistence | Store/reopen projects, files, and assets | project/file routes and storage services | `apps/daemon/src/storage/`, `apps/daemon/src/routes/project/`, `packages/contracts/src/api/files.ts` | DB, filesystem, project watchers | KEEP | Required for editable artifacts and local-first work. | High-risk; map schema before changes. | Storage/project tests |
| Design systems | Store/select/use brand and template rules | design-system routes and project setup | `apps/daemon/src/design-systems/`, `packages/contracts/src/design-systems/` | project storage, skills, preview | ADAPT | Directly supports template understanding and corporate decks. | Preserve loaders/contracts; later simplify UI around presentation rules. | Design-system tests |
| Skills/agents/prompts | Versioned generation behavior | skills API, runtime registries, prompt files | `skills/`, `apps/daemon/src/skills/`, `apps/daemon/src/runtimes/`, `packages/plugin-runtime/` | registry, project scope, daemon | ADAPT | First-class future presentation/compiler assets; upstream catalog is broader than needed. | Keep infrastructure; prune unrelated catalog only after reference scan. | Skills/runtime tests |
| Image/media generation | Images/assets for slides | Home image entry and media routes | `apps/web/src/components/home-hero/`, `apps/daemon/src/media/`, image provider paths | files, providers, preview | ADAPT | Keep image generation/assets; video/audio are separate removal candidates. | Split by media type before implementation cleanup. | Home rail tests; image path |
| Preview/rendering | Visual review of generated work | project preview/render routes | `apps/web/`, `apps/daemon/src/live-artifacts/`, render/export services | files, sandbox, shared UI | KEEP | Review and audit depend on stable preview. | Do not replace renderer speculatively. | Preview/render tests |
| Local editing/regeneration | Refine generated results | project chat/actions and file operations | `apps/web/src/`, `apps/daemon/src/`, `packages/contracts/src/agent-tools/` | runtime, persistence, preview | ADAPT | Needed for locks, local repair, and exception-based review. | Preserve low-cost controls; remove only mode-specific branches. | File/chat runtime tests |
| History/undo/checkpoints | Recover/compare edits | project versions and history UI | `apps/daemon/src/project-file-versions.ts`, `apps/daemon/src/critique/conformance-history.ts` | storage, project state | ADAPT | Useful designer convenience if retained at low cost. | Verify actual user value before expanding. | Version/history tests |
| Export/serialization | Deliver editable artifacts | export routes and desktop export | `packages/contracts/src/api/export.ts`, `apps/daemon/src/*export*`, `apps/desktop/src/main/*export*` | renderer, filesystem, native shell | KEEP | Native/editable PPTX plus PDF/HTML is a core target. | Preserve shared export boundary; remove formats only with proof. | Export tests |
| Website generation | Generic website workflow | former Home chip and public gallery paths | legacy plugin/template/artifact paths; no active Home entry point | preview, skills, providers | REMOVE (surface removed) | Not part of the presentation compiler; Home no longer exposes a website mode or scaffold. | Keep shared preview/runtime until route and registry coupling is separately proven. | Home rail; web typecheck |
| Prototype/app generation | Generic app/prototype workflow | former Prototype chip and sub-type rail | Home chip catalog/sub-chip state removed; project/runtime contracts retained | preview, runtime, shared project model | REMOVE (surface removed) | Competing primary workflow; existing project/plugin data must remain readable. | Do not delete generic project contracts until persistence consumers are mapped. | Home rail; project-shell tests |
| Video | Video generation/editing | former Home media chip | media provider/model/template code remains shared/partially reachable | shared media, preview, export | REMOVE candidate (surface removed) | Not a Home entry point and not required for deck visuals; provider split is not yet proven. | Isolate image dependencies before package/provider deletion. | Image path; web typecheck |
| Audio | Audio generation/editing | former Home media chip | media provider/model code remains shared/partially reachable | shared media, preview | REMOVE candidate (surface removed) | Not a Home entry point and not required for the target workflow. | Preserve shared media contracts until dependency map is complete. | Image path; web typecheck |
| Marketplace/community | Browse/share/install content | Community navigation/page removed; `/community` and `/marketplace` compatibility to retained surfaces | `apps/web/` local Plugins/Skills/catalog/detail paths; registry protocol retained | local skills/templates, registry DB | REMOVE (public surface removed) / ADAPT (local catalog) | Public discovery/community is a competing product surface; local plugin management is useful for future presentation skills. | Keep plugin detail/source management and local template preview; remove remote/public page code only after route tests. | Navigation, route compatibility, plugin-detail tests |
| New Project modal | Secondary creation entry point | `NewProjectModal` / `NewProjectPanel` | `apps/web/src/components/NewProjectPanel.tsx`, project create contracts | project persistence, image provider, saved templates | ADAPT | Keep a compact deck/template/image setup surface; modal-specific prototype/live-artifact/video/audio tabs add competing workflows. | Visible tabs are limited to `deck`, `template`, and image-only `media`; legacy payload branches stay until daemon consumers are mapped. | `NewProjectPanel.test.tsx`, `NewProjectPanel.media.test.tsx`, web typecheck |
| Collaboration/roles | Team/multi-user workflow | collab routes/hooks and workspace bindings | `apps/daemon/src/collab/`, `apps/web/src/` collab hooks | auth, project storage, permissions | UNKNOWN | May be unrelated, but coupling to project ownership/session is not mapped. | Do not delete until auth/storage ownership is traced. | Auth/project tests |
| Mobile-specific surfaces | Mobile UX | responsive/layout branches and mobile templates | `apps/web/`, mobile-related templates/assets | shared UI | REMOVE candidate | No mobile output is in the canonical presentation target. | First prove branches are not shared desktop shell logic. | Desktop boot/layout tests |
| Integrations/MCP | External systems/tools | integrations/settings and provider registries | `apps/daemon/src/integrations/`, runtime/provider code | auth, skills, model registry | UNKNOWN | Some integrations may supply models/assets; no broad deletion yet. | Investigate individually; retain anything needed by image/design-system flow. | Provider/runtime tests |
| Telemetry/experiments | Analytics and experiments | observability/analytics wiring | `apps/daemon/src/observability/`, `packages/contracts/src/analytics/` | startup/config, persistence | UNKNOWN | May be operationally coupled; not needed to define product surface. | Audit startup and privacy/config coupling before removal. | Boot and daemon tests |
| Examples/templates/demos | Seed content and rendering examples | design-template registry and Home cards | `design-templates/`, `apps/web/public/`, skills catalog | skill/runtime registry, tests | ADAPT | Keep deck/image and design-system examples; remove unrelated catalog after reference scan. | Catalog cleanup follows surface and dependency mapping. | Template/registry tests |
| Shared UI | Common primitives | imported throughout web | `packages/components/`, `apps/web/src/components/` | every visible flow | KEEP | High-risk shared infrastructure; components build/typecheck successfully. | Never classify by name only. | Components build; web typecheck |
| Common types/schemas | Cross-package contracts | package imports and API boundaries | `packages/contracts/`, `packages/host/`, `packages/platform/` | all apps/packages | KEEP | Required to keep workspace buildable and data-compatible. | Remove only proven-dead contracts. | Package builds; web typecheck |
| DB/schema/migrations | Persistence contracts | daemon startup and migration runner | `apps/daemon/src/db.ts`, `apps/daemon/src/storage/`, `apps/daemon/src/migration/` | project/file/collab state | KEEP | High-risk foundation for existing projects and future template reuse. | Map consumers and migrations before any change. | DB/storage tests |
| Build/test/release tooling | Repo operability | pnpm workspace scripts and CI | `package.json`, `pnpm-workspace.yaml`, `.github/`, package configs | every package | KEEP | Needed to validate each reversible removal batch. | Clean last, after retained workspace is stable. | install/typecheck/tests |

## How to complete inventory

For every major application/package/feature:

1. Determine actual behavior from code/routes, not only docs.
2. Find all user-facing entry points.
3. Find imports into and out of the area.
4. Search runtime registration, manifests, provider/plugin registries, dynamic imports, and config references.
5. Note persistence/schema coupling.
6. Note build/test coupling.
7. Assign KEEP/ADAPT/REMOVE/UNKNOWN.
8. Record evidence in rationale/notes.
9. For REMOVE, write safe removal sequence before deleting.
10. Define area-specific validation.

## Repository map

### Applications

- `apps/web` — primary browser/desktop-facing workspace, Home/create rail, project shell, preview, and tests.
- `apps/daemon` — local runtime, project/file storage, routes, skills, media, render/export, and background boundaries.
- `apps/desktop` / `apps/packaged` — native shell and packaging/export integration; retain until export/boot coupling is mapped.

### Packages/libraries

- `packages/contracts` — cross-app API, state, analytics, and design-system schemas.
- `packages/components` — shared UI component library.
- `packages/platform`, `packages/sidecar`, `packages/host` — process/runtime and host boundaries required by the workspace.
- `packages/plugin-runtime`, `packages/registry-protocol`, `packages/download` — skill/registry plumbing; candidate for later narrowing, not yet proven removable.

### Runtime/background boundaries

- Web communicates with the daemon through contracts/API routes; daemon owns local project state and generation orchestration.
- `packages/platform` and `packages/sidecar` provide process lifecycle and IPC-adjacent runtime support; keep while generation shell is retained.

### Persistence/data layer

- Project/database/storage/migration paths are under `apps/daemon/src/{db.ts,storage,migration,projects*}`.
- Project files and versions are separate from the UI and must remain compatible while modes are removed.

### Rendering/export layer

- Preview/live-artifact rendering is split across `apps/web`, `apps/daemon/src/live-artifacts/`, and artifact/export routes.
- PDF/HTML/PPTX-related boundaries exist in `apps/daemon/src/*export*`, `apps/desktop/src/main/*export*`, and `packages/contracts/src/api/export.ts`.

### Skills/prompts/design-system assets

- Functional skills live in `skills/`; renderable examples/templates live in `design-templates/`.
- Runtime discovery and install behavior live in `apps/daemon/src/skills/`, `packages/plugin-runtime/`, and registry code.
- The canonical target keeps presentation, image, design-system, audit, and export-relevant assets; unrelated catalog entries are cleanup candidates.

## Retained smoke-test commands

Do not invent commands. Discover actual repository scripts/configuration and record commands that work.

- Install/setup: `COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack pnpm install --frozen-lockfile`
- Typecheck: `corepack pnpm --filter @open-design/web typecheck`
- Targeted Home tests: `corepack pnpm --filter @open-design/web exec vitest run -c vitest.config.ts --maxWorkers=2 tests/components/HomeHero.rail.test.tsx tests/components/HomeHero.scenario-cards.test.tsx tests/components/home-hero/TemplatePicker.test.tsx tests/home-hero-placeholder-scenarios.test.ts tests/components/HomeView.prefill.test.tsx tests/components/HomeView.chip-restore.test.tsx`
- Package build prerequisites used in this workspace: `corepack pnpm --filter @open-design/platform build`, `corepack pnpm --filter @open-design/sidecar-proto build`, `corepack pnpm --filter @open-design/sidecar build`, `corepack pnpm --filter @open-design/host build`, `corepack pnpm --filter @open-design/contracts build`, `corepack pnpm --filter @open-design/release build`, and `corepack pnpm exec tsc -p tsconfig.json --emitDeclarationOnly` in `packages/components`.
- Full build/lint/E2E: not yet established for this distillation batch; discover before relying on them.

## Baseline known failures

- A clean install with `--ignore-scripts` does not generate all workspace `dist` artifacts; dependent typechecks then report missing internal packages. Building the required local packages restores `@open-design/web` typecheck.
- The sandboxed `pnpm`/`tsx` IPC path can fail with an `EPERM` pipe error for some package build scripts. Direct `node --import tsx ...` plus the package `tsc --emitDeclarationOnly` step is the safe local workaround; no source failure was observed in the affected packages.
- No claim of a clean full-repository build, lint, or E2E baseline has been made yet.
- The full web test command still reports an unrelated `ProductionCampaignModal` poll/retry failure in the existing suite. All 24 directly changed test files pass (`224/224`), and the web typecheck plus diff whitespace check pass.
- `corepack pnpm --filter @open-design/web build` is blocked before compilation because the sandboxed Node runtime cannot call `uv_interface_addresses` while loading `next.config.ts`; this is an environment/network-interface failure, not a source diagnostic.

## Decision log

Format: `YYYY-MM-DD — Area — Decision — Evidence/reason — Commit`

- 2026-09-21 — Repository-wide — No implementation removed. Canonical product/distillation instructions reset before cleanup so future work follows one target and one safe-removal protocol. — Initial instruction-reset commit.
- 2026-09-21 — Home/create surface — ADAPT/REMOVE — Home catalog now contains only `deck` and `image`; placeholder rotation, scenario art, labels, active-state persistence and tests follow the same boundary. Prototype/document/video/audio/WebGL/live-artifact chips and the docked second composer were removed; image generation remains as the asset path for presentations. Evidence: `apps/web/src/components/home-hero/chips.ts`, `HomeHero.tsx`, `HomeView.tsx`, `placeholderScenarios.ts`, and targeted Home tests. — Pending distillation commit.
- 2026-09-21 — Public discovery surfaces — REMOVE/ADAPT — Community gallery and standalone Marketplace page were removed together with their exclusive tests/styles. `/community` and `/marketplace` remain compatibility aliases into Home/local Plugins so old links do not crash; plugin details, local source management and lightweight template preview remain. Evidence: `router.ts`, `App.tsx`, `EntryNavRail.tsx`, `EntryShell.tsx`, `WorkspaceTabsBar.tsx`, and route/plugin-detail tests. — Pending distillation commit.
- 2026-09-21 — Home implementation cleanup — REMOVE — Deleted Prototype sub-chip state, legacy `mobile/wireframe` restoration, Website-clone scaffold, TypePillRow, dead type-pill CSS and exclusive tests. Retained general project/plugin/media contracts because their reverse dependencies still include existing projects and future presentation assets. — Pending distillation commit.
- 2026-09-21 — Secondary create surface — ADAPT/REMOVE — New Project modal now exposes only deck, saved template, and image tabs; prototype/live-artifact/other and video/audio selector UI are hidden while compatible payload code remains. Evidence: visible-tab constants, normalized legacy initial tabs, and passing modal/provider tests. — Pending distillation commit.

## Open questions

Resolve from the repository, not assumption:

- Which remaining navigation/routes expose prototype, website, video/audio, marketplace, or community flows outside Home?
- Which media abstractions are shared by image/audio/video, and can image be isolated without breaking assets/preview?
- Which design-system/template concepts are persisted and where are deck-relevant layouts/assets registered?
- Which renderer/export pieces can be reused for editable PPTX/PDF/HTML presentations?
- Which marketplace/plugin mechanisms are also used by local built-in skills?
- Which shared UI components and daemon routes are coupled to unrelated product modes?
- Which collaboration, telemetry, integrations, and mobile branches can be removed after proving they are not shell dependencies?
