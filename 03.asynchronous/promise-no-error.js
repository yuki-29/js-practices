#!/usr/bin/env node

import { dbRun, dbGet, dbClose } from "./database.js";

dbRun(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return dbRun("INSERT INTO books(title) VALUES ('タイトル')");
  })
  .then((result) => {
    console.log(result.lastID);
  })
  .then(() => {
    return dbGet("SELECT id, title FROM books");
  })
  .then((row) => {
    console.log(row.id, row.title);
  })
  .then(() => {
    return dbRun("DROP TABLE books");
  })
  .then(() => {
    return dbClose();
  });
