const cart = [];
const cartItemsList = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const clearBtn = document.getElementById("clear-cart");

function updateCart() {
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - Rp.${item.price.toLocaleString()} x ${item.qty}`;
        cartItemsList.appendChild(li);
        total += item.price * item.qty;
    });

    totalPriceEl.textContent = `Total: Rp. ${total.toLocaleString()}`;
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCart();
}

document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const productCard = btn.closest(".product-card");
        const name = productCard.querySelector("h3")?.textContent ||
                     productCard.querySelector("figcaption")?.textContent;
        const priceText = productCard.querySelector(".price")?.textContent || "Rp.0";
        const price = parseInt(priceText.replace("Rp.", "").replace(".", "").trim());
        addToCart(name, price);
    });
});

clearBtn.addEventListener("click", () => {
    cart.length = 0;
    updateCart();
});
