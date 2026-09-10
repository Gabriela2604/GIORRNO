document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CARROSSEL
    ========================= */

    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const prevButton = document.querySelector(".carousel-btn.prev");
    const nextButton = document.querySelector(".carousel-btn.next");

    let currentSlide = 0;

    function updateCarousel() {

        if (!track || slides.length === 0) return;

        const slideWidth = slides[0].offsetWidth;

        track.style.transform =
            `translateX(-${currentSlide * slideWidth}px)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    function nextSlide() {

        if (slides.length === 0) return;

        currentSlide =
            (currentSlide + 1) % slides.length;

        updateCarousel();
    }

    function prevSlide() {

        if (slides.length === 0) return;

        currentSlide =
            (currentSlide - 1 + slides.length) % slides.length;

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

    window.addEventListener("resize", updateCarousel);


    /* =========================
       SWIPE DO CARROSSEL
    ========================= */

    let touchStartX = 0;
    let touchEndX = 0;

    if (track) {

        track.addEventListener("touchstart", (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        });

        track.addEventListener("touchend", (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            const difference =
                touchStartX - touchEndX;

            if (Math.abs(difference) > 50) {

                if (difference > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }

            }

        });

    }

    updateCarousel();


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

    let selectedProduct = null;


    cards.forEach((card) => {

        card.addEventListener("click", () => {

            // Não abre o modal para produtos indisponíveis
            if (card.classList.contains("sold")) {
                return;
            }

            const image =
                card.querySelector(".product-image img");

            const name =
                card.querySelector(".product-name");

            const ref =
                card.querySelector(".product-code");

            const price =
                card.querySelector(".price");

            if (!image || !modal) return;

            selectedProduct = {

                image:
                    image.getAttribute("src"),

                name:
                    name
                        ? name.textContent.trim()
                        : "",

                ref:
                    ref
                        ? ref.textContent.trim()
                        : "",

                price:
                    price
                        ? price.textContent.trim()
                        : ""

            };

            if (modalImage) {

                modalImage.src =
                    selectedProduct.image;

                modalImage.alt =
                    selectedProduct.name;

            }

            if (modalName) {

                modalName.textContent =
                    selectedProduct.name;

            }

            if (modalRef) {

                modalRef.textContent =
                    selectedProduct.ref;

            }

            if (modalPrice) {

                modalPrice.textContent =
                    selectedProduct.price;

            }

            modal.classList.add("active");

            document.body.classList.add("modal-open");

        });

    });


    /* =========================
       FECHAR MODAL
    ========================= */

    function closeProductModal() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.classList.remove("modal-open");

        selectedProduct = null;
    }

    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeProductModal
        );

    }

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeProductModal
        );

    }

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeProductModal();

        }

    });


    /* =========================
       WHATSAPP
    ========================= */

    if (interestButton) {

        interestButton.addEventListener("click", () => {

            if (!selectedProduct) return;

            const numeroWhatsApp =
                "554199687027";

            const imagemAbsoluta =
                new URL(
                    selectedProduct.image,
                    window.location.href
                ).href;

            const mensagem =
                `Olá! Tenho interesse no produto ${selectedProduct.name} ` +
                `(Ref.: ${selectedProduct.ref}), no valor de ${selectedProduct.price}. ` +
                `Gostaria de saber mais informações.\n\n` +
                `Imagem: ${imagemAbsoluta}`;

            const url =
                `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

            window.open(url, "_blank");

        });

    }


    /* =========================
       FILTRO
    ========================= */

    const filterToggle =
        document.getElementById("filterToggle");

    const filterMenu =
        document.getElementById("filterMenu");

    const productGrid =
        document.querySelector(".product-grid");

    const productCards =
        document.querySelectorAll(".product-card");

    const availabilityButtons =
        document.querySelectorAll(".availability-option");

    const sortButtons =
        document.querySelectorAll(".sort-option");

    let currentAvailability = "all";
    let currentSort = "original";


    /* =========================
       GUARDAR ORDEM ORIGINAL
    ========================= */

    productCards.forEach((card, index) => {

        card.dataset.originalIndex = index;

    });


    /* =========================
       ABRIR / FECHAR FILTRO
    ========================= */

    if (filterToggle && filterMenu) {

        filterToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                filterMenu.classList.toggle("show");

                const isOpen =
                    filterMenu.classList.contains("show");

                filterToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );

    }


    /* =========================
       PEGAR PREÇO
    ========================= */

    function getPrice(card) {

        const priceElement =
            card.querySelector(".price");

        if (!priceElement) {
            return 0;
        }

        const priceText =
            priceElement.textContent
                .replace("R$", "")
                .trim()
                .replace(/\./g, "")
                .replace(",", ".");

        return parseFloat(priceText) || 0;
    }


    /* =========================
       APLICAR FILTROS
    ========================= */

    function applyFilters() {

        if (!productGrid) return;

        const cardsArray =
            Array.from(productCards);


        /* FILTRO DE DISPONIBILIDADE */

        const filteredCards =
            cardsArray.filter((card) => {

                if (currentAvailability === "available") {

                    return !card.classList.contains("sold");

                }

                if (currentAvailability === "sold") {

                    return card.classList.contains("sold");

                }

                return true;

            });


        /* ORDENAR */

        filteredCards.sort((a, b) => {

            if (currentSort === "price-low") {

                return getPrice(a) - getPrice(b);

            }

            if (currentSort === "price-high") {

                return getPrice(b) - getPrice(a);

            }

            return (
                Number(a.dataset.originalIndex) -
                Number(b.dataset.originalIndex)
            );

        });


        /* ESCONDER TODOS */

        cardsArray.forEach((card) => {

            card.classList.add("hidden");

        });


        /* MOSTRAR E REORDENAR */

        filteredCards.forEach((card) => {

            card.classList.remove("hidden");

            productGrid.appendChild(card);

        });

    }


    /* =========================
       BOTÕES DE DISPONIBILIDADE
    ========================= */

    availabilityButtons.forEach((button) => {

        button.addEventListener("click", () => {

            availabilityButtons.forEach((btn) => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            currentAvailability =
                button.dataset.availability;

            applyFilters();

        });

    });


    /* =========================
       BOTÕES DE ORDENAÇÃO
    ========================= */

    sortButtons.forEach((button) => {

        button.addEventListener("click", () => {

            sortButtons.forEach((btn) => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            currentSort =
                button.dataset.sort;

            applyFilters();

        });

    });


    /* =========================
       FECHAR FILTRO AO CLICAR FORA
    ========================= */

    document.addEventListener("click", (event) => {

        if (
            filterMenu &&
            filterToggle &&
            !filterMenu.contains(event.target) &&
            !filterToggle.contains(event.target)
        ) {

            filterMenu.classList.remove("show");

            filterToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});