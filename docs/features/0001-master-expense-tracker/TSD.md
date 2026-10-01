---
approved_by: "Dev Person"
approved_at: "2026-10-01"
approved_sha256: "c2842e1af00e4308b485aafadb82116ac276fecdd2101c6cfe14e2f26dd5cf7f"
---
# TSD 0001 — Expense tracker

## TSD S-0001.01 — Add an expense  (PRD §S-0001.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `addExpense(list, amount, category) → list` in expense.js; `GET /` renders the page; `POST /expenses` (form fields `amount`, `category`) adds and returns to `/` |
| Data / State | a JSON array of `{amount, category}` in `EXPENSES_FILE` (default expenses.json) |
| Behavior | amount must be a number > 0, else the page shows "Amount must be positive" (status 400); category must be Food, Travel or Bills, else "Category is required" (status 400); a valid expense appears in the list as "<amount> <category>" (`data-testid="expense-row"`) |
| Access | anyone who can open the page (single user, local) |
| Boundaries | the file system — a temp file in tests |
| Tests | unit for the rules; integration for POST /expenses; e2e through the real server and its page |

## TSD S-0001.02 — Monthly total  (PRD §S-0001.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `monthlyTotal(list) → number` in expense.js; the page shows "Total this month: <n>" (`data-testid="monthly-total"`) |
| Data / State | reads the same JSON array; nothing new stored |
| Behavior | the total is the sum of every amount; shown on every render of `/` |
| Access | anyone who can open the page |
| Boundaries | none beyond S-0001.01's file |
| Tests | unit for the sum; e2e: add two expenses through the real server, read the total on the page |
