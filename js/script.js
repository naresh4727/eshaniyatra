$(document).ready(function () {
    // Navbar dropdown hover for desktop
    if ($(window).width() >= 992) {
        $('.navbar .dropdown').hover(function () {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideDown(200, function () {
                $(this).css('opacity', '1');
            });
            $(this).addClass('show');
        }, function () {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp(200, function () {
                $(this).css('opacity', '0');
            });
            $(this).removeClass('show');
        });

        $('.dropdown-menu').on('click', function (e) {
            e.stopPropagation();
        });
    }

    // Navbar scroll effect
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) { // Adjust '50' to however much you want to scroll before the color changes
            $('#mainNavbar').addClass('scrolled');
             $('.logochange').attr('src', 'images/logo.png');
        } else {
            $('#mainNavbar').removeClass('scrolled');
            $('.logochange').attr('src', 'images/logofirst.png');
        }
    });

    // Initialize Bootstrap carousel
    $('#heroCarousel').carousel({
        interval: 5000,
        // pause: 'hover' // Uncomment this if you want to pause on hover
    });

    $('.carousel-item').each(function() {
        let bg = $(this).css('background-image');
        $(this).css('background-image', bg + ', linear-gradient(transparent, transparent)');
    }); 

    $('.destination-slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '15%',
    autoplay: true,            
    autoplaySpeed: 5000,       
    pauseOnHover: false,      
    prevArrow: $('.prev-btn'),
    nextArrow: $('.next-btn'),
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                centerPadding: '10%',
            }
        },
        {
            breakpoint: 992,
            settings: {
                centerMode: false,
                slidesToShow: 1,
                centerPadding: '0px'
            }
        },
        {
            breakpoint: 768,
            settings: {
                centerMode: false,
                slidesToShow: 1,
                centerPadding: '0px'
            }
        }
    ]
});

});

// document.addEventListener("DOMContentLoaded", function() {
//     document.querySelector(".carousel-item.active .hero-bg").style.transform = "scale(1.1)";
// });
