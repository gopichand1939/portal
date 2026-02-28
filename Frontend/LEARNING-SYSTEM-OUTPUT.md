# Learning content system – output only

## Final folder structure (relevant parts)

```
Frontend/
├── data/
│   ├── types.ts
│   ├── learningModules.ts
│   ├── loader.generated.ts          (AUTO-GENERATED)
│   ├── aptitude/
│   │   ├── index.ts                 (aptitudeDailyContent only)
│   │   ├── numbers/study/, exercise/, assignment/
│   │   ├── powercycles/study/, exercise/, assignment/
│   │   ├── remainder-cycles/...
│   │   ├── lcm-hcf-concepts/...
│   │   ├── lcm-hcf-apps/...
│   │   ├── percentages-basics/...
│   │   ├── profit-loss-basics/...
│   │   ├── si/...
│   │   ├── ci/...
│   │   ├── ratios-basics/...
│   │   ├── mixtures-basics/...
│   │   ├── partnerships-basics/...
│   │   ├── ages-basics/...
│   │   ├── averages-basics/study/, exercise/, assignment/
│   │   ├── time-work-basics/...
│   │   ├── tsd-basics/...
│   │   ├── perm-comb-basics/...
│   │   ├── probability-basics/...
│   │   ├── company-mcq-ns/...
│   │   └── aptitude-final/study/, exercise/, assignment/
│   ├── reasoning/<topic>/study/, exercise/, assignment/   (placeholders)
│   ├── verbal/<topic>/study/, exercise/, assignment/       (placeholders)
│   └── python/<topic>/study/, exercise/, assignment/       (placeholders)
├── scripts/
│   ├── generate-learning-loader.js
│   └── create-placeholders.js
├── components/
│   └── learning/
│       └── ModuleContentPanel.tsx   (imports from @/data/learningModules)
└── components/
    └── layout/
        └── Sidebar.tsx              (imports aptitudeModule, reasoningModule, verbalModule, pythonModule from @/data/learningModules)
```

## Auto-loader

- **Script:** `scripts/generate-learning-loader.js`
  - Scans `data/aptitude`, `data/reasoning`, `data/verbal`, `data/python` for topic folders.
  - For each topic folder: looks for `study.ts` or `study/index.ts`, same for `exercise`, `assignment`, and (python only) `coding`.
  - Writes `data/loader.generated.ts` with: static imports per (module, topic, action), `TOPIC_CONFIG`, `buildModuleTree()`, `aptitudeModule`, `reasoningModule`, `verbalModule`, `pythonModule`, `getLearningModules()`, `studyContentMap`, `exerciseContentMap`, `assignmentContentMap`.
- **Run:** `npm run generate:loader` or automatically before `npm run build` (prebuild).
- **IDs:** `topicId` = folder name; action node id = `topicId-action` (e.g. `numbers-study`). Stable for progress tracking.

## Updated module export / provider

- **`data/learningModules.ts`**
  - Re-exports from `./loader.generated`: `aptitudeModule`, `reasoningModule`, `verbalModule`, `pythonModule`, `getLearningModules`, `studyContentMap`, `exerciseContentMap`, `assignmentContentMap`.
  - Re-exports from `./types`: `ModuleNode`, `ModuleNodeType`.
  - Defines and exports: `moduleProgressDefault`, `findNodeById`, `getLeafIds`, `getLeafIdsUnder`.
- **`data/aptitude/index.ts`**
  - Imports content maps from `../loader.generated`.
  - Exports only `AptitudeDayContent` type and `aptitudeDailyContent` (day-based curriculum for daily-learning flow).

## Minimal Sidebar import usage

- **Sidebar:** `import { aptitudeModule, reasoningModule, verbalModule, pythonModule } from '@/data/learningModules'`
- **SidebarModuleTree:** receives `root` (one of the four modules) and `moduleSlug`; no other learning imports.
- **ModuleContentPanel:** `import { studyContentMap, exerciseContentMap, assignmentContentMap } from '@/data/learningModules'`

## Full aptitude content files (all topics)

| Topic folder        | study | exercise (10) | assignment (20) |
|---------------------|-------|----------------|-----------------|
| numbers             | ✓     | ✓              | ✓               |
| powercycles         | ✓     | ✓              | ✓               |
| remainder-cycles    | ✓     | ✓              | ✓               |
| lcm-hcf-concepts    | ✓     | ✓              | ✓               |
| lcm-hcf-apps        | ✓     | ✓              | ✓               |
| percentages-basics | ✓     | ✓              | ✓               |
| profit-loss-basics  | ✓     | ✓              | ✓               |
| si                  | ✓     | ✓              | ✓               |
| ci                  | ✓     | ✓              | ✓               |
| ratios-basics       | ✓     | ✓              | ✓               |
| mixtures-basics     | ✓     | ✓              | ✓               |
| partnerships-basics | ✓     | ✓              | ✓               |
| ages-basics         | ✓     | ✓              | ✓               |
| averages-basics     | ✓     | ✓              | ✓               |
| time-work-basics    | ✓     | ✓              | ✓               |
| tsd-basics          | ✓     | ✓              | ✓               |
| perm-comb-basics    | ✓     | ✓              | ✓               |
| probability-basics  | ✓     | ✓              | ✓               |
| company-mcq-ns      | ✓     | ✓              | ✓               |
| aptitude-final      | ✓     | ✓              | ✓               |

Each under `data/aptitude/<topic>/study/index.ts`, `exercise/index.ts`, `assignment/index.ts` (or flat `study.ts` etc. when used).

## Obsolete files to delete

- None. Do **not** delete:
  - `data/loader.generated.ts` (generated; overwritten by script).
  - Any `data/aptitude/<topic>/study/index.ts` (or `study.ts`) and corresponding `exercise`, `assignment`; they are the source of truth.
- Removed in this refactor (no separate file to delete): previous hardcoded tree and content map definitions in `data/learningModules.ts` and the duplicate content maps in `data/aptitude/index.ts`; both have been replaced by loader-driven exports and a single `aptitude/index.ts` that only exports `aptitudeDailyContent` and imports maps from the loader.
