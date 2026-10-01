## TSD S-0001.02 — Monthly total  (PRD §S-0001.02)
| Aspect | Spec |
|--------|------|
| Interfaces | `monthlyTotal(list) → number` in expense.js; the page shows "Total this month: <n>" (`data-testid="monthly-total"`) |
| Data / State | reads the same JSON array; nothing new stored |
| Behavior | the total is the sum of every amount; shown on every render of `/` |
| Access | anyone who can open the page |
| Boundaries | none beyond S-0001.01's file |
| Tests | unit for the sum; e2e: add two expenses through the real server, read the total on the page |
