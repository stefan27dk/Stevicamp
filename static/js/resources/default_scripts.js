
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
    e.preventDefault();
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





// ####### Copy to clipboard share link ###########################################################################
function copyToClipboard(str) {
    
  window.navigator.clipboard.writeText(str); 
}
 


// Search Input eventlistener
document.getElementById('inp_caravan').addEventListener("input", );


// ####### Search Script ###########################################################################
// Search Object
const searchObject = (obj, match) => 
{
    for (const p in obj) 
    {
        let type = typeof obj[p];

        // String
        if (type === 'string')
         {
            if (obj[p].toLocaleLowerCase().includes(match) === true)
            {
                return obj;
            }
        }
        // Int, Float, Bool, BigInt
        else if (type === 'number' || type === 'boolean' || type === 'bigint') 
        {
            if (obj[p].toString().toLocaleLowerCase().includes(match) === true) 
            {
                return obj;
            }
        }
        // Object
        else if (type === 'object') 
        {
            let subResult = searchObject(obj[p], match); // Returns sub object
            if (subResult !== undefined)
            {
                return obj;
            }
        } 
    }
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
const searchArray = (arr, match) =>
 {console.time();
    let resultArr = [];
    for (let b = arr.length; b--;) 
    {
        let type = typeof arr[b];
        // Object
        if (type === 'object') 
        {
            let result = searchObject(arr[b], match);
            if(result !== undefined)
            { 
                resultArr.push(result);
            }
        } 
        else if (type === 'string')
        { 
            if (arr[b].toLocaleLowerCase().includes(match) === true)
            {
                resultArr.push({stringValue:arr[b]});
            }
        }
         // Int, Float, Bool, BigInt
         else if (type === 'number' || type === 'boolean' || type === 'bigint') 
         {
             if (arr[b].toString().toLocaleLowerCase().includes(match) === true) 
             {
                resultArr.push({[type+'Value']:arr[b]});
             }
         }
    } console.timeEnd();
    return resultArr;
}








// TEST========ARR====================================
let testArr = 
[
    "777",
    6548452,
    ["wer","yter",{er:"hhh"}],
    { 
    name: "Dodo", 
    isLogged: true, 
    id: "2", 
    domains: [
    { domainId: 123, domainName: "www.domainOfMine.com", customerId: '765' },
    { domainId: 687, domainName: "www.domain2.com", customerId: '34' }], 
    role:{roleName:'user', roleQuant:[{qName:'Q1', quantity: 5, cNa:{bName:'B1', bArr:[{jk: 45}]}}]} 
    },
    { 
        name: "Boby", 
        isLogged: true, 
        id: "3", 
        domains: [
        { domainId: 123, domainName: "www.dom1.com", customerId: '87' },
        { domainId: 358456, domainName: "www.dom3.com", customerId: '45' }], 
        role:{roleName:'user', roleQuant:[{qName:'HJ', quantity: 34, cNa:{bName:'SXwer1', bArr:[{jk: 9}]}}]} 
    },
    { 
        name: "Didi", 
        isLogged: true, 
        id: "4", 
        domains: [
        { domainId: 123, domainName: "www.ecomi3.com", customerId: '2321' },
        { domainId: 3456, domainName: "www.toti.com", customerId: '87' }], 
        role:{roleName:'user', roleQuant:[{qName:'RT', quantity: 5, cNa:{bName:'L1', bArr:[{jk: 12}]}}]} 
    }
];


let resultArr = searchArray(testArr, "87".toLocaleLowerCase());


console.log(resultArr);
// TEST END ======ARR================================






