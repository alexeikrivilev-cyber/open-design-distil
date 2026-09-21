# Repository Inventory and Distillation Decision Log

## Status

**Inventory not yet completed.**

This file exists before destructive distillation so future agents do not delete repository areas based on names or assumptions. Before removing implementation, inspect the area, map dependencies, replace `UNKNOWN` with an evidence-backed classification, and record the decision.

## Classification values

- `KEEP` — directly useful or required shared infrastructure.
- `ADAPT` — useful foundation that later becomes presentation-specific.
- `REMOVE` — proven unrelated and safe to remove.
- `UNKNOWN` — insufficient evidence; keep until investigated.

## Inventory table

| Area / feature family | User-visible purpose | Entry points | Main paths/packages | Shared/runtime dependencies | Classification | Rationale | Removal order / notes | Validation after change |
|---|---|---|---|---|---|---|---|---|
| Project/workspace shell | Core project experience | TBD | TBD | TBD | UNKNOWN | Strong KEEP/ADAPT candidate; mapping required | Inspect first | Boot, create/open project |
| File handling/persistence | Store/reopen files/assets | TBD | TBD | TBD | UNKNOWN | Likely foundational | High-risk | Persist/reopen |
| Design systems | Store/select/use design rules | TBD | TBD | TBD | UNKNOWN | Strong KEEP/ADAPT candidate | Inspect data model/loaders | Design-system flow |
| Skills/agents/prompts | Versioned generation behavior | TBD | TBD | TBD | UNKNOWN | Strong KEEP/ADAPT candidate | Identify registries/loaders | Generation shell |
| Image/media generation | Images/assets | TBD | TBD | TBD | UNKNOWN | Keep image capability; split other media after analysis | Inspect per media type | Image/assets flow |
| Preview/rendering | Visual preview | TBD | TBD | TBD | UNKNOWN | Likely useful | Trace renderer deps | Preview works |
| Local editing/regeneration | Refine generated result | TBD | TBD | TBD | UNKNOWN | Presentation-adjacent convenience | Keep low-cost controls | Local edit flow |
| History/undo/checkpoints | Recover/compare edits | TBD | TBD | TBD | UNKNOWN | Nice-to-have if stable/cheap | Inspect footprint | History if retained |
| Export/serialization | Download artifacts | TBD | TBD | TBD | UNKNOWN | Potential future foundation | High-risk shared layer | Existing export |
| Website generation | Generic website workflow | TBD | TBD | TBD | UNKNOWN | Candidate REMOVE after proof | Remove entry first | Retained flows/no dead routes |
| Prototype/app generation | Generic app/prototype workflow | TBD | TBD | TBD | UNKNOWN | Candidate REMOVE after proof | Remove entry first | Retained flows/no dead routes |
| Video | Video generation/editing | TBD | TBD | TBD | UNKNOWN | Candidate REMOVE | Separate from shared media first | Image path still works |
| Audio | Audio generation/editing | TBD | TBD | TBD | UNKNOWN | Candidate REMOVE | Separate from shared media first | Image path still works |
| Marketplace/community | Browse/share/install content | TBD | TBD | TBD | UNKNOWN | Candidate REMOVE | Check local registry reuse | Local skills/templates work |
| Collaboration/roles | Team/multi-user workflow | TBD | TBD | TBD | UNKNOWN | Candidate REMOVE unless shell needs it | Check auth coupling | App/session works |
| Mobile-specific surfaces | Mobile UX | TBD | TBD | TBD | UNKNOWN | Candidate REMOVE if isolated | Inspect shared responsive UI | Desktop unaffected |
| Integrations/MCP | External systems/tools | TBD | TBD | TBD | UNKNOWN | Keep only when needed | Inspect one at a time | Core unaffected |
| Telemetry/experiments | Analytics/experiments | TBD | TBD | TBD | UNKNOWN | Candidate REMOVE if non-foundational | Check startup/config coupling | Boot/build |
| Examples/templates/demos | Upstream samples | TBD | TBD | TBD | UNKNOWN | Keep presentation-relevant only | Trace references | Build/tests/docs links |
| Shared UI | Common primitives | TBD | TBD | TBD | UNKNOWN | High-risk shared infrastructure | Never classify by name only | Retained UI |
| Common types/schemas | Cross-package contracts | TBD | TBD | TBD | UNKNOWN | High-risk shared infrastructure | Remove only proven-dead | Typecheck/build |
| DB/schema/migrations | Persistence contracts | TBD | TBD | TBD | UNKNOWN | High-risk shared infrastructure | Map consumers | Existing data loads |
| Build/test/release tooling | Repo operability | TBD | TBD | TBD | UNKNOWN | Preserve until workspace understood | Clean last | Clean setup/build/test |

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

Populate after actual inspection.

### Applications

- TBD

### Packages/libraries

- TBD

### Runtime/background boundaries

- TBD

### Persistence/data layer

- TBD

### Rendering/export layer

- TBD

### Skills/prompts/design-system assets

- TBD

## Retained smoke-test commands

Do not invent commands. Discover actual repository scripts/configuration and record commands that work.

- Install/setup: TBD
- Typecheck: TBD
- Build: TBD
- Lint: TBD
- Unit tests: TBD
- Integration/E2E tests: TBD
- Primary app start: TBD

## Baseline known failures

- None recorded yet. Baseline has not been established.

## Decision log

Format: `YYYY-MM-DD — Area — Decision — Evidence/reason — Commit`

- 2026-09-21 — Repository-wide — No implementation removed. Canonical product/distillation instructions reset before cleanup so future work follows one target and one safe-removal protocol. — Initial instruction-reset commit.

## Open questions

Resolve from the repository, not assumption:

- Which OpenDesign daemon/runtime boundaries are required by the retained project shell?
- Which media abstractions are shared by image/audio/video?
- Which design-system/template concepts are persisted and where?
- Which renderer/export pieces can be reused for presentations?
- Which marketplace/plugin mechanisms are also used for local built-in skills?
- Which shared UI components are coupled to unrelated product modes?