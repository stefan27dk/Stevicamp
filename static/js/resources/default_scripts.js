// ############## DATABASE #################################################################################################
var base_db = null;

var locationInputChanged = false;

var prevUrl = "";

var popStateUrl = false;

async function getDb() {
    if (base_db == null) {
        // var jsDb = await fetch('https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@latest/resources/db/database.json?1', {cache: "reload"})
        var jsDb = await fetch('http://localhost:8080/resources/db/database.json', { cache: "reload" })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Probably here it parses the json to js object, so we dont need to use JSON.parse();
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

        base_db = jsDb;
        return jsDb;
    }
    else {
        return base_db;
    }
}




// ############## HTML LAYOUT - Toggle Bars & LoadBars state from local storage #################################################################################################
loadMainBarsState();


// FUNCTIONS --------------------------------------------------------------------------------------------------

// TOGGLE BARS ========================================================================================
function toggleBars(e) {
    let current = e.currentTarget;
    let currentBar = document.getElementById(current.value); // The toggler buttons have assigned value for the specific bar they need to toggle ex. toggler value for topbar is value="top-bar", the toggler id is id="top-bar-toggler" than later evt. you can use the value "top-bar"+"toggler" to get the toggler, but in this case we just pass it to the next funktion to use it insteat of doing getElement

    if (currentBar.style.display === 'none') {
        currentBar.style.display = 'block';
        localStorage.setItem(currentBar.id, 'block'); // Save bar state to local storage 
    }
    else {
        currentBar.style.display = 'none';
        localStorage.setItem(currentBar.id, 'none'); // Save bar state to local storage 
    }

    // changeToggleBarIcon(current.value);
    changeTogglerIcon(current);
}




// Change Togglebar Icon ==========================================================================================
function changeTogglerIcon(toggler) {
    // let barToggler = document.getElementById(bar+"-toggler").children[0]; // Get the toggler 
    let barTogglerText = toggler.children[0]; // Get the toggler text, which is the first child the arrow text ">>" 

    if (barTogglerText.innerHTML == "‹‹") {
        barTogglerText.innerHTML = "››";
    }
    else {
        barTogglerText.innerHTML = "‹‹";
    }
}





// SCROLLING HORIZONTALY - USED IN TOP / BOTTOM BAR =================================================================
scrollHorizontal = (e) => {
    // e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
}





// LOCAL STORAGE :: START::
// Load Bar State from local storage  ===============================================================================
function loadBarState(barId) {
    let currentBar = document.getElementById(barId);
    let currentBarLStorageState = localStorage.getItem(barId);

    if (currentBarLStorageState !== null) {
        currentBar.style.display = currentBarLStorageState;

        if (currentBarLStorageState == 'none') {
            changeTogglerIcon(document.getElementById(barId + "-toggler")); // Change toggler arrows
        }
    }
}






// LOAD ALL BARS STATE - FROM LOCAL STORAGE - On Page Load ==========================================================
function loadMainBarsState() {
    loadBarState("left-bar");
    loadBarState("right-bar");
    loadBarState("top-bar");
    loadBarState("bottom-bar");
}
// LOCAL STORAGE :: END::






// ####### HTML LAYOUT - Event Listeners ###########################################################################
// "TopBar, BottomBar, LeftBar, RightBar, Arrows for opening and clising the bars" 
// LEFTBAR-TOGGLE-BTN
document.getElementById('left-bar-toggler').addEventListener("click", toggleBars);

//RIGHTBAR-TOGGLE-BTN
document.getElementById('right-bar-toggler').addEventListener("click", toggleBars);

//TOPBAR-TOGGLE-BTN
document.getElementById('top-bar-toggler').addEventListener("click", toggleBars);

//BOTTOMBAR-TOGGLE-BTN
document.getElementById('bottom-bar-toggler').addEventListener("click", toggleBars);


// TOPBAR
document.getElementById('top-bar-wrapper').addEventListener("wheel", scrollHorizontal, { passive: true });

// BOTTOMBAR
document.getElementById('bottom-bar-wrapper').addEventListener("wheel", scrollHorizontal, { passive: true });



// Search Input eventlistener
document.getElementById('global-search-input').addEventListener("input", searchItems);
 
document.getElementById('current-items-search-input').addEventListener("input", searchItems);



