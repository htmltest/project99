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
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 767,
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

    $('nav a').click(function(e) {
        if (!$(this).parent().hasClass('nav-with-submenu')) {
            $('html').removeClass('mobile-menu-open');
        } else {
            $(this).parent().toggleClass('open');
            e.preventDefault();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('nav')) {
            $('html').removeClass('mobile-menu-open');
        }
    });

    $('.gallery-link').click(function(e) {
        var curPadding = $('.wrapper').width();
        $('html').data('scrollTop', $(window).scrollTop());
        $('.wrapper').css({'margin-top': -$(window).scrollTop()})
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
                            '<div class="window-gallery-title">' + curLink.data('gallery-title') + '</div>';

        newHTML +=          '<div class="window-gallery-big">' +
                                '<div class="window-gallery-big-inner">';

        curLink.parent().find('.main-gallery-item-list .gallery-item-link').each(function() {
            newHTML +=              '<div class="window-gallery-big-item" title="' + $(this).data('gallery-item-title') + '" data-date="' + $(this).data('gallery-item-date') + '" data-city="' + $(this).data('gallery-item-city') + '"><img src="' + $(this).attr('href') + '" alt="" /></div>';
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

                    $('.window-gallery-big-inner img').css({'max-height': 'calc(100vh - ' + ($('.window-gallery-title').outerHeight() + 125) + 'px)'});
                    $('.window-gallery-big-inner').slick({
                        dots: false,
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
                        prevArrow: '<button type="button" class="slick-prev"></button>',
                        nextArrow: '<button type="button" class="slick-next"></button>'
                    }).on('setPosition', function(event, slick) {
                        $(window).trigger('resize');
                    });
                    $('.window-gallery-big-inner .slick-next').trigger('focus');
                }
            });
        } else {
            $('.window-container').removeClass('window-container-load');
            $('.window-loading').remove();
            windowPosition();
        }

        e.preventDefault();
    });

    $('.main-gallery-all').click(function(e) {
        $('.gallery-link').eq(0).trigger('click');
        e.preventDefault();
    });

    $('body').on('click', '.onegallery-item-link', function(e) {
        var curPadding = $('.wrapper').width();
        $('html').data('scrollTop', $(window).scrollTop());
        $('.wrapper').css({'margin-top': -$(window).scrollTop()})
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

                    $('.window-gallery-big-inner img').css({'max-height': 'calc(100vh - ' + ($('.window-gallery-title').outerHeight() + 125) + 'px)'});
                    $('.window-gallery-big-inner').slick({
                        dots: false,
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
                        prevArrow: '<button type="button" class="slick-prev"></button>',
                        nextArrow: '<button type="button" class="slick-next"></button>'
                    }).on('setPosition', function(event, slick) {
                        $(window).trigger('resize');
                    });
                    $('.window-gallery-big-inner .slick-next').trigger('focus');
                }
            });
        } else {
            $('.window-container').removeClass('window-container-load');
            $('.window-loading').remove();
            windowPosition();
        }

        e.preventDefault();
    });

    $('.city-name').click(function() {
        $('.city-name').removeClass('hover');
        $(this).addClass('hover');
    });

    $('.city-window-close').click(function() {
        $('.city-name').removeClass('hover');
        return false;
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.city-name').length == 0 && !$(e.target).hasClass('city-name')) {
            $('.city-name').removeClass('hover');
        }
    });

    $('.up-link').click(function(e) {
        $.scrollTo(0, 500);
        e.preventDefault();
    });

    $(window).on('load resize scroll', function() {
        if ($(window).scrollTop() > $(window).height()) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }
    });

    if ($('.theory').length > 0) {
        var countItems = $('.theory-item').length;
        var radiusH = 500;
        var radiusV = 376;
        var canvas = document.getElementById('theory-scheme');
        var context = canvas.getContext('2d');
        context.lineWidth = 2;
        $('.theory-scheme').css({'transition': 'opacity .5s ease ' + (0.05 * countItems) + 's'});

        for (var i = 0; i < countItems; i++) {
            var f = (360 - 360 / countItems * i + 180) * Math.PI / 180;
            var left = Math.round(radiusH + radiusH * Math.sin(f));
            var top = Math.round(radiusV + radiusV * Math.cos(f));
            var curItem = $('.theory-item').eq(i);
            var curDelay = 0.05 * i;
            curItem.css({'top': top, 'left': left, 'transition': 'color .2s ease 0s, opacity .1s ease ' + curDelay + 's'});

            context.beginPath();
            context.moveTo(radiusH, radiusV);
            context.lineTo(left, top);
            if (curItem.is('a')) {
                context.strokeStyle = '#d9c7eb';
            } else {
                context.strokeStyle = '#efefef';
            }
            context.stroke();
            context.closePath();
        }
    }

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
    $('html').data('scrollTop', $(window).scrollTop());
    $('.wrapper').css({'margin-top': -$(window).scrollTop()})
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

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 60) {
            $('.window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'margin-top': 0});
        $(window).scrollTop($('html').data('scrollTop'));
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