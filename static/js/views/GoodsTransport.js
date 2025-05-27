// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    let db =  await getDb();

    return  `<p class="transport-service-details"><u>Предлагаме Транспорт на товар в България - райони:</u> Дрен <b>0км.</b>, Дупница <b>23км.</b>, Перник <b>34км.</b>. - София <b>54км.</b>, Благоевград: <b>54км.</b> и др.</p>

    <img class="transport-service-img" src="static/img/recovery-truck-and-trailer.png" />
    </br>
    <p class="transport-service-details">Предлагаме транспорт на багаж - <b>Дания --> България;</b>  <b>България --> Дания</b>. Райони <b>(София и Пернишка област или изпращане с еконт или спиди)</b> и <b>(Централен Юланд в Дания - Horsens или изпращане с куриер.)</b></p>
    </br>
    <p class="contact-information">Ако преглеждате сайта от телефон, натиснете върху дадения телефон за да звъннете, автоматично.</p>
    <div class="about">${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}</div>
    <hr>`;

}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Транспорт на товар", "transport-goods");
}



