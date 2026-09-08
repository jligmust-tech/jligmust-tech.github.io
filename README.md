# jligmust-tech.github.io

scAI Index — source-linked static GitHub Pages site for single-cell foundation models and general LLMs applied to single-cell tasks.

The site contains source-reported model metadata and published benchmark snapshots. Unsupported scores remain `null` and render as `—`; values from different datasets or protocols should not be read as a universal ranking.

The [Research Guide](research.html) adds a Stage 1 public-source router for perturbation-response and virtual-cell models, benchmark datasets and evaluation suites, and a prioritized biology-aware embedding agenda. The [companion report](blog/posts/2026-09-08-perturbation-virtual-cell-guide.html) records the rationale and primary-source links. The site stores links and summaries only; it does not run models or include private/downloaded proprietary data.

Stage 1 protocol hardening is tracked in the [benchmark evidence matrix](assets/data/benchmark_evidence.csv): each record keeps the dataset, holdout, metrics, baselines, comparability boundary and public source together. Plot metadata is separately versioned in [model annotations](assets/data/model_annotations.csv), including benchmark coverage and evidence status.

To preview locally:

```text
python -m http.server 8000
```
