$(document).ready(function() {
    // ========== SCROLL TO TOP ==========
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#scrollToTop').fadeIn();
        } else {
            $('#scrollToTop').fadeOut();
        }
    });
    
    $('#scrollToTop').click(function() {
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    });

    // ========== NAVBAR ACTIVE LINK ==========
    var path = window.location.pathname.split('/').pop();
    $('.navbar-nav .nav-link').each(function() {
        if ($(this).attr('href') === path) {
            $(this).addClass('active fw-bold');
        }
    });
});
