#!/usr/bin/env node

import minimist from "minimist";

const generateCalendar = (year, month) => {
  const weekMatrix = [];
  const startDate = new Date(year, month - 1);
  const endDate = new Date(year, month, 0);
  let currentWeekRow = Array(startDate.getDay()).fill("  ");

  for (
    let day = new Date(startDate);
    day <= endDate;
    day.setDate(day.getDate() + 1)
  ) {
    currentWeekRow.push(String(day.getDate()).padStart(2));

    if (currentWeekRow.length === 7) {
      weekMatrix.push(currentWeekRow);
      currentWeekRow = [];
    }
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
