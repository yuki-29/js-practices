#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { dbRun, dbGet, dbClose } from "./database.js";

const db = new sqlite3.Database(":memory:");

dbRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => dbRun(db, "INSERT INTO books(title) VALUES ('タイトル')"))
  .then((result) => {
    console.log(result.lastID);
    return dbGet(db, "SELECT id, title FROM books");
  })
  .then((row) => {
    console.log(row.id, row.title);
    return dbRun(db, "DROP TABLE books");
  })
  .then(() => dbClose(db));
