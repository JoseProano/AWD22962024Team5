const cartSummary = document.getElementById("cart-summary");
const cartData = JSON.parse(localStorage.getItem("cart")) || [];
const subtotal = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
const iva = subtotal * 0.15;
const total = subtotal + iva;

if (cartData.length > 0) {
    cartSummary.innerHTML = `
        <h2>Resumen del Pedido</h2>
        ${cartData.map(item => `
            <p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
        `).join('')}
        <hr>
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
        <p><strong>IVA (15%):</strong> $${iva.toFixed(2)}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
    `;
} else {
    cartSummary.innerHTML = "<p>No hay productos en el carrito.</p>";
}

let map, autocomplete, geocoder, marker;
const initMap = () => {
    const input = document.getElementById("address");
    autocomplete = new google.maps.places.Autocomplete(input);
    geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: map.getCenter(),
    });

    google.maps.event.addListener(marker, "dragend", () => {
        const position = marker.getPosition();
        geocoder.geocode({ location: position }, (results, status) => {
            if (status === "OK" && results[0]) {
                input.value = results[0].formatted_address;
            } else {
                console.error("No se pudo obtener la dirección:", status);
            }
        });
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                map.setCenter(userLocation);
                map.setZoom(15);
                marker.setPosition(userLocation);

                geocoder.geocode({ location: userLocation }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        input.value = results[0].formatted_address;
                    } else {
                        console.error("No se pudo obtener la dirección:", status);
                    }
                });
            },
            (error) => {
                console.error("Error al detectar la ubicación:", error);
                alert("No se pudo acceder a tu ubicación. Por favor, ingrésala manualmente.");
            }
        );
    } else {
        alert("Tu navegador no soporta la geolocalización.");
    }

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            alert("Por favor selecciona una ubicación válida.");
            return;
        }

        map.setCenter(place.geometry.location);
        map.setZoom(15);
        marker.setPosition(place.geometry.location);

        input.value = place.formatted_address;
    });
};

google.maps.event.addDomListener(window, "load", initMap);


const checkoutForm = document.getElementById("checkout-form");
const generatePdfButton = document.getElementById("generate-pdf");

const validateForm = () => {
    const formData = new FormData(checkoutForm);
    return [...formData.values()].every(value => value.trim() !== "");
};

checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) {
        alert("Por favor, completa todos los campos del formulario.");
        return;
    }

    const formData = new FormData(checkoutForm);
    const userDetails = Object.fromEntries(formData.entries());
    console.log("Detalles del usuario:", userDetails);
    console.log("Detalles del carrito:", cartData);

    alert("¡Pedido enviado con éxito!");

    generatePdfButton.disabled = false; 
    generatePdfButton.classList.add("enabled");

    localStorage.removeItem("cart"); 
});

function goBack() {
    window.history.back();
}
