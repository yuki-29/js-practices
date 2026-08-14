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
      if (!this.argv.l && !this.argv.r && !this.argv.d) {
        const lines = await read.readLine();
        await db.add(lines.join("\n"));
        return;
      }

      const memos = await db.all();
      if (memos.length === 0) {
        read.notifyEmpty();
        return;
      }

      if (this.argv.l) {
        read.showList(memos);
      } else if (this.argv.r) {
        const id = await read.choices(memos, "Choose a note you want to see:");
        const targetMemo = memos.find((memo) => memo.id === id);
        read.showBody(targetMemo);
      } else if (this.argv.d) {
        const id = await read.choices(
          memos,
          "Choose a memo you want to delete:",
        );
        await db.destroy(id);
      }
    } finally {
      await db.close();
    }
  }
}
