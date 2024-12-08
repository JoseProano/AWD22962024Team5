<?php
session_start();
include 'config.php';
include 'verificar_permisos.php';
verificar_permiso('Asignar');

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asignar - SPA</title>
    <link rel="stylesheet" href="../css/estilopaginas.css">
    <link rel="stylesheet" href="../css/formulario.css">
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
    <h1>Asignar</h1>
	   <p>&nbsp</p>
    <div class="avatar">
        <img src="../img/Untitled_logo_1_free-file.jpg" alt="Avatar">
    </div>
    <!-- Mostrar elementos de menú según permisos -->
    <?php if (in_array('Inicio', $permisos)): ?>
        <div class="menu-item">
            <a href="../index.php">Inicio</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Asignar', $permisos)): ?>
        <div class="menu-item">
            <a href="#">Asignar</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Cliente', $permisos)): ?>
        <div class="menu-item">
            <a href="cliente.php">Cliente</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Ventas', $permisos)): ?>
        <div class="menu-item">
            <a href="ventas.php">Ventas</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Productos', $permisos)): ?>
        <div class="menu-item">
            <a href="productos.php">Inventario</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Servicios', $permisos)): ?>
        <div class="menu-item">
            <a href="servicios.php">Servicios</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Proveedores', $permisos)): ?>
        <div class="menu-item">
            <a href="proveedores.php">Proveedores</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Reportes', $permisos)): ?>
        <div class="menu-item">
            <a href="reportes.php">Reportes</a>
        </div>
    <?php endif; ?>
</div>


    <div class="main-content1">
        <!-- Mini Menú -->
        <div class="mini-menu">
			<a href="#" class="tab-button active" id="listTab">Usuarios</a>
            <a href="#" class="tab-button" id="newProfileTab">Nuevo Usuario</a>    
        </div>

        <!-- Contenido Principal -->
		<section id="listSection" >
            <h2>Listado de Usuarios</h2>
            <div id="userTable">
                <!-- Aquí se cargará la tabla de usuarios mediante AJAX -->
            </div>
        </section>
		
        <section id="formSection" style="display:none;">
			<p>&nbsp</p>
            <form action="save.php" method="POST">
				<input type="hidden" name="tipo" value="perfil">
				<h1 align="center">Registro Nuevo Usuario</h1>
                <div class="form-group">
                    <input type="text" id="nombre" name="nombre" required size="50%">
                    <label for="nombre">Nombre</label>
                </div>
                <div class="form-group">
                    <input type="text" id="apellido" name="apellido" required>
                    <label for="apellido">Apellido</label>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" required>
                    <label for="email">Email</label>
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
                    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required>
                    <label for="fecha_nacimiento">Fecha de Nacimiento</label>
                </div>
                <div class="form-group">
                    <input type="text" id="cedula" name="cedula" required>
                    <label for="cedula">Cédula</label>
                </div>
                <div class="form-group">
                    <input type="text" id="usuario" name="usuario" required>
                    <label for="usuario">Usuario</label>
                </div>
                <div class="form-group">
                    <input type="password" id="contraseña" name="contraseña" required>
                    <label for="contraseña">Contraseña</label>
                </div>
                <div class="form-group">
                    <input type="text" id="perfil" name="perfil" required>
                    <label for="perfil">Perfil</label>
                </div>

                <fieldset class="permissions-fieldset">
                    <legend>Permisos:</legend>
                    <div class="form-checkbox-row">
                        <input type="checkbox" id="perm_inicio" name="permisos[]" value="Inicio">
                        <label for="perm_inicio">Inicio</label>
                        <input type="checkbox" id="perm_asignar" name="permisos[]" value="Asignar">
                        <label for="perm_asignar">Asignar</label>
                        <input type="checkbox" id="perm_cliente" name="permisos[]" value="Cliente">
                        <label for="perm_cliente">Cliente</label>
                    </div>
                    <div class="form-checkbox-row">
                        <input type="checkbox" id="perm_ventas" name="permisos[]" value="Ventas">
                        <label for="perm_ventas">Ventas</label>
                        <input type="checkbox" id="perm_productos" name="permisos[]" value="Productos">
                        <label for="perm_productos">Productos</label>
                        <input type="checkbox" id="perm_servicios" name="permisos[]" value="Servicios">
                        <label for="perm_servicios">Servicios</label>
                    </div>
                    <div class="form-checkbox-row">
                        <input type="checkbox" id="perm_proveedores" name="permisos[]" value="Proveedores">
                        <label for="perm_proveedores">Proveedores</label>
                        <input type="checkbox" id="perm_reportes" name="permisos[]" value="Reportes">
                        <label for="perm_reportes">Reportes</label>
                    </div>
                </fieldset>
				<p class="centrar">
                <button type="submit">Guardar Usuario</button>
				<button type="reset">Restablecer</button>
			    </p>
            </form>
        </section>
		
		<section id="formSection1" style="display:none;">
    <!-- Este formulario será insertado dinámicamente -->
</section>
        
    </div>
	<div id="logoutModal" style="display: none;">
        <div class="modal-content">
            <p>¿Estás seguro de que deseas cerrar sesión?</p>
            <button id="confirmLogout">Sí</button>
            <button id="cancelLogout">No</button>
        </div>
    </div>

    <!-- Contenedor para mensajes flotantes -->
    <div id="messageContainer"></div>
	
	

    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
    <script src="../js/perfiles.js"></script>
    <script src="../js/codigos.js"></script>
	<script>


	</script>
</body>
</html>
