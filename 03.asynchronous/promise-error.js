#!/usr/bin/env node

import { dbRun, dbGet, dbClose } from "./database.js";

const insertQuery = "INSERT INTO books(title) VALUES ('タイトル')";

dbRun(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => dbRun(insertQuery))
  .then(() => dbRun(insertQuery))
  .catch((insertError) => console.error(insertError.message))
  .then(() => dbGet("SELECT id, author FROM books"))
  .catch((selectError) => console.error(selectError.message))
  .then(() => dbRun("DROP TABLE books"))
  .then(() => dbClose());
