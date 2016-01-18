var moment = require('moment');
var now = moment();

console.log(now.format());

console.log(now.format('X'));
console.log(now.valueOf());

var timestamp = 1440000000233;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format("h:mma")); // 11:06 am

// now.subtract(1, 'year');
// console.log(now.format());
// console.log(now.format("MMM do YYYY h:mma"));