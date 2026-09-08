/* ============================================================
   scAI Index — source-linked model data
   Scores are reported snapshots, not a universal cross-paper ranking.
   A null score means that no compatible published value was found.
   ============================================================ */

window.SCAI_DATA = {
  // ---- Section 1: Single-cell foundation models ----
  scFoundation: {
    title: "Single-Cell Foundation Models",
    desc: "Reported benchmark snapshots for pretrained single-cell models. Compare scores within the same source and protocol; a dash means no compatible value was found.",
    columns: [
      { key: "params", label: "Params" },
      { key: "cells",  label: "Pretrain Cells", dir: -1 },
      { key: "anno",   label: "Annotation ↑", dir: -1, score: true },
      { key: "batch",  label: "Batch Integration ↑", dir: -1, score: true },
      { key: "year",   label: "Year", dir: -1 }
    ],
    models: [
      {
        id: "scgpt", name: "scGPT", org: "U Toronto / MIT", year: 2024,
        params: "51M", cells: "33M", anno: 0.954, batch: 0.75,
        url: "https://github.com/bowang-lab/scGPT",
        sources: [
          "https://www.nature.com/articles/s41592-024-02201-0",
          "https://github.com/bowang-lab/scGPT",
          "https://bmwang.cn/assets/files/mwang.240122.pdf"
        ],
        notes: "Annotation = 0.954 accuracy on the Pancreas column of the official CellPLM comparison table (supervised transfer setting); batch = 0.75 Avg. Batch on Tabula Sapiens v2 in the UCE comparison table."
      },
      {
        id: "geneformer-v1", name: "Geneformer V1", org: "Gladstone / UCSF", year: 2023,
        params: "10M", cells: "30M", anno: 0.979, batch: 0.82,
        url: "https://huggingface.co/ctheodoris/Geneformer",
        sources: [
          "https://huggingface.co/ctheodoris/Geneformer",
          "https://github.com/OmicsML/CellPLM",
          "https://bmwang.cn/assets/files/mwang.240122.pdf"
        ],
        notes: "Annotation = 0.979 accuracy on the PBMC12K column of the official CellPLM comparison table (supervised transfer setting); batch = 0.82 Avg. Batch on Tabula Sapiens v2 in the UCE comparison table."
      },
      {
        id: "geneformer-v2-316m", name: "Geneformer V2 316M", org: "Gladstone / UCSF", year: 2024,
        params: "316M", cells: "104M", anno: null, batch: null,
        url: "https://huggingface.co/ctheodoris/Geneformer",
        sources: ["https://huggingface.co/ctheodoris/Geneformer"],
        notes: "The current V2-316M model is documented as pretrained on approximately 104M human transcriptomes; no compatible annotation or batch score is entered here."
      },
      {
        id: "scfoundation", name: "scFoundation", org: "Hao et al.", year: 2024,
        params: "100M", cells: "50M+", anno: null, batch: null,
        url: "https://github.com/biomap-research/scFoundation",
        sources: [
          "https://www.nature.com/articles/s41592-024-02305-7",
          "https://github.com/biomap-research/scFoundation"
        ],
        notes: "The model paper reports 100M parameters and more than 50M human cells; exact comparable annotation and batch values are not entered from a figure-only comparison."
      },
      {
        id: "cellplm", name: "CellPLM", org: "Zhejiang U / Westlake", year: 2024,
        params: "85M", cells: "11M", anno: 0.983, batch: null,
        url: "https://github.com/OmicsML/CellPLM",
        sources: [
          "https://openreview.net/forum?id=BKXvPDekud",
          "https://github.com/OmicsML/CellPLM"
        ],
        notes: "Annotation = 0.983 accuracy on the Pancreas column of the official CellPLM comparison table; the released checkpoint is 85M and pretraining used more than 9M scRNA-seq plus 2M spatial cells."
      },
      {
        id: "uce", name: "UCE", org: "Stanford / CZ Biohub", year: 2023,
        params: "650M", cells: "36M", anno: null, batch: 0.88,
        url: "https://github.com/snap-stanford/UCE",
        sources: [
          "https://cs.stanford.edu/~jure/pubs/uce-bioarxiv23.pdf",
          "https://github.com/snap-stanford/UCE"
        ],
        notes: "Batch = 0.88 Avg. Batch on Tabula Sapiens v2 in the single-cell integration benchmark; the source reports Avg. Bio rather than a cell-type F1/accuracy score."
      },
      {
        id: "scbert", name: "scBERT", org: "Tencent AI Lab", year: 2022,
        params: "8.9M", cells: "1.1M", anno: null, batch: null,
        url: "https://github.com/TencentAILabHealthcare/scBERT",
        sources: [
          "https://doi.org/10.1038/s42256-022-00534-z",
          "https://github.com/TencentAILabHealthcare/scBERT"
        ],
        notes: "The paper describes pretraining on approximately 1.1M cells for cell-type annotation; no compatible score is entered here."
      },
      {
        id: "scmulan", name: "scMulan", org: "Tsinghua University", year: 2024,
        params: "368M", cells: "10M", anno: null, batch: null,
        url: "https://github.com/cyxss/scMulan",
        sources: [
          "https://www.biorxiv.org/content/10.1101/2024.01.25.577152v1",
          "https://github.com/cyxss/scMulan"
        ],
        notes: "The scMulan preprint reports 368M parameters and 10M single-cell transcriptomes with zero-shot annotation and integration capabilities; no compatible numeric score is entered here."
      },
      {
        id: "genecompass", name: "GeneCompass", org: "X-Compass Consortium", year: 2024,
        params: "100M+", cells: "101.8M", anno: null, batch: null,
        url: "https://github.com/xCompass-AI/GeneCompass",
        sources: [
          "https://www.nature.com/articles/s41422-024-01034-y",
          "https://github.com/xCompass-AI/GeneCompass"
        ],
        notes: "The paper describes a 126M-cell corpus, with 101,768,420 human and mouse transcriptomes retained after preprocessing, and a transformer exceeding 100M parameters; no compatible numeric score is entered here."
      },
      {
        id: "scprint", name: "scPRINT", org: "Institut Pasteur / CNRS", year: 2025,
        params: "100M", cells: "50M+", anno: null, batch: null,
        url: "https://github.com/cantinilab/scPRINT",
        sources: [
          "https://www.nature.com/articles/s41467-025-58699-1",
          "https://github.com/cantinilab/scPRINT"
        ],
        notes: "The large scPRINT checkpoint is documented as 100M parameters and the model was pretrained on more than 50M cells; no compatible annotation or batch score is entered here."
      },
      {
        id: "cellfm", name: "CellFM", org: "Sun Yat-sen University / Huawei", year: 2025,
        params: "800M", cells: "100M", anno: 0.9291, batch: null,
        url: "https://github.com/biomed-AI/CellFM",
        sources: [
          "https://www.nature.com/articles/s41467-025-59926-5",
          "https://github.com/biomed-AI/CellFM"
        ],
        notes: "Annotation = 0.9291 average accuracy across eight intra-dataset evaluations using the 80M checkpoint with a frozen backbone and trained classifier; the paper reports 800M parameters for the full model and about 100M training cells."
      }
    ]
  },

  // ---- Section 2: General LLMs evaluated on single-cell tasks ----
  generalLLM: {
    title: "General LLMs on Single-Cell Tasks",
    desc: "Published LLM evaluations on marker-based annotation, gene-set interpretation, and executable scRNA-seq workflows. These are task-specific snapshots, not a universal ranking.",
    columns: [
      { key: "params", label: "Params" },
      { key: "scAnno", label: "Annotation Agreement ↑", dir: -1, score: true },
      { key: "geneSet", label: "Gene-Set Terms ↑", dir: -1, score: true },
      { key: "scCode", label: "Workflow Accuracy ↑", dir: -1, score: true },
      { key: "year", label: "Year", dir: -1 }
    ],
    models: [
      {
        id: "claude35", name: "Claude 3.5 Sonnet", org: "Anthropic", year: 2024,
        params: "—", scAnno: 0.840, geneSet: 0.8120, scCode: null,
        url: "https://www.anthropic.com/news/claude-3-5-sonnet",
        sources: ["https://www.nature.com/articles/s41467-025-64511-x"],
        notes: "Annotation = 84.0% binary agreement by cell with manual labels; gene-set = 81.20% of biological-process terms recovered in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "claude-opus-3", name: "Claude 3 Opus", org: "Anthropic", year: 2024,
        params: "—", scAnno: 0.823, geneSet: 0.710, scCode: null,
        url: "https://www.anthropic.com/news/claude-3-family",
        sources: ["https://www.nature.com/articles/s41467-025-64511-x"],
        notes: "Annotation = 82.3% binary agreement by cell; gene-set = 71.0% of biological-process terms in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "gpt4", name: "GPT-4", org: "OpenAI", year: 2023,
        params: "—", scAnno: 0.792, geneSet: 0.6524, scCode: null,
        url: "https://openai.com/research/gpt-4",
        sources: [
          "https://www.nature.com/articles/s41467-025-64511-x",
          "https://pmc.ncbi.nlm.nih.gov/articles/PMC10153208/"
        ],
        notes: "Annotation = 79.2% binary agreement by cell; gene-set = 65.24% of biological-process terms in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "gpt4o", name: "GPT-4o", org: "OpenAI", year: 2024,
        params: "—", scAnno: 0.809, geneSet: 0.6704, scCode: null,
        url: "https://openai.com/index/hello-gpt-4o/",
        sources: ["https://www.nature.com/articles/s41467-025-64511-x"],
        notes: "Annotation = 80.9% binary agreement by cell; gene-set = 67.04% of biological-process terms in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "gpt4o-mini", name: "GPT-4o mini", org: "OpenAI", year: 2024,
        params: "—", scAnno: 0.768, geneSet: 0.648, scCode: null,
        url: "https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/",
        sources: ["https://www.nature.com/articles/s41467-025-64511-x"],
        notes: "Annotation = 76.8% binary agreement by cell; gene-set = 64.8% of biological-process terms in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "gemini15-pro", name: "Gemini 1.5 Pro", org: "Google", year: 2024,
        params: "—", scAnno: 0.775, geneSet: 0.6632, scCode: null,
        url: "https://deepmind.google/technologies/gemini/pro/",
        sources: ["https://www.nature.com/articles/s41467-025-64511-x"],
        notes: "Annotation = 77.5% binary agreement by cell; gene-set = 66.32% of biological-process terms in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "gemini15-flash", name: "Gemini 1.5 Flash", org: "Google", year: 2024,
        params: "—", scAnno: 0.688, geneSet: 0.6052, scCode: null,
        url: "https://deepmind.google/technologies/gemini/flash/",
        sources: ["https://www.nature.com/articles/s41467-025-64511-x"],
        notes: "Annotation = 68.8% binary agreement by cell; gene-set = 60.52% of biological-process terms in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "llama31-405b", name: "Llama 3.1 405B Instruct", org: "Meta", year: 2024,
        params: "405B", scAnno: 0.820, geneSet: 0.719, scCode: null,
        url: "https://huggingface.co/meta-llama/Llama-3.1-405B-Instruct",
        sources: [
          "https://www.nature.com/articles/s41467-025-64511-x",
          "https://ai.meta.com/blog/meta-llama-3-1/"
        ],
        notes: "Annotation = 82.0% binary agreement by cell; gene-set = 71.9% of biological-process terms in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "llama31-70b", name: "Llama 3.1 70B Instruct", org: "Meta", year: 2024,
        params: "70B", scAnno: 0.740, geneSet: 0.708, scCode: null,
        url: "https://huggingface.co/meta-llama/Llama-3.1-70B",
        sources: [
          "https://www.nature.com/articles/s41467-025-64511-x",
          "https://huggingface.co/meta-llama/Llama-3.1-70B"
        ],
        notes: "Annotation = 74.0% binary agreement by cell; gene-set = 70.8% of biological-process terms in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "claude3-haiku", name: "Claude 3 Haiku", org: "Anthropic", year: 2024,
        params: "—", scAnno: 0.783, geneSet: 0.628, scCode: null,
        url: "https://www.anthropic.com/news/claude-3-haiku",
        sources: ["https://www.nature.com/articles/s41467-025-64511-x"],
        notes: "Annotation = 78.3% binary agreement by cell; gene-set = 62.8% of biological-process terms in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "command-r-plus", name: "Command R Plus", org: "Cohere", year: 2024,
        params: "—", scAnno: 0.772, geneSet: 0.585, scCode: null,
        url: "https://cohere.com/command",
        sources: ["https://www.nature.com/articles/s41467-025-64511-x"],
        notes: "Annotation = 77.2% binary agreement by cell; gene-set = 58.5% of biological-process terms in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "mistral-large", name: "Mistral Large", org: "Mistral AI", year: 2024,
        params: "—", scAnno: 0.781, geneSet: 0.6276, scCode: null,
        url: "https://mistral.ai/news/mistral-large-2407/",
        sources: ["https://www.nature.com/articles/s41467-025-64511-x"],
        notes: "Annotation = 78.1% binary agreement by cell; gene-set = 62.76% of biological-process terms in the AnnDictionary Tabula Sapiens v2 evaluation."
      },
      {
        id: "deepseek-v3", name: "DeepSeek-V3", org: "DeepSeek", year: 2024,
        params: "671B", scAnno: null, geneSet: null, scCode: null,
        url: "https://huggingface.co/deepseek-ai/DeepSeek-V3",
        sources: [
          "https://arxiv.org/abs/2412.19437",
          "https://huggingface.co/deepseek-ai/DeepSeek-V3"
        ],
        notes: "The model card reports 671B total parameters and 37B activated per token; no compatible scRNA-seq annotation, gene-set, or workflow score was found in the evaluated sources."
      },
      {
        id: "qwen25-72b", name: "Qwen2.5-72B Instruct", org: "Alibaba Cloud", year: 2024,
        params: "72B", scAnno: null, geneSet: null, scCode: null,
        url: "https://huggingface.co/Qwen/Qwen2.5-72B-Instruct",
        sources: [
          "https://arxiv.org/abs/2412.15115",
          "https://huggingface.co/Qwen/Qwen2.5-72B-Instruct"
        ],
        notes: "The official model card reports a 72B instruction-tuned model; no compatible scRNA-seq annotation, gene-set, or workflow score was found in the evaluated sources."
      },
      {
        id: "kimi-k2", name: "Kimi K2", org: "Moonshot AI", year: 2025,
        params: "1T total / 32B active", scAnno: null, geneSet: null, scCode: null,
        url: "https://www.kimi.ai/blog/kimi-k2",
        sources: ["https://www.kimi.ai/blog/kimi-k2"],
        notes: "The official release describes a 1T-total-parameter mixture-of-experts model with 32B active parameters; no compatible scRNA-seq annotation, gene-set, or workflow score was found in the evaluated sources."
      },
      {
        id: "gpt55", name: "GPT-5.5", org: "OpenAI", year: 2026,
        params: "—", scAnno: null, geneSet: null, scCode: 0.5795,
        url: "https://github.com/latchbio/scbench",
        sources: ["https://github.com/latchbio/scbench"],
        notes: "Workflow = 57.95% accuracy in the scBench 195-problem executable scRNA-seq workflow benchmark; this is a workflow/agent score, not an isolated code-generation score."
      },
      {
        id: "claude-opus-48", name: "Claude Opus 4.8", org: "Anthropic", year: 2026,
        params: "—", scAnno: null, geneSet: null, scCode: 0.5795,
        url: "https://github.com/latchbio/scbench",
        sources: ["https://github.com/latchbio/scbench"],
        notes: "Workflow = 57.95% accuracy in the scBench 195-problem executable scRNA-seq workflow benchmark; this is a workflow/agent score, not an isolated code-generation score."
      },
      {
        id: "gpt54", name: "GPT-5.4", org: "OpenAI", year: 2026,
        params: "—", scAnno: null, geneSet: null, scCode: 0.5744,
        url: "https://github.com/latchbio/scbench",
        sources: ["https://github.com/latchbio/scbench"],
        notes: "Workflow = 57.44% accuracy in the scBench 195-problem executable scRNA-seq workflow benchmark; this is a workflow/agent score, not an isolated code-generation score."
      },
      {
        id: "gemini35-flash", name: "Gemini 3.5 Flash", org: "Google", year: 2026,
        params: "—", scAnno: null, geneSet: null, scCode: 0.5692,
        url: "https://github.com/latchbio/scbench",
        sources: ["https://github.com/latchbio/scbench"],
        notes: "Workflow = 56.92% accuracy in the scBench 195-problem executable scRNA-seq workflow benchmark; this is a workflow/agent score, not an isolated code-generation score."
      },
      {
        id: "claude-opus-47", name: "Claude Opus 4.7", org: "Anthropic", year: 2026,
        params: "—", scAnno: null, geneSet: null, scCode: 0.5521,
        url: "https://github.com/latchbio/scbench",
        sources: ["https://github.com/latchbio/scbench"],
        notes: "Workflow = 55.21% accuracy in the scBench 195-problem executable scRNA-seq workflow benchmark; this is a workflow/agent score, not an isolated code-generation score."
      },
      {
        id: "gemini31-pro-preview", name: "Gemini 3.1 Pro Preview", org: "Google", year: 2026,
        params: "—", scAnno: null, geneSet: null, scCode: 0.5385,
        url: "https://github.com/latchbio/scbench",
        sources: ["https://github.com/latchbio/scbench"],
        notes: "Workflow = 53.85% accuracy in the scBench 195-problem executable scRNA-seq workflow benchmark; this is a workflow/agent score, not an isolated code-generation score."
      },
      {
        id: "claude-opus-46", name: "Claude Opus 4.6", org: "Anthropic", year: 2026,
        params: "—", scAnno: null, geneSet: null, scCode: 0.5265,
        url: "https://github.com/latchbio/scbench",
        sources: ["https://github.com/latchbio/scbench"],
        notes: "Workflow = 52.65% accuracy in the scBench 195-problem executable scRNA-seq workflow benchmark; this is a workflow/agent score, not an isolated code-generation score."
      },
      {
        id: "gpt52", name: "GPT-5.2", org: "OpenAI", year: 2025,
        params: "—", scAnno: null, geneSet: null, scCode: 0.5231,
        url: "https://github.com/latchbio/scbench",
        sources: ["https://github.com/latchbio/scbench"],
        notes: "Workflow = 52.31% accuracy in the scBench 195-problem executable scRNA-seq workflow benchmark; this is a workflow/agent score, not an isolated code-generation score."
      },
      {
        id: "claude-sonnet-46", name: "Claude Sonnet 4.6", org: "Anthropic", year: 2026,
        params: "—", scAnno: null, geneSet: null, scCode: 0.5026,
        url: "https://github.com/latchbio/scbench",
        sources: ["https://github.com/latchbio/scbench"],
        notes: "Workflow = 50.26% accuracy in the scBench 195-problem executable scRNA-seq workflow benchmark; this is a workflow/agent score, not an isolated code-generation score."
      }
    ]
  },

  // ---- Stage 1 research guide: perturbation response and virtual-cell models ----
  researchGuide: {
    title: "Perturbation & Virtual-Cell Research Guide",
    intro: "A source-linked reading and benchmarking map for models that predict post-perturbation gene expression or cell-state distributions. Stage 1 prioritizes perturbation response and biology-aware embeddings; the roadmap keeps broader virtual-cell directions visible without mixing them into the core ranking.",
    sourcePolicy: "Public-source only: this guide stores summaries and links to public papers, repositories, public dataset landing pages and public benchmark documentation. No private database files, downloaded proprietary data, model weights or model execution are part of Stage 1.",
    routes: [
      {
        route: "Unseen genetic perturbation",
        question: "Which model families should be read first for single-gene and combinatorial CRISPR response prediction?",
        path: "GEARS → CPA → scGPT/scFoundation probes → Systema → scPerturBench",
        inputs: "Norman, Adamson, Replogle K562/RPE1",
        links: [
          { label: "GEARS", url: "https://github.com/snap-stanford/GEARS" },
          { label: "Systema", url: "https://github.com/mlbio-epfl/systema" },
          { label: "scPerturBench", url: "https://github.com/bm2-lab/scPerturBench" }
        ]
      },
      {
        route: "Chemical and dose response",
        question: "Which approaches represent chemical identity, dose and context?",
        path: "CPA/chemCPA → CellOT → scVIDR → Tahoe-100M",
        inputs: "sci-Plex, scPerturb, Tahoe-100M",
        links: [
          { label: "chemCPA", url: "https://github.com/theislab/chemCPA" },
          { label: "CellOT paper", url: "https://www.nature.com/articles/s41592-023-01969-x" },
          { label: "Tahoe-100M", url: "https://github.com/ArcInstitute/arc-virtual-cell-atlas/blob/main/tahoe-100M/README.md" }
        ]
      },
      {
        route: "Distribution or set-level response",
        question: "Does the model predict a population distribution rather than only a mean expression vector?",
        path: "CellOT → PerturbNet → STATE → Cell-Eval",
        inputs: "Replogle, Tahoe-100M, public Virtual Cell Challenge data",
        links: [
          { label: "PerturbNet", url: "https://github.com/welch-lab/PerturbNet" },
          { label: "STATE", url: "https://github.com/ArcInstitute/state" },
          { label: "Cell-Eval", url: "https://github.com/ArcInstitute/cell-eval" }
        ]
      },
      {
        route: "Biology-aware perturbation embeddings",
        question: "Does a perturbation representation preserve functional biology beyond expression shortcuts?",
        path: "LPM / Scouter → scGPT/scFoundation probes → PertEval-scFM → GO/Reactome/STRING checks",
        inputs: "Norman, Adamson, Replogle; public gene-knowledge resources",
        links: [
          { label: "LPM", url: "https://doi.org/10.1038/s43588-025-00870-1" },
          { label: "Scouter", url: "https://www.nature.com/articles/s43588-025-00912-8" },
          { label: "PertEval", url: "https://github.com/aaronwtr/PertEval" }
        ]
      },
      {
        route: "Broad public literature scan",
        question: "Which newer models and virtual-cell directions should be queued without claiming common benchmark evidence?",
        path: "Awesome catalog → primary paper → official code/data link → Stage 2 backlog",
        inputs: "Public repositories, papers and benchmark landing pages only",
        links: [
          { label: "awesome list", url: "https://github.com/OmicsML/awesome-foundation-model-single-cell-papers" }
        ]
      }
    ],
    citations: [
      {
        citation: "Roohani, Y., Huang, K. & Leskovec, J. (2023 online; 2024 volume). Predicting transcriptional outcomes of novel multigene perturbations with GEARS. Nature Biotechnology.", status: "Peer-reviewed", why: "Canonical knowledge-informed baseline for unseen single and combinatorial genetic perturbations", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41587-023-01905-6" },
          { label: "code", url: "https://github.com/snap-stanford/GEARS" }
        ]
      },
      {
        citation: "Lotfollahi, M. et al. (2023). Predicting cellular responses to complex perturbations in high-throughput screens. Molecular Systems Biology.", status: "Peer-reviewed", why: "Compositional latent baseline for dose, time, context, species and combination shifts", links: [
          { label: "paper", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10258562/" },
          { label: "code", url: "https://github.com/theislab/chemCPA" }
        ]
      },
      {
        citation: "Lotfollahi, M., Wolf, F. A. & Theis, F. J. (2019). scGen predicts single-cell perturbation responses. Nature Methods.", status: "Peer-reviewed", why: "Historical latent-shift baseline and a useful reference for cross-study response transfer", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-019-0494-8" },
          { label: "code", url: "https://github.com/theislab/scgen" }
        ]
      },
      {
        citation: "Cui, H. et al. (2024). scGPT: toward building a foundation model for single-cell multi-omics using generative AI. Nature Methods.", status: "Peer-reviewed", why: "High-visibility scFM whose perturbation-token and embedding settings should be separated in evaluation", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-024-02201-0" },
          { label: "code", url: "https://github.com/bowang-lab/scGPT" }
        ]
      },
      {
        citation: "Hao, M. et al. (2024). Large-scale foundation model on single-cell transcriptomics. Nature Methods.", status: "Peer-reviewed", why: "Large pretrained representation and perturbation head for testing whether scale adds response signal", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-024-02305-7" },
          { label: "code", url: "https://github.com/biomap-research/scFoundation" }
        ]
      },
      {
        citation: "Bunne, C. et al. (2023). Learning single-cell perturbation responses using neural optimal transport. Nature Methods.", status: "Peer-reviewed", why: "Unpaired distribution-mapping baseline for heterogeneous single-cell responses", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-023-01969-x" }
        ]
      },
      {
        citation: "Yu, H. et al. (2025). PerturbNet predicts single-cell responses to unseen chemical and genetic perturbations. Molecular Systems Biology.", status: "Peer-reviewed", why: "Generative distribution model spanning chemical, genetic and sequence-level perturbations", links: [
          { label: "paper", url: "https://doi.org/10.1038/s44320-025-00131-3" },
          { label: "code", url: "https://github.com/welch-lab/PerturbNet" }
        ]
      },
      {
        citation: "Miladinovic, D. et al. (2025). In silico biological discovery with large perturbation models. Nature Computational Science.", status: "Peer-reviewed", why: "Perturbation/readout/context factorization and a direct bridge from response prediction to biology-aware embeddings", links: [
          { label: "paper", url: "https://www.nature.com/articles/s43588-025-00870-1" },
          { label: "code", url: "https://github.com/perturblib/perturblib" }
        ]
      },
      {
        citation: "Zhu, O. & Li, J. (2025 online; 2026 volume). Scouter predicts transcriptional responses to genetic perturbations with large language model embeddings. Nature Computational Science.", status: "Peer-reviewed", why: "Compact biology-aware gene-embedding baseline for unseen genetic perturbations", links: [
          { label: "paper", url: "https://www.nature.com/articles/s43588-025-00912-8" },
          { label: "code", url: "https://github.com/PancakeZoy/scouter" }
        ]
      },
      {
        citation: "Roohani, Y. et al. (2026). Predicting cellular responses to perturbation across diverse contexts with State. Cell.", status: "Peer-reviewed", why: "Modern set-level virtual-cell model combining state embeddings with perturbation transitions", links: [
          { label: "paper", url: "https://doi.org/10.1016/j.cell.2026.07.052" },
          { label: "code", url: "https://github.com/ArcInstitute/state" },
          { label: "Cell-Eval", url: "https://github.com/ArcInstitute/cell-eval" }
        ]
      },
      {
        citation: "Viñas Torné, R. et al. (2025 online; 2026 issue). Systema: a framework for evaluating genetic perturbation response prediction beyond systematic variation. Nature Biotechnology.", status: "Peer-reviewed", why: "Guardrail against systematic-variation shortcuts and reference-sensitive metric inflation", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41587-025-02777-8" },
          { label: "code", url: "https://github.com/mlbio-epfl/systema" }
        ]
      },
      {
        citation: "Wei, Z. et al. (2025 online; 2026 issue). Benchmarking algorithms for generalizable single-cell perturbation response prediction. Nature Methods.", status: "Peer-reviewed", why: "Broad comparison of methods, datasets, metrics and generalization scenarios; anchor for benchmark coverage", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-025-02980-0" },
          { label: "code/results", url: "https://github.com/bm2-lab/scPerturBench" }
        ]
      },
      {
        citation: "Wenteler, A. et al. (2025). PertEval-scFM: Benchmarking Single-Cell Foundation Models for Perturbation Effect Prediction. ICML / PMLR 267.", status: "Peer-reviewed conference", why: "Zero-shot scFM embedding probe that isolates representation value from the downstream predictor", links: [
          { label: "paper", url: "https://proceedings.mlr.press/v267/wenteler25a.html" },
          { label: "code", url: "https://github.com/aaronwtr/PertEval" }
        ]
      },
      {
        citation: "Schäfer, P. S. L. et al. (2026). Towards Principled Evaluation of Single-Cell Perturbation Prediction Models. bioRxiv preprint.", status: "Preprint", why: "Protocol taxonomy and calibration-oriented companion for choosing what a benchmark actually measures", links: [
          { label: "preprint", url: "https://doi.org/10.64898/2026.07.23.740433" },
          { label: "code", url: "https://github.com/Virtual-Cell-Research-Community/scPertEval" },
          { label: "datasets", url: "https://github.com/Virtual-Cell-Research-Community/scPertEval/blob/main/docs/user-guide/datasets.md" }
        ]
      },
      {
        citation: "Ahlmann-Eltze, C., Huber, W. & Anders, S. (2025). Deep-learning-based gene perturbation effect prediction does not yet outperform simple linear baselines. Nature Methods.", status: "Peer-reviewed", why: "Important null-result and baseline-design guardrail for claims about model superiority", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-025-02772-6.pdf" }
        ]
      },
      {
        citation: "Weidener, L. et al. (2026). VCBench: A Multi-Dimensional Benchmark for Single-Cell Foundation Models.", status: "Preprint + public release", why: "Capability-stratified benchmark with pre-registered baselines, contamination checks and explicit code traceability", links: [
          { label: "repository", url: "https://github.com/AppliedScientific/VCBench" },
          { label: "DOI", url: "https://doi.org/10.64898/2026.06.18.733146" }
        ]
      },
      {
        citation: "Qiu, M. et al. (2026). Chreode: A Cell World Model for One-Step Temporal Dynamics and Perturbation Prediction.", status: "Preprint", why: "Emerging temporal/world-model direction that links state transitions to perturbation prediction", links: [
          { label: "arXiv", url: "https://arxiv.org/abs/2605.28111" }
        ]
      },
      {
        citation: "Jiang, D. et al. (2026). OCOO-T: A Simple and Scalable Virtual Cell Model for Transcriptional Perturbation Response Prediction.", status: "Preprint", why: "Flow-matching response model with explicit perturbation, dosage and context conditioning", links: [
          { label: "arXiv", url: "https://arxiv.org/abs/2606.12838" }
        ]
      },
      {
        citation: "Tang, X. et al. (2025/2026). CellForge: Agentic Design of Virtual Cell Models.", status: "Preprint", why: "Agentic model-design direction connecting bioinformatics agents with virtual-cell architecture search", links: [
          { label: "arXiv", url: "https://arxiv.org/abs/2508.02276" }
        ]
      },
      {
        citation: "Jang, Y. et al. (2026). Towards Autonomous Mechanistic Reasoning in Virtual Cells.", status: "Preprint", why: "Mechanistic action graphs, verifier-based filtering and VC-TRACES as a bridge between agent reasoning and virtual-cell evidence", links: [
          { label: "arXiv", url: "https://arxiv.org/abs/2604.11661" }
        ]
      },
      {
        citation: "BioAgent Bench (2026). Benchmark for evaluating LLM agents in bioinformatics.", status: "Public repository + preprint link", why: "End-to-end pipeline benchmark with task artifacts, reference data and robustness-focused perturbations", links: [
          { label: "repository", url: "https://github.com/bioagent-bench/bioagent-bench" },
          { label: "preprint", url: "https://arxiv.org/abs/2601.21800" }
        ]
      }
    ],
    stage1Models: [
      {
        rank: 1, name: "GEARS", role: "Canonical genetic baseline", scope: "Single and combinatorial genetic perturbations", embedding: "Gene–gene knowledge graph from coexpression and GO; perturbation embeddings", generalization: "Unseen genes and combinations; verify split assumptions and training coverage", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41587-023-01905-6" },
          { label: "code", url: "https://github.com/snap-stanford/GEARS" }
        ]
      },
      {
        rank: 2, name: "CPA / chemCPA", role: "Compositional latent baseline", scope: "Genetic and chemical perturbations, dose, cell type, species, combinations", embedding: "Factorized cell, perturbation, and covariate latents; chemCPA adds chemical representations", generalization: "Compositional OOD across dose, context, species, drug and combination", links: [
          { label: "CPA paper", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10258562/" },
          { label: "chemCPA code", url: "https://github.com/theislab/chemCPA" }
        ]
      },
      {
        rank: 3, name: "scGen", role: "Classic latent-shift baseline", scope: "Genetic, drug, infection and cross-study perturbations", embedding: "VAE latent-space vector arithmetic from control to response", generalization: "Cross cell type, study and species transfer; useful historical baseline", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-019-0494-8" },
          { label: "code", url: "https://github.com/theislab/scgen" }
        ]
      },
      {
        rank: 4, name: "scGPT", role: "High-visibility scFM probe", scope: "Perturbation-token gene-expression prediction", embedding: "Contextualized gene/cell representations plus perturbation-token conditioning", generalization: "Benchmark as a backbone/probe under explicit perturbation and context holdouts", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-024-02201-0" },
          { label: "code", url: "https://github.com/bowang-lab/scGPT" }
        ]
      },
      {
        rank: 5, name: "scFoundation", role: "Large scFM + perturbation head", scope: "Post-perturbation expression via pretrained gene embeddings", embedding: "Pretrained gene embeddings supplied to a GEARS-style perturbation model", generalization: "Useful controlled test of whether a larger pretrained representation helps", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-024-02305-7" },
          { label: "code", url: "https://github.com/biomap-research/scFoundation" }
        ]
      },
      {
        rank: 6, name: "CellOT", role: "Distributional / unpaired baseline", scope: "Chemical and drug response distributions", embedding: "Neural optimal transport maps control distributions to treated distributions", generalization: "OOD across patients and species; separates distributional from point prediction", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-023-01969-x" }
        ]
      },
      {
        rank: 7, name: "STATE", role: "Modern virtual-cell transition + embedding model", scope: "Genetic, chemical and signaling perturbations across cell contexts", embedding: "Set-level State Embedding (SE) plus State Transition (ST) model", generalization: "Explicit zero-shot unseen-context and few-shot unseen-perturbation splits", links: [
          { label: "paper", url: "https://www.biorxiv.org/content/10.1101/2025.06.26.661135v1.full" },
          { label: "code", url: "https://github.com/ArcInstitute/state" },
          { label: "Cell-Eval", url: "https://github.com/ArcInstitute/cell-eval" }
        ]
      },
      {
        rank: 8, name: "PerturbNet", role: "Generative distribution model", scope: "Unseen chemical and genetic perturbations", embedding: "Continuous perturbation-to-cell-state map with generative decoding", generalization: "Unseen perturbations; evaluate distributions, not only centroids", links: [
          { label: "paper", url: "https://doi.org/10.1038/s44320-025-00131-3" },
          { label: "code", url: "https://github.com/welch-lab/PerturbNet" }
        ]
      },
      {
        rank: 9, name: "LPM", role: "Large perturbation model", scope: "Genetic and chemical screens", embedding: "Perturbation-aware representations compared with Geneformer, scGPT and GenePT", generalization: "Unseen perturbation outcomes across screens; strong candidate for embedding ablations", links: [
          { label: "paper", url: "https://doi.org/10.1038/s43588-025-00870-1" },
          { label: "code", url: "https://github.com/perturblib/perturblib" }
        ]
      },
      {
        rank: 10, name: "Scouter", role: "Biology-aware gene-embedding baseline", scope: "Unseen genetic perturbations", embedding: "GenePT embeddings from NCBI gene descriptions + compressor–generator network", generalization: "Unseen gene response prediction; isolates the value of text-derived biology priors", links: [
          { label: "paper", url: "https://www.nature.com/articles/s43588-025-00912-8" },
          { label: "code", url: "https://github.com/PancakeZoy/scouter" }
        ]
      },
      {
        rank: 11, name: "scVIDR", role: "Dose-response baseline", scope: "Single and multiple-dose chemical perturbations", embedding: "VAE latent representation with dose-dependent regression", generalization: "Cross dose, cell type, study and species", links: [
          { label: "paper", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10436058/" },
          { label: "code", url: "https://github.com/BhattacharyaLab/scVIDR" }
        ]
      },
      {
        rank: 12, name: "scLong", role: "Emerging large-scale perturbation FM", scope: "Single and double gene perturbations plus response scoring", embedding: "Large pretrained transcriptomic representation with perturbation prediction head", generalization: "Promising scale and synergy/suppressor analysis; hold for independent reproduction", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41467-026-69102-y" }
        ]
      }
    ],
    modelSelection: [
      {
        name: "GEARS", bestFor: "Default genetic baseline; single and combinatorial perturbations", pros: "Public, interpretable gene-graph prior; directly targets unseen perturbations; easy to anchor a benchmark", cons: "Knowledge-graph coverage can shape the result; mainly point-expression prediction; systematic variation must be controlled", choose: "You need a canonical, reproducible first model for genetic response prediction", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41587-023-01905-6" },
          { label: "code", url: "https://github.com/snap-stanford/GEARS" }
        ]
      },
      {
        name: "CPA / chemCPA", bestFor: "Dose, cell type, species, drug and combination transfer", pros: "Clear compositional latent factors; chemCPA adds chemical representations; strong fit for covariate-aware OOD questions", cons: "Factorization assumptions may miss complex interactions; chemical coverage and representation quality become part of the comparison", choose: "Dose or context composition is central to the study", links: [
          { label: "CPA paper", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10258562/" },
          { label: "chemCPA code", url: "https://github.com/theislab/chemCPA" }
        ]
      },
      {
        name: "scGen", bestFor: "Simple latent-shift reference across studies or contexts", pros: "Conceptually simple VAE/vector arithmetic; useful low-complexity historical baseline", cons: "Can under-represent nonlinear, dose-dependent or combinatorial responses; not a direct biology-knowledge model", choose: "You want to test whether a complex model beats a simple response direction", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-019-0494-8" },
          { label: "code", url: "https://github.com/theislab/scgen" }
        ]
      },
      {
        name: "scGPT", bestFor: "Foundation-model representation or perturbation-token probe", pros: "High-visibility contextual gene/cell representation; directly useful for a frozen-backbone comparison", cons: "Results depend on tokenization, perturbation head, masking and pretraining overlap; not automatically comparable to task-specific models", choose: "You want to isolate the value of a general scFM representation", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-024-02201-0" },
          { label: "code", url: "https://github.com/bowang-lab/scGPT" }
        ]
      },
      {
        name: "scFoundation", bestFor: "Testing whether a larger pretrained gene representation helps a perturbation head", pros: "Large public scFM checkpoint family; useful controlled representation-versus-head comparison", cons: "Often evaluated through a downstream GEARS-style head; scale does not prove perturbation signal; overlap and compute must be disclosed", choose: "You need a large-pretraining probe with a controlled downstream predictor", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-024-02305-7" },
          { label: "code", url: "https://github.com/biomap-research/scFoundation" }
        ]
      },
      {
        name: "CellOT", bestFor: "Unpaired treated/control population distributions", pros: "Models heterogeneous distributions rather than only a mean; neural optimal transport gives a distinct baseline", cons: "Needs an appropriate unpaired/distributional setup; less direct for combinatorial gene perturbation and embedding ablations", choose: "The endpoint is a cell-state distribution or population shift", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41592-023-01969-x" }
        ]
      },
      {
        name: "STATE", bestFor: "Set-level virtual-cell prediction across contexts", pros: "Separates state embedding from transition modeling; explicit unseen-context and few-shot perturbation framing", cons: "More complex set-level evaluation; newer evidence and data-overlap assumptions need careful auditing", choose: "You need a virtual-cell model that represents both context and response transition", links: [
          { label: "paper", url: "https://www.biorxiv.org/content/10.1101/2025.06.26.661135v1.full" },
          { label: "code", url: "https://github.com/ArcInstitute/state" },
          { label: "Cell-Eval", url: "https://github.com/ArcInstitute/cell-eval" }
        ]
      },
      {
        name: "PerturbNet", bestFor: "Generative chemical or genetic response distributions", pros: "Continuous perturbation-to-cell-state map; supports unseen chemical and genetic perturbation questions", cons: "Generative outputs need distribution-aware metrics and uncertainty checks; harder to compare with point predictors", choose: "You care about heterogeneous response distributions, not just centroid accuracy", links: [
          { label: "paper", url: "https://doi.org/10.1038/s44320-025-00131-3" },
          { label: "code", url: "https://github.com/welch-lab/PerturbNet" }
        ]
      },
      {
        name: "LPM", bestFor: "Large perturbation-aware representation and biology-discovery probes", pros: "Designed around perturbation/readout/context structure; connects response prediction with downstream biological discovery", cons: "Scale and screen composition can dominate; discovery claims should be separated from common benchmark performance", choose: "The primary question is whether a perturbation-aware embedding preserves biology", links: [
          { label: "paper", url: "https://doi.org/10.1038/s43588-025-00870-1" },
          { label: "code", url: "https://github.com/perturblib/perturblib" }
        ]
      },
      {
        name: "Scouter", bestFor: "Biology-aware unseen-gene baseline", pros: "Makes a gene-description/text prior explicit; compact comparison against learned transcriptomic representations", cons: "Text annotations can encode bias or leakage; focused on unseen genetic perturbations; needs GO/STRING and shuffle controls", choose: "You want to test the incremental value of an explicit biology/text prior", links: [
          { label: "paper", url: "https://www.nature.com/articles/s43588-025-00912-8" },
          { label: "code", url: "https://github.com/PancakeZoy/scouter" }
        ]
      },
      {
        name: "scVIDR", bestFor: "Chemical dose-response transfer", pros: "Explicit dose-dependent latent regression; useful for dose and cross-context baselines", cons: "Narrower chemical/dose scope; VAE assumptions may not capture distributional or combinatorial genetic effects", choose: "Dose is the main axis of generalization", links: [
          { label: "paper", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10436058/" },
          { label: "code", url: "https://github.com/BhattacharyaLab/scVIDR" }
        ]
      },
      {
        name: "scLong", bestFor: "Exploratory large-scale single/double-gene perturbation modeling", pros: "Targets scale and perturbation-response scoring; relevant to synergy/suppressor analyses", cons: "Emerging evidence; independent reproduction and comparable public evaluation should precede ranking", choose: "You are extending a stable Stage 1 protocol toward larger perturbation screens", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41467-026-69102-y" }
        ]
      }
    ],
    benchmarkDatasets: [
      {
        name: "scPerturb", type: "Multi-study atlas", coverage: "44 public perturbation-response datasets; RNA, protein and ATAC", use: "Primary data index; stratify by technology, context and perturbation", links: [
          { label: "website", url: "https://scperturb.org/" },
          { label: "paper", url: "https://www.nature.com/articles/s41592-023-02144-y" },
          { label: "RNA Zenodo", url: "https://doi.org/10.5281/zenodo.7041848" }
        ]
      },
      {
        name: "PerturBase", type: "Multi-study atlas", coverage: "122 datasets from 46 studies; about 5 million cells", use: "Broader coverage for held-out study/context stress tests", links: [
          { label: "paper", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11701531/" },
          { label: "website", url: "http://www.perturbase.cn/" }
        ]
      },
      {
        name: "Norman et al.", type: "Combinatorial CRISPRi", coverage: "Two-gene perturbations in K562", use: "Combination generalization; test 0/2, 1/2 and 2/2 unseen gene components", links: [
          { label: "GEO GSE133344", url: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE133344" },
          { label: "scPerturb", url: "https://scperturb.org/" }
        ]
      },
      {
        name: "Adamson et al.", type: "Genetic Perturb-seq", coverage: "Single-gene perturbations in K562", use: "Canonical unseen-perturbation split; explicitly report systematic variation", links: [
          { label: "GEO GSE90546", url: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE90546" },
          { label: "scPerturb", url: "https://scperturb.org/" }
        ]
      },
      {
        name: "Replogle et al.", type: "Genome-scale CRISPRi", coverage: "Large K562 and RPE1 screens", use: "Scale and context generalization; prefer processed access through GWPS/scPerturb", links: [
          { label: "GWPS access", url: "https://gwps.wi.mit.edu/" },
          { label: "scPerturb", url: "https://scperturb.org/" }
        ]
      },
      {
        name: "sci-Plex", type: "Multiplexed chemical", coverage: "Drug responses across cell lines", use: "Chemical response and dose/context generalization", links: [
          { label: "GEO GSE139944", url: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE139944" },
          { label: "scPerturb", url: "https://scperturb.org/" }
        ]
      },
      {
        name: "Tahoe-100M", type: "Large chemical atlas", coverage: "100,648,790 profiles across 50 cancer cell lines and 1,100 small-molecule perturbations", use: "Modern context-aware drug response; use only when compute and licensing/access assumptions are explicit", links: [
          { label: "dataset", url: "https://github.com/ArcInstitute/arc-virtual-cell-atlas/blob/main/tahoe-100M/README.md" },
          { label: "Hugging Face", url: "https://huggingface.co/datasets/tahoebio/Tahoe-100M" }
        ]
      },
      {
        name: "scPertEval public set", type: "Protocol reference set", coverage: "Seven public processed perturbation datasets with plain HTTPS access", use: "Compare evaluation protocols and calibration choices without bundling local data into this site", links: [
          { label: "datasets guide", url: "https://github.com/Virtual-Cell-Research-Community/scPertEval/blob/main/docs/user-guide/datasets.md" },
          { label: "code", url: "https://github.com/Virtual-Cell-Research-Community/scPertEval" }
        ]
      },
      {
        name: "OP3 / Open Problems", type: "Community benchmark", coverage: "146 compounds in PBMCs with a living benchmark framing", use: "Chemical response challenge-style evaluation and public infrastructure", links: [
          { label: "paper", url: "https://proceedings.neurips.cc/paper_files/paper/2024/file/24c4d51f3ef48dd2dbab78243ecb26a1-Paper-Datasets_and_Benchmarks_Track.pdf" },
          { label: "Kaggle data", url: "https://www.kaggle.com/competitions/open-problems-single-cell-perturbations/data/" }
        ]
      }
    ],
    evaluationSuites: [
      {
        name: "scPerturBench", focus: "27 methods, 29 datasets; context and perturbation generalization", metrics: "MSE, PCC-Δ, E-distance, Wasserstein, KL divergence, Common-DEGs", recommendation: "Best starting point for a broad, reproducible comparison; retain simple baselines and inspect split manifests", links: [
          { label: "code/results", url: "https://github.com/bm2-lab/scPerturBench" },
          { label: "paper", url: "https://pubmed.ncbi.nlm.nih.gov/41381899/" }
        ]
      },
      {
        name: "Systema", focus: "Perturbation-specific effects beyond systematic variation", metrics: "Perturbed-reference Pearson-Δ, RMSE-Δ, centroid accuracy and systematic-variation diagnostics", recommendation: "Mandatory guardrail for genetic benchmarks; compare against perturbed-mean and matching-mean baselines", links: [
          { label: "paper", url: "https://www.nature.com/articles/s41587-025-02777-8" },
          { label: "code", url: "https://github.com/mlbio-epfl/systema" }
        ]
      },
      {
        name: "PerturBench", focus: "Standardized model/data/metric framework", metrics: "RMSE, cosine and configurable dataset/split evaluators", recommendation: "Good engineering harness for adding new models and predefined cross-context/combination splits", links: [
          { label: "code", url: "https://github.com/altoslabs/perturbench" },
          { label: "NeurIPS paper", url: "https://openreview.net/forum?id=PPPDuyiZaG" }
        ]
      },
      {
        name: "PertEval-scFM / PertEval", focus: "Zero-shot scFM and perturbation-representation probes", metrics: "Representation-dependent perturbation effect prediction with lightweight probes", recommendation: "Use for isolating embedding value from decoder/architecture value", links: [
          { label: "paper", url: "https://proceedings.mlr.press/v267/wenteler25a.html" },
          { label: "code", url: "https://github.com/aaronwtr/PertEval" }
        ]
      },
      {
        name: "Cell-Eval", focus: "Single-cell response metrics and data ceilings", metrics: "Per-perturbation and aggregate metric profiles plus disjoint self-split ceilings", recommendation: "Use when predictions are distributions or sets of cells; report the empirical ceiling before comparing models", links: [
          { label: "code", url: "https://github.com/ArcInstitute/cell-eval" },
          { label: "STATE", url: "https://github.com/ArcInstitute/state" }
        ]
      },
      {
        name: "scPertEval", focus: "Principled protocol comparison and calibration", metrics: "Protocol taxonomy, calibration against positive/negative controls, dynamic-range and bound-discrimination summaries", recommendation: "Use as an information router for metric choice; link to its public processed-data guide rather than copying files into the repo", links: [
          { label: "code", url: "https://github.com/Virtual-Cell-Research-Community/scPertEval" },
          { label: "datasets", url: "https://github.com/Virtual-Cell-Research-Community/scPertEval/blob/main/docs/user-guide/datasets.md" },
          { label: "paper", url: "https://doi.org/10.64898/2026.07.23.740433" }
        ]
      },
      {
        name: "scDrugPerturb-Bench", focus: "Drug-response effects, cell-state distributions and mechanisms", metrics: "Expression agreement plus literature-supported mechanism evaluation", recommendation: "Stage 1 extension for biology-grounded chemical perturbation evaluation", links: [
          { label: "code", url: "https://github.com/mindflow-cn/scDrugPerturb-Bench" }
        ]
      }
    ],
    benchmarkEvidence: [
      {
        name: "scPerturBench", type: "Common benchmark suite", task: "Single-cell perturbation-response prediction", datasets: "29 public datasets; genetic and chemical settings", split: "Cellular-context generalization (i.i.d./OOD) and perturbation generalization; report each scenario separately", metrics: "MSE; PCC-Δ; E-distance; Wasserstein; KL divergence; Common-DEGs", baselines: "Four baseline models in the suite; retain simple mean baselines where available", status: "Common-suite benchmark anchor", comparability: "Comparable within this suite; not a universal cross-paper ranking", code: "Public", data: "Public repository plus Figshare/Zenodo archives", notes: "Use the released split manifests and keep dataset, scenario and metric columns separate.", links: [{ label: "code/results", url: "https://github.com/bm2-lab/scPerturBench" }]
      },
      {
        name: "Systema", type: "Anti-shortcut protocol", task: "Perturbation-specific genetic response beyond systematic variation", datasets: "Adamson, Norman and repository-listed perturbation datasets", split: "Train/test splits with unseen genetic perturbations; preserve the repository configuration", metrics: "Perturbed-reference Pearson-Δ; RMSE-Δ; centroid accuracy; systematic-variation diagnostics", baselines: "nonctl-mean and matching-mean; add control-aware baselines", status: "Anti-shortcut guardrail", comparability: "Protocol-specific; use to qualify ordinary reference-based metrics", code: "Public", data: "Public study links and repository instructions", notes: "A high score can be misleading when a model reproduces systematic variation instead of the perturbation effect.", links: [{ label: "code", url: "https://github.com/mlbio-epfl/systema" }, { label: "paper", url: "https://www.nature.com/articles/s41587-025-02777-8" }]
      },
      {
        name: "PertEval-scFM / PertEval", type: "Representation probe", task: "Zero-shot perturbation-effect prediction from frozen scFM embeddings", datasets: "Protocol-defined perturbation datasets; pin the exact configuration", split: "Zero-shot and distribution-shift evaluations; no random-cell split substitution", metrics: "Lightweight-probe perturbation metrics reported by the framework", baselines: "Simple probe and baseline models from the evaluation protocol", status: "Representation probe", comparability: "Comparable only within the PertEval protocol", code: "Public", data: "Public code and protocol-linked inputs", notes: "Useful for isolating embedding value from decoder or task-head value; distribution shift is a central stress test.", links: [{ label: "paper", url: "https://proceedings.mlr.press/v267/wenteler25a.html" }, { label: "code", url: "https://github.com/aaronwtr/PertEval" }]
      },
      {
        name: "PerturBench", type: "Benchmarking framework", task: "Configurable perturbation prediction", datasets: "Diverse processed public datasets", split: "Framework-defined dataset/split evaluators; inspect whether cross-context or combination holdouts are enabled", metrics: "RMSE; cosine similarity; configurable evaluators", baselines: "Framework baselines plus control and mean-response baselines", status: "Engineering harness", comparability: "Comparable within the same framework configuration", code: "Public", data: "Public processed datasets via linked archives", notes: "Use as an extensible harness, not as a single universal leaderboard number.", links: [{ label: "code", url: "https://github.com/altoslabs/perturbench" }, { label: "paper", url: "https://openreview.net/forum?id=PPPDuyiZaG" }]
      },
      {
        name: "Cell-Eval", type: "Distributional evaluator", task: "Set- and distribution-level response evaluation", datasets: "Predicted versus real AnnData response sets", split: "Set/distribution comparison; inspect the selected profile and any disjoint self-split ceiling", metrics: "Differential expression plus profile-selected response metrics", baselines: "Empirical/data ceilings and simple response baselines when configured", status: "Distributional evaluator", comparability: "Best for set-valued outputs; not interchangeable with point-prediction scores", code: "Public", data: "User-supplied public AnnData inputs", notes: "Report the metric profile and the empirical ceiling alongside model scores.", links: [{ label: "code", url: "https://github.com/ArcInstitute/cell-eval" }]
      },
      {
        name: "scPertEval", type: "Protocol and calibration toolkit", task: "Benchmark-protocol calibration for perturbation responses", datasets: "Seven public perturbation datasets in the toolkit assessment", split: "Protocol taxonomy covers representation, metric, score transform and reporting choices", metrics: "DRF; BDS; per-gene differential expression; calibrated score profiles", baselines: "Positive and negative controls; calibration and bound-discrimination checks", status: "Protocol calibration", comparability: "Meta-evaluation of protocols, not a model leaderboard", code: "Public", data: "Public processed-data guide and linked sources", notes: "Use it to document metric choice and calibration before interpreting model deltas.", links: [{ label: "code", url: "https://github.com/Virtual-Cell-Research-Community/scPertEval" }, { label: "datasets", url: "https://github.com/Virtual-Cell-Research-Community/scPertEval/blob/main/docs/user-guide/datasets.md" }]
      },
      {
        name: "GEARS", type: "Perturbation-response model", task: "Unseen single and combinatorial genetic perturbations", datasets: "Adamson and Norman canonical perturbation studies", split: "Held-out perturbations and combinations as defined by the paper/repository", metrics: "Paper-defined; pin the exact metric and split before comparison", baselines: "Paper baselines plus a matched common-suite control/mean baseline", status: "Source-reported model result", comparability: "Not directly comparable outside a matched protocol", code: "Public", data: "Public study landing pages and repository instructions", notes: "Treat the original result as a reading anchor; re-use the common suite protocol for any new comparison.", links: [{ label: "code", url: "https://github.com/snap-stanford/GEARS" }]
      },
      {
        name: "CPA / chemCPA", type: "Compositional response model", task: "Compositional genetic or chemical response across dose/context", datasets: "Paper-specific perturbation datasets; pin the exact dataset version", split: "Dose, cell-context, species, drug or combination holdouts as configured", metrics: "Paper-defined; record exact normalization and aggregation", baselines: "Matched common-suite baselines and paper baselines", status: "Protocol-specific model result", comparability: "Comparable only after dataset, split and metric alignment", code: "Public", data: "Public paper-linked datasets and repositories", notes: "Strong candidate when the scientific question is compositional intervention transfer.", links: [{ label: "CPA paper", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10258562/" }]
      },
      {
        name: "CellOT", type: "Distributional response model", task: "Unpaired treated/control distribution transport", datasets: "Paper-specific chemical or drug-response studies", split: "Unpaired treated/control or cross-condition settings; pin the source configuration", metrics: "Distribution-aware metrics; exact metric depends on the paper or suite", baselines: "Mean/transport baselines with the same preprocessing", status: "Distributional model", comparability: "Not directly comparable to point predictors without output-type alignment", code: "Public", data: "Public paper-linked sources", notes: "Evaluate population-level distribution fidelity separately from per-cell reconstruction.", links: [{ label: "paper", url: "https://www.nature.com/articles/s41592-023-01969-x" }]
      },
      {
        name: "scGPT / scFoundation probes", type: "Foundation-model probe", task: "Perturbation-aware embedding or frozen-backbone response probe", datasets: "Task- and configuration-specific public perturbation sets", split: "Zero-shot or held-out perturbation/context; pin pretraining overlap", metrics: "Probe-dependent; report the task metric and probe capacity", baselines: "Simple expression, matched-control and linear-probe baselines", status: "Representation probe", comparability: "Comparable only within the matched probe protocol", code: "Public", data: "Public repositories and task-linked datasets", notes: "Separate representation value from the response decoder, fine-tuning budget and pretraining overlap.", links: [{ label: "scGPT", url: "https://github.com/bowang-lab/scGPT" }, { label: "PertEval", url: "https://github.com/aaronwtr/PertEval" }]
      }
    ],
    sourceRegistry: [
      {
        id: "SR-01", name: "Awesome single-cell foundation-model catalog", type: "Living catalog", publication: "Public GitHub list", accessed: "2026-09-08", status: "Discovery index", artifacts: "Paper, repository and dataset links", role: "Broad model discovery", note: "Use as a map only; promote entries after primary-source and protocol review.", links: [{ label: "catalog", url: "https://github.com/OmicsML/awesome-foundation-model-single-cell-papers" }]
      },
      {
        id: "SR-02", name: "scPerturBench", type: "Benchmark suite", publication: "Nature Methods + public repository", accessed: "2026-09-08", status: "Published + public code", artifacts: "Code, results and linked data archives", role: "Stage 1 common-suite anchor", note: "Pin the release and retain dataset, scenario and metric boundaries.", links: [{ label: "repository", url: "https://github.com/bm2-lab/scPerturBench" }, { label: "paper", url: "https://pubmed.ncbi.nlm.nih.gov/41381899/" }]
      },
      {
        id: "SR-03", name: "Systema", type: "Anti-shortcut protocol", publication: "Nature Biotechnology + public repository", accessed: "2026-09-08", status: "Published + public code", artifacts: "Paper, code and split instructions", role: "Perturbation-specific effect guardrail", note: "Use perturbed-reference metrics and simple perturbed-mean controls before reading model deltas.", links: [{ label: "repository", url: "https://github.com/mlbio-epfl/systema" }, { label: "paper", url: "https://www.nature.com/articles/s41587-025-02777-8" }]
      },
      {
        id: "SR-04", name: "PertEval-scFM / PertEval", type: "Representation benchmark", publication: "PMLR paper + public repository", accessed: "2026-09-08", status: "Published + public code", artifacts: "Paper, code and protocol-linked inputs", role: "Frozen scFM embedding probes", note: "Keep probe capacity, decoder choice and pretraining overlap explicit.", links: [{ label: "paper", url: "https://proceedings.mlr.press/v267/wenteler25a.html" }, { label: "repository", url: "https://github.com/aaronwtr/PertEval" }]
      },
      {
        id: "SR-05", name: "PerturBench", type: "Benchmarking framework", publication: "Public paper and repository", accessed: "2026-09-08", status: "Public framework", artifacts: "Code and linked processed datasets", role: "Reusable evaluation harness", note: "Treat framework outputs as configuration-specific rather than one universal score.", links: [{ label: "repository", url: "https://github.com/altoslabs/perturbench" }, { label: "paper", url: "https://openreview.net/forum?id=PPPDuyiZaG" }]
      },
      {
        id: "SR-06", name: "Cell-Eval", type: "Distributional evaluator", publication: "Public repository", accessed: "2026-09-08", status: "Public evaluator", artifacts: "Code and evaluator documentation", role: "Set- and distribution-level responses", note: "Record the metric profile and empirical ceiling for every future evaluation.", links: [{ label: "repository", url: "https://github.com/ArcInstitute/cell-eval" }]
      },
      {
        id: "SR-07", name: "scPertEval", type: "Protocol and calibration toolkit", publication: "Public preprint, repository and dataset guide", accessed: "2026-09-08", status: "Public protocol + code", artifacts: "Code, protocol notes and public dataset guide", role: "Metric calibration and reporting", note: "Use for protocol selection; do not copy linked data into this site.", links: [{ label: "repository", url: "https://github.com/Virtual-Cell-Research-Community/scPertEval" }, { label: "datasets", url: "https://github.com/Virtual-Cell-Research-Community/scPertEval/blob/main/docs/user-guide/datasets.md" }]
      },
      {
        id: "SR-08", name: "GEARS", type: "Perturbation-response model", publication: "Nature Biotechnology + public repository", accessed: "2026-09-08", status: "Published + public code", artifacts: "Paper, code and public study references", role: "Canonical genetic baseline", note: "Original results are reading anchors; common-protocol comparison still needs split alignment.", links: [{ label: "repository", url: "https://github.com/snap-stanford/GEARS" }, { label: "paper", url: "https://www.nature.com/articles/s41587-023-01905-6" }]
      },
      {
        id: "SR-09", name: "CPA / chemCPA", type: "Compositional response model", publication: "Peer-reviewed paper + public repository", accessed: "2026-09-08", status: "Published + public code", artifacts: "Paper, code and linked study datasets", role: "Dose, context and intervention composition", note: "Pin normalization, dose and context holdouts before comparing source-reported values.", links: [{ label: "CPA paper", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10258562/" }, { label: "chemCPA", url: "https://github.com/theislab/chemCPA" }]
      },
      {
        id: "SR-10", name: "Tahoe-100M", type: "Perturbation atlas", publication: "Public data landing pages", accessed: "2026-09-08", status: "Public dataset access", artifacts: "Public README and linked dataset access", role: "Large chemical/context benchmark candidate", note: "Track access, compute requirements and pretraining overlap; this site stores links only.", links: [{ label: "atlas README", url: "https://github.com/ArcInstitute/arc-virtual-cell-atlas/blob/main/tahoe-100M/README.md" }, { label: "dataset", url: "https://huggingface.co/datasets/tahoebio/Tahoe-100M" }]
      },
      {
        id: "SR-11", name: "LPM", type: "Perturbation representation model", publication: "Peer-reviewed paper", accessed: "2026-09-08", status: "Published paper", artifacts: "Public DOI record", role: "Biology-aware perturbation embeddings", note: "Use as an embedding candidate; compare with matched frozen-probe protocols.", links: [{ label: "paper", url: "https://doi.org/10.1038/s43588-025-00870-1" }]
      },
      {
        id: "SR-12", name: "Scouter", type: "Biology-aware representation model", publication: "Nature Computational Science + public code", accessed: "2026-09-08", status: "Published + public code", artifacts: "Paper, repository and GenePT-linked representation path", role: "Knowledge-informed embedding candidate", note: "Separate text-knowledge priors from learned perturbation-response evidence.", links: [{ label: "paper", url: "https://www.nature.com/articles/s43588-025-00912-8" }, { label: "repository", url: "https://github.com/PancakeZoy/scouter" }]
      },
      {
        id: "SR-13", name: "VCBench", type: "Virtual-cell benchmark", publication: "Public v1.0.0 repository + preprint", accessed: "2026-09-08", status: "Public benchmark release", artifacts: "Code, capability matrix and contamination manifest", role: "Stage 2 protocol gate", note: "Use matched capability rows only; not every dimension is direct response prediction.", links: [{ label: "repository", url: "https://github.com/AppliedScientific/VCBench" }, { label: "preprint", url: "https://doi.org/10.64898/2026.06.18.733146" }]
      },
      {
        id: "SR-14", name: "sc-virtualcell-bench", type: "Community perturbation benchmark", publication: "Early-phase public repository", accessed: "2026-09-08", status: "Early-phase public code", artifacts: "Repository, Cell-Eval references and baseline list", role: "Stage 2 community benchmark", note: "Pin a commit and audit data provenance before using its model coverage or scores.", links: [{ label: "repository", url: "https://github.com/shrutisshikhare/sc-virtualcell-bench" }, { label: "VCC", url: "https://virtualcellchallenge.org/" }]
      },
      {
        id: "SR-15", name: "scBench", type: "Single-cell workflow benchmark", publication: "Public executable repository", accessed: "2026-09-08", status: "Public benchmark release", artifacts: "Verifiable problems and deterministic grader", role: "Agent workflow evaluation", note: "Pair task scores with biological validity, failure taxonomy and environment records.", links: [{ label: "repository", url: "https://github.com/latchbio/scbench" }]
      },
      {
        id: "SR-16", name: "BixBench", type: "Computational-biology agent benchmark", publication: "Public benchmark + preprint", accessed: "2026-09-08", status: "Public benchmark release", artifacts: "Notebook-derived tasks and benchmark documentation", role: "Long multi-step agent trajectories", note: "Environment parity and intermediate artifacts are part of reproducibility evidence.", links: [{ label: "repository", url: "https://github.com/Future-House/BixBench" }, { label: "paper", url: "https://arxiv.org/abs/2503.00096" }]
      },
      {
        id: "SR-17", name: "BioAgent Bench", type: "Bioinformatics agent benchmark", publication: "Public repository + preprint", accessed: "2026-09-08", status: "Public benchmark; verify tasks", artifacts: "Task data, truth files, Dockerfiles and run scripts", role: "Robustness and failure handling", note: "Audit task-level truth provenance and separate exact-match, scientific validity and robustness.", links: [{ label: "repository", url: "https://github.com/bioagent-bench/bioagent-bench" }, { label: "paper", url: "https://arxiv.org/abs/2601.21800" }]
      },
      {
        id: "SR-18", name: "LAB-Bench", type: "Broad biology capability benchmark", publication: "Public benchmark + paper", accessed: "2026-09-08", status: "Public knowledge benchmark", artifacts: "Question sets and benchmark documentation", role: "Knowledge/reasoning pre-screen", note: "Use as a knowledge layer, not as evidence of safe or reproducible workflow execution.", links: [{ label: "repository", url: "https://github.com/Future-House/lab-bench" }, { label: "paper", url: "https://arxiv.org/abs/2407.10362" }]
      },
      {
        id: "SR-19", name: "ClawBio", type: "Skill library and tool layer", publication: "Public repository + MCP documentation", accessed: "2026-09-08", status: "Public tool layer", artifacts: "Public skills, local-first packaging and tool documentation", role: "Auditable bioinformatics execution layer", note: "Version each skill and review privacy, provenance and hosted integration boundaries separately.", links: [{ label: "repository", url: "https://github.com/ClawBio/ClawBio" }, { label: "MCP docs", url: "https://docs.clawbio.ai/reference/mcp" }]
      }
    ],
    evaluationProtocols: [
      {
        priority: "P0", name: "Perturbation-exclusive holdout", definition: "Every cell carrying a held-out perturbation is excluded from training, validation and tuning.", question: "Can the model infer a response to an intervention it has not seen?", risk: "Perturbation identity or close combination partners can leak through random cell splits.", status: "Required Stage 1 protocol"
      },
      {
        priority: "P0", name: "Context-exclusive holdout", definition: "Hold out a cell type, donor, tissue, species, disease state or batch context while retaining the perturbation only where the protocol allows it.", question: "Can the model transfer a response across biological context?", risk: "Shared donor, cell-state or batch signatures can make a nominal OOD split effectively IID.", status: "Required Stage 1 protocol"
      },
      {
        priority: "P0", name: "Combined perturbation × context holdout", definition: "Hold out the intervention-context pair and document whether each marginal appears elsewhere in training.", question: "Can the model compose known factors under a genuinely novel pairing?", risk: "Reporting only marginal overlap hides the difficulty of the pairwise generalization task.", status: "Required Stage 1 protocol"
      },
      {
        priority: "P1", name: "Distributional / set-valued split", definition: "Evaluate predicted populations against disjoint real response sets and report the profile, empirical ceiling and aggregation level.", question: "Does the model reproduce the response distribution rather than one average profile?", risk: "A point metric can reward mean matching while missing subpopulation structure.", status: "Use for Cell-Eval / CellOT-style outputs"
      },
      {
        priority: "P1", name: "Pretraining-overlap audit", definition: "Record public pretraining corpora, perturbation identifiers, cell contexts and any benchmark data overlap before interpreting a zero-shot score.", question: "Is the test actually unseen for the representation?", risk: "A frozen embedding can look generalizable when the relevant intervention or context was present during pretraining.", status: "Required disclosure"
      }
    ],
    benchmarkGuardrails: [
      {
        name: "Control-mean baseline", purpose: "Minimum response baseline", implementation: "Predict the matched control mean or the control-conditioned response for each held-out group.", interpretation: "If a complex model cannot beat it, treat the claimed biological gain as unsupported.", status: "Required"
      },
      {
        name: "Perturbed-mean baseline", purpose: "Detect dataset/systematic-variation shortcuts", implementation: "Use the average of observed perturbed cells under the permitted training information, following the Systema protocol.", interpretation: "A small margin over this baseline suggests the task may be dominated by dataset-level structure.", status: "Required for genetic response"
      },
      {
        name: "Matching-mean baseline", purpose: "Control for matched context", implementation: "Match cell context and nuisance factors without using the held-out perturbation response.", interpretation: "Use the gap to separate perturbation-specific signal from context matching.", status: "Required when available"
      },
      {
        name: "Random-expression / shuffled-label baseline", purpose: "Embedding sanity check", implementation: "Break perturbation labels or use a simple expression representation while preserving the split and probe budget.", interpretation: "A biology-aware embedding should beat the control under the same information budget.", status: "Required for embedding probes"
      },
      {
        name: "Systematic-variation diagnostic", purpose: "Anti-shortcut check", implementation: "Report perturbed-reference deltas, centroid accuracy and the systematic-variation diagnostics alongside ordinary correlation or RMSE.", interpretation: "Do not call ordinary reference-based agreement a perturbation-specific win without this check.", status: "Required"
      },
      {
        name: "Empirical data ceiling", purpose: "Upper-bound interpretation", implementation: "Use disjoint self-splits or the evaluator's empirical ceiling profile for the same data and metric.", interpretation: "A model close to the ceiling may have little room for improvement even if the absolute score is modest.", status: "Required for set-valued evaluation"
      }
    ],
    embeddingTasks: [
      {
        priority: "P0", task: "Perturbation-aware cell embeddings", probe: "Can a cell embedding retrieve the same perturbation across held-out contexts, while separating control from response?", biology: "Perturbation identity retrieval, cell-state classification, cross-context kNN, response-state clustering", guardrail: "Use held-out perturbations and contexts; report matched-control and random-expression baselines"
      },
      {
        priority: "P0", task: "Perturbation embeddings", probe: "Do perturbation vectors place functionally related interventions near one another?", biology: "GO/Reactome enrichment, known gene–gene interactions, pathway and genetic-interaction retrieval", guardrail: "Do not score only by cosine similarity; compare against GenePT, GO/STRING and shuffled-label controls"
      },
      {
        priority: "P1", task: "Effect-size and direction embeddings", probe: "Does the representation preserve the perturbation-specific delta rather than the average treatment shift?", biology: "Top-DEG recovery, sign/direction accuracy, Pearson-Δ, perturbation-specific centroid accuracy", guardrail: "Use Systema-style perturbed references and quantify systematic variation"
      },
      {
        priority: "P1", task: "Context transfer embeddings", probe: "Can the representation transfer a perturbation response to an unseen cell type, donor, species or disease state?", biology: "Cross-context retrieval and linear-probe performance under zero/few-shot splits", guardrail: "Pre-register overlap between pretraining data and test contexts; avoid random-cell splits"
      },
      {
        priority: "P2", task: "Mechanism and uncertainty", probe: "Do embeddings expose plausible mechanisms and calibrated uncertainty for weakly supported predictions?", biology: "Pathway recovery, genetic interaction class, confidence-vs-error and empirical data-ceiling gap", guardrail: "Treat interpretability as a separate endpoint from expression reconstruction"
      }
    ],
    roadmap: [
      {
        name: "Tahoe-x1", status: "Stage 2 — perturbation-trained scale", note: "3B-parameter perturbation-trained single-cell FM; evaluate after the Stage 1 baselines and data-overlap audit", links: [
          { label: "code", url: "https://github.com/tahoebio/tahoe-x1" },
          { label: "preprint", url: "https://www.biorxiv.org/content/10.1101/2025.10.23.683759v1.full" }
        ]
      },
      {
        name: "GeneJEPA", status: "Stage 2 — predictive transcriptome embeddings", note: "JEPA-style latent prediction trained on Tahoe-100M; promising embedding candidate, but keep separate from direct response models", links: [
          { label: "code", url: "https://github.com/BiostateAI/GeneJEPA" }
        ]
      },
      {
        name: "X-Cell", status: "Stage 2 — diffusion virtual cell", note: "Genome-scale perturbation prediction across cellular contexts; prioritize after the common benchmark harness is stable", links: [
          { label: "project", url: "https://xaira-therapeutics.github.io/X-Cell/" },
          { label: "paper PDF", url: "https://www.cdn.xaira.com/papers/X_CELL_V1_0316_final.pdf" }
        ]
      },
      {
        name: "SCALE / OCOO-T", status: "Stage 2 — emerging virtual-cell models", note: "Large-scale endpoint transport and set-level/diffusion approaches; track releases and independent evaluation before ranking", links: [
          { label: "SCALE", url: "https://arxiv.org/abs/2603.17380" },
          { label: "OCOO-T", url: "https://www.biorxiv.org/content/10.64898/2026.06.08.731000v1.full" }
        ]
      },
      {
        name: "Bioinformatics-specific agents & AI tools (2024–2026)", status: "Stage 2 — backlog topic", note: "Survey domain-specific agents, tool/skill/MCP libraries and execution benchmarks; separate answer quality, code quality, pipeline execution, biological interpretation, reproducibility and safety evidence", links: [
          { label: "BixBench", url: "https://github.com/Future-House/BixBench" },
          { label: "scBench", url: "https://github.com/latchbio/scbench" },
          { label: "BioAgent Bench", url: "https://arxiv.org/abs/2601.21800" },
          { label: "ClawBio", url: "https://github.com/ClawBio/ClawBio" }
        ]
      },
      {
        name: "Broader scFM and virtual-cell catalog", status: "Backlog", note: "GeneCompass, scMulan, CellPLM, UCE, scPRINT, CellFM, CellOS, AIDO Cell, AlphaCell and related models from the awesome list; add only when perturbation-specific protocols are pinned", links: [
          { label: "awesome list", url: "https://github.com/OmicsML/awesome-foundation-model-single-cell-papers" }
        ]
      }
    ],
    stage2VirtualCell: [
      {
        priority: "P0", name: "VCBench", year: "2026", kind: "Capability-stratified benchmark", task: "Separate perturbation prediction, representation probes and other single-cell FM capabilities", evidence: "Five models × five dimensions against pre-registered trivial and strongest non-FM baselines; evaluator aligned with Cell-Eval", status: "Public v1.0.0; reproducibility candidate", pros: "Explicit baselines, contamination manifest and manuscript-to-code traceability", cons: "Still a benchmark release rather than independent consensus; some dimensions are not direct response prediction", next: "Pin v1.0.0, record dimension/split definitions, then compare only matched capability rows", links: [{ label: "repository", url: "https://github.com/AppliedScientific/VCBench" }, { label: "preprint", url: "https://doi.org/10.64898/2026.06.18.733146" }]
      },
      {
        priority: "P0", name: "sc-virtualcell-bench", year: "2026", kind: "Community perturbation benchmark", task: "Test whether scFM or hybrid models beat strong statistical baselines on response prediction", evidence: "Seven Cell-Eval metrics; mean, linear-additive and KNN baselines; GEARS and frozen scGPT listed in the public project", status: "Early-phase community implementation", pros: "Directly targets the mean-predictor question and keeps lightweight baselines visible", cons: "Repository labels itself early phase; model and result coverage can change, so pin a commit before citing", next: "Audit data provenance, commit hash, model status and exact VCC/Cell-Eval profile", links: [{ label: "repository", url: "https://github.com/shrutisshikhare/sc-virtualcell-bench" }, { label: "VCC", url: "https://virtualcellchallenge.org/" }]
      },
      {
        priority: "P0", name: "Tahoe-x1", year: "2025", kind: "Perturbation-trained single-cell FM", task: "Large-scale chemical perturbation response modeling", evidence: "Public project and preprint describe a 3B-parameter perturbation-trained model; independent common-suite coverage is not pinned", status: "Model candidate; source-specific evidence", pros: "Directly aligned with perturbation-trained scale and modern chemical atlas settings", cons: "Large compute and data-overlap audit burden; source claims are not a common benchmark score", next: "Map its public training/evaluation split to scPerturBench or Cell-Eval before ranking", links: [{ label: "code", url: "https://github.com/tahoebio/tahoe-x1" }, { label: "preprint", url: "https://www.biorxiv.org/content/10.1101/2025.10.23.683759v1.full" }]
      },
      {
        priority: "P0", name: "X-Cell", year: "2026", kind: "Diffusion virtual-cell model", task: "Genome-scale perturbation prediction across cellular contexts", evidence: "Public project and paper PDF; matched public benchmark protocol is not yet pinned in this router", status: "Emerging model; verify protocol", pros: "Targets broad perturbation/context coverage and generative response modeling", cons: "High architecture and compute complexity; source-reported claims should not be mixed with Stage 1 scores", next: "Extract task, dataset, split, metric and checkpoint provenance from the public paper before comparison", links: [{ label: "project", url: "https://xaira-therapeutics.github.io/X-Cell/" }, { label: "paper", url: "https://www.cdn.xaira.com/papers/X_CELL_V1_0316_final.pdf" }]
      },
      {
        priority: "P1", name: "GeneJEPA", year: "2025", kind: "Predictive transcriptome embedding", task: "Learn latent transcriptome dynamics and evaluate perturbation-aware representations", evidence: "Public repository describes JEPA-style predictive embeddings trained on Tahoe-100M; direct matched perturbation score is not pinned", status: "Embedding candidate; protocol-specific", pros: "Natural fit for the perturbation-aware embedding agenda and latent prediction framing", cons: "Embedding quality can be confounded by probe capacity, pretraining overlap and downstream decoder choice", next: "Evaluate frozen embeddings with PertEval-style probes and the Stage 1 overlap audit", links: [{ label: "repository", url: "https://github.com/BiostateAI/GeneJEPA" }]
      },
      {
        priority: "P1", name: "OCOO-T", year: "2026", kind: "Flow-matching virtual-cell model", task: "Transcriptional response prediction for genetic, chemical and cytokine perturbations", evidence: "Public arXiv paper reports evaluations on Tahoe100M, Replogle and PBMC benchmarks; independent reproduction and matched score table are not pinned", status: "Emerging preprint; source-reported", pros: "Simple continuous-expression denoising formulation with explicit perturbation, dosage and context conditioning", cons: "Preprint evidence and source-specific metrics; model simplicity does not guarantee cross-study comparability", next: "Record exact benchmark configurations and test output-type/metric alignment with Cell-Eval", links: [{ label: "paper", url: "https://arxiv.org/abs/2606.12838" }]
      },
      {
        priority: "P1", name: "Chreode", year: "2026", kind: "Temporal cell world model", task: "One-step cell-state transition and perturbation prediction", evidence: "Public arXiv paper describes a shared scVI encoder, DiT dynamics backbone and transfer to GEARS/Norman; results remain source-reported", status: "Emerging preprint; source-reported", pros: "Adds temporal/dynamics structure and an explicit transfer test to perturbation prediction", cons: "Developmental-trajectory pretraining may not transfer uniformly to CRISPR or drug response; submitted status is not peer-reviewed", next: "Separate temporal forecasting from static response prediction and match the holdout definition", links: [{ label: "paper", url: "https://arxiv.org/abs/2605.28111" }]
      },
      {
        priority: "P2", name: "CellForge / VCWorld", year: "2025–2026", kind: "Agentic or world-model direction", task: "Automated virtual-cell design and mechanistic biological simulation", evidence: "Public preprints propose multi-agent architecture design or biological world-model reasoning; direct perturbation benchmark coverage is not pinned", status: "Research direction; keep off Stage 1 ranking", pros: "Connects model design, mechanistic reasoning and virtual-cell simulation", cons: "Broader scope makes it difficult to compare with gene-expression response predictors; strong verification burden", next: "Track datasets, code, mechanistic validation and independently reproducible response metrics", links: [{ label: "CellForge", url: "https://arxiv.org/abs/2508.02276" }, { label: "VCWorld", url: "https://arxiv.org/abs/2512.00306" }]
      }
    ],
    stage2AgentTools: [
      {
        priority: "P0", name: "scBench", year: "2024–2026", kind: "Single-cell workflow benchmark", bestFor: "Concrete scRNA-seq analysis tasks with checkable outputs", evidence: "Public executable benchmark with 195 workflow problems and deterministic grading", status: "Public benchmark anchor", pros: "Narrow, concrete and reproducible; directly useful for agent selection", cons: "Does not cover the full scientific-quality, safety or biological-validity envelope", next: "Pair task accuracy with failure taxonomy, data leakage checks and biological correctness review", links: [{ label: "repository", url: "https://github.com/latchbio/scbench" }]
      },
      {
        priority: "P0", name: "BixBench", year: "2025", kind: "Computational-biology agent benchmark", bestFor: "Long, multi-step dataset exploration and interpretation", evidence: "Public benchmark built from real notebook-derived computational-biology tasks", status: "Public benchmark; execution required", pros: "Tests exploration, code execution, hypothesis generation and validation in one trajectory", cons: "Costly to reproduce and broader than single-cell perturbation; environment parity matters", next: "Log tool permissions, environment versions, intermediate artifacts and biological validity separately", links: [{ label: "repository", url: "https://github.com/Future-House/BixBench" }, { label: "paper", url: "https://arxiv.org/abs/2503.00096" }]
      },
      {
        priority: "P0", name: "BioAgent Bench", year: "2026", kind: "End-to-end bioinformatics benchmark", bestFor: "Pipeline completion and robustness to corrupted inputs, decoys and prompt bloat", evidence: "Public repository contains task-specific data, truth files, Dockerfiles and run scripts; the benchmark explicitly warns that truth quality varies by task", status: "Public benchmark; verification required", pros: "Concrete output artifacts and adversarial robustness tests across multiple bioinformatics areas", cons: "Broad rather than sc-specific; LLM judging and reference-data assumptions add another evidence layer", next: "Audit task-level truth provenance and score exact-match, scientific validity and robustness separately", links: [{ label: "repository", url: "https://github.com/bioagent-bench/bioagent-bench" }, { label: "paper", url: "https://arxiv.org/abs/2601.21800" }]
      },
      {
        priority: "P1", name: "PromptBio-Bench", year: "2026", kind: "Bioinformatics agent benchmark", bestFor: "End-to-end data-analysis agents under a standardized prompt/task interface", evidence: "Public bioRxiv record; full benchmark details and release status should be verified before use", status: "Emerging preprint; verify release", pros: "Directly aligned with agentic bioinformatics analysis and community tracking", cons: "Preprint and access status can change; do not treat a title or abstract as validated benchmark evidence", next: "Confirm public task files, scoring protocol, environment and baseline agents", links: [{ label: "preprint", url: "https://www.biorxiv.org/content/10.64898/2026.05.05.723092v1" }]
      },
      {
        priority: "P1", name: "LAB-Bench", year: "2024", kind: "Broad biology capability benchmark", bestFor: "Literature, figures, databases and sequence reasoning pre-screening", evidence: "Public benchmark and paper cover multiple biology reasoning categories", status: "Public knowledge benchmark", pros: "Broad biology coverage and useful pre-screen for knowledge/reasoning capability", cons: "Mostly question answering; weak evidence for reproducible tool execution or safe pipeline operation", next: "Use only as a knowledge layer before workflow benchmarks; record category-level scores", links: [{ label: "repository", url: "https://github.com/Future-House/lab-bench" }, { label: "paper", url: "https://arxiv.org/abs/2407.10362" }]
      },
      {
        priority: "P1", name: "ClawBio", year: "2025–2026", kind: "Local-first skill library and MCP server", bestFor: "Reusable bioinformatics skills in a local, auditable tool loop", evidence: "Public repository and MCP documentation; it is an execution/tool layer, not a standardized performance benchmark", status: "Public tool layer; heterogeneous maturity", pros: "Modular skills, local-first option, MCP compatibility and reproducibility-oriented packaging", cons: "Skill quality varies; hosted/API integrations require separate privacy and provenance review", next: "Version each skill, record input/output contracts and evaluate with scBench/BixBench-style tasks", links: [{ label: "repository", url: "https://github.com/ClawBio/ClawBio" }, { label: "MCP docs", url: "https://docs.clawbio.ai/reference/mcp" }]
      }
    ],
    agentSelection: [
      {
        name: "scBench", kind: "Single-cell workflow benchmark", bestFor: "Selecting or stress-testing agents for practical scRNA-seq analysis", pros: "195 verifiable problems; deterministic graders; covers six platforms and six workflow categories", cons: "Narrower than general bioinformatics; pass/fail structure does not capture every scientific-quality or safety issue", choose: "The agent must perform concrete single-cell analysis tasks with checkable outputs", links: [
          { label: "benchmark", url: "https://github.com/latchbio/scbench" }
        ]
      },
      {
        name: "BixBench", kind: "Computational-biology agent benchmark", bestFor: "Long, multi-step dataset exploration and biological interpretation", pros: "Real published notebook-derived tasks; tests dataset exploration, code execution, hypotheses and validation", cons: "Requires an execution environment and can be costly to reproduce; not specific to single-cell or perturbation response", choose: "You need a broad end-to-end computational-biology capability test", links: [
          { label: "benchmark", url: "https://github.com/Future-House/BixBench" },
          { label: "paper", url: "https://arxiv.org/abs/2503.00096" }
        ]
      },
      {
        name: "BioAgent Bench", kind: "End-to-end bioinformatics benchmark", bestFor: "Pipeline completion and robustness under controlled failure modes", pros: "Concrete output artifacts; covers RNA-seq, variant calling and metagenomics; tests corrupted inputs, decoys and prompt bloat", cons: "Broad rather than sc-specific; LLM-based grading adds an evaluation layer; privacy and proprietary-reference constraints still matter", choose: "Robustness and safe handling of realistic pipeline failures are first-class requirements", links: [
          { label: "paper", url: "https://arxiv.org/abs/2601.21800" }
        ]
      },
      {
        name: "LAB-Bench", kind: "Broad biology capability benchmark", bestFor: "Literature, figures, databases and sequence reasoning", pros: "Broad biology research coverage; useful for knowledge and reasoning pre-screening", cons: "Mostly question-answering rather than executable workflows; weak evidence for reproducibility or tool-use reliability", choose: "You want to measure biology knowledge before investing in full agent execution tests", links: [
          { label: "paper", url: "https://arxiv.org/abs/2407.10362" },
          { label: "code/data", url: "https://github.com/Future-House/lab-bench" }
        ]
      },
      {
        name: "ClawBio", kind: "Local-first skill library and MCP server", bestFor: "Running reusable bioinformatics skills in a local, reproducible tool loop", pros: "Modular skills; local-first and MCP-compatible; demo data and reproducibility-oriented packaging", cons: "A tool library, not a standardized benchmark; skill maturity is heterogeneous; hosted/API skills require separate privacy review", choose: "You need an extensible local tool layer rather than another model leaderboard", links: [
          { label: "repository", url: "https://github.com/ClawBio/ClawBio" },
          { label: "MCP docs", url: "https://docs.clawbio.ai/reference/mcp" }
        ]
      }
    ]
  },

  // ---- Blog posts (title + link; full posts live in blog/posts/) ----
  posts: [
    {
      date: "2026-09-08", tag: "Research", title: "Stage 1 guide to perturbation models, virtual cells, and biology-aware embeddings",
      desc: "A ranked model core, benchmark datasets and suites, and a protocol for evaluating perturbation-aware embeddings without mistaking systematic variation for biology.",
      url: "/blog/posts/2026-09-08-perturbation-virtual-cell-guide.html"
    },
    {
      date: "2026-09-08", tag: "Data", title: "First source-linked leaderboard snapshot",
      desc: "The placeholder rows have been replaced with source-linked model metadata and published evaluation snapshots; unsupported metrics remain null.",
      url: "/blog/posts/2026-09-08-source-linked-data.html"
    },
    {
      date: "2026-09-08", tag: "Methodology", title: "How the leaderboard metrics are defined",
      desc: "Current definitions for annotation agreement, gene-set term coverage, batch integration, and executable workflow accuracy.",
      url: "/blog/posts/2026-09-08-methodology.html"
    },
    {
      date: "2026-09-07", tag: "Site", title: "Welcome to scAI Index",
      desc: "Why we are tracking single-cell foundation models and general LLMs for scRNA-seq analysis.",
      url: "/blog/posts/2026-09-07-welcome.html"
    }
  ]
};
