// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {

    let db =  await getDb();

    return  `<h2><img src="static/img/icons/logo.png" class="about-logo"><u>Стевикамп</u></h2>
    
    <div class="about">
    
       <hr>
       <span>
       <img src="static/img/icons/phone.png"><b><u>За връзка:</u></b>   
       </span>
       </br>
       <font size ="1"><i>Ако преглеждате сайта от телефон, натиснете върху дадения телефон за да звъннете, автоматично.</i></font>
       </br>
       <div style="display: flex; flex-flow: column;">${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}</div>
       <hr>
       <span>
       <img src="static/img/icons/location.png"><b><u>Местоположение:</u></b>  
       </span>
      </br>
    <span>Пернишка област - на ок. 50км. от София. По магистрала струма се стига за ок. 35-45мин. от София. Повечето време се кара по магистралата.</span> 
    <hr>
    <span>
    <img src="static/img/icons/info.png"><b><u>За нас:</u></b>  
    </span>
    </br>
    <img src="static/img/icons/caravan.png">
    <img src="static/img/icons/trailer.png">
    <img src="static/img/icons/car.png">
    <img src="static/img/icons/scooter.png">
    <img src="static/img/icons/appliances.png">
    <img src="static/img/icons/boxes.png">
    <img src="static/img/icons/transport-goods.png">
    <img src="static/img/icons/microbus.png">
    <img src="static/img/icons/microbus.png">
    <img src="static/img/icons/recovery-truck.png">


    
    
    

    </br>
    </br>
    <span>1. Занимаваме се с продажба на каравани, ремаркета, коли, бусове, скутери, екипировка за каравани, миялни машини, перални, печки, хладилници - продукти - Нов Внос от Дания. 
    </br>
    </br>
    <img src="static/img/icons/caravan.png">
       2. Изпълняваме и поръчки за внос на каравани и др. от Дания. 
    </br>
    </br>
    <img src="static/img/icons/transport-goods.png">
       3. Транспорт на товар от Дания до България.
    </br>
    </br>
    <img src="static/img/icons/recovery-truck.png">
       4. Транспортни услуги - Транспорт с пътна помощ и репатрак.
    </br>
    </br>
    <img src="static/img/icons/caravan.png">
       4. Повечето каравани се намират в България, но има и налични в Дания.</span> 

   </div>`;

}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("За нас", "info");
}



