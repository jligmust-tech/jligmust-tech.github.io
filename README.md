# jligmust-tech.github.io

scAI Index — source-linked static GitHub Pages site for single-cell foundation models and general LLMs applied to single-cell tasks.

The site contains source-reported model metadata and published benchmark snapshots. Unsupported scores remain `null` and render as `—`; values from different datasets or protocols should not be read as a universal ranking.

The [Research Guide](research.html) adds a Stage 1 public-source router for perturbation-response and virtual-cell models, benchmark datasets and evaluation suites, and a prioritized biology-aware embedding agenda. The [companion report](blog/posts/2026-09-08-perturbation-virtual-cell-guide.html) records the rationale and primary-source links. The site stores links and summaries only; it does not run models or include private/downloaded proprietary data.

Stage 1 protocol hardening is tracked in the [benchmark evidence matrix](assets/data/benchmark_evidence.csv): each record keeps the dataset, holdout, metrics, baselines, comparability boundary and public source together. The model-independent [canonical benchmark protocol matrix](assets/data/benchmark_protocols.csv) adds eight study specifications for response prediction, set-valued outputs and perturbation-aware embeddings; it is guidance only and does not run models. Plot metadata is separately versioned in [model annotations](assets/data/model_annotations.csv), including benchmark coverage and evidence status.

Stage 1.5 adds a public [source registry](assets/data/source_registry.csv) with canonical URLs, access-check dates, publication/release status, evidence maturity, public artifacts, research role and the next verification note. The Research Guide provides display-only search and evidence-status filters for the evidence matrix and source registry; the CSV exports remain the versioned records.

The Research Guide also includes a Stage 2 triage queue for newer virtual-cell directions and bioinformatics agents/tools. Stage 2 now includes the Virtual Cell Challenge 2025, SCALE, PerturbDiff, Lingshu-Cell, Biomni, FlowAgent, a public genomic-skills catalog and BioSkillSafety. Entries carry evidence maturity, pros/cons and a next-verification step; they are reading priorities, not model-performance claims. The public exports are [virtual-cell triage](assets/data/stage2_virtual_cell.csv) and [agent/tool triage](assets/data/stage2_agent_tools.csv).

To preview locally:

```text
python -m http.server 8000
```
