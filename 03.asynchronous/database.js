import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

export function dbRun(query) {
  return new Promise((resolve, reject) => {
    db.run(query, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function dbGet(query) {
  return new Promise((resolve, reject) => {
    db.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function dbClose() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
