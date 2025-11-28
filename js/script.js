$(document).ready(function () {
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

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 50) {
            $('#mainNavbar').addClass('scrolled');
            $('.logochange').attr('src', 'images/logo.png');
        } else {
            $('#mainNavbar').removeClass('scrolled');
            $('.logochange').attr('src', 'images/logofirst.png');
        }
    });

    $('#heroCarousel').carousel({
        interval: 5000,
        // pause: 'hover'
    });

    $('.carousel-item').each(function () {
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

    $('.testimonial-slider-wrapper').slick({
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        fade: true,
        cssEase: 'linear',
        pauseOnHover: false,
    });

    $('.prev-slide').click(function () {
        $('.testimonial-slider-wrapper').slick('slickPrev');
    });

    $('.next-slide').click(function () {
        $('.testimonial-slider-wrapper').slick('slickNext');
    });

});

document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll('.counter');
    const counterOptions = { threshold: 0.6 };

    const startCounter = (entry) => {
        let counter = entry.target;
        let target = +counter.getAttribute("data-target");
        let count = 0;
        let speed = target / 100;

        counter.style.opacity = 1;

        const updateCount = () => {
            if (count < target) {
                count += speed;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry);
                counterObserver.unobserve(entry.target);
            }
        });
    }, counterOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    const fadeElements = document.querySelectorAll('.fade-up');
    const fadeOptions = { threshold: 0.4 };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, fadeOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

});




