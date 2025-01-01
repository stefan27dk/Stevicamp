

// async function exampleFetch() {
//     // const response = await fetch('https://raw.githubusercontent.com/stefan27dk/Stevicamp-1.2/main/Index.html');
//     // const text = await response.text();
//     // console.log(text);
//     // document.getElementById('mainHtml').innerHTML = text;


//     // https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp-1.2/index.html
//     fetch('https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp-1.2/index.html')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.text();
//     })
//     .then(textContent => {
//         // get the text.
//         const result = textContent;
//         console.log(textContent);
//         document.getElementById('mainHtml').innerHTML = textContent;
//     })
//     .catch(error => {
//         console.error('Fetch error:', error);
//     });
// }

// exampleFetch();