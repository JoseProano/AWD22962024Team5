<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADECOR - Staff Involved</title>
    <link rel="stylesheet" href="../css/style.css">
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
        <?php generateMenu('../txt/sideStaff.txt'); ?>
    </div>
    <main class="content">
        <section id="staff">
            <h2>Our Team</h2>
            <div class="staff-grid" id="jose">
                <div class="staff-card">
                    <img src="../img/jose_ignacio.jpg" alt="José Ignacio Proaño Vásconez">
                    <h3>José Ignacio Proaño Vásconez</h3>
                    <p><strong>Role:</strong> Developer</p>
                    <p><strong>Responsibilities:</strong> Frontend Development, System Maintenance</p>
                    <p><a href="mailto:jiproano1@espe.edu.ec">jiproano1@espe.edu.ec</a></p>
                </div>
                <div class="staff-card" id="darwin">
                    <img src="../img/darwin_javier.jpg" alt="Darwin Javier Panchez Jacome">
                    <h3>Darwin Javier Panchez Jacome</h3>
                    <p><strong>Role:</strong> Developer</p>
                    <p><strong>Responsibilities:</strong> System Architecture Design, Software Testing</p>
                    <p><a href="mailto:djpanchez@espe.edu.ec">djpanchez@espe.edu.ec</a></p>
                </div>
                <div class="staff-card" id="elkin">
                    <img src="../img/elkin_andres.jpg" alt="Elkin Andres Pabon Gonzalez">
                    <h3>Elkin Andres Pabon Gonzalez</h3>
                    <p><strong>Role:</strong> Developer</p>
                    <p><strong>Responsibilities:</strong> Backend Development, Software Testing</p>
                    <p><a href="mailto:eapabon@espe.edu.ec">eapabon@espe.edu.ec</a></p>
                </div>
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
