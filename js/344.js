$(document).ready(function(){
	var currentFilters = [];
		
    $(".arrow").click(function(){
        $(this).parent(".filter_div").toggleClass("active_filter_div");
        $(this).parents(".filter_container").toggleClass("active_filter_container");
        
        var currText = $(this).text();        
        if(currText == ">")
        {
            $(this).parents(".filter_container").children(".active_takeover").fadeIn(600).css("display", "inline-block");
            $(this).parents(".filter_container").children("span").css("display", "inline-block");
            $(this).text("^");
        }            
        else {
            $(this).parents(".filter_container").children(".active_takeover").fadeOut(0);
            $(this).parents(".filter_container").children("span").css("display", "inline");
            $(this).text(">");
        }
    });
    
    //setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval = 1000;  //time in ms, 5 second for example
    var $input = $("#search_bar");

    //on keyup, start the countdown
    $input.on('keyup', function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    $input.on('keydown', function () {
      clearTimeout(typingTimer);
    });

    //user is "finished typing," do something
    function doneTyping() {
        var id = "search_bar";
        var enterVal = document.getElementById(id).value;
        var isMatch;
		if (!checkCurrentFilters(enterVal)) {
			isMatch = attemptMatch(enterVal);
			fadeSuggestion(id, enterVal, isMatch);
		}
    }
    
    //location
    var typingTimer_loc;                //timer identifier
    var doneTypingInterval_loc = 1000;  //time in ms, 5 second for example
    var $input_loc = $("#loc_search");
    
    $input_loc.on('keyup', function () {
        clearTimeout(typingTimer_loc);
        typingTimer_loc = setTimeout(doneTyping_loc, doneTypingInterval_loc);
    });

    $input_loc.on('keydown', function () {
        clearTimeout(typingTimer_loc);
    });
    
    function doneTyping_loc() {
        var id = "loc_search";
        var enterVal = document.getElementById(id).value;
		var isMatch;
		if (!checkCurrentFilters(enterVal)) {
			isMatch = attemptMatch(enterVal);
			if(isMatch == "location")
				fadeSuggestion(id, enterVal, isMatch);
		}
    }    
    
    function fadeSuggestion(id, enterVal, isMatch){
        $("#suggestion_" + id +".suggestion").empty().fadeIn(600, function(){
            if(isMatch != -1) {                
                $(this).append("<h3>Did you mean </h3><h3 style='font-weight: 500'>" + enterVal + "</h3><h3>?</h3>");
                $(this).click(function(){
                    if(enterVal != null) { 
                        appendFilter(isMatch, enterVal);
                        $(this).fadeOut(600);
                    }
                    enterVal = null;
                });
            }
            else{
                $(this).append("<h3>Could not find a match :(</h3>");
            }
        }).css("display","inline-block");
    }
    
    function attemptMatch(input){
        var result = -1;
        switch (input) {
            case "Japanese":
                result = "food";
				currentFilters.push(input);
                break;
            case "Chinese":
                result = "food";
				currentFilters.push(input);
                break;
            case "Alcohol":
                result = "food";
				currentFilters.push(input);
                break;
            case "Kitsilano":
                result = "location";
				currentFilters.push(input);
                break;
            default:
                result = -1;
        }
        return result;
    } 
	
	function checkCurrentFilters(input) {
		if(currentFilters.indexOf(input) == -1) {
			return false;
		}		
		else
			return true;
	}
    
    function appendFilter(filter_id, id) {
        $(".filter_div#" + filter_id).append("<div class='filter' id=" + id + "><h3 class='filter_X'>X</h3><h3 class='filter_name'>" + id + "</h3></div>");        
        $(".filter").click(function(){
			var i = currentFilters.indexOf(id);
			currentFilters.splice(i, 1);
            $(this).fadeOut(600);
        });
    }
    
    var results_arr = {"restaurants":[
    {"name": "Golden Ocean", "rating": 3.7, "distance": 5, "price": 2, "tags":["Chinese", "Full-service", "Alcohol", "Dim-Sum"]},
    {"name": "Hitoe Sushi", "rating": 4.1, "distance": 2, "price": 3, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Sun Sushi", "rating": 4.6, "distance": 2, "price": 1, "tags":["Japanese", "Alcohol"]},
    {"name": "Hime Sushi", "rating": 4.0, "distance": 2, "price": 3, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Takumi Japanese Restaurant", "rating": -1, "distance": 2, "price": 4, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Everday Sushi", "rating": 3.8, "distance": 2, "price": 2, "tags":["Japanese"]},
    {"name": "Omio Japan", "rating": -1, "distance": 1, "price": 2, "tags":["Japanese"]},
    {"name": "One More Sushi", "rating": 3.9, "distance": 1, "price": 3, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Suika", "rating": 4.3, "distance": 4, "price": 3, "tags":["Japanese", "Full-service", "Alcohol", "Izakaya"]}
    ]};
    appendResults();
    function appendResults() {
        $.each(results_arr.restaurants, function(index, e) {
            var dollarSigns = "";
            for(var i = 0; i < Number(e.price); i++)
                dollarSigns += "$";
            
            var ratingCheck = "";
            if(Number(e.rating) == -1)
                ratingCheck = "N/A";
            else
                ratingCheck = Number(e.rating);
            
            var tags = JSON.stringify(e.tags);
            tags = tags.replace(/[\[\]\"]/g,"");
            tags = tags.replace(/\,/g,", ");
        
            $("#results").append("<div class='result_container'><h3 class='result_text couture name'>" + e.name + "</h3><h3 class='result_text'>" + ratingCheck + "</h3>"
            + "<h3 class='result_text'>" + e.distance + " km</h3><h3 class='result_text price'>" + dollarSigns +"</h3><h3 class='result_text tags'>" + tags + "</h3></div>");
        });           
    }
});