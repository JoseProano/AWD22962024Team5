document.addEventListener("DOMContentLoaded", async () => {
    const productsContainer = document.getElementById("products-container");
    const searchBar = document.getElementById("search-bar");
    const priceRange = document.getElementById("price-range");
    const priceValue = document.getElementById("price-value");
    const modal = document.getElementById("product-modal");
    const modalContent = document.querySelector(".modal-details");

    let products = [];

    // products server
    const fetchProducts = async () => {
        try {
            const response = await fetch("/productos");
            if (!response.ok) throw new Error("Error al cargar productos");
            products = await response.json();
            console.log("Productos obtenidos:", products);
            renderProducts(products);
            updatePriceRangeDisplay();
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    const renderProducts = (filteredProducts) => {
        console.log("Productos a renderizar:", filteredProducts);
        productsContainer.innerHTML = "";
        filteredProducts.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";
            productCard.innerHTML = `
                <img src="${product.producto_imagen || 'images/placeholder.jpg'}" alt="${product.producto_nombre}">
                <div class="product-details">
                    <h4 class="product-name">${product.producto_nombre}</h4>
                    <p class="product-price">$${parseFloat(product.producto_precio).toFixed(2)}</p>
                    <button class="btn-more" data-id="${product.producto_id}">Más Información</button>
                    <button class="btn-cart" data-id="${product.producto_id}">Añadir al Carrito</button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });

        addEventListenersToButtons();
    };

    const addEventListenersToButtons = () => {
        document.querySelectorAll(".btn-more").forEach((button) => {
            button.addEventListener("click", (e) => {
                const productId = e.target.dataset.id;
                openModal(productId);
            });
        });

        document.querySelectorAll(".btn-cart").forEach((button) => {
            button.addEventListener("click", (e) => {
                const productId = e.target.dataset.id;
                const selectedProduct = products.find(
                    (product) => product.producto_id === parseInt(productId)
                );
                addToCart(selectedProduct);
            });
        });
    };

    const openModal = (productId) => {
        const product = products.find((p) => p.producto_id === parseInt(productId));
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${product.producto_nombre}</h2>
                <span id="close-modal" class="close">&times;</span>
            </div>
            <div class="modal-body">
                <img src="${product.producto_imagen || "images/placeholder.jpg"}" alt="${product.producto_nombre}" class="modal-image">
                <div class="modal-details">
                    <p><strong>Descripción:</strong> ${product.producto_descripcion || "Sin descripción"}</p>
                    <p><strong>Precio:</strong> $${parseFloat(product.producto_precio).toFixed(2)}</p>
                    <p><strong>Stock Disponible:</strong> ${product.producto_stock}</p>
                    <button class="btn-cart" data-id="${product.producto_id}">Añadir al Carrito</button>
                </div>
            </div>
        `;
        modal.style.display = "flex";

        document.getElementById("close-modal").addEventListener("click", () => {
            modal.style.display = "none";
        });

        modalContent.querySelector(".btn-cart").addEventListener("click", (e) => {
            const productId = e.target.dataset.id;
            const selectedProduct = products.find(
                (product) => product.producto_id === parseInt(productId)
            );
            addToCart(selectedProduct);
        });
    };

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item.id === product.producto_id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: product.producto_id,
                name: product.producto_nombre,
                price: parseFloat(product.producto_precio),
                image: product.producto_imagen || "images/placeholder.jpg",
                quantity: 1,
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showCartModal(`¡Se añadió "${product.producto_nombre}" al carrito!`);
    };

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

    const filterProducts = () => {
        const searchText = searchBar.value.toLowerCase();
        const maxPrice = parseFloat(priceRange.value);

        const filtered = products.filter((product) => {
            const matchesSearch =
                product.producto_nombre.toLowerCase().includes(searchText) ||
                (product.producto_descripcion || "").toLowerCase().includes(searchText);
            const matchesPrice = parseFloat(product.producto_precio) <= maxPrice;
            const matchesStock = product.producto_stock > 0;
            const matchesEstado = product.producto_estado === "activo";

            return matchesSearch && matchesPrice && matchesStock && matchesEstado;
        });

        renderProducts(filtered);
    };

    const updatePriceRangeDisplay = () => {
        priceValue.textContent = `$${parseFloat(priceRange.value).toFixed(2)}`;
    };

    searchBar.addEventListener("input", filterProducts);
    priceRange.addEventListener("input", () => {
        filterProducts();
        updatePriceRangeDisplay();
    });

    await fetchProducts();
});
