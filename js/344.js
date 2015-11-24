$(document).ready(function(){
	var currentFilters = [];
    var appliedFilters = [];
		
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
    
    //setup before functions - thanks SO for key listener code
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
                        filterResults();
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
        switch (input.toUpperCase()) {
            case "JAPANESE":
                result = "food";
				currentFilters.push(input);
                appliedFilters.push(input);
                break;
            case "CHINESE":
                result = "food";
				currentFilters.push(input);
                appliedFilters.push(input);
                break;
            case "ALCOHOL":
                result = "food";
				currentFilters.push(input);
                appliedFilters.push(input);
                break;
            case "KITSILANO":
                result = "location";
				currentFilters.push(input);
                break;
            case "HERE":
                result = "location";
				currentFilters.push(input);
                break;
            default:
                result = -1;
        }
        return result;
    } 
    
	function checkCurrentFilters(input) {
		if(JSON.stringify(currentFilters).toUpperCase().indexOf(input.toUpperCase()) == -1) {
			return false;
		}		
		else
			return true;
	}
    
    function appendFilter(filter_id, id) {
        $(".filter_div#" + filter_id).append("<div class='filter' id=" + id + "><h3 class='filter_X'>X</h3><h3 class='filter_name'>" + id + "</h3></div>");        
        $(".filter").click(function(){
			var i = currentFilters.indexOf(id);
            var j = appliedFilters.indexOf(id);
			currentFilters.splice(i, 1);            
            appliedFilters.splice(j, 1);
            $(this).fadeOut(600);
            filterResults();
        });
    }
    
    var original_arr = [
    {"name": "One More Sushi", "rating": 3.9, "distance": 1, "price": 3, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Omio Japan", "rating": -1, "distance": 1, "price": 2, "tags":["Japanese"]},
    {"name": "Sun Sushi", "rating": 4.6, "distance": 2, "price": 1, "tags":["Japanese", "Alcohol"]},
    {"name": "Hitoe Sushi", "rating": 4.1, "distance": 2, "price": 3, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Hime Sushi", "rating": 4.0, "distance": 2, "price": 3, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Everday Sushi", "rating": 3.8, "distance": 2, "price": 2, "tags":["Japanese"]},
    {"name": "Takumi Japanese Restaurant", "rating": -1, "distance": 2, "price": 4, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Suika", "rating": 4.3, "distance": 4, "price": 3, "tags":["Japanese", "Full-service", "Alcohol", "Izakaya"]},
    {"name": "Golden Ocean", "rating": 3.7, "distance": 5, "price": 2, "tags":["Chinese", "Full-service", "Alcohol", "Dim-Sum"]}
    ];    
    appendResults(original_arr);
    var curr_arr = original_arr;
    
    function filterResults() {
        curr_arr = original_arr.filter(doesContainTag);
        sortResults(mostRecentProp, mostRecentAsc);
    }
    
    function doesContainTag(input){
        var ret = true;
        for(var i = 0; i < appliedFilters.length; i++) {
            if(JSON.stringify(input).toUpperCase().indexOf(appliedFilters[i].toUpperCase()) == -1)
                ret = false;
        }
        return ret;
    }
    
    function appendResults(arr) {
        $("#results").find(".result_container").remove();
        $.each(arr, function(index, e) {
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
    
    var ratingAsc = true;
    var distanceAsc = false;
    var priceAsc = true;
    $("#distance_sort").children(".down_arrow").fadeIn("fast").css("display", "inline-block");
    var mostRecentProp = "distance";
    var mostRecentAsc = distanceAsc;
    
    $("#rating_sort").click(function(){
        sortResults("rating", ratingAsc);
        setRecent("rating", ratingAsc);
        ratingAsc = !ratingAsc;
        toggleArrow($(this), ratingAsc);
    });    
    $("#distance_sort").click(function(){
        sortResults("distance", distanceAsc);
        setRecent("distance", distanceAsc);
        distanceAsc = !distanceAsc;
        toggleArrow($(this), distanceAsc);
    });    
    $("#price_sort").click(function(){
        sortResults("price", priceAsc);
        setRecent("price", priceAsc);
        priceAsc = !priceAsc;
        toggleArrow($(this), priceAsc);
    });
    
    function setRecent(prop, asc) {
        mostRecentProp = prop;
        mostRecentAsc = asc;
    }
    
    function toggleArrow($input, directionBool) {
        if($input.children(".down_arrow").css("display") == "none") {
            $(".down_arrow").fadeOut("fast", function(){
                $input.children(".down_arrow").fadeIn("fast").css("display", "inline-block");                
            });            
        }
        if(directionBool)
            $(".down_arrow").addClass("up_arrow");
        else
            $(".down_arrow").removeClass("up_arrow");
    }
    
    // Thank you to StackOverflow for this code
    function sortResults(prop, asc) {
        curr_arr = curr_arr.sort(function(a, b) {
            if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        });
        appendResults(curr_arr);
    }
});