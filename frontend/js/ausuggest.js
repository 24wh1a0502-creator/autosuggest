//https://onrender.com
var API_URL = "https://onrender.com";

// FIX 1: Wrap everything in a DOMContentLoaded block. 
// If your script tags are placed in the <head> of your HTML, JavaScript runs 
// too fast and elements are found as "null". This forces it to wait for elements.
document.addEventListener("DOMContentLoaded", function() {

    var searchbar = document.getElementById("search-bar");
    var searchsuggestion = document.getElementById("search-suggestion");

    // Safety check: Alert if your HTML tags don't match the IDs
    if (!searchbar || !searchsuggestion) {
        console.error("HTML Setup Error: Could not find elements with id='search-bar' or id='search-suggestion'!");
        return;
    }

    searchbar.addEventListener("input", function() {
      var query = searchbar.value.trim();
      
      if (query === "") {
        searchsuggestion.innerHTML = "";
      } else {
        fetchsuggestions(query);
      }
    });

    function fetchsuggestions(query){
        var fullAPI = API_URL + "?q=" + encodeURIComponent(query) + "&weighted=true&algorithm=trie&limit=8";
        fetch(fullAPI)
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            // CHECKPOINT DIAGNOSTIC: Open your browser console (F12) to see if data arrives!
            console.log("API Data received successfully:", data);
            showsuggestions(data);
        })
        .catch(function(err){
            console.log("Error :", err);
        });
    }

    function showsuggestions(data){
       var values = data.results;
       
       if(!values || values.length === 0){
          searchsuggestion.innerHTML = "<div>No matching results found</div>";
       }
       else{
        var htmlString = "";
        for(var i = 0; i < values.length; i++){
            htmlString += "<div><span class='suggestion-item'>" + values[i].text + "</span><span class='suggestion-weight'> " + values[i].weight + "</span></div>";
        }
        searchsuggestion.innerHTML = htmlString;
       }
    }
});
