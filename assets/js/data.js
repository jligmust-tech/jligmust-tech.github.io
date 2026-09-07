/* ============================================================
   scAI Index — model data
   SAMPLE DATA. Placeholder values for framework demo only.
   Real values to be researched from papers/repos and filled in.
   Each model: { id, name, org, year, params, extra, scores:{...}, url }
   ============================================================ */

window.SCAI_DATA = {
  // ---- Section 1: Single-cell foundation models ----
  scFoundation: {
    title: "Single-Cell Foundation Models",
    desc: "Pretrained transformer/LLM-style models for single-cell transcriptomics.",
    columns: [
      { key: "params",   label: "Params" },
      { key: "cells",    label: "Pretrain Cells", dir: -1 },
      { key: "anno",     label: "Cell-Type Anno ↑", dir: -1, score: true },
      { key: "batch",    label: "Batch Correction ↑", dir: -1, score: true },
      { key: "year",     label: "Year", dir: -1 }
    ],
    models: [
      { id: "scgpt",   name: "scGPT",        org: "U Toronto / MIT", year: 2024, params: "51M", cells: "33M",  anno: 0.84, batch: 0.71, url: "https://github.com/bowang-lab/scGPT" },
      { id: "geneformer", name: "Geneformer", org: "Gladstone / UCSF", year: 2023, params: "12M", cells: "30M", anno: 0.79, batch: 0.65, url: "https://huggingface.co/ctheodoris/Geneformer" },
      { id: "scfoundation", name: "scFoundation", org: "Yang et al.", year: 2024, params: "100M", cells: "50M", anno: 0.81, batch: 0.68, url: "https://github.com/bowang-lab/scFoundation" },
      { id: "cellplm", name: "CellPLM",      org: "Zhejiang U / Westlake", year: 2024, params: "465M", cells: "20M", anno: 0.77, batch: 0.66, url: "https://github.com/OmicsML/dna" },
      { id: "uce",     name: "UCE",          org: "UC Berkeley", year: 2024, params: "650M", cells: "36M", anno: 0.75, batch: 0.63, url: "https://github.com/snap-stanford/uce" }
    ]
  },

  // ---- Section 2: General LLMs evaluated on single-cell tasks ----
  generalLLM: {
    title: "General LLMs on Single-Cell Tasks",
    desc: "Frontier general-purpose LLMs evaluated on single-cell interpretation tasks (sample metrics).",
    columns: [
      { key: "params", label: "Params" },
      { key: "scAnno", label: "sc Annotation ↑", dir: -1, score: true },
      { key: "geneSet", label: "Gene-Set Analysis ↑", dir: -1, score: true },
      { key: "scCode", label: "sc Analysis Code ↑", dir: -1, score: true },
      { key: "year",   label: "Year", dir: -1 }
    ],
    models: [
      { id: "gpt4o",   name: "GPT-4o",       org: "OpenAI",     year: 2024, params: "—",  scAnno: 0.72, geneSet: 0.78, scCode: 0.68, url: "" },
      { id: "claude35", name: "Claude 3.5 Sonnet", org: "Anthropic", year: 2024, params: "—", scAnno: 0.70, geneSet: 0.80, scCode: 0.72, url: "" },
      { id: "deepseek", name: "DeepSeek-V3",  org: "DeepSeek",   year: 2024, params: "671B", scAnno: 0.66, geneSet: 0.74, scCode: 0.70, url: "" },
      { id: "gemini15", name: "Gemini 1.5 Pro", org: "Google",   year: 2024, params: "—",  scAnno: 0.68, geneSet: 0.76, scCode: 0.64, url: "" },
      { id: "llama3",  name: "Llama 3.1 70B", org: "Meta",       year: 2024, params: "70B", scAnno: 0.60, geneSet: 0.65, scCode: 0.58, url: "" }
    ]
  },

  // ---- Blog posts (title + link; full posts live in blog/posts/) ----
  posts: [
    { date: "2026-09-07", tag: "Site", title: "Welcome to scAI Index", desc: "Why we are tracking single-cell foundation models and LLMs for scRNA-seq analysis.", url: "/blog/posts/2026-09-07-welcome.html" },
    { date: "2026-09-07", tag: "Methodology", title: "How the leaderboard metrics are defined (draft)", desc: "Working draft of metric definitions — to be finalized with real benchmark data.", url: "#" },
    { date: "2026-09-07", tag: "Data", title: "Sample data disclaimer", desc: "All current leaderboard values are placeholders pending literature research.", url: "#" }
  ]
};
