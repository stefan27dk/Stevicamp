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

document.getElementById('modalWindow').addEventListener("click", e => { closeItemModal(e) }); // Close modal // fun to prevent on click childs to lo


// document.getElementById('modalContentContainer').addEventListener("click", (e)=> { e.stopPropagation();});

window.addEventListener('popstate', closeItemModalOnPopState);



// Listen for keypress ..............................................................................
document.body.addEventListener('keydown', function (e) {
    e = e || window.event;

    let modal = document.getElementById("modalWindow");
    if (e.key === "ArrowLeft" && modal.style.display == "flex") // Change image prev
    {
        toggleModalImg(-1); // Change img 
        document.activeElement.blur();
    }
    else if (e.key === "ArrowRight" && modal.style.display == "flex") // Change image next
    {
        toggleModalImg(1); // Change img
        document.activeElement.blur();
    }
    else if (e.key === "ArrowUp" && modal.style.display == "flex") // Scroll up item details with arrow up
    {

        let itemDetailsContainer = document.getElementsByClassName("modalItemDetails")[0];
        itemDetailsContainer.focus();
    }
    else if (e.key === "ArrowDown" && modal.style.display == "flex") // Scroll down item details with arrow down
    {
        let itemDetailsContainer = document.getElementsByClassName("modalItemDetails")[0];
        itemDetailsContainer.focus();
    }
    else if (e.key === "Tab" && modal.style.display == "flex") // Tab only modal when it is opened
    {
        let modalItemContainer = document.getElementsByClassName("modalItemContainer")[0];

        if (!modalItemContainer.contains(e.target)) {
            modalItemContainer.focus();
        }
    }
});



function keyPress(e) {

}
// document.addEventListener("keypress", checkKeypress(e));

// function checkKeypress(e)
// {
//     e = e || window.event;

//     if(e.keyCode === 9)
//     {
//       alert("tab");
//     }
// }




// // Modal focus always
// document.getElementById('modalItemContainer').addEventListener('focusout', function(e) 
// {
//     // let modalItemContainer = document.getElementById('modalItemContainer');
//     // // event.stopPropagation();
//     // // if (modal.contains(event.relatedTarget)) {  // if focus moved to another 

//     // // // modal.parentElement.tabIndex = -1;

//     // //     return;
//     // // }

//     // modalItemContainer.tabIndex = 1;
//     // modal.focus();  // otherwise focus on parent or change to another dom

// });



// ####### Copy to clipboard share link ###########################################################################
function copyToClipboard(str) {

    window.navigator.clipboard.writeText(str);
}




// ----- MODAL ---------------------------------------------------------------------------------------------------------

// The Item Modal - the modal that shows the selected item -------------------------------
async function itemModalNavigation(itemId) {
    prevUrl = window.location.href; // Used in closeItemModal so to return to original adress and have it in the history so to navigate with the browser buttons back forth
    showModal(itemId);
    // document.getElementById('overlayImg').src = window[imgName]; // Static img Tag

    window.history.pushState({}, "", `?search=${itemId}`);
}



// COMMON ........................................................
// Share buttons for the current item in the modal -----------------------------------------------------------------------------------
function modalItemShareButtonsHtml(itemLink, title) {
    return `<div style="display:inline-block; position: absolute; bottom: 0; left:0; right:0; margin-inline: auto; 
                        min-width: 100%; text-align:center; background-color: transparent;"> 

     <a class="item_share_button" style="background-image: url('static/img/icons/copy.png');" href="javascript:copyToClipboard('${itemLink}');" title="Натиснете за да Копирате линка"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/viber.png');"href="viber://forward?text=${itemLink}" title="Споделете във Вибър"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/whatsapp.png');" target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?text=${itemLink}" title="Споделете в Уатсап"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/messenger.png');" href="fb-messenger://share/?link=${itemLink}" title="Споделете в Месинджър"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/email.png');" href="mailto:?subject=${title}&amp;body=${title},${itemLink}" title="Пратете по имейл"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/sms.png');" href="sms:?&body=${title},${itemLink}" title="Пратете по СМС"></a>
     <a class="item_share_button" style=" opacity: 0.2; background-image: url('static/img/icons/f.png');" href="https://facebook.com/sharer/sharer.php?u=${itemLink}" target="_blank" rel="noopener"></a>


    <span style="float:right; margin-right:2%; margin-top: 10px;" id="imgCount"></span>
    </div>`;
}


