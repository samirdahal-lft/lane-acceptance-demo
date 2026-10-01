# Behavior Spec — T-expense-tracker-pfsxgm: Add an expense
## B-1 (tracer bullet): AC-1: an amount of 0 or less is refused
- Given: an empty list
- When: an expense of 0 Food is added
- Then: it is refused with "Amount must be positive"

## B-2: AC-2: a missing or unknown category is refused
- Given: an empty list
- When: an expense of 10 with category "Toys" is added
- Then: it is refused with "Category is required"

## B-3: AC-3: the form adds an expense
- Given: the real server with an empty expenses file
- When: the form is submitted with 250 and Food
- Then: the page lists "250 Food"
