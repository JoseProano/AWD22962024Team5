    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            const event = new Event('headerLoaded');
            document.dispatchEvent(event);
        });

    fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;

            const script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCdmG7Gq1NWeKFF-sKLcrcemIGGOTiCa58&callback=initMap';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        });
