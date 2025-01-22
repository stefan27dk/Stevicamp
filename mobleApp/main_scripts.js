var db =


    // Create Name with unique Id ================================================================================================
    function createNameId(productName) {

        var date = new Date(); // New Date object
        var idDate = date.toISOString().replace(/:/g, "-"); //Create - new DateTime and replace the ":" with "-"  the "/g" means replace all. Because ":" is not allowed to be in a file name.
        var idName = productName + 'D' + idDate + "!" + Math.random().toString(36).substring(2, 12); // Combine the data to get file name with ID. The pattern is [TheProduct-NAME AND MODEL-TheDateAndTime - UNIQUE ID]

        return idName; //'The Product Type-Model-DateTime-Id'
    }














// IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

// Create Unique Id =============NOT IN USE===================================================================================
function createId() {
    // Create Unique ID
    let id = Math.random().toString(36).substring(2, 12);
    return id;
}



// EXAMPLE NOT IN USE ======================================================================
var date = new Date();
var id4 = date.toISOString();
console.log(id4);

// Unique Id with datetime
var date = new Date();
var id4 = date.toISOString() + "!" + Math.random().toString(36).substring(2, 12);
console.log(id4);
// =============================================================



// Javascript object to json =============================================================
const obj = { name: "John", age: 30, city: "New York" };
const myJSON = JSON.stringify(obj);









// Javascript stringObject to javascriptObject = It seams to be slower than parsing to json =============================================================
function strToObj(e) {

    if (typeof e == "string") // If the input is string
    {
        let obj = new Function("return" + e); // Making the string to javascript object

        try { return obj() }

        catch (err) {
            console.log(err)
        }
    }
    else {
        console.log("2. it is not a string")
    }
};


// The string object
var db = `{
    appliances: [],
    caravans: [{ id: '1D2025-01-21T19-57-54.913Z!txj5btx8wa', brand: 'Knaus', model: 'Sunshine 500', year: '2002', length: '500', date: '2025-01-21 22:08 ч.', condition: 'Използвано', location: 'Дрен Перник', toilet: 'Химическа', bath: 'Да', heating: 'Газово', boiler: 'да', ac: 'Няма', sleepingPlaces: '6', fortelt: 'Да', markise: 'Не', description: 'Good caravan - description', photos: ['https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/resources/img/Caravans/Caravan-Knaus-540D2025-01-21T17-59-45.662Z!iuarh18q78/1D2025-01-21T18-44-41.342Z!u77tt1ppa9.jpg', 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/resources/img/Caravans/Caravan-Knaus-540D2025-01-21T17-59-45.662Z!iuarh18q78/2D2025-01-21T18-46-56.767Z!dlzte64rx6.jpg', 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/resources/img/Caravans/Caravan-Knaus-540D2025-01-21T17-59-45.662Z!iuarh18q78/3D2025-01-21T18-47-15.110Z!33kdqox9e1.jpg', 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/resources/img/Caravans/Caravan-Knaus-540D2025-01-21T17-59-45.662Z!iuarh18q78/4D2025-01-21T18-47-29.788Z!4jwyhyn2j3.jpg', 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/resources/img/Caravans/Caravan-Knaus-540D2025-01-21T17-59-45.662Z!iuarh18q78/5D2025-01-21T18-47-43.020Z!n85kvz81on.jpg'] }],
    cars: [],
    equipment: [],
    microbuses: [],
    products: [],
    scooters: [],
    trailers: [],
    wheels: [],
}`;



dbObj = strToObj(db); // Convert the string to javascript object calling function
console.log(dbObj) // Show in console









// ========= JAVASCRIPT OBJECT TO JSON - AND - JSON TO JAVASCRIPT OBJECT == IT SEAMS TO BE FASTER THAN THE new Function("return" e)===========================================================================================================================================================
var db = {
    appliances: [],
    caravans: [{ id: '1D2025-01-21T19-57-54.913Z!txj5btx8wa', brand: 'Knaus', model: 'Sunshine 500', year: '2002', length: '500', date: '2025-01-21 22:08 ч.', condition: 'Използвано', location: 'Дрен Перник', toilet: 'Химическа', bath: 'Да', heating: 'Газово', boiler: 'да', ac: 'Няма', sleepingPlaces: '6', fortelt: 'Да', markise: 'Не', description: 'Good caravan - description', photos: ['https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/resources/img/Caravans/Caravan-Knaus-540D2025-01-21T17-59-45.662Z!iuarh18q78/1D2025-01-21T18-44-41.342Z!u77tt1ppa9.jpg', 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/resources/img/Caravans/Caravan-Knaus-540D2025-01-21T17-59-45.662Z!iuarh18q78/2D2025-01-21T18-46-56.767Z!dlzte64rx6.jpg', 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/resources/img/Caravans/Caravan-Knaus-540D2025-01-21T17-59-45.662Z!iuarh18q78/3D2025-01-21T18-47-15.110Z!33kdqox9e1.jpg', 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/resources/img/Caravans/Caravan-Knaus-540D2025-01-21T17-59-45.662Z!iuarh18q78/4D2025-01-21T18-47-29.788Z!4jwyhyn2j3.jpg', 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/resources/img/Caravans/Caravan-Knaus-540D2025-01-21T17-59-45.662Z!iuarh18q78/5D2025-01-21T18-47-43.020Z!n85kvz81on.jpg'] }],
    cars: [],
    equipment: [],
    microbuses: [],
    products: [],
    scooters: [],
    trailers: [],
    wheels: [],
};


var jsonObj = JSON.stringify(db); //Make the js obj to json - Will be used to convert the obj to json, before sending the data to the server

var t0 = performance.now(); // Test
var jsObj = JSON.parse(jsonObj); // Parse the json object from the server to javascript workable object
var t1 = performance.now();
console.log(t1 - t0); 
console.log(jsObj);


















// Fetch ==========================================================================================
 
async function exampleFetch() {
    // const response = await fetch('https://raw.githubusercontent.com/stefan27dk/Stevicamp-1.2/main/Index.html');
    // const text = await response.text();
    // console.log(text);
    // document.getElementById('mainHtml').innerHTML = text;


    // https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp-1.2/index.html
    fetch('https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/resources/db/database.js')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.obj();
    })
    .then(textContent => {
        // get the text.
        const result = textContent;
        console.log(textContent);
        document.getElementById('mainHtml').innerHTML = textContent;
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

var obj = exampleFetch();
console.log(obj.caravans);
 