import sqlite3 from "sqlite3";
import { Memo } from "./memo-class.js";

export class Database {
  constructor() {
    this.db = new sqlite3.Database("memo.db");
  }

  async setup() {
    await this.#run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT)",
    );
  }

  async add(body) {
    await this.#run("INSERT INTO memos(body) VALUES (?)", [body]);
  }

  async all() {
    const rows = await this.#all("SELECT id, body FROM memos");
    return rows.map((row) => new Memo(row));
  }

  async destroy(id) {
    await this.#run("DELETE FROM memos WHERE id = ?", [id]);
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  #run(query, params) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  #all(query) {
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