window.addEventListener("load", checkForSearchKeywords);

document.getElementById('modalWindow').addEventListener("click", e => {closeItemModal(e)}); // Close modal // fun to prevent on click childs to lo

 
// document.getElementById('modalContentContainer').addEventListener("click", (e)=> { e.stopPropagation();});

window.addEventListener('popstate',closeItemModalOnPopState);



// ####### Copy to clipboard share link ###########################################################################
function copyToClipboard(str) {

    window.navigator.clipboard.writeText(str);
}




// ----- MODAL ---------------------------------------------------------------------------------------------------------

// The Item Modal - the modal that shows the selected item -------------------------------
async function itemModalNavigation(itemId) 
{
    prevUrl = window.location.href; // Used in closeItemModal so to return to original adress and have it in the history so to navigate with the browser buttons back forth
    showModal(itemId);
    // document.getElementById('overlayImg').src = window[imgName]; // Static img Tag

    window.history.pushState({},"",`?search=${itemId}`);
} 



// Base HTML For caravans -----------------------------------------------------------------------
function caravansHtmlTemplate(obj)
{
     // need to add script for getting all images and generating html code because there is no fixed amount of images can be more can be less every time
   return `<div class="modalItemContainer">


   <div class="img-preview-container">
       <img class="slide" style="display:flex;" src='${obj.photos[0]}'>
       <img class="slide" src='${obj.photos[1]}'>
       <img class="slide" src='${obj.photos[2]}'>
       <img class="slide" src="static/img/icons/boiler.png">

       <button class="arrow-left" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right" onclick="toggleModalImg(1)">&#10095;</button>
   </div>

     
   <div class="modalItemDetails ">
       <span><img src="static/img/icons/brand.png"><b>Цена:</b> ${obj.price}</span>
       <span><img src="static/img/icons/brand.png"><b>Залавие:</b> ${obj.brand}</span>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <span><img src="static/img/icons/ruler.png"><b>Дължина:</b> ${obj.length}</span>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <span><img src="static/img/icons/toilet.png"><b>Тоалетна:</b> ${obj.toilet}</span>
       <span><img src="static/img/icons/bath.png"><b>Баня:</b> ${obj.bath}</span>
       <span><img src="static/img/icons/heater.png"><b>Отопление:</b> ${obj.heating}</span>
       <span><img src="static/img/icons/boiler.png"><b>Боийлер:</b> ${obj.boiler}</span>
       <span><img src="static/img/icons/snowflake.png"><b>АС/Климатик:</b> ${obj.ac}</span>
       <span><img src="static/img/icons/bed.png"><b>Спални места:</b> ${obj.sleepingPlaces}</span>
       <span><img src="static/img/icons/tent.png"><b>Форселт:</b> ${obj.fortelt}</span>
       <span><img src="static/img/icons/markise.png"><b>Маркиза:</b> ${obj.markise}</span>
       <span><img src="static/img/icons/markise.png"><b>Документи:</b> ${obj.documents}</span>
       <span><img src="static/img/icons/markise.png"><b>Местоположение:</b> ${obj.documents}</span>
       <span><img src="static/img/icons/markise.png"><b>Описание:</b> ${obj.markise}</span>
   </div>
</div>`;
}


// ### MODAL ### --------------------------------------------------------------------------------------------------------------
async function showModal(itemId) // Show modal is used so when navigating trough the back forward buttons to only show the modal and not push state differnt paths - other wise it does not work
{
    let db = await getDb(); // Get the singleton db
    let rawItem = await recursiveSearchObj(db, itemId); // Search and get the matched item // Consider seperate search for the modal to search only in id keys for eventually better performance
    let item = Object.values(rawItem)[0][0];
    
    // window.history.replaceState( {} , "title", `?search=${item.id}`);
    let generatedItemHtml = '';
    if(item.category == "caravans")
    {
        generatedItemHtml = caravansHtmlTemplate(item);
    }
    let modal = document.getElementById("modalWindow");
    // modal.innerHTML = 
    modal.innerHTML = `<div class="modalContentContainer">${generatedItemHtml}</div>`; 
    modal.style.display = 'flex'; // Show modal
}


