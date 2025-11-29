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

   // --- DATE LOGIC SETUP ---
const today = new Date().toISOString().split('T')[0];

// 1. Start Date ka Min set karein (Aaj ki date)
$('#startDate').attr('min', today);

// 2. End Date ka Min set karein (Default: Aaj ki date taaki calendar hamesha khule)
$('#endDate').attr('min', today);

// 3. Jab Start Date change ho, tabhi End Date ka Min update karein
$('#startDate').on('change', function () {
    const startVal = $(this).val();
    
    if (startVal) {
        // Start date select hone par End date ka min update karein
        $('#endDate').attr('min', startVal);
        
        // Agar End Date pehle se selected hai aur wo Start Date se pehle ki hai, to use clear karein
        if ($('#endDate').val() && $('#endDate').val() < startVal) {
            $('#endDate').val('');
        }
    } else {
        // Agar user Start Date clear kar de, to End Date ka min wapis Today kar do
        $('#endDate').attr('min', today);
    }
});

        $('#enquiryForm').on('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Validation Function
        function validateField(selector) {
            const field = $(selector);
            const value = field.val();

            if (!value || value === "") {
                field.addClass('is-invalid');
                field.next('.error-feedback').slideDown(200);
                return false;
            } else {
                field.removeClass('is-invalid');
                field.next('.error-feedback').slideUp(200);
                return true;
            }
        }

        // Check Fields
        isValid = validateField('#fullName') && isValid;
        isValid = validateField('#email') && isValid;
        isValid = validateField('#phone') && isValid;
        isValid = validateField('#adventureType') && isValid;
        isValid = validateField('#startDate') && isValid;
        isValid = validateField('#endDate') && isValid;
        isValid = validateField('#destination') && isValid;
        isValid = validateField('#travelers') && isValid;

        // If Valid
        if (isValid) {
            let btn = $('.btn-enquiry');
            let originalText = btn.html();
            
            // Loading State
            btn.html('<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...');
            btn.prop('disabled', true);

            setTimeout(function () {
                // Form Reset
                $('#enquiryForm')[0].reset();

                // Button Reset
                btn.html(originalText);
                btn.prop('disabled', false);

                // Toast Notification Show
                const toastEl = document.getElementById('successToast');
                if (toastEl) {
                    const toast = new bootstrap.Toast(toastEl);
                    toast.show();
                } else {
                    alert("Enquiry Sent Successfully!");
                }
            }, 1500);
        }
    });

    // --- 4. INPUT CLEANUP ---
    // Jab user type kare to red error hatayein
    $('input, select, textarea').on('input change focus', function () {
        $(this).removeClass('is-invalid');
        $(this).next('.error-feedback').hide();
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
