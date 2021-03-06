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

    reverseGeocode = function(lat, long) {
        var geocoder, latlng;
        geocoder = new google.maps.Geocoder();
        latlng = new google.maps.LatLng(lat, long);
        return geocoder.geocode({
            latLng: latlng
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    return $("#bh-sl-address").val(results[0].formatted_address);
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

    $(".locate").focus(function(e) {
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
                $('.beer-finder-results').addClass('showing');
            }
        }
        );
    });

    var beers = ['Happy Amber', 'Psychopathy', 'Gnarly Brown', 'Blood Orange Psychopathy', 'Identity Crisis', 'Lift', 'PSA'];

    var beers = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: beers
    });
    $('#search-store').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'beers',
        source: beers
    });
});
