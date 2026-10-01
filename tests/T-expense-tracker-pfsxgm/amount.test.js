const { test } = require("node:test");
const assert = require("node:assert");
const { addExpense } = require("../../expense.js");
test("an amount of 0 or less is refused [AC-1]", () => {
  assert.throws(() => addExpense([], 0, "Food"), /Amount must be positive/);
  assert.throws(() => addExpense([], -5, "Food"), /Amount must be positive/);
});
