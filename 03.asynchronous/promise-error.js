#!/usr/bin/env node

import { dbRun, dbGet, dbClose } from "./database.js";

dbRun(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return dbRun("INSERT INTO books(title) VALUES ('タイトル')");
  })
  .then(() => {
    return dbRun("INSERT INTO books(title) VALUES ('タイトル')");
  })
  .catch((insertError) => {
    console.error(insertError.message);
  })
  .then(() => {
    return dbGet("SELECT id, author FROM books");
  })
  .catch((selectError) => {
    console.error(selectError.message);
  })
  .then(() => {
    return dbRun("DROP TABLE books");
  })
  .then(() => {
    return dbClose();
  });
