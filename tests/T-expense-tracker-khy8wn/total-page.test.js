const { test } = require("node:test");
const assert = require("node:assert");
const { mkdtempSync } = require("node:fs");
const { join } = require("node:path");
const { tmpdir } = require("node:os");
test("after adding 1000 Bills and 250 Food the page shows the total [AC-2]", async () => {
  process.env.EXPENSES_FILE = join(mkdtempSync(join(tmpdir(), "exp-")), "e.json");
  const { start } = require("../../server.js");
  const server = start(0);
  await new Promise((r) => server.once("listening", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (amount, category) => fetch(`${base}/expenses`, {
    method: "POST", redirect: "manual",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ amount, category }),
  });
  try {
    await post("1000", "Bills");
    await post("250", "Food");
    assert.match(await (await fetch(base)).text(), /data-testid="monthly-total">Total this month: 1250</);
  } finally {
    server.close();
  }
});
