<?php
session_start();
include 'config.php';
include 'verify_permissions.php';
verify_permissions('Cliente');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cliente</title>
    <link rel="stylesheet" href="../css/stylePages.css">
    <link rel="stylesheet" href="../css/forms.css">
</head>
<body>
    <div class="header">
    <div class="header-content">
        <div class="user-info">
			<div class="username">
                <?php echo htmlspecialchars($user['usuario'] ); ?>
            </div>
            <div class="avatar">
                <img src="../img/avatar-male2.png" alt="Avatar">
            </div>
            
        </div>
        <button class="logout" id="logoutBtn">
            <i class="fa fa-sign-out-alt"></i> Cerrar sesión
        </button>
    </div>
</div>

    <div class="sidebar">
    <h1>Cliente</h1>
	   <p>&nbsp</p>
    <div class="avatar">
        <img src="../img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="Avatar">
    </div>
    <?php if (in_array('Inicio', $permisos)): ?>
        <div class="menu-item">
            <a href="system.php">Inicio</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Asignar', $permisos)): ?>
        <div class="menu-item">
            <a href="assign.php">Asignar</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Cliente', $permisos)): ?>
        <div class="menu-item tab-button active">
            <a href="#">Cliente</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Ventas', $permisos)): ?>
        <div class="menu-item">
            <a href="sales.php">Ventas</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Productos', $permisos)): ?>
        <div class="menu-item">
            <a href="product.php">Inventario</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Proveedores', $permisos)): ?>
        <div class="menu-item">
            <a href="suppliers.php">Proveedores</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Reportes', $permisos)): ?>
        <div class="menu-item">
            <a href="report.php">Reportes</a>
        </div>
    <?php endif; ?>
</div>

    <div class="main-content1">
        <div class="mini-menu">            
            <a href="#" class="tab-button active" id="listTab">Clientes</a>
			<a href="#" class="tab-button" id="newProfileTab">Nuevo Cliente</a>
        </div>

		<section id="listSection" >
            
            <div class="content">
               <div class="table-wrapper">
            <h2>Listado de Clientes</h2>
            <div id="userTable" class="table-container"></div>
				   </div>
				</div>
        </section>
		
        <section id="formSection" style="display:none;">
			<p>&nbsp</p>
            <form action="save.php" method="POST">
                <input type="hidden" name="tipo" value="cliente">
				<h1 align="center">Registro Nuevo Cliente</h1>
                <div class="form-group">
                    <input type="text" id="nombre" name="nombre" required size="50%">
                    <label for="nombre">Nombres</label>
                </div>
                <div class="form-group">
                    <input type="text" id="apellido" name="apellido" required>
                    <label for="apellido">Apellidos</label>
                </div>
                <div class="form-group">
                    <input type="text" id="cedula" name="cedula" required>
                    <label for="cedula">Cédula</label>
                </div>
				<div class="form-group">
                    <input type="text" id="numero" name="numero" required>
                    <label for="numero">Numero</label>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email">
                    <label for="email">Email</label>
                </div>
                <div class="form-group">
                    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required>
                    <label for="fecha_nacimiento">Fecha de Nacimiento</label>
                </div>
                <div class="form-group">
                    <select id="genero" name="genero" required>
                        <option value="" disabled selected>Género</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                    <label for="genero">Género</label>
                </div>
                <div class="form-group">
                    <input type="text" id="locacion" name="locacion">
                    <label for="locacion">Locación</label>
                </div>
                <p class="centrar">
                <button type="submit">Guardar Cliente</button>
				<button type="reset">Restablecer</button>
			    </p>
            </form>
        </section>

		<section id="formSection1" style="display:none;">
</section>
    </div>
	
		

    <div id="logoutModal" style="display: none;">
        <div class="modal-content">
            <p>¿Estás seguro de que deseas cerrar sesión?</p>
            <button id="confirmLogout">Sí</button>
            <button id="cancelLogout">No</button>
        </div>
    </div>
	
    <div id="messageContainer"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
    <script src="../js/scripts.js"></script>
    <script src="../js/client.js"></script>
    <script src="../js/validations.js"></script>
</body>
</html>
