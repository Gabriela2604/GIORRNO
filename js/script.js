const cards = document.querySelectorAll(".product-card");

const modal = document.getElementById("productModal");
const closeModal = document.getElementById("modalClose");
const overlay = document.querySelector(".modal-overlay");

const modalImage = document.getElementById("modalProductImage");
const modalName = document.getElementById("modalProductName");
const modalRef = document.getElementById("modalProductRef");
const modalPrice = document.getElementById("modalProductPrice");

const interestButton = document.getElementById("interestButton");

let selectedProduct = {};

/* =========================
ABRIR MODAL
========================= */

cards.forEach((card) => {


card.addEventListener("click", () => {

    selectedProduct = {
        name: card.dataset.name,
        ref: card.dataset.ref,
        price: card.dataset.price,
        image: card.dataset.image
    };


    modalImage.src = selectedProduct.image;

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

/* =========================
FECHAR MODAL
========================= */

function fecharModal() {


modal.classList.remove("active");

document.body.style.overflow = "";

}

closeModal.addEventListener("click", fecharModal);

overlay.addEventListener("click", fecharModal);

/* FECHAR COM ESC */

document.addEventListener("keydown", (event) => {


if (
    event.key === "Escape" &&
    modal.classList.contains("active")
) {

    fecharModal();

}

});

/* =========================
   WHATSAPP
========================= */

interestButton.addEventListener("click", () => {

    const numeroWhatsApp = "5541991945815";

    // Gera o link completo da imagem do produto
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
