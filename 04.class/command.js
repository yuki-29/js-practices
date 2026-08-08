import minimist from "minimist";
import { UserInterface } from "./user-interface.js";
import { Database } from "./database.js";

export class Command {
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
        if (memos.length === 0) {
          read.notifyEmpty();
          return;
        }
        read.showList(memos);
      } else if (this.argv.r) {
        const memos = await db.all();
        if (memos.length === 0) {
          read.notifyEmpty();
          return;
        }
        const id = await read.choices(memos, "Choose a note you want to see:");
        const targetMemo = memos.find((memo) => memo.id === id);
        read.showBody(targetMemo);
      } else if (this.argv.d) {
        const memos = await db.all();
        if (memos.length === 0) {
          read.notifyEmpty();
          return;
        }
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
}
