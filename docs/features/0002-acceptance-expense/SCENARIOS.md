---
approved_by: "Dev Person"
approved_at: "2026-10-01"
approved_sha256: "8c1732c592786f0f72b0c99e5c68d071ad81cb22646541ce58bd1e5705471310"
---
# Scenarios 0002 — Expense tracker: add an expense & monthly total
> QA's first stamp: WHAT will be accepted, fixed before any test exists. Every scenario comes
> from the frozen spec below — never from what the code happens to do. This whole acceptance
> is QA's own branch: the three documents, the screenshots and the e2e tests reach the
> accepted feature's branch in ONE QA PR. Editing this file after the stamp reopens it.

**Accepts:** 0001-master-expense-tracker

## Frozen spec
> Written by lane at `lane new --for`: the snapshot of each task of the accepted feature, as it
> was frozen when that task started, with its hash. lane re-reads every line at each stamp and
> at `lane ready` — a snapshot that moved means these scenarios answer a spec that is gone.
- `docs/features/0001-master-expense-tracker/tasks/T-expense-tracker-khy8wn/snapshot-TSD.md` — sha256 7a0f17e8a094f0ad1c7e583efbfc0e6a53879fee2de5e20c67aeeb10114b2899
- `docs/features/0001-master-expense-tracker/tasks/T-expense-tracker-pfsxgm/snapshot-TSD.md` — sha256 b81d06df1248207c49b52aa12787fbfdcb4beb71d266bbdfd57feb1e98b53e68

## Scenarios
> One per rule of the frozen spec a user can observe, each with its test case. Keep the SC-n
> ids: the exploration and the results refer to them.
- SC-1 The page loads with the empty list and a zero total — from: T-expense-tracker-pfsxgm S-0001.01 "`GET /` renders the page" + T-expense-tracker-khy8wn S-0001.02 "shown on every render of `/`" — steps: start the server with an empty `EXPENSES_FILE`, open `/` — expected: the page renders with no `data-testid="expense-row"` element and `data-testid="monthly-total"` reads "Total this month: 0"
- SC-2 A valid expense is added and listed — from: T-expense-tracker-pfsxgm S-0001.01 "a valid expense appears in the list as `<amount> <category>`" — steps: on `/`, submit the form with amount `12.50` and category `Food`, landing back on `/` — expected: a `data-testid="expense-row"` element reads "12.5 Food" (the submitted amount and category)
- SC-3 Each allowed category is accepted — from: T-expense-tracker-pfsxgm S-0001.01 "category must be Food, Travel or Bills" — steps: from an empty list, submit `10 Food`, then `20 Travel`, then `30 Bills` — expected: three `data-testid="expense-row"` elements read "10 Food", "20 Travel", "30 Bills", each submission returning to `/`
- SC-4 A non-positive amount is refused — from: T-expense-tracker-pfsxgm S-0001.01 "amount must be a number > 0, else the page shows \"Amount must be positive\" (status 400)" — steps: submit the form with amount `0` and category `Food`, then repeat with amount `-5` and category `Food` — expected: both responses have status 400 and show "Amount must be positive"; no new `data-testid="expense-row"` appears when `/` is reopened
- SC-5 A non-numeric amount is refused — from: T-expense-tracker-pfsxgm S-0001.01 "amount must be a number > 0, else … \"Amount must be positive\" (status 400)" — steps: submit the form with amount `abc` and category `Food` — expected: status 400 and "Amount must be positive"; the list on `/` is unchanged
- SC-6 A category outside the three is refused — from: T-expense-tracker-pfsxgm S-0001.01 "category must be Food, Travel or Bills, else \"Category is required\" (status 400)" — steps: submit the form with amount `10` and category `Groceries`, then repeat with the category left empty — expected: both responses have status 400 and show "Category is required"; the list on `/` is unchanged
- SC-7 The total is the sum of every amount — from: T-expense-tracker-khy8wn S-0001.02 "the total is the sum of every amount" — steps: from an empty list, add `10 Food` then `5.50 Travel` through the form, then read `/` — expected: `data-testid="monthly-total"` reads "Total this month: 15.5" while both expense rows are listed
- SC-8 Expenses and total survive a page reload — from: T-expense-tracker-pfsxgm S-0001.01 "a JSON array of `{amount, category}` in `EXPENSES_FILE`" + T-expense-tracker-khy8wn S-0001.02 "shown on every render of `/`" — steps: after SC-7, reload `/` — expected: the same two rows "10 Food" and "5.5 Travel" are shown and `data-testid="monthly-total"` still reads "Total this month: 15.5"
- SC-9 A refused submission does not change the total — from: T-expense-tracker-khy8wn S-0001.02 "the total is the sum of every amount" + T-expense-tracker-pfsxgm S-0001.01 refusal rules — steps: with one expense `10 Food` present, submit amount `-1` category `Food`, then reopen `/` — expected: `data-testid="monthly-total"` still reads "Total this month: 10" and only one `data-testid="expense-row"` is present
