<?php
session_start();
include 'config.php';
include 'verify_permissions.php';
verify_permissions('Ventas');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ventas</title>
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
    <h1>Ventas</h1>
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
        <div class="menu-item tab-button active">
            <a href="#">Ventas</a>
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
			<a href="#" class="tab-button active" id="listTab">Facturas</a>
            <a href="#" class="tab-button" id="newProfileTab">Nueva Venta</a>            
        </div>
		
        <section id="listSection">
          
			<div class="content">
               <div class="table-wrapper">
            <h2>Listado de Ventas</h2>
            <div id="userTable" class="table-container"></div>
				   </div>
				</div>
      </section>

        <section id="formSection" style="display: none;">
			<p>&nbsp</p>
            <form id="newSaleForm" action="save.php" method="POST">
                <input type="hidden" name="tipo" value="venta">
                <h1 align="center">Registro de Venta</h1>
                <!-- Buscar Cliente -->
                <div class="form-group">
                    <input type="text" id="search_cliente" placeholder="Buscar Cliente (Cédula)" size="30%">
                    <button type="button" id="searchClienteBtn">Buscar Cliente</button>
                </div>

                <h3>Datos del Cliente</h3>
                <div class="form-group">
                    <input type="text" id="nombre_cliente" name="nombre_cliente" readonly>
                    <label for="nombre_cliente">Nombre:</label>
                </div>
                <div class="form-group">
                    <input type="text" id="apellido_cliente" name="apellido_cliente" readonly>
                    <label for="apellido_cliente">Apellido:</label>
                </div>
                <div class="form-group">
                    <input type="text" id="cedula_cliente" name="cedula_cliente" readonly>
                    <label for="cedula_cliente">Cédula:</label>
                </div>
                <div class="form-group">
                    <input type="text" id="numero_cliente" name="numero_cliente" readonly>
                    <label for="numero_cliente">Número:</label>
                </div>
                <div class="form-group">
                    <input type="email" id="email_cliente" name="email_cliente" readonly>
                    <label for="email_cliente">Email:</label>
                </div>
                <div class="form-group">
                    <input type="text" id="locacion_cliente" name="locacion_cliente" readonly>
                    <label for="locacion_cliente">Locación:</label>
                </div>

             <h3>Facturación</h3>
				<div class="form-group">
                    <select id="producto_venta" name="producto_venta">
                    </select>
                    <label for="producto_venta">Producto:</label>
                </div>
                               
                <div class="form-group">
                    <input type="number" id="cantidad_producto_venta" name="cantidad_producto_venta" step="1" min="1"><label for="cantidad_producto_venta">Cantidad del Producto:</label>
                    <button type="button" id="addProduct">Añadir Producto</button>
				</div>
				  
                <div id="productosAñadidosContainer">
                    <h3>Productos Añadidos</h3>
                    <ul id="productosAñadidosList" class="addedProductsList"></ul>
                </div>
  
                <div class="form-group">
                    <input type="number" id="iva_venta" name="iva_venta" step="0.01" value="15">
                    <label for="iva_venta">IVA (%) :</label>
                </div>
                <div class="form-group">
                    <input type="number" id="total_venta" name="total_venta" readonly>
                    <label for="total_venta">Total:</label>
                </div>
				<div class="form-group">
        <select id="metodo_pago" name="metodo_pago">
			<option value="disabled selected" >Metodo</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta de Débito</option>
        </select>
        <label for="metodo_pago">Método de Pago:</label>
    </div>
				
    <div id="efectivoFields" style="display: none;">
        <div class="form-group">
            <input type="number" id="monto_entregado" name="monto_entregado" step="0.01" min="0">
            <label for="monto_entregado">Monto Entregado:</label>
        </div>
        <div class="form-group">
            <input type="number" id="cambio" name="cambio" readonly>
            <label for="cambio">Cambio:</label>
        </div>
    </div>
				<h3>Datos del Vendedor</h3>
                <div class="form-group">
                    <input type="text" id="vendedor_venta" name="vendedor_venta" readonly>
                    <label for="vendedor_venta">Vendedor:</label>
                </div>
                
				<input type="hidden" name="productos_json" id="productos_json">
                <button type="submit">Guardar Venta</button>
            </form>
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
	<script src="../js/sales.js"></script>
    <script src="../js/validations.js"></script>

</body>
</html>

