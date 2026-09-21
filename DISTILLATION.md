# Safe Distillation Plan

## Objective

Distill the current OpenDesign fork into a small, stable, comprehensible foundation for the presentation product in `CONTEXT.md`.

Success is not the maximum number of deleted files. Success is removing unrelated product complexity **without breaking useful retained foundations**.

## Current phase

We are in repository distillation. **Do not implement the new presentation pipeline yet.**

The first reversible surface-reduction batch is complete: the default Home/create rail now exposes `deck` and `image` only. Legacy prototype/document/video/audio/WebGL/live-artifact and plugin/Figma implementations are intentionally still present behind compatibility paths. Treat them as mapped removal candidates, not as active product scope, until their reverse dependencies and persistence coupling are proven.

The next batch must inspect remaining navigation/routes and catalog registries, then remove one unrelated family at a time. Do not turn the temporary compatibility retention into a permanent second product.

Correct order:

1. Reset canonical instructions/product context.
2. Inventory the repository.
3. Map dependencies and classify features.
4. Remove unrelated product surfaces safely.
5. Remove proven-dead implementation/dependencies.
6. Stabilize the minimal foundation.
7. Begin presentation-specific implementation only after that.

## Phase 0 — Canonical reset

Canonical documents are:

- `AGENTS.md`
- `CONTEXT.md`
- `DISTILLATION.md`
- `INVENTORY.md`

Agent-specific pointer files should point here instead of carrying competing product instructions.

Phase 0 changes documentation/instructions only.

## Phase 1 — Full repository inventory

Before destructive cleanup, inspect at least:

- applications and entry points;
- routes/navigation;
- packages/libraries;
- feature registries;
- providers/model/media abstractions;
- skills/agents/prompts;
- design systems/templates/examples;
- persistence/database/schema/migrations;
- background/daemon/IPC boundaries;
- files/assets;
- rendering/preview;
- export paths;
- auth/session requirements;
- telemetry/experiments;
- external integrations/MCP;
- build/test/release tooling.

For each area record in `INVENTORY.md`:

- user-visible purpose;
- entry points;
- main paths/packages;
- direct/reverse dependencies;
- dynamic registration;
- persistence/build coupling;
- classification: KEEP / ADAPT / REMOVE / UNKNOWN;
- rationale;
- safe removal order if applicable;
- validation after change.

Never classify from folder names alone.

## Phase 2 — Product-surface reduction

Remove/hide unrelated user-facing feature families one at a time.

Likely investigation targets:

- video;
- audio;
- website generation;
- generic app/prototype generation;
- marketplace/community/discovery;
- unrelated artifact modes;
- irrelevant integrations;
- mobile-only surfaces;
- irrelevant examples/templates/demos.

For each family:

1. Find all user entry points.
2. Remove/hide the entry points.
3. Verify retained navigation/core flows.
4. Only then proceed to implementation cleanup.

This creates safe checkpoints and isolates regressions.

## Phase 3 — Unreachable implementation cleanup

After a feature is unreachable and mapped:

1. Remove feature-specific wiring/registrations.
2. Verify.
3. Remove implementation modules proven unused.
4. Verify.
5. Remove packages/dependencies proven unused.
6. Verify.
7. Remove dead tests/assets/config only when exclusive to the removed feature.

Do not combine unrelated feature families in one destructive commit.

## Phase 4 — Minimal-foundation stabilization

After scope reduction:

- remove dead navigation;
- remove stale flags/config;
- remove dead types only with proof;
- ensure build/test scripts reflect the retained workspace;
- document remaining apps/packages and their roles;
- document intentionally retained technical debt;
- verify clean setup from scratch where practical.

The codebase should become understandable without learning every upstream OpenDesign product mode.

## Phase 5 — Presentation implementation

Only then add new presentation-specific code. Intended order:

1. Template understanding / presentation design-system extraction.
2. Content understanding / outline / deck planning.
3. Layout and visual-type planning under template constraints.
4. Native rendering/export foundations.
5. Per-slide A/B/C candidates.
6. Per-visual-slot candidates.
7. Lock/local-regeneration semantics.
8. Deterministic audit.
9. Contextual audit.
10. Selective repair and preflight.
11. Offline benchmark/skill-improvement loop.

The exact implementation order may be refined after inventory, but responsibility boundaries remain.

## Classification semantics

### KEEP

Directly useful or required shared infrastructure. Do not remove during scope distillation.

### ADAPT

Useful foundation that later needs presentation-specific behavior.

### REMOVE

Proven unrelated and not required by retained infrastructure. Requires dependency evidence.

### UNKNOWN

