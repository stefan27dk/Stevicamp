// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return  `${await getItems('products')}`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Продукти", "boxes");
}



