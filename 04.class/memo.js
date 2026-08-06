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

    if (this.argv.l) {
      const memos = await db.dbAll("SELECT id, body FROM memos");
      memos.forEach((memo) => {
        console.log(memo.body.split("\n")[0]);
      });
    } else if (this.argv.r) {
      const memos = await db.dbAll("SELECT id, body FROM memos");
      const id = await read.choices(memos);
      const memo = await db.dbGet("SELECT body FROM memos WHERE id = ?", [id]);
      console.log(memo.body);
    } else if (this.argv.d) {
      const memos = await db.dbAll("SELECT id, body FROM memos");
      const id = await read.choices(memos);
      await db.dbRun("DELETE FROM memos WHERE id = ?", [id]);
    } else {
      await read.readLine(db);
    }
  }
}

class Database {
  constructor() {
    this.db = new sqlite3.Database("memo.db");
  }

  async setup() {
    await this.dbRun(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT)",
    );
  }

  dbRun(query, params) {
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

  dbGet(query, params) {
    return new Promise((resolve, reject) => {
      this.db.get(query, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  dbAll(query) {
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
  readLine(db) {
    return new Promise((resolve) => {
      const lines = [];

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.on("line", (line) => {
        lines.push(line);
      });

      rl.on("close", async () => {
        await db.dbRun("INSERT INTO memos(body) VALUES (?)", [
          lines.join("\n"),
        ]);
        resolve();
      });
    });
  }

  async choices(memos) {
    const { Select } = Enquirer;
    const choices = memos.map((memo) => {
      return {
        message: memo.body.split("\n")[0],
        name: memo.id,
      };
    });

    const prompt = new Select({
      name: "memo",
      message: "Choose a note you want to see:",
      choices: choices,
    });
    return await prompt.run();
  }
}

const command = new Command();
command.run();
