$(document).ready(function(){

    $(".arrow").click(function(){
        $(this).parent(".filter_div").toggleClass("active_filter_div");
        $(this).parents(".filter_container").toggleClass("active_filter_container");
        
        var currText = $(this).text();        
        if(currText == ">")
        {
            $(this).parents(".filter_container").children(".active_takeover").fadeIn(600).css("display", "inline-block");
            $("span").css("display", "inline-block");
            $(this).text("^");
        }            
        else {
            $(this).parents(".filter_container").children(".active_takeover").fadeOut(0);
            $("span").css("display", "inline");
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
        var isMatch = attemptMatch(enterVal);
        fadeSuggestion(id, enterVal, isMatch);
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
        var isMatch = attemptMatch(enterVal);
        if(isMatch == "location")
            fadeSuggestion(id, enterVal, isMatch);
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
            case "Chinese":
                result = "food";
                break;
            case "Alcohol":
                result = "food";
                break;
            case "Kitsilano":
                result = "location";
                break;
            default:
                result = -1;
        }
        return result;
    }
    
    function appendFilter(filter_id, id) {
        $(".filter_div#" + filter_id).append("<div class='filter' id=" + id + "><h3 class='filter_X'>X</h3><h3 class='filter_name'>" + id + "</h3></div>");        
        $(".filter").click(function(){
            $(this).fadeOut(600);        
        });
    }
});