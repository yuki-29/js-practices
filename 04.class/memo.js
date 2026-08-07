#!/usr/bin/env node

import sqlite3 from "sqlite3";
import readline from "readline";
import minimist from "minimist";
import Enquirer from "enquirer";

class Command {
  constructor() {
    this.argv = minimist(process.argv.slice(2));
  }

  async run() {
    const db = new Database();
    await db.setup();
    const read = new UserInterface();

    try {
      if (this.argv.l) {
        const memos = await db.all();
        if (this.notifyIfEmpty(memos)) return;
        memos.forEach((memo) => {
          console.log(memo.title);
        });
      } else if (this.argv.r) {
        const memos = await db.all();
        if (this.notifyIfEmpty(memos)) return;
        const id = await read.choices(memos, "Choose a note you want to see:");
        const targetMemo = memos.find((memo) => memo.id === id);
        console.log(targetMemo.body);
      } else if (this.argv.d) {
        const memos = await db.all();
        if (this.notifyIfEmpty(memos)) return;
        const id = await read.choices(
          memos,
          "Choose a memo you want to delete:",
        );
        await db.destroy(id);
      } else {
        const lines = await read.readLine();
        await db.add(lines.join("\n"));
      }
    } finally {
      await db.close();
    }
  }

  notifyIfEmpty(memos) {
    if (memos.length === 0) {
      console.log("メモがありません");
      return true;
    }
    return false;
  }
}

class Memo {
  constructor(row) {
    this.id = row.id;
    this.body = row.body;
  }

  get title() {
    return this.body.split("\n")[0];
  }
}

class Database {
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

class UserInterface {
  readLine() {
    return new Promise((resolve) => {
      const lines = [];

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.on("line", (line) => {
        lines.push(line);
      });

      rl.on("close", () => {
        resolve(lines);
      });
    });
  }

  async choices(memos, message) {
    const { Select } = Enquirer;
    const choices = memos.map((memo) => {
      return {
        message: memo.title,
        name: memo.id,
      };
    });

    const prompt = new Select({
      name: "memo",
      message,
      choices,
    });
    return await prompt.run();
  }
}

const command = new Command();
command.run();