// Phone number and viber number --------------------------------------------------------------------------
function phoneViberNumberInfoHtml(phone, viberPhone)
{
    return ` <span title="Натиснете за да звъннете по телефона"><a href="tel:${phone}"><img src="static/img/icons/phone.png"><font size="2"><b>Тел: </b><u>${phone}</u></font></a></span>
    <span title="Натиснете за да пишете на Вайбър"><a href="viber://chat?number=%2B${viberPhone}"><img src="static/img/icons/viber.png"><font size="2"><b>Вайбър: </b>+<u>${viberPhone}</u></font></a></span>
`;
}



// Base HTML For caravans -----------------------------------------------------------------------
async function caravansHtmlTemplate(obj) {
    let db = await getDb();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
        // if(h == 0) // If first image make visible
        // {
        //     imgagesHtml += `<img class="slide" style="display:flex;" src='${obj.photos[h]}'>`;
        // }
        // else
        // {
        //     imgagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
        // }
    }
    // need to add script for getting all images and generating html code because there is no fixed amount of images can be more can be less every time
    return `<div class="modalItemContainer" tabindex="0">


   <div class="img-preview-container">
       ${imagesHtml}

       <button class="arrow-left prevent-select" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right prevent-select" onclick="toggleModalImg(1)">&#10095;</button> 
       
        ${modalItemShareButtonsHtml(itemLink, obj.title)}
   
    </div>
  
   
     
   <div class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/caravan.png"><u>${obj.title}</u></h3>
       <hr>
       ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}
       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/ruler.png"><b>Дължина:</b> ${obj.length}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/toilet.png"><b>Тоалетна:</b> ${obj.toilet}</span>
       <hr>
       <span><img src="static/img/icons/bath.png"><b>Баня:</b> ${obj.bath}</span>
       <hr>
       <span><img src="static/img/icons/heater.png"><b>Отопление:</b> ${obj.heating}</span>
       <hr>
       <span><img src="static/img/icons/boiler.png"><b>Боийлер:</b> ${obj.boiler}</span>
       <hr>
       <span><img src="static/img/icons/snowflake.png"><b>АС/Климатик:</b> ${obj.ac}</span>
       <hr>
       <span><img src="static/img/icons/bed.png"><b>Спални места:</b> ${obj.sleepingPlaces}</span>
       <hr>
       <span><img src="static/img/icons/tent.png"><b>Форселт:</b> ${obj.fortelt}</span>
       <hr>
       <span><img src="static/img/icons/markise.png"><b>Маркиза:</b> ${obj.markise}</span>
       <hr>
       <span><img src="static/img/icons/documents.png"><b>Документи:</b> ${obj.documents}</span>
       <hr>
       <span><img src="static/img/icons/plate.png"><b>Номер:</b> ${obj.plate}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr> 
   </div>
</div>`;
}







// Base HTML For cars -----------------------------------------------------------------------
async function carsHtmlTemplate(obj) {
    let db = await getDb();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }
    
    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       <button class="arrow-left prevent-select" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right prevent-select" onclick="toggleModalImg(1)">&#10095;</button> 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/car.png"><u>${obj.title}</u></h3>
       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/kind.png"><b>Тип:</b> ${obj.kind}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/engine.png"><b>Двигател:</b> ${obj.engine}; ${obj.hp}</span>
       <hr>
       <span><img src="static/img/icons/km.png"><b>Пробег:</b> ${obj.km}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/parctronic.png"><b>Парктроник:</b> ${obj.parktronic}</span>
       <hr>
       <span><img src="static/img/icons/gears.png"><b>Скорости:</b> ${obj.gears}</span>
       <hr>
       <span><img src="static/img/icons/car-door.png"><b>Врати:</b> ${obj.doors}</span>
       <hr>
       <span><img src="static/img/icons/particlefilter.png"><b>Партикфилтър:</b> ${obj.particulateFilter}</span>
       <hr>
       <span><img src="static/img/icons/snowflake.png"><b>АС/Климатик:</b> ${obj.ac}</span>
       <hr>
       <span><img src="static/img/icons/tow.png"><b>Теглич:</b> ${obj.tow}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>ГПС:</b> ${obj.gps}</span>
       <hr>
       <span><img src="static/img/icons/car-seat.png"><b>Места:</b> ${obj.seats}</span>
       <hr>
       <span><img src="static/img/icons/type.png"><b>Вид:</b> ${obj.type}</span>
       <hr>
       <span><img src="static/img/icons/documents.png"><b>Документи:</b> ${obj.documents}</span>
       <hr>
       <span><img src="static/img/icons/plate.png"><b>Номер:</b> ${obj.plate}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr> 
   </div>
