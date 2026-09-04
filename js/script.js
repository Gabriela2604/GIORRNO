document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");

    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let currentSlide = 0;
    let startX = 0;
    let endX = 0;


    function updateCarousel() {

        track.style.transform =
            `translateX(-${currentSlide * 25}%)`;

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }


    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        updateCarousel();

    }


    function prevSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        updateCarousel();

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextSlide
        );

    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            prevSlide
        );

    }


    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentSlide = index;

            updateCarousel();

        });

    });


    /* SWIPE NO CELULAR */

    if (track) {

        track.addEventListener(
            "touchstart",
            (event) => {

                startX =
                    event.touches[0].clientX;

            },
            { passive: true }
        );


        track.addEventListener(
            "touchend",
            (event) => {

                endX =
                    event.changedTouches[0].clientX;

                const difference =
                    startX - endX;


                if (difference > 50) {

                    nextSlide();

                }


                if (difference < -50) {

                    prevSlide();

                }

            },
            { passive: true }
        );

    }

});