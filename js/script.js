document.addEventListener("DOMContentLoaded", () => {


/* =========================
   CARROSSEL
========================= */

const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentSlide = 0;
let startX = 0;
let endX = 0;


function updateCarousel() {

    if (!track) return;

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

    if (slides.length === 0) return;

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    updateCarousel();

}


function prevSlide() {

    if (slides.length === 0) return;

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


/* =========================
   SWIPE NO CELULAR
========================= */

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


/* =========================
   MODAL DOS PRODUTOS
========================= */

const cards =
    document.querySelectorAll(".product-card");

const modal =
    document.getElementById("productModal");

const closeModal =
    document.getElementById("modalClose");

const overlay =
    document.querySelector(".modal-overlay");

const modalImage =
    document.getElementById("modalProductImage");

const modalName =
    document.getElementById("modalProductName");

const modalRef =
    document.getElementById("modalProductRef");

const modalPrice =
    document.getElementById("modalProductPrice");

const interestButton =
    document.getElementById("interestButton");

let selectedProduct = {};


/* ABRIR MODAL */

if (cards.length > 0 && modal) {

    cards.forEach((card) => {

        card.addEventListener("click", () => {

            selectedProduct = {
                name: card.dataset.name,
                ref: card.dataset.ref,
                price: card.dataset.price,
                image: card.dataset.image
            };


            modalImage.src =
                selectedProduct.image;

            modalImage.alt =
                `${selectedProduct.name} GIORNNO Ref. ${selectedProduct.ref}`;


            modalName.textContent =
                selectedProduct.name.toUpperCase();


            modalRef.textContent =
                `Ref. ${selectedProduct.ref}`;


            modalPrice.textContent =
                selectedProduct.price;


            modal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });

}


/* =========================
   FECHAR MODAL
========================= */

function fecharModal() {

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        fecharModal
    );

}


if (overlay) {

    overlay.addEventListener(
        "click",
        fecharModal
    );

}


/* FECHAR COM ESC */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("active")
        ) {

            fecharModal();

        }

    }
);


/* =========================
   WHATSAPP
========================= */

if (interestButton) {

    interestButton.addEventListener("click", () => {

        const numeroWhatsApp =
            "5541991945815";


        /* LINK COMPLETO DA IMAGEM */

        const linkImagem = new URL(
            selectedProduct.image,
            window.location.href
        ).href;


        const mensagem = `Olá! 👋


Tenho interesse neste produto da GIORNNO Joias:

✨ ${selectedProduct.name} - Ref. ${selectedProduct.ref}
💰 ${selectedProduct.price}

📷 Foto do produto:
${linkImagem}

Gostaria de receber mais informações sobre esta peça. 💎`;


        const url =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;


        window.open(url, "_blank");

    });

}


});
