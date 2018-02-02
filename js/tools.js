$(document).ready(function() {

    $('.main-events-menu a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.main-events-menu li').index(curLi);
            $('.main-events-menu li.active').removeClass('active');
            curLi.addClass('active');
            $('.main-events-tab').stop(true, true);
            $('.main-events-tab:visible').eq(0).fadeOut(function() {
                $('.main-events-tab').eq(curIndex).fadeIn();
            });
        }
        e.preventDefault();
    });

    $('.main-gallery-list').slick({
        dots: false,
        infinite: false,
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
    });

});