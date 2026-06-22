const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

const titles = [
  "タイトル1",
  "タイトル2",
  "タイトル3",
  "タイトル4",
  "タイトル5",
];

db.run("CREATE TABLE books (title TEXT)", () => {
  const stmt = db.prepare("INSERT INTO books VALUES (?)", function () {
    function insertOne(index) {
      if (index >= titles.length) {
        return;
      }
      stmt.run(titles[index], function () {
        console.log(this.lastID);
        insertOne(index + 1);
      });
    }
    insertOne(0);
  });
});

