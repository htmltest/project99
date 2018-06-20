$(document).ready(function() {

    $.validator.addMethod('maskPhone',
        function(value, element) {
            if (value == '') {
                return true;
            }
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('.main-events-menu a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.main-events-menu li').index(curLi);
            $('.main-events-menu li.active').removeClass('active');
            curLi.addClass('active');
            $('.main-events-tab').removeClass('active');
            $('.main-events-tab').eq(curIndex).addClass('active');
            $('.main-events-menu-current-text').html(curLi.find('.main-events-menu-title').html());
        }
        $('.main-events-menu').removeClass('open');
        e.preventDefault();
    });

    $('.main-events-menu-current').click(function() {
        $('.main-events-menu').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.main-events-menu').length == 0) {
            $('.main-events-menu').removeClass('open');
        }
    });

    $(window).on('load resize', function() {
        if ($('.main-events-list-main').length > 0) {
            if ($(window).width() > 1199) {
                $('.main-events-list-main').each(function() {
                    if ($(this).hasClass('slick-slider')) {
                        $(this).slick('unslick');
                    }
                });
            } else {
                $('.main-events-list-main').slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<button type="button" class="slick-prev"></button>',
                    nextArrow: '<button type="button" class="slick-next"></button>',
                    adaptiveHeight: true,
                    dots: true,
                });
            }
        }
    });

    $('.main-gallery-list').slick({
        dots: false,
        infinite: false,
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                    dots: true
                }
            }
        ]
    });

    $('body').on('click', '.next-link', function(e) {
        var curItem = $($(this).attr('href'));
        if (curItem.length > 0) {
            $.scrollTo(curItem, {duration: 500});
        }
        e.preventDefault();
    });

    $(window).on('load resize scroll', function() {
        if ($('.main-more-career').length > 0) {
            var curScroll = $(window).scrollTop();
            var curHeight = $(window).height();
            if ((curScroll + curHeight > $('.main-more').offset().top + 100) && (curScroll + curHeight < $('.main-gallery').offset().top - 100)) {
                $('.main-more-career').addClass('visible');
            } else {
                $('.main-more-career').removeClass('visible');
            }
        }
    });

    $('.main-more-career-close').click(function(e) {
        $('.main-more-career').remove();
         e.preventDefault();
    });

    $('.module-info-video-list-inner').slick({
        dots: false,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        var curStart = 0;
        if (curLink.data('gallery-start')) {
            curStart = Number(curLink.data('gallery-start') - 1);
        }
        windowOpen(curLink.attr('href'), curStart);
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $(window).resize(function() {
        windowPosition();
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.module-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active') && !curLi.hasClass('authorized')) {
            var curIndex = $('.module-menu ul li:not(.authorized)').index(curLi);
            $('.module-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            $('.module-info-item.active').removeClass('active');
            $('.module-info-item').eq(curIndex).addClass('active');
            if ($('.module-menu ul').hasClass('slick-slider')) {
                $('.module-menu ul').slick('goTo', curIndex);
            }
        }
        e.preventDefault();
    });

    $(window).on('load resize', function() {
        if ($('.module-menu ul').length > 0) {
            if ($(window).width() > 1199) {
                $('.module-menu ul').each(function() {
                    if ($(this).hasClass('slick-slider')) {
                        $(this).slick('unslick');
                    }
                });
            } else {
                $('.module-menu ul').slick({
                    infinite: false,
                    variableWidth: true,
                    adaptiveHeight: false,
                    dots: false,
                    arrows: false
                });
            }
        }
    });

    $('.mobile-menu-link').click(function(e) {
        $('html').addClass('mobile-menu-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).is('nav')) {
            $('html').removeClass('mobile-menu-open');
        }
    });

    $('.nav-with-submenu a').click(function(e) {
        if ($('html').hasClass('mobile-menu-open') && $(this).parent().find('ul').length > 0) {
            $(this).parent().toggleClass('open');
            e.preventDefault();
        }
    });

    $('body').on('click', '.window-gallery-preview-item a', function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            var curIndex = $('.window-gallery-preview-item').index(curItem);
            $('.gallery-link').eq(curIndex).trigger('click');
        }
        e.preventDefault();
    });

    $('body').on('click', '.window-gallery-next', function(e) {
        var curIndex = $('.window-gallery-preview-item').index($('.window-gallery-preview-item.active'));
        curIndex++;
        if (curIndex > $('.window-gallery-preview-item').length - 1) {
            curIndex = 0;
        }
        $('.gallery-link').eq(curIndex).trigger('click');
        e.preventDefault();
    });

    $('body').on('click', '.window-gallery-prev', function(e) {
        var curIndex = $('.window-gallery-preview-item').index($('.window-gallery-preview-item.active'));
        curIndex--;
        if (curIndex < 0) {
            curIndex = $('.window-gallery-preview-item').length - 1;
        }
        $('.gallery-link').eq(curIndex).trigger('click');
        e.preventDefault();
    });

    $('body').on('click', '.gallery-link', function(e) {
        var curPadding = $('.wrapper').width();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        if ($('.window').length > 0) {
            $('.window').remove();
        }

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        var curLink = $(this);
        var galleryIndex = $('.gallery-link').index(curLink);
        var newHTML =   '<div class="window-gallery">' +
                            '<div class="window-gallery-title">' + curLink.data('gallery-title') + '</div>' +
                            '<div class="window-gallery-header">' +
                                '<div class="window-gallery-header-text"><div class="window-gallery-header-text-inner"></div></div>' +
                                '<div class="window-gallery-header-info">' +
                                    '<div class="window-gallery-header-info-date"></div>' +
                                    '<div class="window-gallery-header-info-place"></div>' +
                                '</div>' +
                            '</div>';

        newHTML +=          '<div class="window-gallery-big">' +
                                '<div class="window-gallery-big-inner">';

        curLink.parent().find('.main-gallery-item-list .gallery-item-link').each(function() {
            newHTML +=              '<div class="window-gallery-big-item" title="' + $(this).data('gallery-item-title') + '" data-date="' + $(this).data('gallery-item-date') + '" data-city="' + $(this).data('gallery-item-city') + '"><img src="' + $(this).attr('href') + '" alt="" /></div>';
        });

        newHTML +=              '</div>' +
                                '<a href="#" class="window-gallery-prev"></a>' +
                                '<a href="#" class="window-gallery-next"></a>' +
                            '</div>';

        newHTML +=          '<div class="window-gallery-preview">' +
                                '<div class="window-gallery-preview-inner">';

        $('.gallery-link').each(function() {
            newHTML +=              '<div class="window-gallery-preview-item"><a href="#" title="' + $(this).data('gallery-title') + '"><img src="' + $(this).data('gallery-preview') + '" alt="" /></a></div>';
        });

        newHTML +=              '</div>' +
                            '</div>';

        newHTML +=      '</div>';

        $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + newHTML + '<a href="#" class="window-close"></a></div></div>')
        $('.window-gallery-preview-item').eq(galleryIndex).addClass('active');

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').one('load', function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-container').removeClass('window-container-load');
                    $('.window-loading').remove();
                    windowPosition();
                }
            });
        } else {
            $('.window-container').removeClass('window-container-load');
            $('.window-loading').remove();
            windowPosition();
        }

        $('.window-gallery-big-inner').slick({
            dots: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>'
        }).on('setPosition', function(slick) {
            var curIndex = $('.window-gallery-big-inner').slick('slickCurrentSlide');
            var curItem = $('.window-gallery-big-item').eq(curIndex);
            $('.window-gallery-header-text-inner').html(curItem.attr('title'));
            $('.window-gallery-header-info-date').html(curItem.data('date'));
            $('.window-gallery-header-info-place').html(curItem.data('city'));
            var curWidth = $('.window-gallery-big-inner .slick-dots li').length * 17 - 8;
            $('.window-gallery-big-inner .slick-prev').css({'margin-left': -curWidth / 2 - 17});
            $('.window-gallery-big-inner .slick-next').css({'margin-left': curWidth / 2 + 8});
        });

        $('.window-gallery-preview-inner').slick({
            dots: false,
            infinite: false,
            slidesToShow: 8,
            slidesToScroll: 8,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                }
            ]
        });

        e.preventDefault();
    });


    $('body').on('click', '.onegallery-item-link', function(e) {
        var curPadding = $('.wrapper').width();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        if ($('.window').length > 0) {
            $('.window').remove();
        }

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        var curLink = $(this);
        var galleryIndex = $('.gallery-link').index(curLink);
        var newHTML =   '<div class="window-gallery">' +
                            '<div class="window-gallery-title">' + curLink.data('gallery-item-title') + '</div>';

        newHTML +=          '<div class="window-gallery-big">' +
                                '<div class="window-gallery-big-inner">';

        curLink.parent().parent().find('.onegallery-item-link').each(function() {
            newHTML +=              '<div class="window-gallery-big-item"><img src="' + $(this).attr('href') + '" alt="" /></div>';
        });

        newHTML +=              '</div>' +
                            '</div>';

        newHTML +=      '</div>';

        $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + newHTML + '<a href="#" class="window-close"></a></div></div>')
        $('.window-gallery-preview-item').eq(galleryIndex).addClass('active');

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').one('load', function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-container').removeClass('window-container-load');
                    $('.window-loading').remove();
                    windowPosition();
                }
            });
        } else {
            $('.window-container').removeClass('window-container-load');
            $('.window-loading').remove();
            windowPosition();
        }

        $('.window-gallery-big-inner').slick({
            dots: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        });

        e.preventDefault();
    });

});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
    $('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('focus');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });

    curForm.find('.form-input input, .form-input textarea').blur(function() {
        if ($(this).val() == '') {
            $(this).parent().removeClass('focus');
        }
    });

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});
    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent().parent().parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    curForm.validate({
        ignore: '',
        invalidHandler: function(form, validatorcalc) {
            validatorcalc.showErrors();
            checkErrors();
        }
    });
}

