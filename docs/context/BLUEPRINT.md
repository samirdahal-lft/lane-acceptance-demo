# Blueprint
One Node process. `expense.js` holds the rules as pure functions (validate, add, total).
`server.js` serves one HTML page and one form POST, and stores expenses in a JSON file
(`EXPENSES_FILE`, default `expenses.json`). The server owns all I/O; the rules own none.
