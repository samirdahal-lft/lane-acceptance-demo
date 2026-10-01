const CATEGORIES = ["Food", "Travel", "Bills"];
function addExpense(list, amount, category) {
  if (!(amount > 0)) throw new Error("Amount must be positive");
  if (!CATEGORIES.includes(category)) throw new Error("Category is required");
  return [...list, { amount, category }];
}
function monthlyTotal(list) {
  return list.reduce((sum, e) => sum + e.amount, 0);
}
module.exports = { CATEGORIES, addExpense, monthlyTotal };