function checkErrors() {
    $('.form-checkbox, .form-file, .form-input').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-select').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('select.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('select.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}

function windowOpen(linkWindow, dataWindow, callbackWindow) {
    var curPadding = $('.wrapper').width();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    if ($('.window').length == 0) {
        $('body').append('<div class="window"><div class="window-loading"></div></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').remove();
        }
        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').one('load', function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window-container').removeClass('window-container-load');
            windowPosition();
        }

        if (typeof (callbackWindow) != 'undefined') {
            callbackWindow.call();
        }

        $('.window form').each(function() {
            initForm($(this));
        });
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        if ($('.window-gallery').length == 0) {
            $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
            if ($('.window-container').height() > $('.window').height() - 60) {
                $('.window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
            }
        } else {
            $('.window-container').css({'top': '0', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
    }
}


Pace.on('done', function() {
    $('.revealator-within').removeClass('revealator-within');
    $('.wrapper').addClass('preloadsuccess');
    $('.welcome').addClass('animate');

    $(window).on('load resize scroll', function() {
        if ($('.theory').length > 0) {
            if ($('.theory').offset().top + $('.theory').height() / 3 < $(window).scrollTop() + $(window).height()) {
                $('.theory').addClass('animate');
            } else {
                $('.theory').removeClass('animate');
            }
        }
    });

    $(window).trigger('scroll');
});