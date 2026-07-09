import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE books (title TEXT)", () => {
  db.run("INSERT INTO books VALUES ('タイトル')", function () {
    console.log(this.lastID);
    db.get("SELECT rowid AS id, title FROM books", (err, row) => {
      console.log(row.id, row.title);
      db.run("DROP TABLE books");
    });
  });
});
