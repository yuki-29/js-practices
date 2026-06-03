#!/usr/bin/env node

import minimist from "minimist";

const generateCalendar = (firstDate) => {
  const weekMatrix = [];
  let currentWeekRow = Array(firstDate.getDay()).fill("  ");

  const date = new Date(firstDate);
  const month = date.getMonth();

  while (date.getMonth() === month) {
    currentWeekRow.push(String(date.getDate()).padStart(2));

    if (currentWeekRow.length === 7) {
      weekMatrix.push(currentWeekRow);
      currentWeekRow = [];
    }
    date.setDate(date.getDate() + 1);
  }
  if (currentWeekRow.length > 0) {
    weekMatrix.push(currentWeekRow);
  }
  return weekMatrix;
};

const display = (firstDate) => {
  console.log(`      ${firstDate.getMonth() + 1}月 ${firstDate.getFullYear()}`);
  console.log("日 月 火 水 木 金 土");

  const weekMatrix = generateCalendar(firstDate);

  for (const week of weekMatrix) {
    console.log(week.join(" "));
  }
};

const now = new Date();

const { y: year, m: month } = minimist(process.argv.slice(2), {
  default: { y: now.getFullYear(), m: now.getMonth() + 1 },
});

const firstDate = new Date(year, month - 1);

display(firstDate);
