const CATEGORIES = ["Food", "Travel", "Bills"];
function addExpense(list, amount, category) {
  if (!(amount > 0)) throw new Error("Amount must be positive");
  if (!CATEGORIES.includes(category)) throw new Error("Category is required");
  return [...list, { amount, category }];
}
module.exports = { CATEGORIES, addExpense };
