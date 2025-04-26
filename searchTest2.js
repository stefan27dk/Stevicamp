




// Search Object
function searchObject(obj, match) 
 {
    match = match.toLocaleLowerCase();
    for (const p in obj) {
        let type = typeof obj[p];

        // String
        if (type === 'string') // Whole word match
        {
            if (obj[p].toLocaleLowerCase().includes(match) === true) 
            {
                return obj;
            } 
        }
        // Int, Float, Bool, BigInt
        else if (type === 'number' || type === 'boolean' || type === 'bigint') {
            if (obj[p].toString().toLocaleLowerCase().includes(match) === true) {
                return obj;
            }
        }
        // Object
        else if (type === 'object') {
            let subResult = searchObject(obj[p], match); // Returns sub object
            if (subResult !== undefined) {
                return obj;
            }
        }
        
    }
}

// // TEST=OBJ===========================================
// let testObj = 
// { 
//     name: "Dodo", 
//     isLogged: true, 
//     id: "2", 
//     domains: [
//     { domainId: 123, domainName: "www.domainOfMine.com", customerId: '765' },
//     { domainId: 3456, domainName: "www.domain2.com", customerId: '34' }], 
//     role:{roleName:'user', roleQuant:[{qName:'Q1', quantity: 5, cNa:{bName:'B1', bArr:[{jk: 9}]}}]} 
// }

// let resultOBJ = searchObject(testObj, "q1".toLocaleLowerCase());
// console.log(resultOBJ);
// // TEST END ===OBJ===================================

