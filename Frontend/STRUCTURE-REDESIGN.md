# Frontend structure redesign – deliverable

## Final folder structure (tree, excluding .next)

```
Frontend/
├── app/
│   ├── api/
│   │   ├── razorpay/
│   │   │   ├── order/
│   │   │   │   └── route.ts
│   │   │   └── verify/
│   │   │       └── route.ts
│   │   └── run-code/
│   │       └── route.ts
│   ├── certificate/
│   │   └── page.tsx
│   ├── course-details/
│   │   └── page.tsx
│   ├── course-locked/
│   │   └── page.tsx
│   ├── daily-learning/
│   │   ├── aptitude/
│   │   │   ├── [day]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── python/
│   │   │   └── page.tsx
│   │   ├── reasoning/
│   │   │   ├── [day]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── verbal/
│   │   │   ├── [day]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── forgot-password/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── placement-priority/
│   │   └── page.tsx
│   ├── progress/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── collegelogo.png
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── AnimateInView.tsx
│   │   ├── Badge.tsx
│   │   ├── ProgressCard.tsx
│   │   └── StatCard.tsx
│   ├── layout/
│   │   ├── AuthGuard.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── SidebarModuleTree.tsx
│   ├── learning/
│   │   ├── AssignmentPanel.tsx
│   │   ├── CodingPracticePanel.tsx
│   │   ├── ExercisePanel.tsx
│   │   ├── ModuleContentPanel.tsx
│   │   └── ModuleTreeNav.tsx
│   ├── payment/
│   │   └── RazorpayCheckoutButton.tsx
│   └── home/
│       └── HomeCarousel.tsx
├── contexts/
│   └── LearningProgressContext.tsx
├── data/
│   ├── aptitude/
│   │   ├── ages-basics/
│   │   │   ├── assignment/
│   │   │   │   └── index.ts
│   │   │   ├── exercise/
│   │   │   │   └── index.ts
│   │   │   └── study/
│   │   │       └── index.ts
│   │   ├── ci/
│   │   │   ├── assignment/
│   │   │   │   └── index.ts
│   │   │   ├── exercise/
│   │   │   │   └── index.ts
│   │   │   └── study/
│   │   │       └── index.ts
│   │   ├── company-mcq-ns/
│   │   │   ├── assignment/
│   │   │   │   └── index.ts
│   │   │   ├── exercise/
│   │   │   │   └── index.ts
│   │   │   └── study/
│   │   │       └── index.ts
│   │   ├── ... (other aptitude topics)
│   │   └── index.ts
│   ├── codingPracticeQuestions.ts
│   ├── learningModules.ts
│   ├── learningProgress.ts
│   └── mockData.ts
├── lib/
│   ├── constants.ts
│   └── utils.ts
├── public/
│   └── carousel/
│       ├── .gitkeep
│       ├── carosoul1.png
│       ├── carosoul2.png
│       ├── carosoul3.png
│       ├── plogo.png
│       └── README.txt
├── .env
├── .eslintrc.json
├── .gitignore
├── netlify.toml
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

---

## Before → After file moves

| Before | After |
|--------|--------|
| `components/AnimateInView.tsx` | `components/ui/AnimateInView.tsx` |
| `components/Badge.tsx` | `components/ui/Badge.tsx` |
| `components/StatCard.tsx` | `components/ui/StatCard.tsx` |
| `components/ProgressCard.tsx` | `components/ui/ProgressCard.tsx` |
| `components/DashboardLayout.tsx` | `components/layout/DashboardLayout.tsx` |
| `components/Navbar.tsx` | `components/layout/Navbar.tsx` |
| `components/Sidebar.tsx` | `components/layout/Sidebar.tsx` |
| `components/SidebarModuleTree.tsx` | `components/layout/SidebarModuleTree.tsx` |
| `components/AuthGuard.tsx` | `components/layout/AuthGuard.tsx` |
| `components/ModuleContentPanel.tsx` | `components/learning/ModuleContentPanel.tsx` |
| `components/ModuleTreeNav.tsx` | `components/learning/ModuleTreeNav.tsx` |
| `components/ExercisePanel.tsx` | `components/learning/ExercisePanel.tsx` |
| `components/AssignmentPanel.tsx` | `components/learning/AssignmentPanel.tsx` |
| `components/CodingPracticePanel.tsx` | `components/learning/CodingPracticePanel.tsx` |
| `components/RazorpayCheckoutButton.tsx` | `components/payment/RazorpayCheckoutButton.tsx` |
| `components/HomeCarousel.tsx` | `components/home/HomeCarousel.tsx` |
| `lib/learningModules.ts` | `data/learningModules.ts` |
| `lib/mockData.ts` | `data/mockData.ts` |
| `lib/codingPracticeQuestions.ts` | `data/codingPracticeQuestions.ts` |
| `lib/learningProgress.ts` | `data/learningProgress.ts` |
| `lib/aptitude/` (entire folder) | `data/aptitude/` |

---

## Folders / files to ignore or remove

**Ignore (do not commit or treat as source):**

- `.next/` – build output; regenerate with `npm run build`.

**Remove (redundant after move; only if still present):**

- `lib/aptitude/` – content moved to `data/aptitude/`; remove if the directory still exists under `lib/`.

**Unchanged (no move):**

- `app/` – all routes and pages unchanged.
- `app/api/` – API routes unchanged.
- `lib/utils.ts`, `lib/constants.ts` – stay in `lib/`.
- `contexts/` – unchanged.
- `public/` – unchanged.
- Root config files – unchanged.
