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
			else {
				fadeSuggestion(id, enterVal, -1);
			}
		}
    }

    //food
    var typingTimer_foo;                //timer identifier
    var doneTypingInterval_foo = 1000;  //time in ms, 5 second for example
    var $input_foo = $("#foo_search");
    
    $input_foo.on('keyup', function () {
        clearTimeout(typingTimer_foo);
        typingTimer_foo = setTimeout(doneTyping_foo, doneTypingInterval_foo);
    });

    $input_foo.on('keydown', function () {
        clearTimeout(typingTimer_foo);
    });
    
    function doneTyping_foo() {
        var id = "foo_search";
        var enterVal = document.getElementById(id).value;
		var isMatch;
		if (!checkCurrentFilters(enterVal)) {
			isMatch = attemptMatch(enterVal);
			if(isMatch == "food")
				fadeSuggestion(id, enterVal, isMatch);
			else {
				fadeSuggestion(id, enterVal, -1);
			}
		}
    }

    //time
    var typingTimer_tim;                //timer identifier
    var doneTypingInterval_tim = 1000;  //time in ms, 5 second for example
    var $input_tim = $("#tim_search");
    
    $input_tim.on('keyup', function () {
        clearTimeout(typingTimer_tim);
        typingTimer_tim = setTimeout(doneTyping_tim, doneTypingInterval_tim);
    });

    $input_tim.on('keydown', function () {
        clearTimeout(typingTimer_tim);
    });
    
    function doneTyping_tim() {
        var id = "tim_search";
        var enterVal = document.getElementById(id).value;
		var isMatch;
		if (!checkCurrentFilters(enterVal)) {
			isMatch = attemptMatch(enterVal);
			if(isMatch == "time")
				fadeSuggestion(id, enterVal, isMatch);
			else {
				fadeSuggestion(id, enterVal, -1);
			}
		}
    }
    
    function fadeSuggestion(id, enterVal, isMatch){
        $("#suggestion_" + id +".suggestion").empty().fadeIn(600, function(){
            if(isMatch != -1) {                
                $(this).append("<h3>Did you mean </h3><h3 style='font-weight: 500'>" + enterVal + "</h3><h3>?</h3>");
                $(this).prev("input").keyup(function(event){
                    if(event.keyCode == 13){
                        enterVal = takeSuggestion(enterVal, isMatch, $(this).next(".suggestion"));
                    }
                });
                $(this).click(function() { 
                    enterVal = takeSuggestion(enterVal, isMatch, $(this));
                });
                
            }
            else{
                $(this).append("<h3>Could not find a match :(</h3>");
                $(this).click(function(){
                    $(this).fadeOut(600);
                });
                $(this).prev("input").keyup(function(event){
                    if(event.keyCode == 13){
                        $(this).next(".suggestion").fadeOut(600);
                    }
                });
            }
        }).css("display","inline-block");
    }
    
    function takeSuggestion(enterVal, isMatch, $target) {
        if((enterVal != null)) {
            appendFilter(isMatch, enterVal);
            filterResults();
            $target.fadeOut(600);
        }
        return null;
    }

    function attemptMatch(input){
        var result = -1;
        switch (input.toUpperCase()) {
            case "JAPANESE":
                result = "food";
				currentFilters.push(input);
                appliedFilters.push(input);
                break;
            case "FRENCH":
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
			case "GRANVILLE":
                result = "location";
				currentFilters.push(input);
                break;
			case "GRANVILLE ST":
                result = "location";
				currentFilters.push(input);
                break;
			case "GRANVILLE ST.":
                result = "location";
				currentFilters.push(input);
                break;
            case "GRANVILLE AND BROADWAY":
                result = "location";
				currentFilters.push(input);
                break;
			case "GRANVILLE ST AND BROADWAY":
                result = "location";
				currentFilters.push(input);
                break;
			case "GRANVILLE ST. AND BROADWAY":
                result = "location";
				currentFilters.push(input);
                break;
			case "BROADWAY":
                result = "location";
				currentFilters.push(input);
                break;
            case "HERE":
                result = "location";
				currentFilters.push(input);
                break;
            case "5:30PM":
                result = "time";
				currentFilters.push(input);
                break;
            case "IN 5 MINUTES":
                result = "time";
				currentFilters.push(input);
                break;
            case "IN 10 MINUTES":
                result = "time";
				currentFilters.push(input);
                break;
            case "IN 15 MINUTES":
                result = "time";
				currentFilters.push(input);
                break;
            case "IN 20 MINUTES":
                result = "time";
				currentFilters.push(input);
                break;
            case "IN 30 MINUTES":
                result = "time";
				currentFilters.push(input);
                break;
            case "IN 45 MINUTES":
                result = "time";
				currentFilters.push(input);
                break;
            case "IN AN HOUR":
                result = "time";
				currentFilters.push(input);
                break;
            case "FRIDAY, DECEMBER 18th, 2015":
                result = "time";
				currentFilters.push(input);
                break;    
			case "FRIDAY":
                result = "time";
				currentFilters.push(input);
                break;
			case "DECEMBER 18TH":
                result = "time";
				currentFilters.push(input);
                break;
			case "DEC 18":
                result = "time";
				currentFilters.push(input);
                break;
            case "NOW":
                result = "time";
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
    
    $(".price_button").click(function(){
        $(this).toggleClass("active_button");        
        var pNum = $(this).text().length;
        if(appliedFilters.indexOf("PRICE\":" + pNum + "") == -1)
            appliedFilters.push("PRICE\":" + pNum + "");
        else {
            appliedFilters.splice(appliedFilters.indexOf("PRICE\":" + pNum + ""), 1);          
        }
        filterResults();
    });
    
    var original_arr = [
    {"name": "One More Sushi", "rating": 3.9, "distance": 1, "price": 3, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Omio Japan", "rating": -1, "distance": 1, "price": 2, "tags":["Japanese"]},
    {"name": "Sun Sushi", "rating": 4.6, "distance": 2, "price": 1, "tags":["Japanese", "Alcohol"]},
    {"name": "Hitoe Sushi", "rating": 4.1, "distance": 2, "price": 3, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Hime Sushi", "rating": 4.0, "distance": 2, "price": 3, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Everday Sushi", "rating": 3.8, "distance": 2, "price": 2, "tags":["Japanese"]},
    {"name": "Takumi Japanese Restaurant", "rating": -1, "distance": 2, "price": 4, "tags":["Japanese", "Full-service", "Alcohol"]},
    {"name": "Suika", "rating": 4.3, "distance": 4, "price": 3, "tags":["Japanese", "Full-service", "Alcohol", "Izakaya"]},
	{"name": "Salade de Fruits Cafe", "rating": 4.5, "distance": 1, "price": 3, "tags":["French", "Full-service", "Alcohol", "Izakaya"]},
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
            + "<h3 class='result_text'>" + e.distance + " km</h3><h3 class='result_text price'>" + dollarSigns +"</h3><h3 class='result_text tags'>" + tags + "</h3>"
			+ "<div class='menu_bar'><div class='menu_button'>Menu</div></div>"		
			+ "</div>");
            registerContainer();
        });           
    }
	
	registerContainer();
    function registerContainer() {
        $(".result_container").unbind().click(function(){
            menuCheck($(this));		
        });
    }
	
	function menuCheck($target) {
		if($target.height() == 50) {
            $target.css("height", "100px").find(".menu_bar").fadeIn("slow").css("display", "inline-block");  
        }
		else {
			$target.find(".menu_bar").fadeOut("slow", function(){
				$target.css("height", "50px");
			});
		}
		menuButtonCheck();	
	}
	
    menuButtonCheck();
    function menuButtonCheck () {
        $(".menu_button").unbind().click(function(){
            alert("End of the tasks! Thanks for participating!");	
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