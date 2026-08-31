#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { dbRun, dbGet, dbClose } from "./database.js";

const db = new sqlite3.Database(":memory:");

await dbRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);
const result = await dbRun(db, "INSERT INTO books(title) VALUES ('タイトル')");
console.log(result.lastID);

const row = await dbGet(db, "SELECT id, title FROM books");
console.log(row.id, row.title);

await dbRun(db, "DROP TABLE books");
await dbClose(db);
