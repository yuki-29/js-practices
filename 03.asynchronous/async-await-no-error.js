#!/usr/bin/env node

import { dbRun, dbGet, dbClose } from "./database.js";

async function main() {
  await dbRun(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const result = await dbRun("INSERT INTO books(title) VALUES ('タイトル')");
  console.log(result.lastID);

  const row = await dbGet("SELECT id, title FROM books");
  console.log(row.id, row.title);

  await dbRun("DROP TABLE books");
  await dbClose();
}

main();
