export class Memo {
  constructor(row) {
    this.id = row.id;
    this.body = row.body;
  }

  get title() {
    return this.body.split("\n")[0];
  }
}
