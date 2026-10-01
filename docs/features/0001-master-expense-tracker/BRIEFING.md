---
approved_by: "Dev Person"
approved_at: "2026-10-01"
approved_sha256: "f922643f7353ff862f9f80104274512c13a60fc4d789c37aebc78ab5912989ac"
---
# Briefing 0001 — Expense tracker

## Why
People who want to watch their spending have nowhere simple to write it down. They want to
add what they spent and see this month's total, without signing up for anything.

## Hypothesis
A single web page with a form (amount + category) and a running monthly total is enough to
start tracking spending.

## Mocks / references
- one page: a form at the top (amount, category, Add), the list of expenses, then "Total this month: N"

## Scope hints
**Probably in:**
- adding an expense with an amount and a category
- refusing a bad amount or a missing category, with a message
- the total for the month
**Probably out:**
- editing or deleting, budgets, more than one month, accounts

## Open questions
- none — categories are fixed to Food, Travel, Bills for now
