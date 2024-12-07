<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MADECOR - History</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
    <?php include 'generateMenu.php'; ?>
    <header class="main-header">
        <div class="header-content">
            <div class="logo-container">
                <a href="../index.php"><img src="../img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="MADECOR Logo" class="team-photo"></a>
                <div class="company-info">
                    <h1>MADECOR</h1>
                    <p class="slogan">Educational Materials, Children's Furniture, and Toys</p>
                </div>
            </div>
        </div>
    </header>

    <div class="top-menu">
        <?php generateMenu('../txt/menu.txt'); ?>
    </div>

    <div class="container">
        <div class="side-menu">
            <h3>Navigation</h3>
            <?php generateMenu('../txt/sideHistory.txt'); ?>
        </div>
        <main class="content">
            <section id="home">
                <h2>Origins and History</h2>
                <img src="../img/IMG_9549.jpg" alt="Children Playing with Educational Toys" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 20px;">
                <p>
                    MADECOR is a company dedicated to manufacturing and distributing educational materials, children's furniture, and toys designed to stimulate imagination and learning in children. From its humble beginnings to becoming a market leader, MADECOR has maintained its commitment to quality and innovation.
                </p>

                <h3>The Early Steps</h3>
                <p>
                    Founded in 2005, MADECOR started as a small artisan workshop focused on creating wooden toys for local communities. Inspired by Montessori education, the initial products were designed to help children develop motor and cognitive skills while having fun. Soon, the brand gained recognition for its unique designs and high-quality materials.
                </p>

                <h3>Expansion and Diversification</h3>
                <div class="about-container">
                    <div class="about-text">
                        <p>
                            Over the years, MADECOR expanded its offerings to include children's furniture such as desks, ergonomic chairs, and storage systems, ideal for creating educational environments at home and in classrooms. Additionally, construction sets, puzzles, and educational figures were introduced, becoming essential tools for interactive learning.
                        </p>
                    </div>
                    <img src="../img/SAFFE-Modern-School-Furniture-LowerES.jpg" alt="About MADECOR" class="featured-image">
                </div>

                <h3>Innovation and Technology</h3>
                <p>
                    In 2015, MADECOR took a leap into digitization by introducing an online inventory and sales management system. This system allowed customers to access a virtual catalog where they could explore products, place orders, and receive updates on availability. At the same time, the company adopted sustainable practices, ensuring that all materials were environmentally friendly.
                </p>

                <h3>Impact on Education</h3>
                <div class="about-container">
                    <div class="about-text">
                        <p>
                            Today, MADECOR collaborates with educators, child therapists, and designers to create products that not only entertain but also support children's emotional and social development. With a presence in more than 20 countries, the company continues to make a difference in childhood education through materials designed to inspire curiosity and creativity.

                        </p>
                    </div>
                    <img src="../img/91tXlsdS-JL.jpg" alt="About MADECOR" class="featured-image">
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
