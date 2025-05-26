// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {

    let db =  await getDb(); 
    let obj = db.about;
    let shareLink = window.location.href;

    let imagesHtml = "";
    
    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }
 
   
    // style="min-height: 99%;"
    // style="width: 90%;"
    return `<div style="display: flex; width: 100%; height: 100%;"><div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       <button class="arrow-left prevent-select" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right prevent-select" onclick="toggleModalImg(1)">&#10095;</button> 
       
       ${modalItemShareButtonsHtml(shareLink, obj.title)}
    </div>
  
   
     
   <div id="modalItemDetails" class="modalItemDetails" style="text-align: left;" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/logo.png"><u>${obj.title}</u></h3>
   <span style="margin: 0 0 0 auto;"><a class="item_share_button" href="javascript: copyToClipboard(copyElementTextById('modalItemDetails'));" title="Натиснете за да Копирате описанието"><img src="static/img/icons/copy.png"></a></span>  
   
   <hr> 
   <p class="contact-information">Ако преглеждате сайта от телефон, натиснете върху дадения телефон за да звъннете, автоматично.</p>
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> 
       </br>
       1. Занимаваме се с продажба на каравани, ремаркета, коли, бусове, скутери, екипировка за каравани, миялни машини, перални, печки, хладилници - продукти - Нов Внос от Дания. 
       </br>
       </br>
       2. Изпълняваме и поръчки за внос на каравани и др. от Дания. 
       </br>
       </br>
       3. Транспорт на товар от Дания до България.
       </br>
       </br>
       4. Транспортни услуги - Транспорт с пътна помощ и репатрак.
       </br>
       </br>
       5. Повечето каравани се намират в България, но има и налични в Дания.
       </br>
       </br>
       ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr>
   </div>
</div>
</div> 

 `;
    
 



//     return  `<h2><img src="static/img/icons/logo.png" class="about-logo"><u>Стевикамп</u></h2>
//     <img style="width:60%; height: auto;" src="static/img/stevicamp-map.png">
    
//     <div class="about">
//        <hr>
//        <span>
//        <img src="static/img/icons/phone.png"><b><u>За връзка:</u></b>   
//        </span>
//        </br>
//        <font size ="1"><i>Ако преглеждате сайта от телефон, натиснете върху дадения телефон за да звъннете, автоматично.</i></font>
//        </br>
//        <div style="display: flex; flex-flow: column;">${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}</div>
//        <hr>
//        <span>
//        <img src="static/img/icons/location.png"><b><u>Местоположение:</u></b>  
//        </span>
//       </br>
//     <span>Пернишка област - на ок. 50км. от София. По магистрала струма се стига за ок. 35-45мин. от София. Повечето време се кара по магистралата.</span> 
//     <hr>
//     <span>
//     <img src="static/img/icons/info.png"><b><u>За нас:</u></b>  
//     </span>
//     </br>
//     <img src="static/img/icons/caravan.png">
//     <img src="static/img/icons/trailer.png">
//     <img src="static/img/icons/car.png">
//     <img src="static/img/icons/scooter.png">
//     <img src="static/img/icons/appliances.png">
//     <img src="static/img/icons/boxes.png">
//     <img src="static/img/icons/transport-goods.png">
//     <img src="static/img/icons/microbus.png">
//     <img src="static/img/icons/microbus.png">
//     <img src="static/img/icons/recovery-truck.png">


    
    
    

//     </br>
//     </br>
//     <span>1. Занимаваме се с продажба на каравани, ремаркета, коли, бусове, скутери, екипировка за каравани, миялни машини, перални, печки, хладилници - продукти - Нов Внос от Дания. 
//     </br>
//     </br>
//     <img src="static/img/icons/caravan.png">
//        2. Изпълняваме и поръчки за внос на каравани и др. от Дания. 
//     </br>
//     </br>
//     <img src="static/img/icons/transport-goods.png">
//        3. Транспорт на товар от Дания до България.
//     </br>
//     </br>
//     <img src="static/img/icons/recovery-truck.png">
//        4. Транспортни услуги - Транспорт с пътна помощ и репатрак.
//     </br>
//     </br>
//     <img src="static/img/icons/caravan.png">
//        4. Повечето каравани се намират в България, но има и налични в Дания.</span> 

//    </div>`;

}

function onElementReady(className, param, callBack) {
    if (document.getElementsByClassName(className)) {
      callBack(param);
    } else {
      setTimeout(()=>onElementReady.call(className,param, callBack), 100);
    }
  }



  
// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("За нас - Стевикамп", "info");
    onElementReady('slide', 0, toggleModalImg);
}



