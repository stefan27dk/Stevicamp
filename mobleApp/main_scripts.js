


var date = new Date();
var id4 = date.toISOString();
console.log(id4);

// Unique Id with datetime
var date = new Date();
var id4 = date.toISOString()+"!"+Math.random().toString(36).substring(2, 12);
console.log(id4);
