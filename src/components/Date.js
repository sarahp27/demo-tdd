let date = new Date();
let fullYear = date.getFullYear();
let dateToday = date.getDate();
let month = date.getMonth();
console.log("HERE", fullYear + "-" + (Number(month) + 1) + "-" + dateToday);
date = fullYear + "-" + 0 + (Number(month) + 1) + "-" + dateToday;

export { date };
