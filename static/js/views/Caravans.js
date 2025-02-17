// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {

    // The singleton Database - fetch if not already fetched
    let db = await Common.getDb();

    let commonHtml = '<div class="content_container_holder"></div>';
   
    var frag = document.createDocumentFragment();
    
    // Create contnet container element
    var content_container = document.createElement('div');
    content_container.className = 'content_container_holder';

    var items = [];
    for (let i = 0; i < db.caravans.length; i++) {
         
        items.push(`<div class="content_container_item">
        <a href="">
            <img class="item_img" src="${db.caravans[i].photos[0]}"> </img>
            <p>${db.caravans[i].brand + db.caravans[i].model + db.caravans[i].year }</p>
        </a>

        <div class="item_buttons_wrapper">
            <a class="item_share_button" style="background-image: url('static/img/icons/copy.png');" href="  "></a>
            <a class="item_share_button" style="background-image: url('static/img/icons/viber.png');"
                href="viber://forward?text=https://123"></a>
            <a class="item_share_button" style="background-image: url('static/img/icons/whatsapp.png');"
                href="https://api.whatsapp.com/send?text=https://1234"></a>
            <a class="item_share_button" style="background-image: url('static/img/icons/messenger.png');"
                href="fb-messenger://share/?link=https://1234"></a>
        </div>`); 
    }

    

    const caravans_html = content_container.innerHTML = items.join('');  
    return  ` <p class="subTitleView"> Каравани</p> ${caravans_html}`;

     
     
                

}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Стевикамп-Каравани");

}



