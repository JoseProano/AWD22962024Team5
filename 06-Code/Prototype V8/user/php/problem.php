<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADECOR - Materiales Educativos y Juguetes</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
    <?php include 'generateMenu.php'; ?>
    <header class="main-header">
        <div class="header-content">
            <div class="logo-container">
                <a href="../index.php"><img src="../img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="Equipo MADECOR" class="team-photo"></a>
                <div class="company-info">
                    <h1>MADECOR</h1>
                    <p class="slogan">Materiales Educativos, Muebles Infantiles y Juguetes</p>
                </div>
            </div>
        </div>
<div class="login-icon">
    <?php
    session_start();
    if (isset($_SESSION['usuario'])) {
        echo '<span>Bienvenido, ' . htmlspecialchars($_SESSION['usuario']) . '</span>';
        echo ' <a href="logout.php" title="Cerrar sesión"><i class="fa fa-sign-out" aria-hidden="true"></i></a>';
    } else {
        echo '<a href="../../admin/php/login.php" title="Login"><i class="fa fa-sign-in" aria-hidden="true"></i></a>';
        echo ' | <a href="customer_registration.php" title="Registrarse">Registrarse</a>';
    }
    ?>
</div>

<div class="logout-container">
    <?php if (isset($_SESSION['usuario'])): ?>
        <a href="logout.php" class="logout-button">Cerrar sesión</a>
    <?php endif; ?>
</div>

    </header>

    <div class="top-menu">
        <?php generateMenu('../txt/menu.txt'); ?>
    </div>

    <div class="container">
        <div class="side-menu">
            <h3>Navegación</h3>
            <a href="#projects">Proyectos</a>
        </div>

        <main class="content">
            <section id="projects">
                <h2>Proyectos Recientes</h2>
				<hr>
                <h3>Salas de Juego Educativas Innovadoras</h3>
					<div class="projects-container">
						<div class="product-item">
							<img src="../img/P1070811.jpg" alt="Sala de Juego Interactiva" class="project-image">
							<div class="project-description">
								<h3>Proyecto Escuela ABC</h3>
								<p>Creación de una sala de juego interactiva para promover la creatividad en los niños. MADECOR colaboró con escuelas locales para crear muebles y juguetes adaptados a los pequeños aprendices.</p>
							</div>
						</div>
						<div class="product-item">
							<img src="../img/91tXlsdS-JL.jpg" alt="Sala de Juego 2" class="project-image">
							<div class="project-description">
								<h3>Aulas de Ensueño</h3>
								<p>Diseño de entornos de aula atractivos y coloridos equipados con juguetes modulares para fomentar el desarrollo cognitivo en los niños.</p>
							</div>
						</div>
						<div class="product-item">
							<img src="../img/interactive-learning-experience-stockcake.jpg" alt="Sala de Juego 3" class="project-image">
							<div class="project-description">
								<h3>Centro de Aprendizaje Interactivo</h3>
								<p>Desarrollo de áreas de juego inteligentes usando pizarras interactivas y muebles ergonómicos para mejorar los resultados de aprendizaje en jardines de infancia.</p>
							</div>
						</div>
					</div>
				
				<h3>Mobiliario Personalizado para Centros Educativos</h3>
				<div class="projects-container">
					<div class="product-item">
						<img src="../img/diseno-de-espacios-educativos.jpg" alt="Mobiliario Personalizado 1" class="project-image">
						<div class="project-description">
							<h3>Proyecto de Espacios Educativos</h3>
							<p>Diseño y fabricación de mobiliario personalizado para satisfacer las necesidades de instituciones educativas. El proyecto se centró en muebles modulares y multifuncionales para aulas.</p>
						</div>
					</div>
					<div class="product-item">
						<img src="../img/kalorias-childrens-space.jpg" alt="Espacio Creativo" class="project-image">
						<div class="project-description">
							<h3>Diseño de Espacios Creativos</h3>
							<p>Transformación de salas de estudio en espacios vibrantes y adaptables usando muebles que apoyan actividades de aprendizaje colaborativo.</p>
						</div>
					</div>
					<div class="product-item">
						<img src="../img/Apr2-_Sensory_Rooms3.jpg" alt="Muebles Funcionales" class="project-image">
						<div class="project-description">
							<h3>Esquinas de Aprendizaje Funcionales</h3>
							<p>Instalación de muebles con almacenamiento integrado y asientos ajustables para adaptarse a diferentes estilos de aprendizaje.</p>
						</div>
					</div>
				</div>

                <h3>Proyectos Familiares Personalizados</h3>
				<div class="projects-container">
					<div class="product-item">
						<img src="../img/shutterstock_657449827-1.jpg" alt="Sala de Juego Familiar" class="project-image">
						<div class="project-description">
							<h3>Proyecto Familiar</h3>
							<p>Diseño de un área de juego para el hogar familiar, incorporando materiales naturales para crear un entorno seguro y estimulante para los niños.</p>
						</div>
					</div>
					<div class="product-item">
						<img src="../img/IMG-20220403-WA0001-1024x768.jpg" alt="Área de Juego en Casa" class="project-image">
						<div class="project-description">
							<h3>Espacios Acogedores en Casa</h3>
							<p>Personalización de un área de juego pequeña para una residencia privada, con enfoque en muebles de madera y acabados vibrantes y no tóxicos.</p>
						</div>
					</div>
				</div>

				<h3>Colecciones de Juguetes Ecológicos</h3>
				<div class="projects-container">
					<div class="product-item">
						<img src="../img/Green hydrogen displayed as miniature car on grass field with wind turbine.png" alt="Juguete Ecológico 1" class="project-image">
						<div class="project-description">
							<h3>Iniciativa Juguetes Verdes</h3>
							<p>Desarrollo de una colección de juguetes ecológicos, con énfasis en la sostenibilidad. Estos juguetes están hechos con madera reciclada y pinturas no tóxicas.</p>
						</div>
					</div>
					<div class="product-item">
						<img src="../img/kids-sustainability-activities-playing-outside-1x1-1.jpg" alt="Juguete Ecológico 2" class="project-image">
						<div class="project-description">
							<h3>Diversión Sostenible</h3>
							<p>Lanzamiento de una nueva serie de juguetes sostenibles para el desarrollo infantil temprano, fabricados con materiales reciclados.</p>
						</div>
					</div>
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
