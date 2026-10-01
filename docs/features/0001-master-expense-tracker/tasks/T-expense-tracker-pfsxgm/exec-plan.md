---
approved_by: "Dev Person"
approved_at: "2026-10-01"
planned_behaviors: "3"
approved_sha256: "015daea21c117aa125955974b210c83cdcd93334c432cfde342a2f859034764f"
---
## Exec Plan — Task T-expense-tracker-pfsxgm
**Will build:**
- AC-1 amount refused · AC-2 category refused · AC-3 the add form through the real server
**Approach:** pure rules in expense.js; server.js renders the page and handles POST /expenses
**Boundaries & mocks:**
- file system: a temp EXPENSES_FILE per test; the server is real, on a random port
**Behaviors (TDD order):**
- B-1 AC-1 (tracer bullet) · B-2 AC-2 · B-3 AC-3 (e2e through the real server)
**PR will contain:**
- expense.js, server.js, tests/T-expense-tracker-pfsxgm/
**Open questions / ambiguities:**
- none
**Path:** L
