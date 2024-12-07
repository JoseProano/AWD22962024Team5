<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/styleCatalog.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
<?php include 'generateMenu.php'; ?>
<header class="main-header">
    <div class="logo-container">
        <a href="../index.php"><img src="../img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="MADECOR Logo" class="team-photo"></a>
        <div class="company-info">
            <h1>MADECOR</h1>
            <p class="slogan">Educational Materials, Children's Furniture, and Toys</p>
        </div>
    </div>
</header>

<div class="top-menu">
    <?php generateMenu('../txt/menu.txt'); ?>
</div>

<div class="container">
    <div class="side-menu">
        <h3>Navigation</h3>
        <?php generateMenu('../txt/sideProducts.txt'); ?>
    </div>

    <main>

    <section id="puzzles">
        <h2>Puzzles</h2>
        <div class="catalog">
            <div class="product">
                <img src="../img/products/puzzle1.png" alt="Puzzle 1">
                <h3>Noah's Ark Puzzle</h3>
                <p>$9.85</p>
                <button onclick="openModal('Noahs Ark puzzle - They are made of good quality wood and direct UV printing It is nontoxic Recommended age from 1 year.')">More Info</button>
            </div>
            <div class="product">
                <img src="../img/products/puzzle2.png" alt="Puzzle 2">
                <h3>Wild Animals Puzzle</h3>
                <p>$6.00</p>
                <button onclick="openModal('Wild Animals Puzzle - 30x40cm - They are made of good quality wood and direct UV printing It is nontoxic Recommended age from 1 year.')">More Info</button>
            </div>
        </div>
    </section>

    <section id="building-blocks">
        <h2>Building Blocks</h2>
        <div class="catalog">
            <div class="product">
                <img src="../img/products/blocks1.png" alt="Blocks 1">
                <h3>Construction Solids 100 pcs</h3>
                <p>$25.00</p>
                <button onclick="openModal('100 pcs Length: 36 cm Width: 24 cm Height: 6cm 100-piece wooden construction set with geometric shapes. Children will be able to express their skills by manipulating the different, very colourful geometric pieces. They are perfect for stacking by shape, colour and building small houses, bridges, stairs or towers. They are made of wood and have geometric pieces in various colours. It is non-toxic. Recommended age: from 1 year old.')">More Info</button>
            </div>
            <div class="product">
                <img src="../img/products/blocks2.png" alt="Blocks 2">
                <h3>Car | Construction Solids</h3>
                <p>$30.00</p>
                <button onclick="openModal('Measurements: Width: 20 cm Height: 15 cm Depth: 20 cm - 38-piece wooden construction set with geometric shapes and a car with wheels. Children will be able to express their skills by manipulating the different, very colourful geometric pieces. They are perfect for stacking by shape, colour and building small houses, bridges, stairs or towers. They are made of wood and have geometric pieces in various colours. It is non-toxic. Recommended age: from 1 year old.')">More Info</button>
            </div>
            <div class="product">
                <img src="../img/products/blocks3.png" alt="Blocks 3">
                <h3>Foam Building Blocks</h3>
                <p>$75.00</p>
                <button onclick="openModal('Themed blocks for castles - Recommended age from 1 year.')">More Info</button>
            </div>
            <div class="product">
                <img src="../img/products/blocks4.png" alt="Blocks 4">
                <h3>Gradual Cubes</h3>
                <p>$40.00</p>
                <button onclick="openModal('Building blocks with moving gears.')">More Info</button>
            </div>
        </div>
    </section>

    <section id="educational-toys">
        <h2>Educational Toys</h2>
        <div class="catalog">
            <div class="product">
                <img src="../img/products/edutoy1.png" alt="Blocks 1">
                <h3>Giant Abacus</h3>
                <p>$45.00</p>
                <button onclick="openModal('Abacus educational for young children.')">More Info</button>
            </div>
            <div class="product">
                <img src="../img/products/edutoys2.png" alt="Blocks 2">
                <h3>Toy Base 10</h3>
                <p>$17.00</p>
                <button onclick="openModal('Advanced block set to learn maths.')">More Info</button>
            </div>
            <div class="product">
                <img src="../img/products/edutoy3.png" alt="Blocks 3">
                <h3>3 Way Circuit</h3>
                <p>$12.00</p>
                <button onclick="openModal('Wooden maze with beads of different geometric shapes that pass through 3 metal circuits lined from one end of the route to the other.')">More Info</button>
            </div>
            <div class="product">
                <img src="../img/products/edutoy4.png" alt="Blocks 4">
                <h3>Geoboard</h3>
                <p>$21.00</p>
                <button onclick="openModal('The geoboard is a teaching resource that allows the development of geometric concepts, which helps to understand a whole series of abstract concepts that generally cause errors in children.')">More Info</button>
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
            <p>© 2025 MADECOR | All rights reserved</p>
            <p><a href="#">Terms and Conditions</a> | <a href="#">Privacy Policy</a></p>
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