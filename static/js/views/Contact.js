// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return  `${await getItems('contact')}`;

}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("За връзка", "phone");
}