async function closeItemModal(e)
{
    if(e.target !== e.currentTarget){return;} // If child is clicked dont close the modal

    let modal = document.getElementById("modalWindow");
    modal.style.display='none';
     
    history.pushState({}, "", prevUrl); // Push the prev url so it can be retrived by using back and forward buutosn on the browser
    // window.history.back();
    // window.history.replaceState({} , '', `${prevUrl}` );
    // prevUrl ="";
    // history.go(-1);
}


function closeItemModalOnPopState() // Close the modal on prev forward button
{
    popStateUrl = true;
    prevUrl = window.location.href; // For the modal to get the prev url
   
    let modal = document.getElementById("modalWindow");
    modal.style.display='none'; 
}

 

var modalImgIndex = 0; // Hold track of the current img index - showed image

// Changing images in modal
function toggleModalImg(n) {
    
    let images = document.getElementsByClassName("slide"); // Get the images
    
    images[modalImgIndex].style.display = "none"; // Hide the image
   
    if (images.length-1 == modalImgIndex && n != -1)  // If Last image and is not back button
    { 
        modalImgIndex = -1;
    }
    else if(modalImgIndex == 0 && n ==-1)// If Back button and reached the first image go to the last
    {
        modalImgIndex = images.length;
    }

    images[modalImgIndex + n].style.display = "block"; // Show img n can be -1
    modalImgIndex += n; // n can be -1
    // alert(images.length + "-" + modalImgIndex);

}






async function checkForSearchKeywords() // Check for keywords in the adressbar also used for the modal
{
    const search = window.location.search;

    // If search keywords in the path
    if (search !== "") 
    {

        if(search.match("id_")) // If id_ than open modal
        {
            const itemId = search.split('?search=')[1]; // If it includes id_ than after the search is the id including id_ it is åart of every id 
            await showModal(itemId); 
        }
        
            const searchKeyword = search.split('?search=')[1];
            let e = { "currentTarget": { "value": `${searchKeyword}`, "id": "searchKeywordFromUrl" } } // Mimic the pattern that the search function accepts
            await searchItems(e);
        
    }
}

// async function constructItemsListAllTypes() // Item list with 
// {
//     db = await getDb(); // The singleton Database - fetch if not already fetched - it is in the other file 

//     let allDbItems = [];
//     for (let i = 0; i < Object.keys(db).length; i++) 
//     {
//         for (let a = 0; i <  db[i].length; a++) 
//         {
//             allDbItems.push(db[i][a]);
//         } 
//     }
// // Object.values(person);
//     return allDbItems;
// }



// Get available Db types - cars, caravans, products etc. 
async function getAvailableDbTypes() {
    let db = await getDb();
    let availableDbTypes = Object.keys(db);

    return availableDbTypes; // AllDbTypes - cars, caravans, products as strings
}


// Check if the route - the url ending is caravans, cars, products etc. 
// If it is unknouns like index.html or asdfd or something that is not found in the db as product return false
// async function checkRouteWithDbTypes(itemType) 
// {
//     let availableDbTypes = getAvailableDbTypes();
//     for (let i = 0; i < availableDbTypes.length; i++) 
//     {
//        if(itemType == aviableDbTypes[i])
//        {
//         return true;
//        }
//     }
//     return false;
// }



