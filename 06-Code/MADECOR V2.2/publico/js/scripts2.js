const carouselContainer = document.querySelector('.carousel-container');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function slideCarousel() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
}

function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

setInterval(slideCarousel, 3000);

window.initMap = function() {
    const madecorLocation = { lat: -0.176125, lng: -78.481385 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: madecorLocation,
    });
    new google.maps.Marker({
        position: madecorLocation,
        map: map,
        title: "Madecor Didáctico",
    });
};
