////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




var resizeId;
var openedSidePanel;
var bodyHasResponsiveNavigation = 0;
$(document).ready(function ($) {
    "use strict";

    if ($(".tse-scrollable").length) {
        $(".tse-scrollable").TrackpadScrollEmulator();
    }

    $(".open-side-panel, [data-toggle=modal]").on("click", function (e) {
        e.preventDefault();
        $("body").addClass("show-panel");
        $($(this).attr("href")).addClass("show-it");
        $(this).addClass("is-active");
        openedSidePanel = $($(this).attr("href"));
    });

    $(".backdrop, .modal-backdrop, .modal .close, .close-panel").on("click", function (e) {
        $(".open-side-panel").removeClass("is-active");
        if ($("body").hasClass("show-panel")) {
            $("body").removeClass("show-panel");
            openedSidePanel.removeClass("show-it");
        }
    });


    $(document).keydown(function (e) {
        if (!$("body").hasClass("mfp-zoom-out-cur")) {
            switch (e.which) {
                case 27: // ESC
                    $(".close-panel").trigger("click");
                    break;
            }
        }
    });


    $(".modal").on("hide.bs.modal", function (e) {
        if ($("body").hasClass("show-panel")) {
            $("body").removeClass("show-panel");
        }
    });

    $(".nav-btn").on("click", function (e) {
        $(".nav-btn-only").toggleClass("show-nav");
    });

    //  Count Down

    if ($(".count-down").length) {
        var year = parseInt($(".count-down").attr("data-countdown-year"), 10);
        var month = parseInt($(".count-down").attr("data-countdown-month"), 10) - 1;
        var day = parseInt($(".count-down").attr("data-countdown-day"), 10);
        $(".count-down").countdown({ until: new Date(year, month, day), padZeroes: true });
    }


    //  Responsive Video Scaling

    if ($(".video").length > 0) {
        $(this).fitVids();
    }

    //  Magnific Popup

    if ($(".image-popup").length > 0) {
        $(".image-popup").magnificPopup({
            type: "image",
            removalDelay: 300,
            mainClass: "mfp-fade",
            overflowY: "hidden",
        });
    }

    if ($(".video-popup").length > 0) {
        $(".video-popup").magnificPopup({
            type: "iframe",
            removalDelay: 300,
            mainClass: "mfp-fade",
            overflowY: "hidden",
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },
                srcAction: 'iframe_src'
            }
        });
    }

    if ($(".count-down").length) {
        var year = parseInt($(".count-down").attr("data-countdown-year"), 10);
        var month = parseInt($(".count-down").attr("data-countdown-month"), 10) - 1;
        var day = parseInt($(".count-down").attr("data-countdown-day"), 10);
        $(".count-down").countdown({ until: new Date(year, month, day), padZeroes: true });
    }

    //  Form Validation


    //function ValidateEmail(mail) 


    $(".form .btn[type='submit']").on("click", function () {
        var formData = new FormData($('#form-contact')[0]); //creo un objeto  para todos los datos del form
        var button = document.querySelector('#sent-alert');
        var text = document.createTextNode('Enviando')

        var name = formData.get('name'); //establesco variables  con los datos de los inputs  y les pongo nombre
        var email = formData.get('email');
        var number = formData.get('number');
        var message = formData.get('message');

        const filterNumber = /^[0-9]*$/; 
        const emailFilter = /^([\w-]+(?:\.[\w-]+))@((?:[\w-]+\.)\w[\w-]{0,66})\.([a-z]{2,66}(?:\.[a-z]{2})?)$/i;    

        console.log(name);
        console.log(email); // aca testeo que estoy recibinedo de los input
        console.log(number);
        console.log(message); 
        var flag = false;

        
        // Metodo que valida ls inputs 
        var validarName = function () {
            if (!name) {  // !negado no existe no se creo se le asigna vaor cero
                // alert ("completar con un email valido"); 
                //removeClass('hide')
                // $( ".show-name" ).removeClass('hide');

                // console.log('completa el campo')
                document.querySelector('#name-text').classList.remove('hide');
                flag = true; //ACA PREGUNO  A CADA INPUT SI ESTAN VACIOS PARA 
                // nameFilter.test('#name-text')
                //  alert ("completar con un nombre valido"); 
              //  e.preventDefault();

            }
            if (!emailFilter.test(email)) {
                // alert ("completar con un email valido"); 
                document.querySelector('#emailtext').classList.remove('hide');
                flag = true;
               // e.preventDefault();
            }


            if (!emailFilter.test(number)) {
               // alert("completar con un telefono valido");
                document.querySelector('#number-text').classList.remove('hide');
                flag = true;
               // e.preventDefault();
            } // aca tendria que desaparecer la clase y mostrar el subensaje cuando los espacios esten vacios

            if (!message) {
                // alert("completar con un telefono valido");
                 document.querySelector('#mssg-text').classList.remove('hide');
                 flag = true;
                // e.preventDefault();
             } // 

             

            

        };

        

        validarName();
        
         
        // flag parte de true para ver si los inputs estan vacios y evitar mandar el mensaje en blanco 
       
        if (flag) {
            return false
        };
        button.classList.add('alert-info');

        button.appendChild(text)
        button.classList.remove('hide');

        $.ajax({
            type: 'POST',
            url: "/assets/php/email.php",
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            async: false,
            success: function (data) {
                console.log(data);
                if (data == 'success') {
                    // Imprimimos la respuesta en el div result
                    // $('#result-success').show();
                    //$('#form-contact').hide();
                    $('#form-contact-name').val('');
                    $('#form-contact-number').val('');
                    $('#form-contact-email').val('');
                    $('#form-contact-message').val('');
                    $('#form-contact-submit').text('Enviado');
                    button.classList.add('alert-succes');


                } else {
                    // Imprimimos la respuesta en el div result
                    $('#form-contact-submit').text('Enviar');
                }
                return false;
                //$('#result').fadeIn('slow');
            }, error: function () {
                return false;
            }
        });
        return false;
    });



    $(".bg-transfer").each(function () {
        $(this).css("background-image", "url(" + $(this).find("img").attr("src") + ")");
    });

    if ($("body").hasClass("nav-btn-only")) {
        bodyHasResponsiveNavigation = 1;
    }
    responsiveNavigation();
    initializeOwl();
    galleryCarouselWidth();

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function () {
    $(".animate").addClass("in");

});

