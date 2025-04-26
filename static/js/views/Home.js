// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() 
{
   return  ` <p class="subTitleView"> Начало</p> ${await getItems('')}`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Начало"); 
}



