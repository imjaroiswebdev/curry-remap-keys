# Plan: Modernize JSDoc Typings for `curry-remap-keys`

## 1. Repository & Typing Baseline
- **Current typing surface**: JSDoc comments exist for some public helpers (`remapKeys`, `pathAssign`, `pathValue`) but use very loose types such as `object`, `any`, and `array`. No typedefs describe the shape of mapping rules or the curried function.
- **Build outputs**: Babel compiles `src` into `build/`. No TypeScript declaration files (`.d.ts`) are published, and `package.json` lacks a `types` entry.
- **Tooling**: Project is ES modules compiled by Babel; Jest tests exercise runtime behavior. No TypeScript dependency is present, but `allowJs` with JSDoc could produce declarations if configured.

## 2. Goals & Success Criteria
1. **Expressive JSDoc** for all public modules so editors can infer mapping structures, curried signatures, and helper behavior.
2. **Generated `.d.ts` artifacts** (from `src` JSDoc) published alongside compiled JS to provide static typing to TypeScript consumers.
3. **Documentation alignment** ensuring README/API docs reference the improved typings and examples leverage type-aware tooling.
4. **Tooling automation** so declaration generation runs during builds (e.g., `npm run build` or a new `build:types` script) and validates that typings stay in sync.

## 3. Implementation Steps

### 3.0 Refresh Tooling & Dependencies
- Upgrade Node tooling to supported LTS versions (update `.nvmrc`/engines if present).
- Bump build/test dependencies (Babel, Jest, linting utilities) to their latest compatible major versions.
- Regenerate `package-lock.json` with the latest npm, ensuring integrity fields update and transitive vulnerabilities are resolved.
- Add npm scripts (e.g., `npm run lint`, `npm run test`) to run against upgraded toolchain and verify compatibility before typing changes begin.
- Document any required migration steps (Babel config tweaks, Jest config updates) uncovered during upgrades.

### 3.1 Define Core Type Aliases in JSDoc
- Introduce `@typedef` blocks in a dedicated `src/types.js` (or atop `remapKeys.js`) covering:
  - `Primitive` / `RemappableValue` union types (object, array, primitives).
  - `NestedPath` (`string | Array<string>`).
  - `DeepRemapRule` (`[string, NestedPath]`).
  - `RemapRule` union of `string | DeepRemapRule`.
  - `RemapMapping<T>` type describing mapping object keyed by original property names.
  - `Remapper<T, U>` for the curried function signature.
- Reference these typedefs in all exported helpers via `@param` / `@returns`, replacing generic `object` annotations.

### 3.2 Annotate Implementation Modules
- `src/remapKeys.js`: apply generics via JSDoc (`@template T extends object, U extends object`). Document the curried behavior with overloads using multiple `@returns` annotations or `@overload` blocks.
- `src/pathAssign.js`, `src/pathValue.js`, `src/cloneObj.js`: update comments to leverage the typedefs (`NestedPath`, `RemappableValue`) ensuring internal helpers have specific types for path arrays and object cloning.
- Add inline JSDoc to private helpers (`remapper`, `fillDeepKeyLevel`) when necessary to help the TypeScript compiler infer types.

### 3.3 Generate `.d.ts` Files from JSDoc
- Add `typescript` as a devDependency.
- Create `tsconfig.types.json` configured with:
  - `compilerOptions`: `allowJs`, `emitDeclarationOnly`, `declaration`, `outDir: "types"`, `checkJs: true`, `moduleResolution: "node"`, `target: "ES2018"` (matching Babel output expectations).
  - `include`: `src/**/*.js`.
- Add npm script `"build:types": "tsc -p tsconfig.types.json"` and update `build` (or `prepublish`) to run Babel first and types second (e.g., `"build": "babel src -d build && npm run build:types"` or separate `prepublishOnly`).
- Update `.npmignore`/package files to ensure `types/` is published or alternatively emit into `build/` alongside JS and point `tsconfig` there.
- Add `"types": "types/index.d.ts"` (or `build/index.d.ts`) to `package.json` so consumers discover declarations.

### 3.4 Validate Generated Types
- Run `npm run build:types` locally to confirm declaration output.
- Add CI/test script `"test:types": "tsc -p tsconfig.types.json --noEmit"` (with `emitDeclarationOnly` toggled off) to ensure future PRs keep typings valid.
- Optionally add a smoke TypeScript test file under `test/types` that imports `remapKeys` and ensures generics behave as expected (compiled via `tsc --noEmit`).

### 3.5 Documentation & Release Updates
- Update README and/or `docs/API.md` describing the new typings, demonstrating usage in TypeScript/typed editors.
- Mention new `build:types` and `test:types` scripts in contribution instructions if applicable.
- Prepare changeset for version bump (likely minor) once implemented.

## 4. Risks & Mitigations
- **JSDoc-to-d.ts gaps**: Complex generic behavior may need refactoring for TypeScript inference. Mitigate by iteratively running `tsc --noEmit` and adjusting JSDoc, possibly introducing helper typedef files.
- **Tooling drift**: Running TypeScript post-Babel may require ensuring source files remain ES module compatible. Keep declarations compiled directly from `src` (not `build`) to avoid Babel-specific syntax issues.
- **Package size**: Additional `types/` directory is small; ensure `.npmignore` does not exclude it.
- **Registry-restricted environments**: Lockfile regeneration can fail when package registry access is blocked (e.g., HTTP 403 policy restrictions). Treat this as a **release-blocker for dependency refresh validation**, but not as a blocker for source/runtime behavior validation when lint, unit tests, and type checks still pass against the checked-in `node_modules`.

## 5. Acceptance Checklist
- [ ] Dependencies/tooling upgraded and lockfile regenerated with current npm.
- [ ] Typedefs introduced and referenced across source files.
- [ ] TypeScript compiler emits `.d.ts` files without errors.
- [ ] `package.json` exposes `types` entry and scripts updated.
- [ ] Documentation reflects typing support.
- [ ] Existing Jest test suite continues to pass, confirming runtime behavior remains correct.
- [ ] New or updated tests (if any) are added and pass.
- [ ] `npm install --package-lock-only --ignore-scripts` succeeds in an environment with registry access, and any lockfile updates are committed.
