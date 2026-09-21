# Open Design Distil — Canonical Agent Instructions

## Status

This file is the canonical operating contract for agents working in this fork.

This repository began as a fork of OpenDesign. Upstream OpenDesign instructions, roadmaps, examples, and feature priorities are background reference only. They do not override this file, `CONTEXT.md`, `DISTILLATION.md`, or `INVENTORY.md`.

Current phase: **safe distillation and stabilization**. Do not build the new presentation pipeline yet. First understand the repository, remove unrelated product surface safely, and leave a small working foundation.

## Read first

Before changing anything:

1. Read `AGENTS.md`.
2. Read `CONTEXT.md` for canonical product logic.
3. Read `DISTILLATION.md` for the mandatory removal process.
4. Read `INVENTORY.md` for current classifications and decisions.
5. Then inspect local/module docs relevant to the files being changed.

If another repository document conflicts with these canonical files, follow the canonical files unless the user explicitly instructs otherwise.

## Mission

Distill OpenDesign into the smallest reliable foundation for a corporate presentation generator while retaining low-cost designer conveniences that materially improve presentation work.

The target is not a generic OpenDesign clone, universal visual editor, website/prototype builder, video/audio studio, community marketplace, or PowerPoint replacement.

The future product is a presentation compiler with guided generative editing:

`PPTX template + content pack + brief -> template understanding -> presentation design system -> deck outline -> slide planning -> constrained layout/visual selection -> 3 slide variants -> 3 candidates per visual slot -> recommended defaults -> locks/local edits -> audit -> selective repair -> preflight -> editable PPTX/PDF/HTML`

## Golden rules

### Preserve a working system while shrinking scope

Distillation is not a rewrite. Prefer removing or hiding unrelated functionality over replacing working infrastructure.

After every removal batch, retained flows must still build, boot, and work.

### Do not rewrite working upstream code without a concrete reason

If an OpenDesign component works, is reusable, and supports the target presentation workflow, keep it until presentation-specific requirements justify adaptation or replacement.

### Map dependencies before deleting

Never delete a directory, package, route, provider, runtime, schema, migration, shared component, or configuration merely because its name looks unrelated.

Before deletion:

- identify user-visible entry points;
- identify imports and reverse dependencies;
- inspect runtime registration and dynamic loading;
- inspect persistence/schema coupling;
- inspect build/test coupling;
- classify the area in `INVENTORY.md`.

If dependency ownership is unclear, classify the area as `UNKNOWN` and keep it temporarily.

### Remove product surface before implementation internals

Preferred sequence:

1. Remove/hide unrelated navigation and entry points.
2. Verify retained flows.
3. Remove now-unreachable feature wiring.
4. Verify again.
5. Remove implementation proven unreachable.
6. Remove dead dependencies/config/tests/assets only after proof.

### Small reversible batches

Use one coherent feature family per removal commit whenever practical. Do not combine feature deletion with unrelated formatting, refactors, upgrades, or cleanup.

### Preserve shared infrastructure

Be conservative around components likely to support the future presentation product:

- project/workspace lifecycle;
- file upload/download and persistence;
- design-system storage/selection;
- skills/agents and prompt/config loading;
- image/media-provider abstraction needed for presentation images;
- preview/rendering;
- local editing/regeneration primitives;
- history/undo/checkpoints if already stable;
- shared UI primitives;
- serialization/export foundations;
- backend/daemon/IPC boundaries used by retained flows;
- auth/session plumbing if required for the app;
- common types, schemas, migrations, build and test infrastructure.

Shared infrastructure can look generic while still being essential. Trace it first.

### Preserve licenses and attribution

Keep required LICENSE/NOTICE/attribution material and the OpenDesign lineage of retained or adapted code.

### Prompts and skills are first-class product assets

Prompts, skill instructions, agent configs, examples, and policies must remain explicit, versionable files rather than hidden strings scattered through application code.

### Separate runtime from offline optimization

The runtime must remain reproducible without a frontier teacher model. A stronger model may be used offline during R&D to critique outputs and improve skills/prompts, but it is never a runtime dependency.

### Do not overbuild

This is a focused hackathon product. Do not add infrastructure for hypothetical enterprise requirements unless it directly enables the presentation workflow.

## Classification policy

Every area eventually receives one classification:

- `KEEP` — directly useful or required shared infrastructure.
- `ADAPT` — useful foundation that later becomes presentation-specific.
- `REMOVE` — unrelated and proven unnecessary for retained flows.
- `UNKNOWN` — insufficient evidence; keep until investigated.

`REMOVE` must be evidence-backed, not guessed.

## Likely KEEP / ADAPT candidates

These are product-level candidates, not path-level assumptions:

- desktop/web project shell;
- workspace/project model;
- file handling and persistence;
- design-system concepts/storage;
- skills/agents infrastructure and versioning;
- prompt/config loading;
- image generation/media pieces needed for presentation images;
- preview/rendering;
- assets;
- local regeneration/editing;
- useful history/undo/checkpoints;
- relevant export/serialization primitives;
- shared UI required by retained flows.

