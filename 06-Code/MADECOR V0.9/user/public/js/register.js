document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get("nombre");
    const apellido = urlParams.get("apellido");
    const email = urlParams.get("email");

    if (nombre) document.querySelector("[name='usuario_nombre']").value = nombre;
    if (apellido) document.querySelector("[name='usuario_apellido']").value = apellido;
    if (email) document.querySelector("[name='usuario_email']").value = email;
});

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    if (!user.usuario_cedula || !user.usuario_nombre || !user.usuario_apellido || !user.usuario_edad ||
        !user.usuario_genero || !user.usuario_email || !user.usuario_telefono || !user.usuario_usuario || !user.usuario_contrasena) {
        showModal("Por favor, completa todos los campos obligatorios.", "error");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data.user));
            showModal("Usuario registrado exitosamente.", "success");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 3000);
        } else {
            showModal("Error al registrar el usuario.", "error");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        showModal("Error de conexión al servidor.", "error");
    }
});

function showModal(message, type = "success") {
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");

    modalMessage.textContent = message;
    modal.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545";
    modal.classList.remove("hidden");
    modal.classList.add("visible");

    setTimeout(() => {
        modal.classList.remove("visible");
        modal.classList.add("hidden");
    }, 3000);
}
