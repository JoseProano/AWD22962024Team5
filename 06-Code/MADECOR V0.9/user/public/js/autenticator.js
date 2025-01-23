document.addEventListener("DOMContentLoaded", () => {
    const menuButtons = document.getElementById("menu-buttons");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        menuButtons.innerHTML = `
            <span class="welcome-message">Bienvenido!</span>
            <button class="btn-cart" onclick="window.location.href='productCart.html'">
                <span class="material-icons">shopping_cart</span>
            </button>
            <button class="btn-logout" onclick="logout()">
                <span class="material-icons">logout</span> LOGOUT
            </button>
        `;
    }
});

function showLogoutModal(message) {
    const logoutModal = document.getElementById("logout-modal");
    const logoutModalMessage = document.getElementById("logout-modal-message");

    logoutModalMessage.textContent = message;

    logoutModal.classList.remove("hidden");
    logoutModal.classList.add("visible");

    setTimeout(() => {
        logoutModal.classList.remove("visible");
        logoutModal.classList.add("hidden");

        window.location.href = "index.html";
    }, 2500);
}

function logout() {
    localStorage.removeItem("user"); 
    showLogoutModal("Has cerrado sesión exitosamente.");
}
