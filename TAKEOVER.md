# TAKEOVER.md — scAI Index Handover Guide

You (another AI model) are taking over the **investigation task** for this site:
research the parameters and benchmark results, update the code, and git push.
This document tells you everything you need. Read it fully before doing anything.

---

## 1. What this project is

**scAI Index** — a static leaderboard hub comparing:

- **Section 1 — Single-Cell Foundation Models**: scGPT, Geneformer, scFoundation,
  CellPLM, UCE, scBERT, scMulan, GeneCompass, etc.
- **Section 2 — General LLMs on Single-Cell Tasks**: GPT, Claude, DeepSeek, Gemini,
  Llama, Qwen, Kimi, etc.

Visual style: clone of artificialanalysis.ai's framework, **light theme** (white
background, blue accent `#3182ce`), **English only**. No build step — pure
static HTML/CSS/JS that GitHub Pages serves directly.

- Live site: https://jligmust-tech.github.io/
- Local preview: `python -m http.server 8000` in the repo root → http://127.0.0.1:8000/
- Repo: `jligmust-tech/jligmust-tech.github.io` (public GitHub Pages repo, branch `main`)

**Current state: ALL DATA IS PLACEHOLDER/SAMPLE.** Your job is to replace it with
real, source-linked research data.

---

## 2. Repo layout

```
website.github/
├── index.html                  # Home: hero, highlights, updates feed
├── leaderboard.html            # The two leaderboards (rendered by JS)
├── models.html                 # Model card grid (rendered by JS)
├── references.html             # Curated resource links
├── about.html                  # Purpose, metric definitions, roadmap
├── blog/
│   ├── index.html              # Blog post list (rendered by JS)
│   └── posts/                  # One HTML file per article
├── assets/
│   ├── css/style.css           # All styling (light theme)
│   └── js/
│       ├── data.js             # ★ ALL SITE DATA LIVES HERE — your main edit target
│       └── app.js              # Rendering: tables, sorting, cards, feed
└── research/                   # Optional: your intermediate JSON notes
```

**Do NOT edit app.js or style.css unless something is genuinely broken.**
All content changes happen in `assets/js/data.js`.

---

## 3. Data architecture — assets/js/data.js

`window.SCAI_DATA` is a plain JS object (not JSON — no comments allowed with
trailing commas, but the file as-is is valid JS). Structure:

```js
window.SCAI_DATA = {
  scFoundation: {          // Section 1
    title: "...",
    desc: "...",
    columns: [             // table columns; "dir": -1 = higher is better
      { key: "params", label: "Params" },
      { key: "cells",  label: "Pretrain Cells", dir: -1 },
      { key: "anno",   label: "Cell-Type Anno ↑", dir: -1, score: true },
      { key: "batch",  label: "Batch Correction ↑", dir: -1, score: true },
      { key: "year",   label: "Year", dir: -1 }
    ],
    models: [              // one entry per model
      {
        id: "scgpt", name: "scGPT", org: "...", year: 2024,
        params: "51M",     // STRING, e.g. "51M", "465M", or "—" if unknown
        cells: "33.3M",    // STRING, pretraining cell count
        anno: 0.84,        // NUMBER 0–1, or null if no published value
        batch: 0.71,       // NUMBER 0–1, or null
        url: "https://github.com/bowang-lab/scGPT",
        sources: ["https://...", "https://..."],
        notes: "anno = macro F1, zero-shot, hPancreas (scBENCH); batch = iLISI (scBENCH)"
      }
    ]
  },
  generalLLM: {            // Section 2 — same shape, different columns
    columns: [
      { key: "params",  label: "Params" },
      { key: "scAnno",  label: "sc Annotation ↑",  dir: -1, score: true },
      { key: "geneSet", label: "Gene-Set Analysis ↑", dir: -1, score: true },
      { key: "scCode",  label: "sc Analysis Code ↑", dir: -1, score: true },
      { key: "year",    label: "Year", dir: -1 }
    ],
    // models have scAnno / geneSet / scCode instead of anno / batch / cells
  },
  posts: [                 // blog posts shown on home feed + blog tab
    { date: "2026-09-07", tag: "Site", title: "...", desc: "...", url: "/blog/posts/2026-09-07-welcome.html" }
  ]
};
```

### Field rules
- `params`, `cells`: **strings** ("51M", "30M", "465M", "1.2B"); `"—"` if unknown.
- Scores: **numbers 0–1** (or null). Higher is always better (↑ in the label).
- `id`: lowercase, no spaces — used nowhere critical yet, keep it unique.
- `sources`: array of URLs backing the scores. Every non-null score MUST have a source.
- `notes`: one sentence per score, stating **which dataset + which metric** the number
  comes from (e.g. "F1 macro on hPancreas, zero-shot").

---

## 4. The investigation task (YOUR MAIN JOB)

### 4.1 Section 1 — Single-Cell Foundation Models
Research these (at minimum): **scGPT, Geneformer, scFoundation, CellPLM, UCE,
scBERT, scMulan, GeneCompass**. Add more if well-documented (scEvo, scPRINT,
xTrimoGene, Geneformer variants).

For each model, find:
- **params** (parameter count) and **cells** (pretraining cell count) — from the
  paper / GitHub repo / HuggingFace model card.
- **anno** — cell-type annotation F1/accuracy, **zero-shot** where possible.
- **batch** — batch-correction quality (iLISI / ASW / kBET).

