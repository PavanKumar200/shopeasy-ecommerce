$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values using jQuery
        const name = $('#name').val().trim();
        const email = $('#contactEmail').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();
        
        // Reset validation states
        $('.form-control').removeClass('is-invalid is-valid');
        
        let isValid = true;
        
        // Validate name
        if (name === '' || name.length < 3) {
            $('#name').addClass('is-invalid');
            isValid = false;
        } else {
            $('#name').addClass('is-valid');
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#contactEmail').addClass('is-invalid');
            isValid = false;
        } else {
            $('#contactEmail').addClass('is-valid');
        }
        
        // Validate subject
        if (subject === '' || subject.length < 5) {
            $('#subject').addClass('is-invalid');
            isValid = false;
        } else {
            $('#subject').addClass('is-valid');
        }
        
        // Validate message
        if (message === '' || message.length < 10) {
            $('#message').addClass('is-invalid');
            isValid = false;
        } else {
            $('#message').addClass('is-valid');
        }
        
        // If valid, show success message
        if (isValid) {
            $('#successMessage').addClass('show');
            $('#contactForm')[0].reset();
            $('.form-control').removeClass('is-valid');
            
            // Scroll to success message
            $('html, body').animate({
                scrollTop: $('#successMessage').offset().top - 100
            }, 500);
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                $('#successMessage').removeClass('show');
            }, 5000);
        }
    });
    
    // Remove validation on input
    $('.form-control').on('input', function() {
        $(this).removeClass('is-invalid is-valid');
    });
});
