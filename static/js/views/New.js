// Imports -----------------------------------------------------
import * as Common from "./Common.js"





// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() 
{
    let db = await getDb();
    
    // for (let v = 0; v < db.items.length; v++) 
    // {
    //     db.items[v].sort(function(a,b){
    //         // Strings to dates than substract them
    //         // Geting value negative, positive or zero  
    //         return new Date(b.date) - new Date(a.date);
    //       });
    // }
     
    // for (var prop in db.items) {
    //     if (Object.prototype.hasOwnProperty.call(db.items, prop)) {
    //         db.items[prop].sort(function(a,b){
    //             // Strings to dates than substract them
    //             // Geting value negative, positive or zero  
    //             return new Date(a.date) - new Date(b.date);
    //           });
    //     }
    // }
      
    // Sort to get newest first
    let allItemsArray = [];
    let allItemsObj = {};
     
        // 1. Get all items in 1 array .....................................
        for (var prop in db.items) 
        {
            allItemsArray = allItemsArray.concat(db.items[prop]);  
        }
   
         //  allItemsArray.sort((a, b) => a.date.localeCompare(b.date)); 



    // 2. Sort the items - newest first .....................................
     allItemsArray.sort((a, b) => a.date.localeCompare(b.date));// Sort the all items array - .reverse(); Newest first


     // 3. Construct back the db but now sorted by newest first, because the logic in default scripts ......................................
     for (let v = 0; v < allItemsArray.length; v++) 
    { 
        if(Object.hasOwn(allItemsObj, [`${allItemsArray[v].category}`])) // If object has already this property - like caravans, cars, products etc.
        {
            allItemsObj[`${allItemsArray[v].category}`].push(allItemsArray[v]); // Push the item to its "category" that excists as prop in the obj. The obj "ex. the specific caravan" itself has also the category as string
        }
        else
        {
            allItemsObj[`${allItemsArray[v].category}`] = [allItemsArray[v]]; // Add the first item as array
        }
    }


   return  `${await getItems('', allItemsObj)}`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Най Нови", "new-products"); 
}



