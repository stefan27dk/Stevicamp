// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return  `${await getItems('about')}`;

}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("За нас");
}



