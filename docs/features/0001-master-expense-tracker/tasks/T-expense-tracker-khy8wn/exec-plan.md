---
approved_by: "Dev Person"
approved_at: "2026-10-01"
planned_behaviors: "2"
approved_sha256: "fb7330aba45882a78295423cc8708413d5f6384eaf5373be5ab8c92c1bb3c022"
---
## Exec Plan — Task T-expense-tracker-khy8wn
**Will build:**
- AC-1 the monthly total rule · AC-2 the total on the page
**Approach:** monthlyTotal in expense.js; server.js shows it on every render of /
**Boundaries & mocks:**
- file system: a temp EXPENSES_FILE per test; the server is real, on a random port
**Behaviors (TDD order):**
- B-1 AC-1 (tracer bullet) · B-2 AC-2 (e2e through the real server)
**PR will contain:**
- expense.js, server.js, tests/T-expense-tracker-khy8wn/
**Open questions / ambiguities:**
- none
**Path:** L
