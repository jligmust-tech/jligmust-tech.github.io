---
name: New public study or benchmark
about: Add a public study, benchmark, dataset landing page, or model release to the research router.
title: "[New study] "
labels: "research,needs-review"
---

## Study identity

- Study or benchmark name:
- Study type:
- Contributor / affiliation (optional):

## Publication and evidence status

- `publication_status` (`unpublished`, `preprint`, `under review`, `published`, or `public release`):
- `evidence_status` (`submitted`, `public-source verified`, `protocol-comparable`, `needs clarification`, or `not comparable`):
- `submitted_at` (ISO 8601, e.g. `2026-09-08`):
- `status_updated_at` (ISO 8601; required even when unpublished):
- `published_at` (leave blank if unpublished or under review):
- `last_verified_at` (ISO 8601):

## Public sources

- Paper / preprint URL:
- Repository URL:
- Dataset or challenge URL:
- Preprint or public-release date:

## Study details

- Benchmark or task:
- Holdout or split:
- Metrics:
- Baselines:
- Contributor note:

## Checklist

- [ ] All links are public and do not require private credentials.
- [ ] No private database files, proprietary downloads, model weights, or access tokens are attached.
- [ ] Publication status is distinguished from evidence status.
- [ ] `status_updated_at` is filled in even if the study is unpublished.
- [ ] I understand that submission does not imply acceptance or a leaderboard ranking.
