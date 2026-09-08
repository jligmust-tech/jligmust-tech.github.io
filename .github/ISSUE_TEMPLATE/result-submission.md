---
name: Public benchmark result
about: Submit a source-linked model or agent result for review without merging it into the official leaderboard automatically.
title: "[Result] "
labels: "result,needs-review"
---

## Result identity

- Study or benchmark:
- Model / agent name:
- Model version:
- Model commit or release tag:
- Contributor / affiliation (optional):

## Publication and evidence status

- `publication_status` (`unpublished`, `preprint`, `under review`, `published`, or `public release`):
- `evidence_status` (`submitted`, `public-source verified`, `protocol-comparable`, `needs clarification`, or `not comparable`):
- `submitted_at` (ISO 8601, e.g. `2026-09-08`):
- `status_updated_at` (ISO 8601; required even when unpublished):
- `published_at` (leave blank if unpublished or under review):
- `last_verified_at` (ISO 8601):

## Evaluation record

- Dataset or suite:
- Split or holdout:
- Endpoint:
- Metric:
- Score:
- Score unit / direction:
- Uncertainty or interval:
- Repeat count:
- Baseline:
- Pretraining overlap disclosure:

## Public provenance

- Code or configuration URL:
- Paper / preprint / public source URL:
- License note:
- Contributor note:

## Checklist

- [ ] The dataset, split, endpoint, metric, baseline, and model version are explicit.
- [ ] All evidence links are public and do not require private credentials.
- [ ] No private database files, proprietary downloads, model weights, or access tokens are attached.
- [ ] `status_updated_at` is filled in even if the result is unpublished.
- [ ] I understand that source-reported or community-submitted scores remain separate until protocol review.