$(window).resize(function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Do after resize

function doneResizing() {
    responsiveNavigation();
    $(".tse-scrollable").TrackpadScrollEmulator("recalculate");
    tseWrapperHeight();
    galleryCarouselWidth();
}


function initializeOwl() {
    if ($(".owl-carousel").length) {
        $(".owl-carousel").each(function () {

            var items = parseInt($(this).attr("data-owl-items"), 10);
            if (!items) items = 1;

            var nav = parseInt($(this).attr("data-owl-nav"), 2);
            if (!nav) nav = 0;

            var dots = parseInt($(this).attr("data-owl-dots"), 2);
            if (!dots) dots = 0;

            var center = parseInt($(this).attr("data-owl-center"), 2);
            if (!center) center = 0;

            var loop = parseInt($(this).attr("data-owl-loop"), 2);
            if (!loop) loop = 0;

            var margin = parseInt($(this).attr("data-owl-margin"), 2);
            if (!margin) margin = 0;

            var autoWidth = parseInt($(this).attr("data-owl-auto-width"), 2);
            if (!autoWidth) autoWidth = 0;

            var navContainer = $(this).attr("data-owl-nav-container");
            if (!navContainer) navContainer = 0;

            var autoplay = $(this).attr("data-owl-autoplay");
            if (!autoplay) autoplay = 0;

            var fadeOut = $(this).attr("data-owl-fadeout");
            if (!fadeOut) fadeOut = 0;
            else fadeOut = "fadeOut";

            $(this).owlCarousel({
                navContainer: navContainer,
                animateOut: fadeOut,
                autoplaySpeed: 2000,
                autoplay: autoplay,
                autoheight: 1,
                center: center,
                loop: loop,
                margin: margin,
                autoWidth: autoWidth,
                items: items,
                nav: nav,
                dots: dots,
                autoHeight: true,
                navText: [],
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    768: {
                        items: items
                    }
                }
            });
        });

    }
}

function simpleMap(latitude, longitude, markerImage, mapTheme, mapElement) {

    if (mapTheme == "light") {
        var mapStyles = [{ "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#d3d3d3" }] }, { "featureType": "transit", "stylers": [{ "color": "#808080" }, { "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "on" }, { "color": "#b3b3b3" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "weight": 1.8 }] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "color": "#d7d7d7" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ebebeb" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#a7a7a7" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#efefef" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#696969" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }, { "color": "#737373" }] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "color": "#d6d6d6" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, {}, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "color": "#dadada" }] }];
    }
    else if (mapTheme == "dark") {
        mapStyles = [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }]
    }
    var mapCenter = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom: 13,
        center: mapCenter,
        disableDefaultUI: true,
        scrollwheel: false,
        styles: mapStyles
    };
    var element = document.getElementById(mapElement);
    var map = new google.maps.Map(element, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        icon: markerImage
    });
}

function responsiveNavigation() {

    if (bodyHasResponsiveNavigation == 0) {
        if (!viewport.is('lg')) {
            $("body").addClass("nav-btn-only");
        }
        else {
            $("body").removeClass("nav-btn-only");
        }
    }
}

var viewport = (function () {
    var viewPorts = ['xs', 'sm', 'md', 'lg'];

    var viewPortSize = function () {
        return window.getComputedStyle(document.body, ':before').content.replace(/"/g, '');
    };

    var is = function (size) {
        if (viewPorts.indexOf(size) == -1) throw "no valid viewport name given";
        return viewPortSize() == size;
    };

    var isEqualOrGreaterThan = function (size) {
        if (viewPorts.indexOf(size) == -1) throw "no valid viewport name given";
        return viewPorts.indexOf(viewPortSize()) >= viewPorts.indexOf(size);
    };

    // Public API
    return {
        is: is,
        isEqualOrGreaterThan: isEqualOrGreaterThan
    }

})();

function tseWrapperHeight() {
    $(".tse-wrapper").height($(window).height() - ($(window).height() / 100) * 40);
}

function galleryCarouselWidth() {
    if (viewport.is('xs')) {
        $(".gallery-carousel").width($("#outer-wrapper").width());
    }
}