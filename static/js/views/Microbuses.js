﻿// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return `  
             <p class="subTitleView">Микробуси</p>
                  `;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Стевикамп-Микробуси");
}