Insufficient evidence. Keep and investigate. UNKNOWN is not a softer REMOVE.

## Pleasant designer extras rule

A nice-to-have OpenDesign feature may survive when all are true:

- directly helps presentation creation/review/editing;
- already stable;
- does not create a competing primary workflow;
- maintenance/dependency footprint is small;
- does not make the distilled product harder to understand.

Evaluate rather than assume: preview controls, asset browsing, undo/history, local edit controls, design-system inspection.

## High-risk areas — never blind-delete

Treat as high-risk until mapped:

- project persistence/file stores;
- auth/session plumbing needed by core flows;
- shared UI/component libraries;
- routing/layout scaffolding;
- common schemas/types;
- database migrations;
- model/provider registries;
- daemon/background runtime boundaries;
- IPC/RPC contracts;
- serialization/export libraries;
- common rendering utilities;
- workspace/package-manager config;
- build/release/test tooling;
- environment config.

They may eventually be removed, but only with evidence.

## Removal batch checklist

### Before

- [ ] Feature is inventoried.
- [ ] Classification is documented.
- [ ] User entry points are known.
- [ ] Direct dependencies are known.
- [ ] Reverse dependencies are known or bounded.
- [ ] Dynamic registrations/configs are checked.
- [ ] Retained flows at risk are listed.
- [ ] Commit scope is narrow.

### During

- [ ] No unrelated formatting/refactors.
- [ ] No speculative replacement architecture.
- [ ] Shared abstractions preserved unless proven feature-specific.
- [ ] Licenses/attribution preserved.

### After

Use repository-native commands discovered during inventory.

- [ ] Dependency graph/install valid.
- [ ] Relevant typecheck/build passes or failure is documented as pre-existing.
- [ ] Relevant tests pass.
- [ ] Main app boots.
- [ ] Retained navigation works.
- [ ] Project create/open works if present.
- [ ] Generation shell works if retained.
- [ ] Design-system flow works if retained.
- [ ] Image/assets flow needed for presentations works.
- [ ] Preview/rendering works.
- [ ] Persistence works.
- [ ] Relevant export works if present.
- [ ] No dangling route/import/registration/config remains.
- [ ] `INVENTORY.md` decision log updated.

## Baseline smoke-test contract

Exact commands must be discovered from the repo, but retained foundations should ultimately prove:

1. App starts.
2. Project/workspace can be created/opened.
3. Project files persist/reopen.
4. Design-system path works.
5. Core generation interaction shell works.
6. Image/assets path required for presentations works.
7. Preview/rendering works.
8. Existing relevant export works.
9. Removed features have no dead UI entry points.
10. Retained routes do not fail because shared dependencies were removed.

## Stop and restore conditions

Restore/revert a removal batch and investigate if:

- app no longer boots;
- retained smoke test regresses;
- removal unexpectedly requires broad architectural rewrite;
- apparently feature-specific code turns out to be shared infrastructure;
- dynamic registries prevent confident reachability analysis;
- schema/migration compatibility is uncertain;
- diff becomes too broad to review safely.

Do not keep deleting in the hope later cleanup will fix the system.

## Git discipline

- Keep removal commits narrow/descriptive.
- Prefer one feature family per commit.
- Do not combine dependency upgrades with removals unless strictly required.
- Avoid bulk formatting.
- Preserve bisectable history.
- Record meaningful decisions in `INVENTORY.md`.

## What should survive

Intentionally preserve a base for:

- desktop/web workspace;
- project lifecycle/persistence;
- files/assets;
- design systems;
- skills/prompts/agents as versioned artifacts;
- image generation/media abstraction needed for presentations;
- preview/rendering;
- local editing/regeneration primitives;
- useful lightweight history/undo;
- shared UI components;
- relevant export foundations.

Actual paths/packages must be discovered in inventory.

## What should not define the distilled product

The retained product must not primarily be a website builder, app/prototype generator, video/audio studio, marketplace/community, generic artifact playground, or complex collaborative design platform.

If such code temporarily remains because safe removal is expensive, document it as technical debt rather than target scope.

## Exit criteria

The repository is ready for presentation work when:

- major product areas are inventoried;
- unrelated primary navigation/workflows are removed;
- dead implementation from removed flows is cleaned where safe;
- retained designer conveniences are intentional;
- shared infrastructure is documented;
- setup/build/boot is stable;
- retained smoke tests pass;
- obvious dangling feature registrations are gone;
- the remaining codebase is materially easier to understand;
- presentation work can begin without simultaneous broad unrelated cleanup.

At that point update this document with the actual retained architecture before Phase 5.
