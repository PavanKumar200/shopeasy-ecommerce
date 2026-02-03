// ========== HERO SLIDER WITH JQUERY ==========
$(document).ready(function() {
    let currentSlide = 0;
    const slides = $('.slide');
    const dots = $('.slider-dot');
    let slideInterval;

    function showSlide(index) {
        slides.removeClass('active');
        dots.removeClass('active');
        
        slides.eq(index).addClass('active');
        dots.eq(index).addClass('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Dot click handlers using jQuery
    dots.on('click', function() {
        stopSlider();
        currentSlide = dots.index(this);
        showSlide(currentSlide);
        startSlider();
    });

    // Initialize slider
    showSlide(currentSlide);
    startSlider();

    // Pause on hover using jQuery
    $('.hero-slider').hover(stopSlider, startSlider);
});