**Source priority:**
1. **scBENCH** (https://github.com/OmicsML/scBENCH) — standardized benchmark,
   scores directly comparable across models on the same tasks. Use its results
   where available.
2. Model's own paper / repo (e.g. scGPT arXiv 2402.13672, Geneformer Nature 2023,
   scFoundation Nature Methods 2024, UCE https://github.com/snap-stanford/uce).
3. Other published comparisons.

**HONESTY RULE (non-negotiable):** only report numbers you actually found in a
source. If a model has no published value for a metric, use `null` — never invent,
estimate, or copy from another model. Every number needs its source URL.

### 4.2 Section 2 — General LLMs on Single-Cell Tasks
Find **published quantitative evaluations** of general LLMs on:
- **scAnno** — cell-type annotation from marker panels / expression.
- **geneSet** — gene-set / pathway interpretation.
- **scCode** — writing correct scRNA-seq analysis code (scanpy/Seurat).

Search terms to try: "LLM single-cell cell type annotation benchmark",
"CellAgentBench", "scEval", "large language models scRNA-seq evaluation",
"GPT-4 single cell annotation", arXiv evaluations comparing multiple LLMs.

Models to cover: GPT-4o, GPT-4, Claude 3.5 Sonnet, DeepSeek-V3, Gemini 1.5 Pro,
Llama 3.1 70B, Qwen2.5-72B, Kimi — or whatever set your sources actually evaluate.

**This field is young — expect many nulls.** If only qualitative findings exist
("GPT-4 beats Gemini on annotation"), leave the score null and record the finding
in `notes` with the source. Null is the correct, honest answer here.

---

## 5. Metric definitions (must stay consistent with about.html)

| Key      | Meaning                                     | Higher is |
|----------|---------------------------------------------|-----------|
| `anno`   | Zero-shot cell-type annotation F1/accuracy  | better    |
| `batch`  | Batch-correction quality (iLISI/ASW/kBET)   | better    |
| `scAnno` | LLM cell-type annotation from markers       | better    |
| `geneSet`| LLM gene-set/pathway interpretation        | better    |
| `scCode` | LLM scRNA-seq analysis code quality         | better    |

---

## 6. How to test your changes

1. Syntax check: `node --check assets/js/data.js` (must pass — no errors).
2. Serve locally: `python -m http.server 8000` in the repo root.
3. Open http://127.0.0.1:8000/leaderboard.html and check:
   - Both leaderboard sections render (toggle button between them).
   - Column headers sort (click to toggle asc/desc).
   - Scores display with 2 decimals; `—` shown for null/unknown.
   - Rows ranked by the first score column by default.
4. Open /models.html (cards), /blog/ (post list), / references.html, /about.html —
   no 404s, nav highlights the active tab.
5. When real data is in place, **remove or rewrite the sample-data banners**
   ("Sample data — placeholder values...") on index/leaderboard/models and update
   the About page's Data policy + roadmap to reflect completion.

---

## 7. Git push (READ CAREFULLY — this is the one place to get it wrong)

The remote is `origin` → `git@github.com-pages:jligmust-tech/jligmust-tech.github.io.git`

**CRITICAL: use the `github.com-pages` SSH alias, not plain `github.com`.**
The default `github.com` host in ~/.ssh/config points to the `bazi_deploy` key,
which does NOT have access to this repo and your push will be denied.
`github.com-pages` uses `~/.ssh/pages_deploy` (ed25519 deploy key, write access
to this repo only). Already configured — you just use the URL form.

```bash
cd /path/to/website.github
git add -A
git commit -m "Research real params + benchmark scores for single-cell leaderboards"   # or your own message
git push origin main
```

Identity is already configured for the repo (`niwakoki <jligm@connect.ust.hk>`);
if not, use:
`git -c user.name=niwakoki -c user.email=jligm@connect.ust.hk commit -m "..."`

After push: GitHub Pages auto-rebuilds from `main` in ~1 minute.
Verify: `curl -s -o /dev/null -w "%{http_code}" https://jligmust-tech.github.io/leaderboard.html` → 200.

---

## 8. Pitfalls & conventions (learned the hard way)

1. **Blog nav link is `blog/`, never `blog.html`** — the blog index is
   `blog/index.html`, served at `/blog/`. `blog.html` 404s (fixed once already).
2. **Post URLs in `data.js` must be root-absolute** (`/blog/posts/xxx.html`),
   NOT relative (`blog/posts/...`). Relative breaks on the blog page which lives
   in `/blog/` (fixed once already).
3. **English only** — no Chinese/Japanese content. Bilingual content is not wanted
   on this site.
4. **Light theme only** — white bg, accent `#3182ce`. Do not switch to dark.
5. **Scores are numbers 0–1; params/cells are strings.** Do not mix types.
6. Sortable-table rendering lives in `assets/js/app.js` — if you add/remove
   columns, update BOTH the `columns` array in data.js AND nothing else
   (app.js renders columns generically from the array).
7. Do not commit API keys, tokens, or `research/` scratch files unless they're
   the final data notes.

---

## 9. Definition of done

- [ ] Every model in both sections has real params (or `—`) and sourced scores (or null).
- [ ] Each non-null score has a `sources` URL and a `notes` provenance sentence.
- [ ] `node --check assets/js/data.js` passes.
- [ ] Local preview renders both leaderboards, sorting works, no 404s.
- [ ] Sample-data banners removed/updated; About page data policy reflects real data.
- [ ] Pushed to `main` via `github.com-pages` alias; live URLs return 200.