</div>`;
}

 

// Base HTML For microbuses -----------------------------------------------------------------------
async function microbusHtmlTemplate(obj) {
    let db = await getDb();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }
    
    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       <button class="arrow-left prevent-select" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right prevent-select" onclick="toggleModalImg(1)">&#10095;</button> 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/microbus.png"><u>${obj.title}</u></h3>
       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/engine.png"><b>Двигател:</b> ${obj.engine}; ${obj.hp}</span>
       <hr>
       <span><img src="static/img/icons/km.png"><b>Пробег:</b> ${obj.km}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/parctronic.png"><b>Парктроник:</b> ${obj.parktronic}</span>
       <hr>
       <span><img src="static/img/icons/gears.png"><b>Скорости:</b> ${obj.gears}</span>
       <hr>
       <span><img src="static/img/icons/car-door.png"><b>Врати:</b> ${obj.doors}</span>
       <hr>
       <span><img src="static/img/icons/particlefilter.png"><b>Партикфилтър:</b> ${obj.particulateFilter}</span>
       <hr>
       <span><img src="static/img/icons/snowflake.png"><b>АС/Климатик:</b> ${obj.ac}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>ГПС:</b> ${obj.gps}</span>
       <hr>
       <span><img src="static/img/icons/car-seat.png"><b>Места:</b> ${obj.seats}</span>
       <hr>
       <span><img src="static/img/icons/type.png"><b>Тип:</b> ${obj.type}</span>
       <hr>
       <span><img src="static/img/icons/tow.png"><b>Теглич:</b> ${obj.tow}</span>
       <hr>
       <span><img src="static/img/icons/load.png"><b>Товарене:</b> ${obj.loading}</span>
       <hr>
       <span><img src="static/img/icons/documents.png"><b>Документи:</b> ${obj.documents}</span>
       <hr>
       <span><img src="static/img/icons/plate.png"><b>Номер:</b> ${obj.plate}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span> 
       <hr>
   </div>
</div>`;
}




// Base HTML For scooters -----------------------------------------------------------------------
async function scootersHtmlTemplate(obj) {
    let db = await getDb();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }
    
    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       <button class="arrow-left prevent-select" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right prevent-select" onclick="toggleModalImg(1)">&#10095;</button> 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/scooter.png"><u>${obj.title}</u></h3>
       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/wheel.png"><b>Колела:</b> ${obj.wheels}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span> 
       <hr>
       <span><img src="static/img/icons/km.png"><b>Пробег:</b> ${obj.km}</span>
       <hr>
       <span><img src="static/img/icons/fuel.png"><b>Гориво:</b> ${obj.fuel}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span> 
       <hr>   
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr> 
   </div>
</div>`;
}



// Base HTML For trailers -----------------------------------------------------------------------
async function trailersHtmlTemplate(obj) {
    let db = await getDb();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }
    
    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       <button class="arrow-left prevent-select" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right prevent-select" onclick="toggleModalImg(1)">&#10095;</button> 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/trailer.png"><u>${obj.title}</u></h3>
       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr> 
       <span><img src="static/img/icons/axle.png"><b>Оси:</b> ${obj.axles}</span>
       <hr>
       <span><img src="static/img/icons/load.png"><b>Товарене:</b> ${obj.loading}</span>
       <hr>
       <span><img src="static/img/icons/documents.png"><b>Документи:</b> ${obj.documents}</span>
       <hr>
       <span><img src="static/img/icons/plate.png"><b>Номер:</b> ${obj.plate}</span>
       <hr>
       <span><img src="static/img/icons/kind.png"><b>Тип:</b> ${obj.type}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange">  
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr> 
   </div>
</div>`;
}





