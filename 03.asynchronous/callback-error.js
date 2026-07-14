#!/usr/bin/env node

import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

const insertBook = "INSERT INTO books(title) VALUES ('タイトル')";

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(insertBook, () => {
      db.run(insertBook, (insertError) => {
        if (insertError) {
          console.error(insertError.message);
        }

        db.get("SELECT id, author FROM books", (selectError) => {
          if (selectError) {
            console.error(selectError.message);
          }
          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      });
    });
  },
);
