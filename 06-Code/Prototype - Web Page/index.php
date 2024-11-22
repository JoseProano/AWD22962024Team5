<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADECOR - Educational Materials and Toys</title>
    <link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>

<body>
	 <?php include 'php/generateMenu.php'; ?>
	<header class="main-header">
		<div class="header-content">
			<div class="logo-container">
				<a href="index.php"><img src="img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="MADECOR Team" class="team-photo" ></a>
				<div class="company-info">
					<h1>MADECOR</h1>
					<p class="slogan">Educational Materials, Children's Furniture, and Toys</p>
				</div>
			</div>
		</div>
	</header>

    <div class="top-menu">
        <?php generateMenu('txt/menu.txt'); ?>
    </div>

<div class="container">
        <div class="side-menu">
            <h3>Navigation</h3>
            <?php generateMenu('txt/side.txt'); ?>
        </div>

        <main class="content">
            <section id="home">
                <h2>Welcome to MADECOR</h2>
				<img src="img/IMG_9549.jpg" alt="Children Playing with Educational Toys" style="width: 90%; height: auto; border-radius: 10px; margin-bottom: 20px;">
                <p>
                    We specialize in the design and manufacturing of educational materials and children's furniture. 
                    Our mission is to provide children with the tools to learn, grow, and play in a safe and sustainable environment.
                </p>
			</section>
			
                <h3>Featured Products</h3>
				<div class="products-container">
					<div class="product-item">
						<img src="img/avinoes.jpg" alt="product 1" class="product-image">
						<div class="product-description">
							<h3>$ 12.00 </h3>
						</div>
					</div>

					<div class="product-item">
						<img src="img/4.jpg" alt="product 2" class="product-image">
						<div class="product-description">
							<h3>$ 20.00</h3>						
						</div>
					</div>

					<div class="product-item">
						<img src="img/maxresdefault.jpg" alt="product 3" class="product-image">
						<div class="product-description">
							<h3>$ 25.00</h3>
						</div>
					</div>
				</div>

                <p>Learn more about our products designed to foster creativity and learning for children.</p>
            
			
			<hr>
            <section id="about">
				<h2>Who We Are?</h2>
				<div class="about-container">
					<div class="about-text">
						<p>At MADECOR, we combine creativity and functionality to design furniture and toys that inspire. 
							We work with sustainably sourced wood to offer unique and durable products.</p>
						<p>Our vision is to create safe and colorful spaces that encourage creativity and development in children. 
							Each piece is designed with comfort and functionality in mind, from educational materials to custom furniture.</p>
						<p>With over 10 years of experience, we have worked with schools, learning centers, and families to build customized solutions, always committed to quality and sustainability.</p>
					</div>
					<img src="img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="About MADECOR" class="featured-image">
				</div>
			</section>

			<hr>
            <section id="products">
				<h2>Our Products</h2>
				<div class="products-container">
					<div class="product-item">
						<img src="img/2_11-chair-roof-collection-04-627x376.jpg" alt="Children's Furniture" class="product-image">
						<div class="product-description">
							<h3>Children's Furniture</h3>
							<p>Desks, chairs, and shelves designed to provide comfort and functionality for children.</p>
						</div>
					</div>

					<div class="product-item">
						<img src="img/proyecto2.jpg" alt="Educational Materials" class="product-image">
						<div class="product-description">
							<h3>Educational Materials</h3>
							<p>Educational games and puzzles that promote learning and cognitive development for children.</p>
						</div>
					</div>

					<div class="product-item">
						<img src="img/Juguetes madera.jpg" alt="Toys" class="product-image">
						<div class="product-description">
							<h3>Toys</h3>
							<p>Safe and fun wooden toys that support physical and mental development for children.</p>
						</div>
					</div>
				</div>
			</section>

			<hr>
            <section id="projects">
				<h2>Recent Projects</h2>
				<div class="projects-container">
					<div class="project-item">
						<img src="img/P1070811.jpg" alt="Project 1" class="project-image">
						<div class="project-description">
							<h3>ABC School Project</h3>
							<p>Creation of an interactive playroom to promote creativity in children.</p>
						</div>
					</div>

					<div class="project-item">
						<img src="img/diseno-de-espacios-educativos.jpg" alt="Project 2" class="project-image">
						<div class="project-description">
							<h3>Educational Space Project</h3>
							<p>Design of custom furniture for an educational center.</p>
						</div>
					</div>

					<div class="project-item">
						<img src="img/shutterstock_657449827-1.jpg" alt="Project 3" class="project-image">
						<div class="project-description">
							<h3>Family Project</h3>
							<p>Design of a play area for a family home.</p>
						</div>
					</div>
				</div>
			</section>
			
			<hr>
			<section id="contact">
				<h2>Contact</h2>

				<p>Have a project in mind? Get in touch with us!</p>
				<p class="social-links">
					<a href="mailto:neitankaiber@gmail.com"><i class="fas fa-envelope"></i></a> contacto@madecor.com
				</p>
				<p>Phone: +593 123 456 789</p>
				<div class="social-links">
					<a href="https://www.facebook.com/darwin.panchez/" target="_blank"><i class="fab fa-facebook"></i></a>
					<a href="https://www.instagram.com/epciclon/" target="_blank"><i class="fab fa-instagram"></i></a>
					<a href="https://x.com/NexxuzHD?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank"><i class="fab fa-twitter"></i></a>
				</div>
			</section>

        </main>
    </div>

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
</body>

</html>
