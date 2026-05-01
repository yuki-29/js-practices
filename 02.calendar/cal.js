#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2), {
  default: { y: new Date().getFullYear(), m: new Date().getMonth() + 1 },
});
const { y: year, m: month } = argv;

const daysInMonth = new Date(year, month, 0).getDate();
const firstDayOfWeek = new Date(year, month - 1).getDay();

const generateCalendar = (daysInMonth, firstDayOfWeek) => {
  const weekMatrix = [];
  let currentWeekRow = Array(firstDayOfWeek).fill("  ");

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeekRow.push(String(day).padStart(2));

    if (currentWeekRow.length === 7 || day === daysInMonth) {
      weekMatrix.push(currentWeekRow);
      currentWeekRow = [];
    }
  }
  return weekMatrix;
};

const display = (year, month, daysInMonth, firstDayOfWeek) => {
  console.log(`     ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");

  const weekMatrix = generateCalendar(daysInMonth, firstDayOfWeek);

  for (const week of weekMatrix) {
    console.log(week.join(" "));
  }
};

display(year, month, daysInMonth, firstDayOfWeek);
