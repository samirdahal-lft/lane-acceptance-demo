## TSD S-0001.01 — Add an expense  (PRD §S-0001.01)
| Aspect | Spec |
|--------|------|
| Interfaces | `addExpense(list, amount, category) → list` in expense.js; `GET /` renders the page; `POST /expenses` (form fields `amount`, `category`) adds and returns to `/` |
| Data / State | a JSON array of `{amount, category}` in `EXPENSES_FILE` (default expenses.json) |
| Behavior | amount must be a number > 0, else the page shows "Amount must be positive" (status 400); category must be Food, Travel or Bills, else "Category is required" (status 400); a valid expense appears in the list as "<amount> <category>" (`data-testid="expense-row"`) |
| Access | anyone who can open the page (single user, local) |
| Boundaries | the file system — a temp file in tests |
| Tests | unit for the rules; integration for POST /expenses; e2e through the real server and its page |