// Base HTML For Tyres -----------------------------------------------------------------------
async function wheelsHtmlTemplate(obj) {
    let db = await getDb();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }
    
    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       <button class="arrow-left prevent-select" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right prevent-select" onclick="toggleModalImg(1)">&#10095;</button> 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/wheel.png"><u>${obj.title}</u></h3>
       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/ruler.png"><b>Мярка:</b> ${obj.measure}</span>
       <hr>
       <span><img src="static/img/icons/wheel.png"><b>Големина:</b> ${obj.size}</span>
       <hr>
       <span><img src="static/img/icons/et.png"><b>ET:</b> ${obj.et}</span>
       <hr> 
       <span><img src="static/img/icons/bolt-holes.png"><b>Разс. на Болт.:</b> ${obj.boltHoles}</span>
       <hr>
       <span><img src="static/img/icons/center-hole.png"><b>Център:</b> ${obj.centerHole}</span>
       <hr>
       <span><img src="static/img/icons/tread.png"><b>Грайфер:</b> ${obj.tread}</span>
       <hr>
       <span><img src="static/img/icons/seasson.png"><b>Сезон:</b> ${obj.seasson}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/type.png"><b>Вид:</b> ${obj.type}</span>
       <hr>
       <span><img src="static/img/icons/wheels.png"><b>Брой:</b> ${obj.pcs}</span>
       <hr>
       <span><img src="static/img/icons/car.png"><b>От/За:</b> ${obj.fromCar}</span>
       <hr>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr> 
   </div>
</div>`;
}




// Base HTML For products -----------------------------------------------------------------------
async function productsHtmlTemplate(obj) {
    let db = await getDb();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }
    
    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       <button class="arrow-left prevent-select" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right prevent-select" onclick="toggleModalImg(1)">&#10095;</button> 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/boxes.png"><u>${obj.title}</u></h3>
       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr>
   </div>
</div>`;
}






// Base HTML For equipment -----------------------------------------------------------------------
async function equipmentHtmlTemplate(obj) {
    let db = await getDb();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }
    
    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       <button class="arrow-left prevent-select" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right prevent-select" onclick="toggleModalImg(1)">&#10095;</button> 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/reol.png"><u>${obj.title}</u></h3>
       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span> 
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr>
   </div>