## Likely REMOVE candidates after proof

Investigate for removal, but never delete blindly:

- audio generation;
- video generation;
- website generation;
- generic app/prototype generation;
- unrelated artifact modes;
- marketplace/community/discovery;
- irrelevant runtimes/providers/integrations;
- unrelated templates/examples/demos;
- collaboration/roles/permissions not needed for the hackathon flow;
- mobile-only product surfaces;
- unrelated import/export formats;
- irrelevant MCP/integration surfaces;
- obsolete experiments/telemetry that are not foundational.

## Pleasant designer extras

A non-essential feature may remain when all are true:

1. It directly improves presentation creation, review, or editing.
2. It does not create a competing primary workflow.
3. It has low maintenance and dependency cost.
4. It does not materially complicate build/runtime behavior.
5. It already works or is nearly free to retain.

Examples to evaluate include useful preview controls, asset browsing, history, small local editing actions, and design-system inspection.

## Current-phase prohibition

Until the relevant repository areas are inventoried and the foundation is stable:

- do not implement the new PPTX parser;
- do not implement a new presentation planner;
- do not implement new slide-generation logic;
- do not implement the new audit engine;
- do not replace renderer/export infrastructure speculatively;
- do not add large new dependencies for future functionality.

Allowed now: documentation, repository inventory, dependency mapping, safe product-surface removal, proven dead-code cleanup, tests/stabilization, and maintenance needed to keep the retained shell working.

## Mandatory removal protocol

### Before a change

- Identify the feature and all user entry points.
- Locate implementation paths.
- Trace direct and reverse dependencies.
- Note dynamic registrations/configuration.
- Update `INVENTORY.md` classification and rationale.
- Define retained flows that could regress.

### During a change

- Prefer removing user reachability first.
- Keep the diff narrow.
- Avoid opportunistic refactors.
- Preserve shared abstractions unless proven feature-specific.

### Verification

Use real repository scripts discovered from the repo; do not invent commands to satisfy a checklist.

Where applicable verify:

- dependency installation remains valid;
- relevant typecheck/build/lint/tests;
- primary application boots;
- project create/open;
- retained generation shell;
- design-system storage/selection;
- image/assets path needed for presentations;
- preview/rendering;
- persistence;
- relevant export path;
- navigation has no dead entries;
- no dangling imports, registrations, routes, or configs remain.

Record pre-existing failures separately. Never relabel a new failure as pre-existing.

### After a change

- Update `INVENTORY.md` and its decision log.
- Commit the coherent batch separately.
- If a retained flow breaks and the cause is unclear, restore the removed dependency/feature and investigate before continuing.

## Stop conditions

Stop deleting and reassess if:

- reverse dependencies are unclear;
- a shared schema/migration may still be used;
- a dynamic loader/registry makes reachability uncertain;
- a retained smoke test regresses;
- build/boot breaks because of the batch;
- removal requires a broad architectural rewrite merely to keep the app working.

Uncertainty means keep temporarily and document it, not delete aggressively.

## Future presentation boundaries

After distillation, implementation should keep these responsibilities distinct:

1. **Template understanding** — parse/decompose an unknown PPTX and derive presentation design rules.
2. **Content understanding and deck planning** — derive narrative, slide sequence, messages, and visual intent.
3. **Layout and visualization planning** — select allowed template layouts and semantic visual types under constraints.
4. **Generation/rendering** — create editable slide objects and candidate variants.
5. **Audit** — deterministic geometry/template checks plus contextual semantic checks.
6. **Repair** — perform only selected/local corrections while respecting locks.
7. **Export/preflight** — validate and emit editable PPTX plus required secondary formats.

Do not collapse this into one giant prompt or opaque agent.

## Model responsibility principle

Use models primarily for semantic decisions: narrative, message, slide intent, wording, semantic layout/visual choice, contextual review.

Use deterministic code primarily for exact template properties, geometry, constraints, native object creation, deterministic validation, persistence, locks, and export correctness.

The goal is to reduce unconstrained design reasoning required from the runtime model.

## Offline skill improvement principle

Future optimization loop:

`fixed benchmark -> runtime-model output -> stronger offline critic -> proposed skill/prompt/rule change -> full regression -> accept/reject -> versioned skill`

This is behavioral distillation into instructions, examples, constraints, and deterministic logic, not weight distillation. Never accept critic-generated skill changes without regression evaluation.

## Definition of done for distillation

Distillation is complete only when:

- major product areas are inventoried;
- unrelated user-visible workflows are removed;
- proven-dead implementation/dependencies are cleaned safely;
- retained designer conveniences are intentional;
- the app builds and boots reliably;
- retained project/design-system/image/preview/persistence foundations work;
- dead navigation and broken routes are gone;
- the codebase is materially smaller/easier to understand;
- presentation-specific work can begin without simultaneously untangling unrelated products.

Do not optimize for the maximum number of deleted files. Optimize for a minimal, stable, comprehensible foundation.