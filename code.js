$(document).ready(function(){


});
var positions = [0.02, 0.4, 0.53, 0.69, 0.84, 1]
var infoPositions = [0.01, 0.17, 0.3, 0.37, 0.41, 0.5, 0.54, 0.68]
$(window).scroll(function() {
    set_positions();
    info_box_appear();
});

$("#start").click(function(e){
    $('html, body').animate({
		scrollTop: $(".galaxy_image").offset().top + $(".galaxy_image").outerHeight() - $(window).height() * 0.8
	}, 5000, 'linear');
});
$(".info_button").click(function(e){
    
    $(".modal").css('display', 'block');
    
    var index_clicked = $(".info_button").index(this)
    $(".modal_head").html($(".right_title").eq(index_clicked).text())
    $(".modal_img").attr("src", $('.right_img').eq(index_clicked).prop('src') );
    $(".modal_content").html($(".right_content").eq(index_clicked).text())
});
var modal = document.getElementById('myModal');


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



$(".location").click(function(e){
    $('html, body').animate({
		scrollTop: $(".galaxy_image").offset().top + $(".galaxy_image").outerHeight() * (positions[(this.id - 1)]) - $(window).height() * 0.8 + $(".right_box").outerHeight()
	}, 1000, 'linear');
});

$(".side_scroll").click(function(e) {
    var parentOffset = $(".side_scroll").offset();
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    var percentClick = relY/$(".side_scroll").outerHeight();
    var bardist = $(window).scrollTop() - $(".bar_container").offset().top;
    $('html, body').animate({
		scrollTop: $(".galaxy_image").offset().top + $(".galaxy_image").height() * percentClick + bardist
	}, 500, 'linear');
});


$( window ).resize(function() {
    set_positions();

  $( "#log" ).append( "<div>Handler for .resize() called.</div>" );
});

function set_positions() {
    //Need the position of the window in the code.
    var bottomofwindow = $(window).scrollTop() + $(window).height();
    var topofwindow = $(window).scrollTop();
    var windowheight = $(window).height();
    var barPos = $(".bar_container").offset().top - $(".galaxy_image").offset().top
    var galaxyHeight = $(".galaxy_image").outerHeight();
    var over_percentage = (topofwindow - $(".galaxy_image").offset().top)/galaxyHeight;
    if(over_percentage < 0) {
        over_percentage = 0;
    }
    var extragalacticPercentage = (barPos/galaxyHeight - 0.53190975992)/(-0.53190975992)
    var extragalacticDistance = 13.75 * extragalacticPercentage
    $(".counter").html((extragalacticDistance).toFixed(2));
    $(".unit").html("GYR");
    
    var galacticPercentage = 1 -  extragalacticPercentage/(-0.88)
    var viewwindow = bottomofwindow - topofwindow;
    
    if(bottomofwindow > $(".galaxy_image").offset().top + $(".galaxy_image").outerHeight()){
        viewwindow = $(".galaxy_image").offset().top + $(".galaxy_image").outerHeight() - topofwindow;
    }
    
    if(extragalacticPercentage < 0) {
      var exponent = galacticPercentage * 25
      var log = 0.0001 * 10 ** exponent
      $(".counter").html((galacticPercentage).toFixed(2));
      $(".unit").html("Kilometers");
    }

    $(".view_box").css('top',over_percentage * $(".side_scroll").outerHeight() - $(".side_scroll").outerHeight());
    $(".view_box").css('height', (viewwindow/galaxyHeight) * $(".side_scroll").outerHeight());
    
    
    $( ".location" ).each(function( index ) {
      $( this ).css('top', $(".side_scroll").position().top - 20 + (positions[index]) * $(".side_scroll").height());
    });
    
    $(".right_box").each(function(index) {
        $( this ).css('top', (infoPositions[index]) * $(".other").height());

    });
}

function info_box_appear() {
    var mid_window = $(window).scrollTop() + $(window).height() * 0.5;
    $( ".info_button" ).each(function( index ) {
        $(this).css('top', infoPositions[index] * $(".galaxy_image").outerHeight())
        var distance = Math.abs(mid_window - $(this).offset().top);
        if(distance  < $(window).height() * 0.5) {
            $(this).css('opacity', 1 - distance/($(window).height() * 0.7));
        }
    });
}
function info_side_appear(){
    
}