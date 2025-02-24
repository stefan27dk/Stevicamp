


export const setTitle = (title) => {
    document.title = title;
    document.getElementById('item-input-title').innerHTML = 'Търсене в ' + title + ':';
}





var db = null;

export async function getDb() {
    if (db == null) {
        var jsDb = await fetch('https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@latest/resources/db/database.json?1', {cache: "reload"})
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                } 
                return response.json(); // Probably here it parses the json to js object, so we dont need to use JSON.parse();
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

            db = jsDb;
        return jsDb;
    }
    else
    {
        return db;
    }
}





 