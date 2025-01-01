// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return `  
             <p class="subTitleView">Продукти</p>
                  `;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Стевикамп-Продукти");
}



