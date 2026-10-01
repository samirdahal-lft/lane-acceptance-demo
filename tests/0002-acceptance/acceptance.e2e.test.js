const { test } = require("node:test");
const assert = require("node:assert");
const { mkdtempSync, writeFileSync, readFileSync } = require("node:fs");
const { join } = require("node:path");
const { tmpdir } = require("node:os");
const { start } = require("../../server.js");

// Each test runs the real server over its own EXPENSES_FILE and drives it through HTTP,
// exactly as the exploration walked it.
async function withApp(run, seed) {
  const file = join(mkdtempSync(join(tmpdir(), "exp-")), "e.json");
  writeFileSync(file, JSON.stringify(seed || []));
  process.env.EXPENSES_FILE = file;
  const server = start(0);
  await new Promise((r) => server.once("listening", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (amount, category) => fetch(`${base}/expenses`, {
    method: "POST", redirect: "manual",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ amount, category }),
  });
  const page = async () => (await fetch(base)).text();
  const rows = (html) => [...html.matchAll(/data-testid="expense-row">([^<]*)</g)].map((m) => m[1]);
  try {
    await run({ post, page, rows, file });
  } finally {
    server.close();
  }
}

test("SC-1 an empty expenses file renders the page with no rows and a zero total", async () => {
  await withApp(async ({ page, rows }) => {
    const html = await page();
    assert.deepStrictEqual(rows(html), []);
    assert.match(html, /data-testid="monthly-total">Total this month: 0</);
  });
});

test("SC-2 a valid expense is added and listed as '<amount> <category>'", async () => {
  await withApp(async ({ post, page, rows }) => {
    assert.strictEqual((await post("12.50", "Food")).status, 303);
    assert.deepStrictEqual(rows(await page()), ["12.5 Food"]);
  });
});

test("SC-3 Food, Travel and Bills are all accepted", async () => {
  await withApp(async ({ post, page, rows }) => {
    for (const [amount, category] of [["10", "Food"], ["20", "Travel"], ["30", "Bills"]]) {
      assert.strictEqual((await post(amount, category)).status, 303);
    }
    assert.deepStrictEqual(rows(await page()), ["10 Food", "20 Travel", "30 Bills"]);
  });
});

test("SC-4 a non-positive amount is refused with 400 'Amount must be positive'", async () => {
  await withApp(async ({ post, page, rows }) => {
    for (const amount of ["0", "-5"]) {
      const res = await post(amount, "Food");
      assert.strictEqual(res.status, 400);
      assert.match(await res.text(), /Amount must be positive/);
    }
    assert.deepStrictEqual(rows(await page()), []);
  });
});

test("SC-5 a non-numeric amount is refused with 400 'Amount must be positive'", async () => {
  await withApp(async ({ post, page, rows }) => {
    const res = await post("abc", "Food");
    assert.strictEqual(res.status, 400);
    assert.match(await res.text(), /Amount must be positive/);
    assert.deepStrictEqual(rows(await page()), []);
  });
});

test("SC-6 a category outside Food/Travel/Bills is refused with 400 'Category is required'", async () => {
  await withApp(async ({ post, page, rows }) => {
    for (const category of ["Groceries", ""]) {
      const res = await post("10", category);
      assert.strictEqual(res.status, 400);
      assert.match(await res.text(), /Category is required/);
    }
    assert.deepStrictEqual(rows(await page()), []);
  });
});

test("SC-7 the monthly total is the sum of every amount", async () => {
  await withApp(async ({ post, page, rows }) => {
    await post("10", "Food");
    await post("5.50", "Travel");
    const html = await page();
    assert.deepStrictEqual(rows(html), ["10 Food", "5.5 Travel"]);
    assert.match(html, /data-testid="monthly-total">Total this month: 15\.5</);
  });
});

test("SC-8 the expenses and the total survive a reload", async () => {
  await withApp(async ({ post, page, rows, file }) => {
    await post("10", "Food");
    await post("5.50", "Travel");
    await page();
    const html = await page();
    assert.deepStrictEqual(rows(html), ["10 Food", "5.5 Travel"]);
    assert.match(html, /data-testid="monthly-total">Total this month: 15\.5</);
    assert.deepStrictEqual(JSON.parse(readFileSync(file, "utf8")), [
      { amount: 10, category: "Food" },
      { amount: 5.5, category: "Travel" },
    ]);
  });
});

test("SC-9 a refused submission leaves the total unchanged", async () => {
  await withApp(async ({ post, page, rows }) => {
    assert.strictEqual((await post("-1", "Food")).status, 400);
    const html = await page();
    assert.deepStrictEqual(rows(html), ["10 Food"]);
    assert.match(html, /data-testid="monthly-total">Total this month: 10</);
  }, [{ amount: 10, category: "Food" }]);
});
