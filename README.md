# Mastra Bundler Issue: JSONC Comments in tsconfig.json

Reproduction for [GitHub Issue #10942](https://github.com/mastra-ai/mastra/issues/10942) - TypeScript path aliases (`@src/*`) fail when `tsconfig.json` contains comments.

## Root Cause

The `@mastra/deployer` bundler uses `JSON.parse()` to read `tsconfig.json`, but **TypeScript config files support JSONC** (JSON with Comments). When comments are present, `JSON.parse()` fails silently, causing the bundler to not detect path aliases.

**Location:** `@mastra/deployer` → `hasPaths()` function

```javascript
function hasPaths(tsConfigPath2) {
  try {
    const config = JSON.parse(fs.readFileSync(tsConfigPath2, "utf8"));
    return !!(config.compilerOptions?.paths && Object.keys(config.compilerOptions.paths).length > 0);
  } catch {
    return false;  // SILENTLY FAILS on comments!
  }
}
```

## Reproduce the Issue

```bash
# Clone and install
git clone <this-repo>
cd mastra-beta-bundler-repro
pnpm install

# Build - will FAIL with self-referencing reexport error
pnpm run build
```

**Expected error:**
```
WARN: Circular dependency found:
    .mastra/.build/@src-mastra-lib.mjs -> .mastra/.build/@src-mastra-lib.mjs

ERROR: Failed during bundler bundle stage: "DEFAULT_CONFIG" cannot be exported from
".mastra/.build/@src-mastra-lib.mjs" as it is a reexport that references itself.
```

## The Fix

Remove comments from `tsconfig.json`:

```diff
  {
    "compilerOptions": {
      "noEmit": true,
      "outDir": "dist",
-     // This comment breaks JSON.parse()
      "paths": {
        "@src/*": ["./src/*"]
      }
    }
  }
```

Then rebuild:
```bash
pnpm run build  # Now succeeds!
```

## Why This Happens

1. `tsconfig.json` has comments (valid JSONC, but not valid JSON)
2. `hasPaths()` uses `JSON.parse()` which throws on comments
3. The `catch` block returns `false`, indicating "no paths configured"
4. The bundler doesn't use `tsconfig-paths` to resolve `@src/*` imports
5. `@src/*` is treated as a scoped npm package (like `@mastra/core`)
6. The bundler creates wrapper files that re-export from themselves
7. Rollup fails with "reexport that references itself" error

## Suggested Fix for Mastra

Use a JSONC parser instead of `JSON.parse()`:

```javascript
import { parse } from 'jsonc-parser';  // or 'json5'

function hasPaths(tsConfigPath2) {
  try {
    const content = fs.readFileSync(tsConfigPath2, "utf8");
    const config = parse(content);  // Handles comments correctly
    return !!(config.compilerOptions?.paths && Object.keys(config.compilerOptions.paths).length > 0);
  } catch {
    return false;
  }
}
```

## Project Structure

```
src/mastra/
├── index.ts           # Main entry with @src/* imports
├── agents/            # Example agents using @src/*
├── workflows/         # Example workflows using @src/*
├── tools/             # Example tools using @src/*
└── lib/
    ├── index.ts       # Barrel exports
    └── utils/
        ├── helpers.ts
        ├── validators.ts
        ├── transformers.ts
        └── formatters/
            ├── json.ts
            └── text.ts
```

## Environment

- Node.js: v22+
- pnpm: v10+
- @mastra/core: 1.0.0-beta.7
- mastra: 1.0.0-beta.7

## Related

- [GitHub Issue #10942](https://github.com/mastra-ai/mastra/issues/10942)
