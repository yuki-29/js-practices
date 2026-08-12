export function dbRun(db, query) {
  return new Promise((resolve, reject) => {
    db.run(query, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
}

export function dbGet(db, query) {
  return new Promise((resolve, reject) => {
    db.get(query, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

export function dbClose(db) {
  return new Promise((resolve, reject) => {
    db.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
