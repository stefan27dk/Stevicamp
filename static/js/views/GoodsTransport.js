// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return  `${await getItems('transportTransport')}`;

}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Транспорт на товар", "transport-goods");
}



