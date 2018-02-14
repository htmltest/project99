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

    $('body').on('click', '.next-link', function(e) {
        var curItem = $($(this).attr('href'));
        if (curItem.length > 0) {
            $.scrollTo(curItem, {duration: 500});
        }
        e.preventDefault();
    });

    $(window).on('load resize scroll', function() {
        var curScroll = $(window).scrollTop();
        var curHeight = $(window).height();
        if ((curScroll + curHeight > $('.main-more').offset().top + 100) && (curScroll + curHeight < $('.main-gallery').offset().top - 100)) {
            $('.main-more-career').addClass('visible');
        } else {
            $('.main-more-career').removeClass('visible');
        }
    });

});