document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const ivaElement = document.getElementById("iva");
    const totalElement = document.getElementById("total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const renderCart = () => {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Precio: $${item.price}</p>
                    <p>Cantidad: ${item.quantity}</p>
                </div>
                <div class="actions">
                    <button class="btn-increase" data-index="${index}">+</button>
                    <button class="btn-decrease" data-index="${index}">-</button>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);

            subtotal += item.price * item.quantity;
        });

        const iva = subtotal * 0.15;
        const total = subtotal + iva;

        subtotalElement.textContent = subtotal.toFixed(2);
        ivaElement.textContent = iva.toFixed(2);
        totalElement.textContent = total.toFixed(2);
    };

    const updateCart = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }

        if (e.target.classList.contains("btn-increase")) {
            const index = e.target.dataset.index;
            cart[index].quantity += 1;
            updateCart();
        }

        if (e.target.classList.contains("btn-decrease")) {
            const index = e.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                updateCart();
            }
        }
    });

    renderCart();

    document.getElementById("checkout-button").addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("user")); 
        if (!user) {
            showCartModal("Para proceder con la compra, primero debes iniciar sesión.");
            return;
        }

        if (cart.length === 0) {
            showCartModal("El carrito está vacío.");
        } else {
            window.location.href = "/checkout.html";
        }
    });

    const showCartModal = (message) => {
        const cartModal = document.getElementById("cart-modal");
        const cartModalMessage = document.getElementById("cart-modal-message");

        cartModalMessage.textContent = message;
        cartModal.classList.remove("hidden");
        cartModal.classList.add("visible");

        setTimeout(() => {
            cartModal.classList.remove("visible");
            cartModal.classList.add("hidden");
        }, 3000);
    };

    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", () => {
        window.history.back();
    });
});