// Get Items - Construct html items
async function getItems(itemType, itemsList)  // ItemType = car, caravan, products etc.
{
    let db = await getDb();

    // if(!Object.hasOwn(db, `${itemType}`) && itemsList !== undefined) // If there is no such item type in the db and if items list is empty. This may mean no search result in home vire search
    // {
    //     itemsList
    // }
    if (itemsList == null && Object.hasOwn(db, `${itemType}`)) // If there is no provided item list but only type and if the type is found in the db
    {
        itemsList = { [`${itemType}`]: db[`${itemType}`] } // Get the itemList from the Db by using the known type that is provided and use the type as key entry for the list
    }
    else if (!Object.hasOwn(db, `${itemType}`) && itemsList == undefined) // If the item type is not found in the db and if there is no provided items list
    // If Home - In Home search all items - Or If it is unknown itemType - known item types are caravans, cars, products etc. 
    //Unknoun are any other string that is not found in the db as item. This item type is gotten from the url, the url can end /Caravans, /Cars etc. unknown /ssdfsdfsdf etc.
    {
        // itemsList = Object.entries(db).map(); // Get All items from the different types in 1 list  
        // itemsList = Object.entries(db).map(([key, value]) => {[key],[value]});
        itemsList = db;
    }
    // else
    // {
    //     itemsList = itemsList; 
    //     itemsList = db;
    // }



    // Use of string for better performance instead of using .innerHTML += 
    var combined_items = ''; // Holder of the items, that are constructed and put in this variable
    var itemLink = ''; // Holder for the constructing of a link for every item 

    for (let g = 0; g < Object.keys(itemsList).length; g++) {
        itemType = Object.keys(itemsList)[g];

        // // Object.keys(db)[0];
        // // Object.keys(obj).length

        // <div onmousedown="itemModal('')"></div>

        for (let i = 0; i < itemsList[`${itemType}`].length; i++) {
            itemLink = window.location.href + '?search=' + itemsList[`${itemType}`][i].id; // Construct the link for the current item

            // For every iteration there is constructed item an put in the variable "combined_items".
            combined_items += (`<div class="content_container_item">
         <a href="javascript:itemModalNavigation('${itemsList[`${itemType}`][i].id}');">
             <img class="item_img" src="${itemsList[`${itemType}`][i].photos[0]}"> </img>
             <p>${itemsList[`${itemType}`][i].title}</p>
         </a>
       
         <div class="item_buttons_wrapper">
             <a class="item_share_button" style="background-image: url('static/img/icons/copy.png');" href="javascript:copyToClipboard('${itemLink}');"></a>
             <a class="item_share_button" style="background-image: url('static/img/icons/viber.png');"
                 href="viber://forward?text=${itemLink}"></a>
             <a class="item_share_button" style="background-image: url('static/img/icons/whatsapp.png');"
             target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?text=${itemLink}"></a>
             <a class="item_share_button" style="background-image: url('static/img/icons/messenger.png');"
                 href="fb-messenger://share/?link=${itemLink}"></a>
         </div>
                      </div>`);

        }
    }

    return combined_items;
}



// Search - current items - when in ex. caravans View, Cars View, Prodicts View etc. ###########################################################################
async function searchItems(e) {
    let db = await getDb(); // Get the singleton db
    var searchTxt = e.currentTarget.value; // Get the txt from the search textbox or the url depending on e


    var currentItemsType = (window.location.pathname).substring(1).toLocaleLowerCase(); // Get the current items Type from the url
    var data = null;
 
    // Search if there is provided type "currentItemsType = caravans, cars etc."
    if (Object.hasOwn(db, `${currentItemsType}`) && e.currentTarget.id !== "global-search-input") // If there is such property - search by usning the property otherwise search in the whole db everything.
    {
        document.getElementById('global-search-input').value = ""; // Reset the global-search-input - when using  the current search input

        let items = await searchArray(db[`${currentItemsType}`], searchTxt); // Search and get the matched items 
        data = { [`${currentItemsType}`]: items } // Construct object - so it looks like the db pattern object, so the same code for get items can be used for search too
    }
    else // GLobal Search 
    {
        if (e.currentTarget.id !== "current-items-search-input") {
            document.getElementById('current-items-search-input').value = ""; // Reset the current-items-search-input / on global search
        }
        else
        {
          document.getElementById('global-search-input').value = "";
        } 
        if (e.currentTarget.id !== "searchKeywordFromUrl") //  If there is not search keyword "?search=mysearchkeyword" // Consider else if
        {
            // const state = { page_id: 1};

            // history.pushState(state, "", '/'); // Navigate to Home View and search in all  
            // var data = {rand: Math.random()};
            // window.history.pushState(data, '', '/');
            // // location.replace("https://www.w3schools.com");
            // // window.location.assign("/index.html",);

             
            // history.pushState(state, '', "/");
            if(window.location.pathname != "/")
            {
                locationInputChanged = true; // It is used in the Common View to prevent global search being erased
                document.getElementById('home-button').click(); // Simulate click so the main.js route is triggered to navigate to home, view. Tried with pushstate but did not work well.
                
                // window.location.search = searchTxt; 
            }
        }
        // window.location.pathname = '/index.html'; // Change to Home View path
        window.history.replaceState( {} , "title", `?search=${searchTxt}`);
        let items = await recursiveSearchObj(db, searchTxt); // Search and get the matched items
        data = items; // Construct object - so it looks like the db pattern object, so the same code for get items can be used for search too
    }




    document.getElementById('app').innerHTML = await getItems(currentItemsType, data); // Inject the items in the app container
}



