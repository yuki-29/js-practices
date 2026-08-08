import readline from "readline";
import Enquirer from "enquirer";

export class UserInterface {
  notifyEmpty() {
    console.log("メモがありません");
  }

  showList(memos) {
    memos.forEach((memo) => {
      console.log(memo.title);
    });
  }

  showBody(memo) {
    console.log(memo.body);
  }

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
