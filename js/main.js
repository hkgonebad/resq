// on window load
$(window).on("load", function () {
    "use strict";

    $('#awz-preloader').delay(350).addClass('loaded');
});

// on Ready
$(document).ready(function () {

    // Splash Screen
    setTimeout(function () {
        if ($('.preloader').hasClass('preloader-splash')){

        } else{
            $('.preloader').addClass('preloader-deactivate');
        }   
        
    }, 2000);


    // OTP Input
    $('.digit-group').find('input').each(function () {
        $(this).attr('maxlength', 1);
        $(this).on('keyup', function (e) {
            var parent = $($(this).parent());

            if (e.keyCode === 8 || e.keyCode === 37) {
                var prev = parent.find('input#' + $(this).data('previous'));

                if (prev.length) {
                    $(prev).select();
                }
            } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                var next = parent.find('input#' + $(this).data('next'));

                if (next.length) {
                    $(next).select();
                } else {
                    if (parent.data('autosubmit')) {
                        parent.submit();
                    }
                }
            }
        });
    });


    // Push Menu
    var overlay = $(".sidebar-overlay");
    var sidebar = $(".pushMenu");
    var searchbox = $(".searchBox");
    var notifications = $(".notifications");
    var dialog = $(".dialog");

    $(".navToggle").on("click", function () {
        sidebar.toggleClass("show");
        $('body').removeClass('tutflow');
        $('header').removeAttr("style");
        if (sidebar.hasClass("show")) {
            overlay.addClass("active");
            $('body').addClass('overflowH');
        } else {
            overlay.removeClass("active");
            $('body').removeClass('overflowH');
        }
    });

    $(".dialogToggle").on("click", function () {
        dialog.toggleClass("show");
        overlay.addClass("active");
    });

    $('.searchToggle').on("click", function () {
        $('header').css("z-index", "1995");
        searchbox.toggleClass("show");
        overlay.addClass("active");
    });

    overlay.on("click", function () {
        $(this).removeClass("active");
        sidebar.removeClass("show");
        $('body').removeClass('overflowH');
        $('header').removeAttr("style");
        searchbox.removeClass("show");
        dialog.removeClass("show");
    });

    // Notifications
    // $(".notiBell").on("click", function () {
        
    //     if (notifications.hasClass("show")) {
    //         console.log('yes')
    //         overlay.removeClass("active");
    //         $('header').removeAttr("style");
    //     } else {
    //         console.log('no')
    //         overlay.addClass("active");
    //         $('header').css('z-index', '999');
    //     }
    // })


    // Intro Slider
    if ($('.introSlider').length > 0) {

        $('.introSlider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            autoplay: true,
            arrows: false,

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }
    

    // Tutorial
    if ($('.tutorialWindow').length > 0) {
        $('body').addClass('tutflow');
        overlay.addClass("active");
        $('.gotIt').on("click", function () {
            $('body').removeClass('tutflow');
            overlay.removeClass("active");
        })
    }


    // Home Slider
    // Testimonial
    if ($('.sliderWrap').length > 0) {

        $('.sliderWrap').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            autoplay: true,
            arrows: false,

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }


    // Forms Validation
    (function () {
        'use strict';
        window.addEventListener('load', function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();

    // Tooltip
    $('[data-tooltip]').tooltip();
    

    // Products Collapse
    $('.toggleInfo').on('click', function(){
        $(this).toggleClass('open');
        $(this).parents('.card-product').find('.collapse').collapse('toggle');
    })


    ////////////////////////////
    // Service Request Radio
    ////////////////////////////
    $('input[type=radio][name=st]').change(function () {
        $('#pmsTab').collapse('hide');

        if (this.value == 'pms') {
            $('#pmsTab').collapse('show');
        }
    });


    ////////////////////////////
    // Service Request Radio
    ////////////////////////////
    $('input[type=radio][name=st]').change(function () {
        $('#repairTab').collapse('hide');

        if (this.value == 'repair') {
            $('#repairTab').collapse('show');
        }
    });


    ///////////////////////////////////////////
    // Service Request toggles for HTML purposes
    // Not required in React
    ///////////////////////////////////////////
    if ($('.card-issues').length > 0) {

        $('.card-issues').addClass('d-none');
        $('#addIssues .btn').on('click', function(){
            $('#issues').removeClass('d-none');
        })
        $('#uploadModal .btn').on('click', function () {
            $('#uploads').removeClass('d-none');
        })
    }


    ////
    // Search Accordion
    ////////
    // This section makes the search work.
    (function () {
        var searchTerm, panelContainerId;
        $('#faqSearch').on('change keyup', function () {
            searchTerm = $(this).val();
            console.log(searchTerm);

            $('#faqs > .card').each(function () {
                panelContainerId = '#' + $(this).attr('id');

                // Makes search to be case insesitive 
                $.extend($.expr[':'], {
                    'contains': function (elem, i, match, array) {
                        return (elem.textContent || elem.innerText || '').toLowerCase()
                            .indexOf((match[3] || "").toLowerCase()) >= 0;
                    }
                });

                // END Makes search to be case insesitive

                // Show and Hide Triggers
                $(panelContainerId + ':not(:contains(' + searchTerm + '))').hide(); //Hide the rows that done contain the search query.
                $(panelContainerId + ':contains(' + searchTerm + ')').show(); //Show the rows that do!

            });
        });
    }());
    // End Show and Hide Triggers

    // END This section makes the search work.


    /////////////////////////////
    // Change Tab
    /////////////////////////////
    // Javascript to enable link to tab
    var hash = location.hash.replace(/^#/, '');  // ^ means starting, meaning only match the first hash

    if (hash) {
        // $('html, body').animate({ scrollTop: $("#teamTab").offset().top}, 1000);
        $('.nav-tabs a[href="#' + hash + '"]').tab('show');
    } 

    // Change hash for page-reload
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
        window.location.hash = e.target.hash;
    })

    
    ////////////////////////////////
    // Radio Select Care Plan
    ////////////////////////////////
    $('.card-price-control').on('click', function(){
        $('input[type="radio"]').prop("checked", false);
        $('.card-price-control').removeClass('selected');

        $(this).addClass('selected');
        $(this).find('input[type="radio"]').prop("checked", true);

        var value = $(this).find('input[type="radio"]:checked').attr('id');
        console.log(value)
    });
});
