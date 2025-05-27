// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    let db =  await getDb();
    return  `<p style="color: rgb(66, 215, 245);"><u>Транспорт и пътна помощ на автомобили:</u></p>

    <img class="transport-service-img" src="static/img/recovery-truck-and-trailer.png" />
    </br>
    <p class="contact-information">Ако преглеждате сайта от телефон, натиснете върху дадения телефон за да звъннете, автоматично.</p>
    </br>
    <div class="about">${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}</div>
    <hr>
    `;
}

 

// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Транспортни услуги", "recovery-truck");
}