// ####### Search Script ###########################################################################

// It looks like this is not nececery because the .includes(match) does the search. obj[p].toLocaleLowerCase().includes(match).
// async function deepSearch(data, searchTxt) 
// { 
//     let searchTxtFirstChar = searchTxt[0];
//     var searchResult = "";

//     if (searchTxtFirstChar !== undefined) // If not empty string
//     {
//         for (let t = 0; t < data.length; t++) // Loop data to check each char and compare with the Search text first char
//         {
//             if (searchTxtFirstChar == data[t]) // Compare data with search txt first char. If there is match 
//             {
//                 for (let y = 0; y < searchTxt.length; y++) // Try to match the search word with the next chars in the data
//                 {

//                     if (searchTxt[y] == data[t + y]) // Try to match the search word from the data provided
//                     {
//                         searchResult += data[t + y]; // Add the matched char to searchResult string [n],[a],[m],[e]
//                     }
//                     else // if there was no word match // Reset the result to be ready for the next try // At this point here there have been no char match, no full match
//                     {
//                         searchResult = ""; // There is no full match, but partly only some chars, thats why reset the searchResult to continue to the new try, no need to check further there was no match, but partial match let say nam was matched but we need name to be matched as whole word 
//                         break;
//                     }
//                     if (searchResult.length == searchTxt.length) // Check if there is a whole match
//                     {
//                         return true; // Stop everything and return true - there was match
//                     }
//                 }
//             }

//         }
//         return false; // No match, At this point the whole data was looped and there is no match
//     }
//     else 
//     {
//         return false;
//     }
// }


// To check if object is empty
function isObjEmpty(obj) {
    for (var x in obj) {
        return false;
    }
    return true;
}



// Search Object - Only clean object
async function searchObject(obj, match) {

    let resultObjDb = {}; // Hold the results


    for (const p in obj) {
        let type = typeof obj[p];

        // String
        if (type === 'string') // Whole word match
        {
            if (obj[p].toLocaleLowerCase().includes(match) === true) {
                return obj;
            }
        }
        // Int, Float, Bool, BigInt
        else if (type === 'number' || type === 'boolean' || type === 'bigint') {
            if (obj[p].toString().toLocaleLowerCase().includes(match) === true) {
                return obj;
            }
        }
        // Object
        else if (type === 'object') {
            let subResult = await searchObject(obj[p], match); // Returns sub object
            if (subResult !== undefined && subResult.id !== undefined) {
                if (Object.hasOwn(resultObjDb, [subResult.category])) // Check if there is already such property in the resultObjDb
                {
                    // Ex: db.caravans = db.caravans + caravans;
                    // resultObjDb[subResult.category] = resultObjDb[subResult.category] + [subResult.category][subResult]; // Merge the props
                    // Object.assign(resultObjDb[subResult.category], [subResult.category][subResult]);
                    // Array.prototype.push.apply(arr1,arr2);
                    if (Array.isArray(resultObjDb[subResult.category])) {
                        resultObjDb[subResult.category] = resultObjDb[subResult.category].concat(subResult);
                        // resultObjDb[subResult.category] = resultObjDb[subResult.category].concat(resultObjDb[subResult.category]);
                    }
                    // resultObjDb[subResult.category] = {...[subResult.category][subResult], ...resultObjDb[subResult.category]}; 
                }
                else {
                    let constructedSubResult = { [subResult.category]: [subResult] };
                    resultObjDb = { ...resultObjDb, ...constructedSubResult };    // Merge to the resultObjDb if prop does not excists
                }
            }
        }
    }

    return resultObjDb;
}




