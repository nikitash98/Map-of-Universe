$(document).ready(function(){
});

$(window).scroll(function() {
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

    if(extragalacticPercentage < 0) {
      var exponent = galacticPercentage * 25
      var log = 0.0001 * 10 ** exponent
      $(".counter").html((galacticPercentage).toFixed(2));
      $(".unit").html("Kilometers");
    }

    $(".view_box").css('top',over_percentage * $(".side_scroll").outerHeight() - $(".side_scroll").outerHeight());
    $(".view_box").css('height', (windowheight/galaxyHeight) * $(".side_scroll").outerHeight());

    /**
    if(location < 0) {
        var newloc = barpos - ($(".galaxies").offset().top + ($(".galaxies").outerHeight() ));
        var totalgalaxy = $(".galaxies").outerHeight() * -0.53963636363;
        var percent = (newloc/totalgalaxy) * 25;
        var log = 0.0001 * 10 ** percent;
        var present = log;
        var unit = "Kilometers"
        if (log >= 149598000) {
            console.log("YO");
            var au = log / 149598000;
            unit = "AU"
            present = au;
            if(au >= 63241.1) {
                var lightyears = au/63241.1;
                present = lightyears;
                unit = "Light Years";
                if(lightyears >= 3261.56) {
                    var kiloparsecs = lightyears/3261.56;
                    present = kiloparsecs;
                    unit = "Kiloparsecs"
                }
            }
        } else {
            unit = "Kilometers";
        }
        $(".counter").html(present.toFixed(2));
        $(".unit").html(unit);

    } else {
        $(".counter").html(location.toFixed(2));
        $(".unit").html("GYR");
    }
    */


});

$("#start").click(function(e){
    $('html, body').animate({
		scrollTop: $(".galaxy_image").offset().top + $(".galaxy_image").outerHeight() - $(window).height() * 0.8
	}, 2000, 'linear');
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
