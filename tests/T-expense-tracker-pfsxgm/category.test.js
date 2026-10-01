const { test } = require("node:test");
const assert = require("node:assert");
const { addExpense } = require("../../expense.js");
test("a missing or unknown category is refused [AC-2]", () => {
  assert.throws(() => addExpense([], 10, "Toys"), /Category is required/);
  assert.throws(() => addExpense([], 10, ""), /Category is required/);
  assert.deepStrictEqual(addExpense([], 10, "Travel"), [{ amount: 10, category: "Travel" }]);
});
