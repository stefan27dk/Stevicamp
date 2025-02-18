// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {

    // The singleton Database - fetch if not already fetched
    let db = await Common.getDb();
 

    // Use of array for better performance instead of using .innerHTML += 
    var items = [];
    for (let i = 0; i < db.caravans.length; i++) {
         
        items.push(`<div class="content_container_item">
        <a href='${window.location.host+db.caravans[i].id}'>
            <img class="item_img" src="${db.caravans[i].photos[0]}"> </img>
            <p>${db.caravans[i].brand +' '+ db.caravans[i].model + ' ' + db.caravans[i].year +'г.'}</p>
        </a>

        <div class="item_buttons_wrapper">
            <a class="item_share_button" style="background-image: url('static/img/icons/copy.png');" href="javascript:copyShareLink('/Caravans/${db.caravans[i].id}');"></a>
            <a class="item_share_button" style="background-image: url('static/img/icons/viber.png');"
                href="viber://forward?text=https://123"></a>
            <a class="item_share_button" style="background-image: url('static/img/icons/whatsapp.png');"
                href="https://api.whatsapp.com/send?text=https://1234"></a>
            <a class="item_share_button" style="background-image: url('static/img/icons/messenger.png');"
                href="fb-messenger://share/?link=https://1234"></a>
        </div>
                     </div>`); 
    }

    
    // .join('');  gets the elements from the array as string and seperate them with ''
    const caravans_html = items.join('');  
    return  ` <p class="subTitleView"> Каравани</p> <div class ="content_container_holder">${caravans_html}</div>`;

     
     
                

}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Стевикамп-Каравани");

}



