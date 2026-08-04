#!/usr/bin/env node

import { dbRun, dbGet, dbClose } from "./database.js";

const insertQuery = "INSERT INTO books(title) VALUES ('タイトル')";

await dbRun(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);
await dbRun(insertQuery);
try {
  await dbRun(insertQuery);
} catch (insertError) {
  if (insertError.code === "SQLITE_CONSTRAINT") {
    console.error(insertError.message);
  } else {
    throw insertError;
  }
}

try {
  await dbGet("SELECT id, author FROM books");
} catch (selectError) {
  if (selectError.code === "SQLITE_ERROR") {
    console.error(selectError.message);
  } else {
    throw selectError;
  }
}
await dbRun("DROP TABLE books");
await dbClose();
