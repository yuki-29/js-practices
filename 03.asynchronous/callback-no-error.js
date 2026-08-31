#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    // this.lastIDを参照する為、functionを使用。
    db.run("INSERT INTO books(title) VALUES ('タイトル')", function () {
      console.log(this.lastID);
      db.get("SELECT id, title FROM books", (_error, row) => {
        console.log(row.id, row.title);
        db.run("DROP TABLE books", () => {
          db.close();
        });
      });
    });
  },
);