</div>`;
}



// ### MODAL ### --------------------------------------------------------------------------------------------------------------
async function showModal(itemId) // Show modal is used so when navigating trough the back forward buttons to only show the modal and not push state differnt paths - other wise it does not work
{
    let db = await getDb(); // Get the singleton db
    let rawItem = await recursiveSearchObj(db.items, itemId); // Search and get the matched item // Consider seperate search for the modal to search only in id keys for eventually better performance
    let item = Object.values(rawItem)[0][0];

    // window.history.replaceState( {} , "title", `?search=${item.id}`);
    let generatedItemHtml = '';
    if (item.category == "caravans") // If Caravan
    {
        generatedItemHtml = await caravansHtmlTemplate(item);
    }
    else if(item.category == "cars") // If Car
    {
        generatedItemHtml = await carsHtmlTemplate(item); 
    }
    else if(item.category == "microbuses")
    {
        generatedItemHtml = await microbusHtmlTemplate(item); 
    }
    else if(item.category == "trailers")
    {
        generatedItemHtml = await trailersHtmlTemplate(item); 
    }
    else if(item.category == "products")
    { 
        generatedItemHtml = await productsHtmlTemplate(item); 
    }
    else if(item.category == "equipment")
    { 
        generatedItemHtml = await equipmentHtmlTemplate(item); 
    }
    else if(item.category == "scooters")
    {
        generatedItemHtml = await scootersHtmlTemplate(item); 
    }
    else if(item.category == "wheels")
    {
        generatedItemHtml = await wheelsHtmlTemplate(item);   
    }

    let modal = document.getElementById("modalWindow");
    // modal.innerHTML = 
    modal.innerHTML = `<div class="modalContentContainer">${generatedItemHtml}</div>`;
    modal.style.display = 'flex'; // Show modal 
    // modal.tabIndex = 1;
    // modal.focus();
    toggleModalImg(0);

    document.getElementById("app").style.overflow = "hidden"; // hide the overflow for the app container so it is not triggered while the modal is open
}


async function closeItemModal(e) {
    if (e.target !== e.currentTarget) { return; } // If child is clicked dont close the modal

    let modal = document.getElementById("modalWindow");
    modal.style.display = 'none';

    history.pushState({}, "", prevUrl); // Push the prev url so it can be retrived by using back and forward buutosn on the browser
    // window.history.back();
    // window.history.replaceState({} , '', `${prevUrl}` );
    // prevUrl ="";
    // history.go(-1);
    modalImgIndex = 0; // Reset the image tab index on modal close
    document.getElementById("app").style.overflowY = "scroll"; // Reset the overflow for the app, so it can be scrolled
}


function closeItemModalOnPopState() // Close the modal on prev forward button
{
    popStateUrl = true;
    prevUrl = window.location.href; // For the modal to get the prev url

    let modal = document.getElementById("modalWindow");
    modal.style.display = 'none';
}



var modalImgIndex = 0; // Hold track of the current img index - showed image

// Changing images in modal
function toggleModalImg(n) {

    let images = document.getElementsByClassName("slide"); // Get the images

    if (images.length !== 1) {
        images[modalImgIndex].style.display = "none"; // Hide the image

        if (images.length - 1 == modalImgIndex && n !== -1)  // If Last image and is not back button
        {
            modalImgIndex = -1;
        }
        else if (modalImgIndex == 0 && n == -1)// If Back button and reached the first image go to the last
        {
            modalImgIndex = images.length;
        }

        images[modalImgIndex + n].style.display = "block"; // Show img n can be -1
        modalImgIndex += n; // n can be -1
        // alert(images.length + "-" + modalImgIndex);
    }
    else {
        images[0].style.display = "block"; // Show first image wich is also the last because there is only 1
    }

    document.getElementById("imgCount").innerHTML = `${modalImgIndex + 1}/${images.length}`; // Change the image count value that is shown over the image the span
}






async function checkForSearchKeywords() // Check for keywords in the adressbar also used for the modal
{
    const search = window.location.search;

    // If search keywords in the path
    if (search !== "") {

        if (search.match("id_")) // If id_ than open modal
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
    let availableDbTypes = Object.keys(db.items);

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
    if (itemsList == null && Object.hasOwn(db.items, `${itemType}`)) // If there is no provided item list but only type and if the type is found in the db
    {
        itemsList = { [`${itemType}`]: db.items[`${itemType}`] } // Get the itemList from the Db by using the known type that is provided and use the type as key entry for the list
    }
    else if (!Object.hasOwn(db.items, `${itemType}`) && itemsList == undefined) // If the item type is not found in the db and if there is no provided items list
    // If Home - In Home search all items - Or If it is unknown itemType - known item types are caravans, cars, products etc. 
    //Unknoun are any other string that is not found in the db as item. This item type is gotten from the url, the url can end /Caravans, /Cars etc. unknown /ssdfsdfsdf etc.
    {
        // itemsList = Object.entries(db).map(); // Get All items from the different types in 1 list  
        // itemsList = Object.entries(db).map(([key, value]) => {[key],[value]});
        itemsList = db.items;
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
            itemLink = window.location.host + '?search=' + itemsList[`${itemType}`][i].id; // Construct the link for the current item // ItemsType is for the item type. caravan, car etc.

            // For every iteration there is constructed item an put in the variable "combined_items".
            combined_items += (`<div class="content_container_item">
         <a href="javascript:itemModalNavigation('${itemsList[`${itemType}`][i].id}');">
             <img class="item_img" src="${itemsList[`${itemType}`][i].photos[0]}"> </img>
             <p>${itemsList[`${itemType}`][i].title}</p>
         </a>
       
         <span class="price">${itemsList[`${itemType}`][i].price}</span>
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
    if (Object.hasOwn(db.items, `${currentItemsType}`) && e.currentTarget.id !== "global-search-input") // If there is such property - search by usning the property otherwise search in the whole db everything.
    {
        document.getElementById('global-search-input').value = ""; // Reset the global-search-input - when using  the current search input

        let items = await searchArray(db.items[`${currentItemsType}`], searchTxt); // Search and get the matched items 
        data = { [`${currentItemsType}`]: items } // Construct object - so it looks like the db pattern object, so the same code for get items can be used for search too
    }
    else // GLobal Search 
    {
        if (e.currentTarget.id !== "current-items-search-input") {
            document.getElementById('current-items-search-input').value = ""; // Reset the current-items-search-input / on global search
        }
        else {
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
            if (window.location.pathname != "/") {
                locationInputChanged = true; // It is used in the Common View to prevent global search being erased
                document.getElementById('home-button').click(); // Simulate click so the main.js route is triggered to navigate to home, view. Tried with pushstate but did not work well.

                // window.location.search = searchTxt; 
            }
        }
        // window.location.pathname = '/index.html'; // Change to Home View path
        if (searchTxt == "") {
            window.history.replaceState({}, "title", "/");
        }
        else {
            window.history.replaceState({}, "title", `?search=${searchTxt}`);
        }
        // window.history.replaceState( {} , "title", `?search=${searchTxt}`);
        let items = await recursiveSearchObj(db.items, searchTxt); // Search and get the matched items
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






