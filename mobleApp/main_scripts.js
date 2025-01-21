


var date = new Date();
var id4 = date.toISOString();
console.log(id4);

// Unique Id with datetime
var date = new Date();
var id4 = date.toISOString()+"!"+Math.random().toString(36).substring(2, 12);
console.log(id4);



// =============================================================



 
var date = new Date(); // New Date object
var idDate = date.toISOString().replace(/:/g, "-"); //Create - new DateTime and replace the ":" with "-"  the "/g" means replace all. Because ":" is not allowed to be in a file name.
var id = 'Caravan-Hobby-640'+'D'+ idDate+"!"+Math.random().toString(36).substring(2, 12); // Combine the data to get file name with ID. The pattern is [TheProduct-NAME AND MODEL-TheDateAndTime - UNIQUE ID]
console.log(id);

//'The Product Type-Model-DateTime-Id'

 