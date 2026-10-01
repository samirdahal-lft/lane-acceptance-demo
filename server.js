const http = require("node:http");
const fs = require("node:fs");
const { CATEGORIES, addExpense } = require("./expense.js");

const file = () => process.env.EXPENSES_FILE || "expenses.json";
const load = () => (fs.existsSync(file()) ? JSON.parse(fs.readFileSync(file(), "utf8")) : []);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function page(list, error) {
  const options = CATEGORIES.map((c) => `<option>${c}</option>`).join("");
  const rows = list.map((e) => `<li data-testid="expense-row">${e.amount} ${esc(e.category)}</li>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>Expense tracker</title></head><body>
<h1>Expense tracker</h1>
${error ? `<p data-testid="error" style="color:#a32d2d">${esc(error)}</p>` : ""}
<form method="post" action="/expenses">
  <input name="amount" data-testid="amount" placeholder="Amount">
  <select name="category" data-testid="category"><option value="">Category</option>${options}</select>
  <button data-testid="add">Add</button>
</form>
<ul data-testid="expenses">${rows}</ul>
</body></html>`;
}

function handler(req, res) {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(page(load()));
  }
  if (req.method === "POST" && req.url === "/expenses") {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      const form = new URLSearchParams(body);
      try {
        const list = addExpense(load(), Number(form.get("amount")), form.get("category") || "");
        fs.writeFileSync(file(), JSON.stringify(list));
        res.writeHead(303, { location: "/" });
        res.end();
      } catch (e) {
        res.writeHead(400, { "content-type": "text/html; charset=utf-8" });
        res.end(page(load(), e.message));
      }
    });
    return;
  }
  res.writeHead(404);
  res.end("not found");
}

function start(port) {
  return http.createServer(handler).listen(port);
}
if (require.main === module) {
  const port = Number(process.env.PORT) || 4600;
  start(port).on("listening", () => console.log(`Expense tracker → http://localhost:${port}`));
}
module.exports = { start };
