---
approved_by: "Dev Person"
approved_at: "2026-10-01"
approved_sha256: "13f1c8bf2e647cefca982479cab540c1df82e817e5fcbaa57565578ed697a4ea"
---
## Task T-expense-tracker-pfsxgm — Add an expense
**Parent:** story S-0001.01 · feature 0001 (docs/features/0001-master-expense-tracker/ — its BRIEFING.md + PRD.md + TSD.md)
**Slice:** the add form through the real server, with its validation and tests
**Acceptance criteria:**
- [ ] AC-1 [behavior]: an amount of 0 or less is refused with "Amount must be positive"
- [ ] AC-2 [behavior]: a missing or unknown category is refused with "Category is required"
- [ ] AC-3 [e2e]: submitting the form with 250 and Food shows "250 Food" in the list
**End-to-end AC:** AC-3 [e2e] — reachable through the running app
**Tests:** AC-1, AC-2, AC-3
**Test scope:** tests/T-expense-tracker-pfsxgm/
**Done =** reviewable PR, all tests pass, links to chain. One PR per task (default).
