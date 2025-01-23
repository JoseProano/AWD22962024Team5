function showLoginModal(message) {
    const loginModal = document.getElementById("login-modal");
    const loginModalMessage = document.getElementById("login-modal-message");

    loginModalMessage.textContent = message;
    loginModal.classList.remove("hidden");
    loginModal.classList.add("visible");

    setTimeout(() => {
        loginModal.classList.remove("visible");
        loginModal.classList.add("hidden");
    }, 2000);
}

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (!response.ok) throw new Error("Usuario o contraseña incorrectos.");

        const data = await response.json();

        localStorage.setItem("user", JSON.stringify({
            name: data.user.usuario_nombre,
            email: data.user.usuario_email,
        }));

        showLoginModal(`Bienvenido, ${data.user.usuario_nombre}.`);

        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } catch (error) {
        console.error("Error de conexión:", error);

        showLoginModal("Usuario o contraseña incorrectos.");
    }
});

async function handleGoogleLogin(response) {
    const userToken = response.credential;
    try {
        const res = await fetch("http://localhost:3000/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: userToken }),
        });

        if (!res.ok) throw new Error("Error al procesar el inicio de sesión con Google");

        const data = await res.json();

        if (data.isNewUser) {
            const url = `register.html?nombre=${encodeURIComponent(data.usuario_nombre)}&apellido=${encodeURIComponent(data.usuario_apellido)}&email=${encodeURIComponent(data.usuario_email)}`;
            showLoginModal("Completa tu registro para continuar.");
            setTimeout(() => {
                window.location.href = url;
            }, 3000);
        } else {
            localStorage.setItem("user", JSON.stringify({
                name: data.name || data.usuario_nombre,
                email: data.email || data.usuario_email,
            }));

            showLoginModal(`Bienvenido, ${data.name || data.usuario_nombre}.`);
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
    } catch (error) {
        console.error("Error durante el inicio de sesión con Google:", error);
        showLoginModal("Ocurrió un problema al iniciar sesión con Google.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const menuButtons = document.getElementById("menu-buttons");
    if (user) {
        menuButtons.innerHTML = `
            <button class="btn-cart" onclick="window.location.href='productCart.html'">
                <span class="material-icons">shopping_cart</span>
            </button>
            <button class="btn-logout" onclick="logout()">Logout</button>
        `;
    } else {
        menuButtons.innerHTML = `
            <button class="btn-login" onclick="window.location.href='login.html'">
                <span class="material-icons">login</span> LOGIN
            </button>
            <button class="btn-register" onclick="window.location.href='register.html'">
                <span class="material-icons">person_add</span> REGISTER
            </button>
            <button class="btn-cart" onclick="window.location.href='productCart.html'">
                <span class="material-icons">shopping_cart</span>
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
    }, 2000);
}

function logout() {
    localStorage.removeItem("user"); 

    showLogoutModal("Has cerrado sesión exitosamente.");
}
