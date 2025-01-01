// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return `  
             <p class="subTitleView"> Credits to:</p>
<p>Каравани</p>


<p>Site Developer </p>
                  `;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Стевикамп-Каравани");
}



