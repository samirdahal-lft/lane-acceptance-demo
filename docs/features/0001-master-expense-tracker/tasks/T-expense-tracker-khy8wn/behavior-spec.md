# Behavior Spec — T-expense-tracker-khy8wn: Monthly total
## B-1 (tracer bullet): AC-1: the total is the sum of every amount
- Given: expenses of 1000 and 250
- When: the monthly total is computed
- Then: it is 1250

## B-2: AC-2: the page shows the total
- Given: the real server with an empty expenses file
- When: 1000 Bills and 250 Food are added through the form
- Then: the page shows "Total this month: 1250"
