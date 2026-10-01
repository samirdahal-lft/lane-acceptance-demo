---
approved_by: "Dev Person"
approved_at: "2026-10-01"
approved_sha256: "15ee7091127bff5a46bce6d41080b7ea0e42d2566d74dae8959704ffbedb5a22"
---
# Exploration 0002
> QA's second stamp: the app REALLY behaves as each approved scenario says. Walk every
> scenario in the running app — by hand, or with an agent driving a browser — and commit the
> screenshots before `lane approve`. Tick a scenario only when it behaved as specified. An
> empty box is a product gap: lane refuses the stamp and names the command that raises it as
> developer work (`lane new` with `--from 0002:SC-n`); explore again once the fix has landed.

**App under test:** http://localhost:4600 — local run of `node server.js` with `EXPENSES_FILE` pointed at a scratch file (commit e8919a8)

## Results
- [x] SC-1 Empty `EXPENSES_FILE`, `GET /` returned 200 with the form and zero `data-testid="expense-row"` elements; `data-testid="monthly-total"` read "Total this month: 0" — evidence: evidence/SC-1.png
- [x] SC-2 Posting amount `12.50` + category `Food` returned 303 to `/`; the list then held one row reading "12.5 Food" — evidence: evidence/SC-2.png
- [x] SC-3 From an empty list, `10 Food`, `20 Travel`, `30 Bills` each returned 303; `/` listed exactly "10 Food", "20 Travel", "30 Bills" (total "Total this month: 60") — evidence: evidence/SC-3.png
- [x] SC-4 Amount `0` + `Food` returned status 400 showing "Amount must be positive"; amount `-5` + `Food` did the same; reopening `/` still showed 0 expense rows — evidence: evidence/SC-4.png
- [x] SC-5 Amount `abc` + `Food` returned status 400 showing "Amount must be positive"; `/` still showed 0 expense rows — evidence: evidence/SC-5.png
- [x] SC-6 Category `Groceries` returned 400 showing "Category is required"; the empty category did the same; `/` still showed 0 expense rows — evidence: evidence/SC-6.png
- [x] SC-7 From empty, `10 Food` then `5.50 Travel`; `/` listed "10 Food" and "5.5 Travel" with `data-testid="monthly-total"` reading "Total this month: 15.5" — evidence: evidence/SC-7.png
- [x] SC-8 Reloading `/` after SC-7 showed the same two rows "10 Food" and "5.5 Travel" and "Total this month: 15.5"; the file held `[{"amount":10,"category":"Food"},{"amount":5.5,"category":"Travel"}]` — evidence: evidence/SC-8.png
- [x] SC-9 With one `10 Food` expense present, amount `-1` returned 400; reopening `/` showed exactly one expense row and "Total this month: 10" — evidence: evidence/SC-9.png
