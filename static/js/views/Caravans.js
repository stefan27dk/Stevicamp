// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {

     
    var str = await Common.getDb();
   
    return `  
            <p>Каравани</p>


<p>Site Developerqqq </p>
                  `+str.caravans[0].brand;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Стевикамп-Каравани");

}



