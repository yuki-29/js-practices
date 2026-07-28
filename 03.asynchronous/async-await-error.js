#!/usr/bin/env node

import { dbRun, dbGet, dbClose } from "./database.js";

async function main() {
  try {
    await dbRun(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
    await dbRun("INSERT INTO books(title) VALUES ('タイトル')");
    await dbRun("INSERT INTO books(title) VALUES ('タイトル')");
  } catch (insertError) {
    console.error(insertError.message);
  }

  try {
    await dbGet("SELECT id, author FROM books");
  } catch (selectError) {
    console.error(selectError.message);
  }
  await dbRun("DROP TABLE books");
  await dbClose();
}

main();
