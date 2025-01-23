<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADECOR - Historia</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
    <?php include 'generateMenu.php'; ?>
    <header class="main-header">
        <div class="header-content">
            <div class="logo-container">
                <a href="../index.php"><img src="../img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="Logo MADECOR" class="team-photo"></a>
                <div class="company-info">
                    <h1>MADECOR</h1>
                    <p class="slogan">Materiales Educativos, Muebles para Niños y Juguetes</p>
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
            <?php generateMenu('../txt/sideHistory.txt'); ?>
        </div>
        <main class="content">
            <section id="home">
                <h2>Orígenes e Historia</h2>
                <img src="https://img.goraymi.com/2019/11/19/8ee9f5462118a94efb11df7ff28ffc90_xl.jpg" alt="Niños jugando con juguetes educativos" style="width: 40%; height: auto; border-radius: 10px; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;">
                <p>
                    MADECOR es una empresa dedicada a la fabricación y distribución de materiales educativos, muebles para niños y juguetes diseñados para estimular la imaginación y el aprendizaje en los niños. Desde sus humildes comienzos hasta convertirse en un líder del mercado, MADECOR ha mantenido su compromiso con la calidad y la innovación.
                </p>

                <h3>Los Primeros Pasos</h3>
                <p>
                    Fundada en 2005, MADECOR comenzó como un pequeño taller artesanal enfocado en la creación de juguetes de madera para comunidades locales. Inspirados en la educación Montessori, los productos iniciales estaban diseñados para ayudar a los niños a desarrollar habilidades motoras y cognitivas mientras se divertían. Pronto, la marca ganó reconocimiento por sus diseños únicos y materiales de alta calidad.
                </p>

                <h3>Expansión y Diversificación</h3>
                <div class="about-container">
                    <div class="about-text">
                        <p>
                            Con los años, MADECOR amplió su oferta para incluir muebles para niños como escritorios, sillas ergonómicas y sistemas de almacenamiento, ideales para crear ambientes educativos en el hogar y en las aulas. Además, se introdujeron juegos de construcción, rompecabezas y figuras educativas, convirtiéndose en herramientas esenciales para el aprendizaje interactivo.
                        </p>
                    </div>
                    <img src="../img/SAFFE-Modern-School-Furniture-LowerES.jpg" alt="Acerca de MADECOR" class="featured-image">
                </div>

                <h3>Innovación y Tecnología</h3>
                <p>
                    En 2015, MADECOR dio un salto hacia la digitalización al introducir un sistema de gestión de inventarios y ventas en línea. Este sistema permitió a los clientes acceder a un catálogo virtual donde podían explorar productos, realizar pedidos y recibir actualizaciones sobre la disponibilidad. Al mismo tiempo, la empresa adoptó prácticas sostenibles, asegurando que todos los materiales fueran ecológicos.
                </p>

                <h3>Impacto en la Educación</h3>
                <div class="about-container">
                    <div class="about-text">
                        <p>
                            Hoy en día, MADECOR colabora con educadores, terapeutas infantiles y diseñadores para crear productos que no solo entretienen, sino que también apoyan el desarrollo emocional y social de los niños. Con presencia en más de 20 países, la empresa sigue marcando la diferencia en la educación infantil a través de materiales diseñados para inspirar curiosidad y creatividad.
                        </p>
                    </div>
                    <img src="../img/91tXlsdS-JL.jpg" alt="Acerca de MADECOR" class="featured-image">
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
