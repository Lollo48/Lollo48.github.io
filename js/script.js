$(document).ready(function () {
    // OWL CAROUSEL INSTALLATION
    $("#testimonial-carousel").owlCarousel({
        items: 1,
        itemsDesktop: [1000, 1], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1],
        itemsMobile: [479, 1],
        pagination: true,
    });
    $("#home-slider").owlCarousel({
        items: 1,
        itemsDesktop: [1000, 1], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 1], // betweem 900px and 601px
        itemsTablet: [600, 1],
        itemsMobile: [479, 1],
        pagination: false,
        navigation: true,
        navigationText: [
            "<i class='ion-ios-arrow-left'></i>",
            "<i class='ion-ios-arrow-right'></i>",
        ],
    });

    /* Navigation Menu*/
    var offsettop = $(".navbar").offset().top;
    if (offsettop > 50) {
        $(".navbar").addClass("colored-nav");
        $(".navbar").addClass("gradient-violat");
        $("#scroll-top-div").fadeIn("500");
    } else {
        $(".navbar").removeClass("colored-nav");
        $(".navbar").removeClass("gradient-violat");
        $("#scroll-top-div").fadeOut("500");
    }
    var num = 50; //number of pixels before modifying styles

    $(window).bind("scroll", function () {
        if ($(window).scrollTop() > num) {
            $(".navbar").addClass("colored-nav");
            $(".navbar").addClass("gradient-violat");
            $("#scroll-top-div").fadeIn("500");
        } else {
            $(".navbar").removeClass("colored-nav");
            $(".navbar").removeClass("gradient-violat");
            $("#scroll-top-div").fadeOut("500");
        }
    });

    /* SMOOTH SCROLLING SCRIPT*/
    // Add smooth scrolling to all links
    $(".navbar-nav li a").on("click", function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                }
            );
        } // End if
    });

    /****************************BACK TO TOP************************************/
    $("#scroll-top-div").on("click", function (e) {
        e.preventDefault();
        $("html,body").animate(
            {
                scrollTop: 0,
            },
            700
        );
    });
});

$(document).ready(function () {
    // Scroll fluido quando clicchi un link del menu
    $(".nav-link").on("click", function (event) {
        event.preventDefault();
        var target = $(this).attr("href"); // Prende l'ID della sezione
        $("html, body").animate(
            {
                scrollTop: $(target).offset().top - 70, // Offset per non coprire con la navbar
            },
            800
        );
    });

    // Cambia il colore del link attivo mentre scorri
    $(window).on("scroll", function () {
        var scrollPos = $(window).scrollTop();
        $(".nav-link").each(function () {
            var section = $($(this).attr("href")); // Sezione corrispondente al link
            if (section.length) {
                var offsetTop = section.offset().top - 100;
                var offsetBottom = offsetTop + section.outerHeight();
                if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
                    $(".nav-link").removeClass("active"); // Rimuove la classe dagli altri link
                    $(this).addClass("active"); // Aggiunge la classe al link attivo
                }
            }
        });
    });
});

document.addEventListener("scroll", function () {
    const introductionSection = document.getElementById("introduction");
    const navbar = document.querySelector(".navbar");

    // Verifica se la sezione è visibile nello schermo
    const rect = introductionSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        introductionSection.classList.add("show-on-scroll");
    } else {
        introductionSection.classList.remove("show-on-scroll");
    }

    // Cambia il colore della navbar durante lo scroll
    if (window.scrollY > 100) {
        navbar.classList.add("scroll-down");
    } else {
        navbar.classList.remove("scroll-down");
    }
});
