---
approved_by: "Dev Person"
approved_at: "2026-10-01"
approved_sha256: "3899968f58693c2a08a95f871a564bbad5f37892e5d47773d61653cfe359f720"
---
# PRD 0001 — Expense tracker

**Source:** the discovery document 0001 (BRIEFING.md)
**Parent:** none — this feature is the umbrella

---

## Story S-0001.01 — Add an expense
As a person tracking my spending I want to add an expense with an amount and a category so
that it is recorded.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — an amount of 0 or less is refused with "Amount must be positive"
- [ ] AC-2 [behavior] — a missing or unknown category is refused with "Category is required"
- [ ] AC-3 [e2e] — submitting the form with 250 and Food shows "250 Food" in the list

**Success metric:** an expense can be added in one form submit

## Story S-0001.02 — Monthly total
As a person tracking my spending I want to see what I spent this month so that I know where I
stand.

**Acceptance criteria:**
- [ ] AC-1 [behavior] — the monthly total is the sum of every expense's amount
- [ ] AC-2 [e2e] — after adding 1000 Bills and 250 Food the page shows "Total this month: 1250"

**Success metric:** the total is right after every add
