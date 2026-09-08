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

  // ---- Blog posts (title + link; full posts live in blog/posts/) ----
  posts: [
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
