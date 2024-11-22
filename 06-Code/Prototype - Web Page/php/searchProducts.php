<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Busqueda de Productos</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/styleSearch.css">
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
        <?php generateMenu('../txt/sideSearch.txt'); ?>
    </div>

    <div class="page-container">
        <div id="search-container">
        <h1 id="search-description">Search for products, such as toys, building blocks, and more...</> <br><br><br>
            <input type="text" id="search-input" placeholder="Search Products..." oninput="searchProducts()">
            <div id="results"></div>
        </div>
    </div>



    <script>
        const products = [
            {
                name: "Noah's Ark Puzzle",
                price: "$9.85",
                description: "Made of good quality wood and direct UV printing. Nontoxic. Recommended age from 1 year.",
                image: "../img/products/puzzle1.png"
            },
            {
                name: "Wild Animals Puzzle",
                price: "$6.00",
                description: "30x40cm. Made of good quality wood and direct UV printing. Nontoxic. Recommended age from 1 year.",
                image: "../img/products/puzzle2.png"
            },
            {
                name: "Construction Solids 100 pcs",
                price: "$25.00",
                description: "100-piece wooden construction set with geometric shapes. Non-toxic. Recommended age from 1 year.",
                image: "../img/products/blocks1.png"
            },
            {
                name: "Car | Construction Solids",
                price: "$30.00",
                description: "38-piece wooden construction set with geometric shapes and a car with wheels. Non-toxic. Recommended age from 1 year.",
                image: "../img/products/blocks2.png"
            },
            {
                name: "Foam Building Blocks",
                price: "$75.00",
                description: "Themed blocks for castles. Recommended age from 1 year.",
                image: "../img/products/blocks3.png"
            },
            {
                name: "Giant Abacus",
                price: "$45.00",
                description: "Abacus educational for young children.",
                image: "../img/products/edutoy1.png"
            },
            {
                name: "Toy Base 10",
                price: "$17.00",
                description: "Advanced block set to learn maths.",
                image: "../img/products/edutoys2.png"
            },
            {
                name: "3 Way Circuit",
                price: "$12.00",
                description: "Wooden maze with beads of different geometric shapes.",
                image: "../img/products/edutoy3.png"
            },
            {
                name: "Geoboard",
                price: "$21.00",
                description: "A teaching resource that helps develop geometric concepts.",
                image: "../img/products/edutoy4.png"
            }
        ];

        function searchProducts() {
            const query = document.getElementById('search-input').value.toLowerCase();
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';  // Clear previous results

            if (query === '') {
                resultsContainer.style.display = 'none';
                return;
            }

            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(query) || 
                product.description.toLowerCase().includes(query)
            );

            if (filteredProducts.length > 0) {
                resultsContainer.style.display = 'block';
                filteredProducts.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('result-item');

                    productElement.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="result-img">
                        <div class="result-info">
                            <h3>${product.name}</h3>
                            <p>${product.price}</p>
                            <p>${product.description}</p>
                        </div>
                    `;
                    resultsContainer.appendChild(productElement);
                });
            } else {
                resultsContainer.style.display = 'none';
            }
        }
    </script>


</body>
</html>
