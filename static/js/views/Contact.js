// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    let db =  await getDb();
    return  ` </br>
    <font size ="1"><i>Ако преглеждате сайта от телефон, натиснете върху дадения телефон за да звъннете, автоматично.</i></font>
    </br>
    <div class="about">${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}</div>
    <hr>`;

}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("За връзка", "phone");
}



