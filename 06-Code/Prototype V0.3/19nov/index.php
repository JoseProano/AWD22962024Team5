<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADECOR - Materiales Educativos y Juguetes</title>
    <link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>

<body>
	 <?php include 'php/generateMenu.php'; ?>
	<header class="main-header">
		<div class="header-content">
			<div class="logo-container">
				<a href="index.php"><img src="img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="Equipo MADECOR" class="team-photo" ></a>
				<div class="company-info">
					<h1>MADECOR</h1>
					<p class="slogan">Materiales Educativos, Mobiliario Infantil y Juguetes</p>
				</div>
			</div>
		</div>
	</header>

    <div class="top-menu">
        <?php generateMenu('txt/menu.txt'); ?>
    </div>

<div class="container">
        <div class="side-menu">
            <h3>Navegación</h3>
            <?php generateMenu('txt/side.txt'); ?>
        </div>

        <main class="content">
            <section id="home">
                <h2>Bienvenido a MADECOR</h2>
				<img src="img/IMG_9549.jpg" alt="Niños jugando con juguetes educativos" style="width: 90%; height: auto; border-radius: 10px; margin-bottom: 20px;">
                <p>
                    Nos especializamos en el diseño y fabricación de materiales educativos y mobiliario infantil. 
                    Nuestra misión es proporcionar a los niños las herramientas para aprender, crecer y jugar en un entorno seguro y sostenible.
                </p>
			</section>
			
                <h3>Productos Destacados</h3>
				<div class="products-container">
					<div class="product-item">
						<img src="img/avinoes.jpg" alt="producto 1" class="product-image">
						<div class="product-description">
							<h3>$ 12.00 </h3>
						</div>
					</div>

					<div class="product-item">
						<img src="img/4.jpg" alt="producto 2" class="product-image">
						<div class="product-description">
							<h3>$ 20.00</h3>						
						</div>
					</div>

					<div class="product-item">
						<img src="img/maxresdefault.jpg" alt="producto 3" class="product-image">
						<div class="product-description">
							<h3>$ 25.00</h3>
						</div>
					</div>
				</div>

                <p>Conoce más sobre nuestros productos diseñados para fomentar la creatividad y el aprendizaje en los niños.</p>
            
			
			<hr>
            <section id="about">
				<h2>¿Quiénes Somos?</h2>
				<div class="about-container">
					<div class="about-text">
						<p>En MADECOR, combinamos creatividad y funcionalidad para diseñar muebles y juguetes que inspiran. 
							Trabajamos con madera de origen sostenible para ofrecer productos únicos y duraderos.</p>
						<p>Nuestra visión es crear espacios seguros y coloridos que fomenten la creatividad y el desarrollo en los niños. 
							Cada pieza está diseñada pensando en la comodidad y la funcionalidad, desde materiales educativos hasta muebles personalizados.</p>
						<p>Con más de 10 años de experiencia, hemos trabajado con escuelas, centros de aprendizaje y familias para construir soluciones personalizadas, siempre comprometidos con la calidad y la sostenibilidad.</p>
					</div>
					<img src="img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="Acerca de MADECOR" class="featured-image">
				</div>
			</section>

			<hr>
            <section id="products">
				<h2>Nuestros Productos</h2>
				<div class="products-container">
					<div class="product-item">
						<img src="img/2_11-chair-roof-collection-04-627x376.jpg" alt="Mobiliario Infantil" class="product-image">
						<div class="product-description">
							<h3>Mobiliario Infantil</h3>
							<p>Escritorios, sillas y estanterías diseñados para proporcionar comodidad y funcionalidad a los niños.</p>
						</div>
					</div>

					<div class="product-item">
						<img src="img/proyecto2.jpg" alt="Materiales Educativos" class="product-image">
						<div class="product-description">
							<h3>Materiales Educativos</h3>
							<p>Juegos y rompecabezas educativos que promueven el aprendizaje y el desarrollo cognitivo en los niños.</p>
						</div>
					</div>

					<div class="product-item">
						<img src="img/Juguetes madera.jpg" alt="Juguetes" class="product-image">
						<div class="product-description">
							<h3>Juguetes</h3>
							<p>Juguetes de madera seguros y divertidos que apoyan el desarrollo físico y mental de los niños.</p>
						</div>
					</div>
				</div>
			</section>

			<hr>
            <section id="projects">
				<h2>Proyectos Recientes</h2>
				<div class="projects-container">
					<div class="product-item">
						<img src="img/P1070811.jpg" alt="Proyecto 1" class="project-image">
						<div class="project-description">
							<h3>Proyecto Escuela ABC</h3>
							<p>Creación de una sala de juegos interactiva para fomentar la creatividad en los niños.</p>
						</div>
					</div>

					<div class="product-item">
						<img src="img/diseno-de-espacios-educativos.jpg" alt="Proyecto 2" class="project-image">
						<div class="project-description">
							<h3>Proyecto Espacio Educativo</h3>
							<p>Diseño de mobiliario personalizado para un centro educativo.</p>
						</div>
					</div>

					<div class="product-item">
						<img src="img/shutterstock_657449827-1.jpg" alt="Proyecto 3" class="project-image">
						<div class="project-description">
							<h3>Proyecto Familiar</h3>
							<p>Diseño de un área de juegos para el hogar.</p>
						</div>
					</div>
				</div>
			</section>
			
			<hr>
			<section id="contact">
				<h2>Contacto</h2>

				<p>¿Tienes un proyecto en mente? ¡Ponte en contacto con nosotros!</p>
				<p class="social-links">
					<a href="mailto:neitankaiber@gmail.com"><i class="fas fa-envelope"></i></a> contacto@madecor.com
				</p>
				<p>Teléfono: +593 123 456 789</p>
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
            <p>© 2025 MADECOR | Todos los derechos reservados</p>
            <p><a href="#">Términos y Condiciones</a> | <a href="#">Política de Privacidad</a></p>
            <div class="social-links-footer">
                <a href="https://www.facebook.com/darwin.panchez/" target="_blank"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/epciclon/" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="https://x.com/NexxuzHD?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank"><i class="fab fa-twitter"></i></a>
            </div>
        </div>
    </footer>
</body>

</html>

