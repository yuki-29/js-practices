#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { dbRun, dbGet, dbClose } from "./database.js";

const db = new sqlite3.Database(":memory:");
const insertQuery = "INSERT INTO books(title) VALUES ('タイトル')";

dbRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => dbRun(db, insertQuery))
  .then(() =>
    dbRun(db, insertQuery).catch((insertError) => {
      console.error(insertError.message);
    }),
  )
  .then(() =>
    dbGet(db, "SELECT id, author FROM books").catch((selectError) => {
      console.error(selectError.message);
    }),
  )
  .then(() => dbRun(db, "DROP TABLE books"))
  .then(() => dbClose(db));
