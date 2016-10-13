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


});
