function deepSearch(data, searchTxt) 
        {

            // let searchTxt = "name";
            // let data = "assdsdsfdsfnameasdsadsads";

            let searchTxtFirstChar = searchTxt[0];
            var searchResult = "";
       

            if(searchTxtFirstChar !== undefined) // If not empty string
            { 
                    for (let t = 0; t < data.length; t++) // Loop data to check each char and compare with the Search text first char
                    {
                        if (searchTxtFirstChar == data[t]) // Compare data with search txt first char. If there is match 
                        {
                            for (let y = 0; y < searchTxt.length; y++) // Try to match the search word with the next chars in the data
                            {
                             
                                if (searchTxt[y] == data[t + y]) // Try to match the search word from the data provided
                                {
                                    searchResult += data[t + y]; // Add the matched char to searchResult string [n],[a],[m],[e]
                                }
                                else // if there was no word match // Reset the result to be ready for the next try // At this point here there have been no char match, no full match
                                { 
                                    searchResult = ""; // There is no full match, but partly only some chars, thats why reset the searchResult to continue to the new try, no need to check further there was no match, but partial match let say nam was matched but we need name to be matched as whole word 
                                    break;
                                }
                                if (searchResult.length == searchTxt.length) // Check if there is a whole match
                                { 
                                    return true; // Stop everything and return true - there was match
                                }
                            }
                        }
                        
                    }
                    return false;
            }
            else
            {
                return false;
            }
           
        }