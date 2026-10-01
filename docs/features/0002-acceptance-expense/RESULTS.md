---
approved_by: ""
approved_at: ""
---
# Results 0002
> QA's third stamp: every approved scenario has its e2e test on this branch. One line per
> scenario; lane checks each file is committed and names its SC id (tag the test with it).
> CI runs the tests on the QA PR.

**Harness:** the repo's own e2e runner — `node --test` driving the real server over a temp `EXPENSES_FILE` (no Cypress or Playwright config in this repo; matches the existing e2e tests under `tests/T-expense-tracker-*`)

## Scenario → e2e test
- SC-1 → tests/0002-acceptance/acceptance.e2e.test.js
- SC-2 → tests/0002-acceptance/acceptance.e2e.test.js
- SC-3 → tests/0002-acceptance/acceptance.e2e.test.js
- SC-4 → tests/0002-acceptance/acceptance.e2e.test.js
- SC-5 → tests/0002-acceptance/acceptance.e2e.test.js
- SC-6 → tests/0002-acceptance/acceptance.e2e.test.js
- SC-7 → tests/0002-acceptance/acceptance.e2e.test.js
- SC-8 → tests/0002-acceptance/acceptance.e2e.test.js
- SC-9 → tests/0002-acceptance/acceptance.e2e.test.js
