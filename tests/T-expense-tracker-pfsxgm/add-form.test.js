const { test } = require("node:test");
const assert = require("node:assert");
const { mkdtempSync } = require("node:fs");
const { join } = require("node:path");
const { tmpdir } = require("node:os");
test("submitting the form with 250 and Food lists it; a bad amount shows the error [AC-3]", async () => {
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
    assert.strictEqual((await post("250", "Food")).status, 303);
    assert.match(await (await fetch(base)).text(), /data-testid="expense-row">250 Food</);
    const bad = await post("0", "Food");
    assert.strictEqual(bad.status, 400);
    assert.match(await bad.text(), /Amount must be positive/);
  } finally {
    server.close();
  }
});
