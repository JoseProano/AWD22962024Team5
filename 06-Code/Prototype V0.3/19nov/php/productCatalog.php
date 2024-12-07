<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documento</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/styleCatalog.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
<?php include 'generateMenu.php'; ?>
<header class="main-header">
    <div class="logo-container">
        <a href="../index.php"><img src="../img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="Logo MADECOR" class="team-photo"></a>
        <div class="company-info">
            <h1>MADECOR</h1>
            <p class="slogan">Materiales Educativos, Mobiliario Infantil y Juguetes</p>
        </div>
    </div>
</header>

<div class="top-menu">
    <?php generateMenu('../txt/menu.txt'); ?>
</div>

<div class="container">
    <div class="side-menu">
        <h3>Navegación</h3>
        <?php generateMenu('../txt/sideProducts.txt'); ?>
    </div>

    <main>

    <section id="puzzles">
        <h2>Puzzles</h2>
        <div class="catalog">
            <div class="product">
                <img src="../img/products/puzzle1.png" alt="Puzzle 1">
                <h3>Puzzle Arca de Noé</h3>
                <p>$9.85</p>
                <button onclick="openModal('Puzzle Arca de Noé - Hecho de madera de buena calidad y con impresión UV directa. No tóxico. Edad recomendada desde 1 año.')">Más Información</button>
            </div>
            <div class="product">
                <img src="../img/products/puzzle2.png" alt="Puzzle 2">
                <h3>Puzzle Animales Salvajes</h3>
                <p>$6.00</p>
                <button onclick="openModal('Puzzle Animales Salvajes - 30x40cm - Hecho de madera de buena calidad y con impresión UV directa. No tóxico. Edad recomendada desde 1 año.')">Más Información</button>
            </div>
        </div>
    </section>

    <section id="building-blocks">
        <h2>Bloques de Construcción</h2>
        <div class="catalog">
            <div class="product">
                <img src="../img/products/blocks1.png" alt="Bloques 1">
                <h3>Construcción Sólida 100 piezas</h3>
                <p>$25.00</p>
                <button onclick="openModal('100 piezas Medidas: 36 cm de largo, 24 cm de ancho, 6 cm de altura. Set de construcción de madera con piezas geométricas. Los niños podrán expresar sus habilidades manipulando las piezas geométricas muy coloridas. Perfectas para apilar por forma, color y construir casas, puentes, escaleras o torres. Hecho de madera. No tóxico. Edad recomendada: desde 1 año.')">Más Información</button>
            </div>
            <div class="product">
                <img src="../img/products/blocks2.png" alt="Bloques 2">
                <h3>Carro | Construcción Sólida</h3>
                <p>$30.00</p>
                <button onclick="openModal('Medidas: Ancho: 20 cm, Altura: 15 cm, Profundidad: 20 cm. Set de construcción de madera con 38 piezas geométricas y un carro con ruedas. Los niños podrán expresar sus habilidades manipulando las piezas geométricas muy coloridas. Perfectas para apilar por forma, color y construir casas, puentes, escaleras o torres. Hecho de madera. No tóxico. Edad recomendada: desde 1 año.')">Más Información</button>
            </div>
            <div class="product">
                <img src="../img/products/blocks3.png" alt="Bloques 3">
                <h3>Bloques de Espuma</h3>
                <p>$75.00</p>
                <button onclick="openModal('Bloques temáticos para castillos. Edad recomendada desde 1 año.')">Más Información</button>
            </div>
            <div class="product">
                <img src="../img/products/blocks4.png" alt="Bloques 4">
                <h3>Cubos Graduales</h3>
                <p>$40.00</p>
                <button onclick="openModal('Bloques de construcción con engranajes móviles.')">Más Información</button>
            </div>
        </div>
    </section>

    <section id="educational-toys">
        <h2>Juguetes Educativos</h2>
        <div class="catalog">
            <div class="product">
                <img src="../img/products/edutoy1.png" alt="Juguete 1">
                <h3>Ábaco Gigante</h3>
                <p>$45.00</p>
                <button onclick="openModal('Ábaco educativo para niños pequeños.')">Más Información</button>
            </div>
            <div class="product">
                <img src="../img/products/edutoys2.png" alt="Juguete 2">
                <h3>Base 10 de Juguete</h3>
                <p>$17.00</p>
                <button onclick="openModal('Set de bloques avanzados para aprender matemáticas.')">Más Información</button>
            </div>
            <div class="product">
                <img src="../img/products/edutoy3.png" alt="Juguete 3">
                <h3>Circuito 3 Vías</h3>
                <p>$12.00</p>
                <button onclick="openModal('Laberinto de madera con cuentas de diferentes formas geométricas que pasan por 3 circuitos metálicos.')">Más Información</button>
            </div>
            <div class="product">
                <img src="../img/products/edutoy4.png" alt="Juguete 4">
                <h3>Geoboard</h3>
                <p>$21.00</p>
                <button onclick="openModal('El geoboard es un recurso de enseñanza que permite el desarrollo de conceptos geométricos, ayudando a comprender una serie de conceptos abstractos que generalmente causan errores en los niños.')">Más Información</button>
            </div>
        </div>
    </section>

    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <p id="modal-description"></p>
        </div>
    </div>
</main>

<footer class="footer">
        <div class="footer-content">
            <p>© 2025 MADECOR | Todos los derechos reservados</p>
            <p><a href="#">Términos y Condiciones</a> | <a href="#">Política de Privacidad</a></p>
            <div class="social-links-footer">
                <a href="https://www.facebook.com/darwin.panchez/" target="_blank"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/epciclon/" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="https://x.com/NexxuzHD?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank"><i class="fab fa-twitter"></i></a>
            </div>
        </div>
    </footer>

<script>
    function openModal(description) {
        const modal = document.getElementById('modal');
        const modalDescription = document.getElementById('modal-description');
        modalDescription.textContent = description;
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
</script>

</body>
</html>
