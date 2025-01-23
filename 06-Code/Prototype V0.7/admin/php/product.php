<?php

include 'config.php';
include 'verify_permissions.php';
verify_permissions('Productos');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
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
    <h1>Inventario</h1>
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
        <div class="menu-item">
            <a href="client.php">Cliente</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Ventas', $permisos)): ?>
        <div class="menu-item">
            <a href="sales.php">Ventas</a>
        </div>
    <?php endif; ?>
    <?php if (in_array('Productos', $permisos)): ?>
        <div class="menu-item tab-button active">
            <a href="#">Inventario</a>
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
           <a href="#" class="tab-button active" id="listTab">Productos</a>
			<a href="#" class="tab-button" id="newProfileTab">Nuevo Producto</a>
        </div>

        <section id="listSection">
			<div class="content">
               <div class="table-wrapper">
            <h2>Listado de Productos</h2>
            <div id="userTable" class="table-container"></div>
				   </div>
				</div>
        </section>

        <section id="formSection" style="display: none;">
			<p>&nbsp</p>
            <form id="newProductForm" action="save.php" method="POST"  enctype="multipart/form-data">
                <input type="hidden" name="tipo" value="producto">
                <h1 align="center">Registro Nuevo Producto</h1>
                <div class="form-group"> 
                    <input type="text" id="nombre_producto" name="nombre_producto" required size="50%"> 
                    <label for="nombre_producto">Nombre del Producto:</label>
                </div>
                <div class="form-group">
                    <select id="proveedor_producto" name="proveedor_producto" required>
                    </select>
					<label for="proveedor_producto">Proveedor:</label>	
                </div>
				<div class="form-group">             
                    <input type="number" id="precio_producto" name="precio_producto" step="0.01" required>
                    <label for="precio_producto">Precio de Venta:</label>
                </div>
				<div class="form-group">           
                    <input type="number" id="cantidad_producto" name="cantidad_producto" required>
                    <label for="cantidad_producto">Cantidad/Stock:</label>
                </div>
             
                <div class="form-group">            
                    <input type="text" id="marca_producto" name="marca_producto" required>
                    <label for="marca_producto">Material:</label>
                </div>
                <div class="form-group">            
                    <input type="text" id="categoria_producto" name="categoria_producto" required>
                    <label for="categoria_producto">Codigo del producto:</label>
				<div class="form-group">
					<input type="file" id="imagen_producto" name="imagen_producto" accept="image/*" required>
					<label for="imagen_producto">Imagen del Producto:</label>
				</div>
				</div>
                <p class="centrar">
                <button type="submit">Guardar Producto</button>
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
	<script src="../js/scripts.js" ></script>
    <script src="../js/product.js"> </script>
    <script src="../js/validations.js"></script>
</body>
</html>
