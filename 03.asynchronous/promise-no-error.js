#!/usr/bin/env node

import { dbRun, dbGet, dbClose } from "./database.js";

dbRun(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => dbRun("INSERT INTO books(title) VALUES ('タイトル')"))
  .then((result) => {
    console.log(result.lastID);
    return dbGet("SELECT id, title FROM books");
  })
  .then((row) => {
    console.log(row.id, row.title);
    return dbRun("DROP TABLE books");
  })
  .then(() => dbClose());
