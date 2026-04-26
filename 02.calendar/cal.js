import minimist from "minimist";

const argv = minimist(process.argv, {
  default: { y: new Date().getFullYear(), m: new Date().getMonth() - 1 },
});

console.log(argv.m);
const startDate = new Date(argv.y, argv.m, 1);
const daysInMonth = new Date(argv.y, argv.m, 0).getDate();
const firstDayOfWeek = new Date(argv.y, argv.m - 1).getDay();

let weekMatrix = [];
let currentWeekRow = [];
let dayIndex = 0;

// console.log(Day.length); // 4月なら、3の表示。水曜日が「1」
let generateCalendar = (endday) => {
  for (let i = 1; i <= endday; i++) {
    // 初回だけ、実行
    if (i === 1) {
      for (let j = 0; j < firstDayOfWeek; j++) {
        currentWeekRow.push("  ");
        dayIndex++;
      }
    }

    if (String(i).length === 1) {
      currentWeekRow.push(" " + String(i));
    } else {
      currentWeekRow.push(i);
    }
    dayIndex++;

    if (dayIndex === 7 || i === endday) {
      weekMatrix.push(currentWeekRow);
      dayIndex = 0;
      currentWeekRow = [];
    }
  }
  return weekMatrix;
};

// --表示--
let display = (startDate, daysInMonth, weekMatrix) => {
  console.log(`     ${startDate.getMonth()}月 ${startDate.getFullYear()}`);
  console.log("日 月 火 水 木 金 土");

  weekMatrix = generateCalendar(daysInMonth);

  for (let i = 0; i < weekMatrix.length; i++) {
    console.log(weekMatrix[i].join(" "));
  }
};

display(startDate, daysInMonth);
