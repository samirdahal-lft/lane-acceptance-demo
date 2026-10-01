function addExpense(list, amount, category) {
  if (!(amount > 0)) throw new Error("Amount must be positive");
  return [...list, { amount, category }];
}
module.exports = { addExpense };
