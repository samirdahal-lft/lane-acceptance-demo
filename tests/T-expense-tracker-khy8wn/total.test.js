const { test } = require("node:test");
const assert = require("node:assert");
const { monthlyTotal } = require("../../expense.js");
test("the monthly total is the sum of every amount [AC-1]", () => {
  assert.strictEqual(monthlyTotal([{ amount: 1000, category: "Bills" }, { amount: 250, category: "Food" }]), 1250);
  assert.strictEqual(monthlyTotal([]), 0);
});
