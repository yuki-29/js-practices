#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { dbRun, dbGet, dbClose } from "./database.js";

const db = new sqlite3.Database(":memory:");
const insertQuery = "INSERT INTO books(title) VALUES ('タイトル')";

await dbRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);
await dbRun(db, insertQuery);

try {
  await dbRun(db, insertQuery);
} catch (insertError) {
  if (insertError.code === "SQLITE_CONSTRAINT") {
    console.error(insertError.message);
  } else {
    throw insertError;
  }
}

try {
  await dbGet(db, "SELECT id, author FROM books");
} catch (selectError) {
  if (selectError.code === "SQLITE_ERROR") {
    console.error(selectError.message);
  } else {
    throw selectError;
  }
}

await dbRun(db, "DROP TABLE books");
await dbClose(db);
