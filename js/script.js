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

        if (!track || slides.length === 0) return;

        const slideWidth = 100 / slides.length;

        track.style.transform =
            `translateX(-${currentSlide * slideWidth}%)`;

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
        nextButton.addEventListener("click", nextSlide);
    }


    if (prevButton) {
        prevButton.addEventListener("click", prevSlide);
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


    /* =========================
       ABRIR MODAL
    ========================= */

    if (cards.length > 0 && modal) {

        cards.forEach((card) => {

            card.addEventListener("click", () => {

                /* NÃO ABRE MODAL PARA PRODUTO INDISPONÍVEL */

                if (card.classList.contains("sold")) {
                    return;
                }


                const image =
                    card.querySelector(".product-image img");

                const ref =
                    card.querySelector(".product-code");

                const price =
                    card.querySelector(".price");


                /* IDENTIFICA A CATEGORIA */

                let productName = "PRODUTO";

                const pageTitle =
                    document
                        .querySelector(".catalog-header h2")
                        ?.textContent
                        .trim();


                if (pageTitle) {

                    productName = pageTitle;

                }


                /* SALVA PRODUTO SELECIONADO */

                selectedProduct = {

                    name: productName,

                    ref:
                        ref
                            ? ref.textContent.trim()
                            : "Sem referência",

                    price:
                        price
                            ? price.textContent.trim()
                            : "Consultar preço",

                    image:
                        image
                            ? image.getAttribute("src")
                            : ""

                };


                /* IMAGEM */

                if (modalImage && image) {

                    modalImage.src =
                        selectedProduct.image;

                    modalImage.alt =
                        `${selectedProduct.name} - ${selectedProduct.ref}`;

                }


                /* NOME */

                if (modalName) {

                    modalName.textContent =
                        selectedProduct.name;

                }


                /* REFERÊNCIA */

                if (modalRef) {

                    modalRef.textContent =
                        selectedProduct.ref;

                }


                /* PREÇO */

                if (modalPrice) {

                    modalPrice.textContent =
                        selectedProduct.price;

                }


                /* ABRE MODAL */

                modal.classList.add("active");

                document.body.style.overflow =
                    "hidden";

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


    /* =========================
       FECHAR COM ESC
    ========================= */

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
                "554199687027";


            /* GERA LINK COMPLETO DA IMAGEM */

            const linkImagem =
                selectedProduct.image
                    ? new URL(
                        selectedProduct.image,
                        window.location.href
                    ).href
                    : "";


            /* MENSAGEM */

            const mensagem =
                `Olá! ✨\n\n` +
                `Tenho interesse nesta peça da GIORNNO Joias:\n\n` +
                `💎 ${selectedProduct.name} — ${selectedProduct.ref}\n` +
                `💰 ${selectedProduct.price}\n\n` +
                `📸 Foto do produto:\n` +
                `${linkImagem}\n\n` +
                `💬 Gostaria de receber mais informações sobre disponibilidade e detalhes desta peça. 😊`;


            /* ABRE WHATSAPP */

            const url =
                `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;


            window.open(
                url,
                "_blank"
            );

        });

    }


  /* =========================
   FILTRO DO CATÁLOGO
========================= */

const filterToggle =
    document.getElementById("filterToggle");

const filterMenu =
    document.getElementById("filterMenu");

const filterButtons =
    document.querySelectorAll(".filter-option");


/* ABRIR E FECHAR MENU */

if (filterToggle && filterMenu) {

    filterToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        filterMenu.classList.toggle("active");

    });

}


/* FILTRAR PRODUTOS */

filterButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.stopPropagation();

        const filter = button.dataset.filter;


        /* ATUALIZA A OPÇÃO ATIVA */

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        /* FILTRA OS PRODUTOS */

        cards.forEach((card) => {

            const isSold =
                card.classList.contains("sold");


            if (filter === "all") {

                card.classList.remove("hidden");

            }

            else if (
                filter === "available" &&
                !isSold
            ) {

                card.classList.remove("hidden");

            }

            else if (
                filter === "sold" &&
                isSold
            ) {

                card.classList.remove("hidden");

            }

            else {

                card.classList.add("hidden");

            }

        });


        /* FECHA O MENU DEPOIS DE SELECIONAR */

        if (filterMenu) {

            filterMenu.classList.remove("active");

        }

    });

});


/* FECHA O MENU AO CLICAR FORA */

document.addEventListener("click", (event) => {

    if (
        filterMenu &&
        filterToggle &&
        !filterMenu.contains(event.target) &&
        !filterToggle.contains(event.target)
    ) {

        filterMenu.classList.remove("active");

    }

});
});