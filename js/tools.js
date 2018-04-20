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
        nextArrow: '<button type="button" class="slick-next"></button>'
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

    $('.module-info-video-list-inner').slick({
        dots: false,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>'
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
        }
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

        var startGalleryIndex = 0;
        if (Number(dataWindow)) {
            startGalleryIndex = Number(dataWindow);
        }

        $('.window-gallery-big-inner').slick({
            dots: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: startGalleryIndex,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>'
        });

        $('.window-gallery-preview-inner').slick({
            dots: false,
            infinite: false,
            slidesToShow: 8,
            slidesToScroll: 8,
            arrows: false
        });

        $('.window-gallery-preview-item a').click(function(e) {
            var curIndex = $('.window-gallery-preview-item').index($(this).parent());
            $('.window-gallery-big-inner').slick('slickGoTo', curIndex);
            e.preventDefault();
        });

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
    }
}