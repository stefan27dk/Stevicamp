// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return  `${await getItems('transportService')}`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Транспортни услуги", "recovery-truck");
}



