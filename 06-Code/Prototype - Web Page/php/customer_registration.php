<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADECOR - Customer Registration</title>
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
        <?php generateMenu('../txt/sideCustomer.txt'); ?>
    </div>
    <main class="content">
        <section id="registration">
            <h2>Customer Registration</h2>
            <form id="registrationForm">
                <label for="fullName">Full Name:</label>
                <input type="text" id="fullName" name="fullName" required>

                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>

                <label for="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>

                <label for="address">Address:</label>
                <input type="text" id="address" name="address" required>

                <button type="submit">Register</button>
                <button type="reset">Reset</button>
            </form>
            <div id="successMessage"></div>
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
<script>
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('successMessage').textContent = "Customer successfully registered!";
        this.reset();
    });
</script>
</body>
</html>
