{
    var items = [];
    var caravanLink = '';
    for (let i = 0; i < db.caravans.length; i++) {
        caravanLink = window.location + '/' + db.caravans[i].id;
        items.push(`<div class="content_container_item">
        <a href='${caravanLink}'>
            <img class="item_img" src="${db.caravans[i].photos[0]}"> </img>
            <p>${db.caravans[i].brand +' '+ db.caravans[i].model + ' ' + db.caravans[i].year +'г.'}</p>
        </a>
      
        <div class="item_buttons_wrapper">
            <a class="item_share_button" style="background-image: url('static/img/icons/copy.png');" href="javascript:copyToClipboard('${caravanLink}');"></a>
            <a class="item_share_button" style="background-image: url('static/img/icons/viber.png');"
                href="viber://forward?text=${caravanLink}"></a>
            <a class="item_share_button" style="background-image: url('static/img/icons/whatsapp.png');"
            target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?text=${caravanLink}"></a>
            <a class="item_share_button" style="background-image: url('static/img/icons/messenger.png');"
                href="fb-messenger://share/?link=${caravanLink}"></a>
        </div>
                     </div>`); 

                     // .join('');  gets the elements from the array as string and seperate them with ''
    const caravans_html = items.join('');  
    
}