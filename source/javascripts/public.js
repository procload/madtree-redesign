$(document).ready(function() {

    // Slideshow Javascript
    $('.slideshow').slick({
        dots: true
    });

    $('.on-tap-slideshow').slick();

    // Navigation Javascript
    $('.nav-toggle').on('click', function(e) {
        e.preventDefault();

        $mainNav = $('.site-nav.main > .nav-list');
        if ($mainNav.hasClass('open')) {
            $mainNav.removeClass('open');
        } else {
            $mainNav.addClass('open');
        }
    })

    // Clone the subnav and append it to the active list element
    // so responsive navigation works
    activeGroup = $('.site-nav.main .nav-list .active').data("children");
    $subNav = $('.subnav');
    if ($subNav.data('group') == activeGroup) {
        copiedNav = $subNav.clone().addClass('cloned')
        $('.site-nav.main .active').append(copiedNav);
    }

    $('.active i').on('click', function(e) {
        e.preventDefault();

        $subNav = $('.subnav.cloned');
        if ($subNav.hasClass('open')) {
            $subNav.removeClass('open');
            $(this).removeClass('fa-caret-down').addClass('fa-caret-right');
        } else {
            $subNav.addClass('open');
            $(this).removeClass('fa-caret-right').addClass('fa-caret-down');
        }
    })

    // Popovers
    $('.on-tap-beer > a').on('click', function(e) {
        e.preventDefault();
    });
    $('[data-toggle="popover"]').popover()


    var activeGroup, copiedNav, error_callback, latitude, longitude, reverseGeocode, success_callback;

    // $("#map-canvas").storeLocator({
    //     dataType: "json",
    //     dataLocation: "/data/stores.json",
    //     callbackSuccess: function() {
    //         return $(".find-beer").addClass("showing-results");
    //     }
    // });

    reverseGeocode = function(lat, long) {
        var geocoder, latlng;
        geocoder = new google.maps.Geocoder();
        latlng = new google.maps.LatLng(lat, long);
        return geocoder.geocode({
            latLng: latlng
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    return $("#address").val(results[0].formatted_address);
                } else {

                }
            } else {

            }
        });
    };

    latitude = 0;

    longitude = 0;

    success_callback = function(p) {
        latitude = p.coords.latitude;
        longitude = p.coords.longitude;
        return reverseGeocode(latitude, longitude);
    };

    error_callback = function(p) {};

    $("#find").click(function(e) {
        e.preventDefault();
        if (geoPosition.init()) {
            return geoPosition.getCurrentPosition(success_callback, error_callback, {
                enableHighAccuracy: true
            });
        } else {

        }
    });


    $(function() {
        $('#bh-sl-map-container').storeLocator(
            {
            'dataType': "json",
            'formContainer' : 'beer-form-container',
            'locationList' : 'loc-list',
            'mapID' : 'beer-map',
            'formID' : 'beer-finder-form',
            'dataLocation': "/data/stores.json",
            'infowindowTemplatePath'   : '/templates/infowindow-description.html',
            'listTemplatePath'         : '/templates/location-list-description.html',
            'KMLinfowindowTemplatePath': '/templates/kml-infowindow-description.html',
            'KMLlistTemplatePath'      : '/templates/kml-location-list-description.html',
            callbackMapSet: function() {
                $("#beerModal").modal('show');
            }
        }
        );
    });

    $("#beerModal").on("shown.bs.modal", function () {
        google.maps.event.trigger("", "resize");
    });
});
