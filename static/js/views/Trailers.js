// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return  `${await getItems('trilers')}`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Ремаркета", "trailer");
}