async function recursiveSearchObj(obj, match) {
    match = match.toLocaleLowerCase(); // In the search all the string are made to lowerCase, here if this is missing searching with capital letter will not find results 

    let resultObjDb = {}; // Hold the results

    for (const p in obj) // loop the props and check if it is object
    {
        if (Object.prototype.hasOwnProperty.call(obj, p)) // If Only own props, not inherited
        {
            let type = typeof obj[p];

            // If Object
            if (type === 'object') {
                let subResult = await searchObject(obj[p], match); // Returns sub object
                if (subResult !== undefined && !isObjEmpty(subResult)) {

                    //   Object.assign(resultObjDb, [subResult.category][subResult]); // Ex. caravans:{category:caravans, brand:hobby,....}

                    // let constructedSubResult = {[subResult.category]:[subResult]};
                    // resultObjDb = {...resultObjDb, ...constructedSubResult};               
                    resultObjDb = { ...resultObjDb, ...subResult };
                    // [resultObjDb][[obj[p].category]:[obj[p]]]  // Try to add new item to let say caravans if. This is serach result if already has caravans than add the new result to the old result
                    // resultArray.push(constructedObj);
                }
            }
        }
    }

    return resultObjDb;
}


// // TEST=OBJ===========================================
// let testObj = 
// { 
//     name: "Dodo", 
//     isLogged: true, 
//     id: "2", 
//     domains: [
//     { domainId: 123, domainName: "www.domainOfMine.com", customerId: '765' },
//     { domainId: 3456, domainName: "www.domain2.com", customerId: '34' }], 
//     role:{roleName:'user', roleQuant:[{qName:'Q1', quantity: 5, cNa:{bName:'B1', bArr:[{jk: 9}]}}]} 
// }

// let resultOBJ = searchObject(testObj, "q1".toLocaleLowerCase());
// console.log(resultOBJ);
// // TEST END ===OBJ===================================





// Search Array
async function searchArray(arr, match) {

    match = match.toLocaleLowerCase(); // In the search all the string are made to lowerCase, here if this is missing searching with capital letter will not find results 
    console.time();
    let resultArr = [];
    for (let b = 0; b < arr.length; b++) {
        let type = typeof arr[b];
        // Object
        if (type === 'object') {
            let result = await searchObject(arr[b], match);
            if (result !== undefined && !isObjEmpty(result)) {
                resultArr.push(result);
            }
        }
        else if (type === 'string') {
            if (arr[b].toLocaleLowerCase().includes(match) === true) {
                resultArr.push({ stringValue: arr[b] });
            }
        }
        // Int, Float, Bool, BigInt
        else if (type === 'number' || type === 'boolean' || type === 'bigint') {
            if (arr[b].toString().toLocaleLowerCase().includes(match) === true) {
                resultArr.push({ [type + 'Value']: arr[b] });
            }
        }
    } console.timeEnd();
    return resultArr;
}









// // TEST========ARR====================================
// let testArr =
//     [
//         "777",
//         6548452,
//         ["wer", "yter", { er: "hhh" }],
//         {
//             name: "Dodo",
//             isLogged: true,
//             id: "2",
//             domains: [
//                 { domainId: 123, domainName: "www.domainOfMine.com", customerId: '765' },
//                 { domainId: 687, domainName: "www.domain2.com", customerId: '34' }],
//             role: { roleName: 'user', roleQuant: [{ qName: 'Q1', quantity: 5, cNa: { bName: 'B1', bArr: [{ jk: 45 }] } }] }
//         },
//         {
//             name: "Boby",
//             isLogged: true,
//             id: "3",
//             domains: [
//                 { domainId: 123, domainName: "www.dom1.com", customerId: '87' },
//                 { domainId: 358456, domainName: "www.dom3.com", customerId: '45' }],
//             role: { roleName: 'user', roleQuant: [{ qName: 'HJ', quantity: 34, cNa: { bName: 'SXwer1', bArr: [{ jk: 9 }] } }] }
//         },
//         {
//             name: "Didi",
//             isLogged: true,
//             id: "4",
//             domains: [
//                 { domainId: 123, domainName: "www.ecomi3.com", customerId: '2321' },
//                 { domainId: 3456, domainName: "www.toti.com", customerId: '87' }],
//             role: { roleName: 'user', roleQuant: [{ qName: 'RT', quantity: 5, cNa: { bName: 'L1', bArr: [{ jk: 12 }] } }] }
//         }
//     ];


// let resultArr = searchArray(testArr, "87".toLocaleLowerCase());


// console.log(resultArr);
// TEST END ======ARR================================






