---
approved_by: ""
approved_at: ""
---
# Scenarios <FEAT> — <feature under test>
> QA's first stamp: WHAT will be accepted, fixed before any test exists. Every scenario comes
> from the frozen spec below — never from what the code happens to do. This whole acceptance
> is QA's own branch: the three documents, the screenshots and the e2e tests reach the
> accepted feature's branch in ONE QA PR. Editing this file after the stamp reopens it.

**Accepts:** <ACCEPTS>

## Frozen spec
> Written by lane at `lane new --for`: the snapshot of each task of the accepted feature, as it
> was frozen when that task started, with its hash. lane re-reads every line at each stamp and
> at `lane ready` — a snapshot that moved means these scenarios answer a spec that is gone.
<FROZEN_SPEC>

## Scenarios
> One per rule of the frozen spec a user can observe, each with its test case. Keep the SC-n
> ids: the exploration and the results refer to them.
- SC-1 <scenario> — from: <task + acceptance criterion> — steps: <what to do> — expected: <what must be seen>
