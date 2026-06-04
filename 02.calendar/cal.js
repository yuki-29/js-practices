#!/usr/bin/env node

import minimist from "minimist";

const generateCalendar = (year, month) => {
  const weekMatrix = [];
  const firstDate = new Date(year, month - 1);
  let currentWeekRow = Array(firstDate.getDay()).fill("  ");

  const date = new Date(firstDate);
  const targetMonth = date.getMonth();

  while (date.getMonth() === targetMonth) {
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

const displayCalendar = (year, month) => {
  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");

  const weekMatrix = generateCalendar(year, month);

  for (const week of weekMatrix) {
    console.log(week.join(" "));
  }
};

const now = new Date();

const { y: year, m: month } = minimist(process.argv.slice(2), {
  default: { y: now.getFullYear(), m: now.getMonth() + 1 },
});

displayCalendar(year, month);
