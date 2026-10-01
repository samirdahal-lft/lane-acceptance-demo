---
approved_by: ""
approved_at: ""
---
# Exploration <FEAT>
> QA's second stamp: the app REALLY behaves as each approved scenario says. Walk every
> scenario in the running app — by hand, or with an agent driving a browser — and commit the
> screenshots before `lane approve`. Tick a scenario only when it behaved as specified. An
> empty box is a product gap: lane refuses the stamp and names the command that raises it as
> developer work (`lane new` with `--from <FEAT>:SC-n`); explore again once the fix has landed.

**App under test:** <URL of the running build> (commit <the commit that build came from>)

## Results
- [ ] SC-1 <what was observed, with concrete values> — evidence: <path of the committed screenshot>
