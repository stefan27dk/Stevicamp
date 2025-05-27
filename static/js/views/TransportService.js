// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    let db =  await getDb();
    return  `<p class="transport-service-details"><u>Транспорт и пътна помощ на автомобили:</u> Дрен <b>0км.</b>, Дупница <b>23км.</b>, Перник <b>34км.</b>. - София <b>54км.</b>, Благоевград: <b>54км.</b></p>

    <img class="transport-service-img" src="static/img/recovery-truck-and-trailer.png" />
    </br>
    <p class="transport-service-details">Транспорт на Автомобили до <b><u>1,35 тона</u></b>, на пътната помощ и до <b><u>3 Тона</u></b> на репатрак.</p>
    </br>
    <p class="contact-information">Ако преглеждате сайта от телефон, натиснете върху дадения телефон за да звъннете, автоматично.</p>
    <div class="about">${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}</div>
    <hr>
    `;
}

 

// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Транспортни услуги", "recovery-truck");
}



