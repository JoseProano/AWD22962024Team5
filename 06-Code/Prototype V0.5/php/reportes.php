<?php
session_start();
include 'config.php';
include 'verificar_permisos.php';
verificar_permiso('Reportes');

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPA - Reportes</title>
    <link rel="stylesheet" href="../css/estilopaginas.css">
    <link rel="stylesheet" href="../css/formulario.css">
        
</head>
<body>
    <div class="header">
        <div class="header-content">
            <div class="user-info">
                <div class="username">
                    <?php echo htmlspecialchars($user['usuario']); ?>
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
        <h1>Reportes</h1>
		<p>&nbsp</p>
        <div class="avatar">
            <img src="../img/Imagen de WhatsApp 2024-11-10 a las 18.35.16_abc01734.jpg" alt="Avatar">
        </div>
        <!-- Mostrar elementos de menú según permisos -->
        <?php if (in_array('Inicio', $permisos)): ?>
            <div class="menu-item">
                <a href="sistema.php">Inicio</a>
            </div>
        <?php endif; ?>
        <?php if (in_array('Asignar', $permisos)): ?>
            <div class="menu-item">
                <a href="asignar.php">Asignar</a>
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
        <?php if (in_array('Proveedores', $permisos)): ?>
            <div class="menu-item">
                <a href="proveedores.php">Proveedores</a>
            </div>
        <?php endif; ?>
        <?php if (in_array('Reportes', $permisos)): ?>
            <div class="menu-item">
                <a href="#">Reportes</a>
            </div>
        <?php endif; ?>
    </div>

    <div class="main-content1">
        <!-- Mini Menú -->
        <div class="mini-menu">
            <a href="#" class="tab-button active" id="listTab">Listado Reportes</a>
        </div>
         <!-- Listado de Servicios -->
           <div class="content">
               <div class="table-wrapper">
      
            <div id="userTable" class="table-container"></div>
				   </div>
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
    </div>

    <script>
		// Funcionalidad de cerrar sesión
            document.getElementById('logoutBtn').addEventListener('click', function() {
                document.getElementById('logoutModal').style.display = 'block';
            });

            document.getElementById('cancelLogout').addEventListener('click', function() {
                document.getElementById('logoutModal').style.display = 'none';
            });

            document.getElementById('confirmLogout').addEventListener('click', function() {
                window.location.href = 'logout.php';
            });

        // Mostrar mensajes flotantes
        function showMessage(type, message) {
            const messageBox = document.createElement('div');
            messageBox.className = 'message ' + type;
            messageBox.textContent = message;
            document.getElementById('messageContainer').appendChild(messageBox);

            setTimeout(function() {
                messageBox.style.opacity = 0;
                setTimeout(function() {
                    document.getElementById('messageContainer').removeChild(messageBox);
                }, 300); // Tiempo para que el mensaje se desvanezca
            }, 3000); // Tiempo que el mensaje permanecerá visible
        }
		
document.addEventListener('DOMContentLoaded', function() {
    loadChangesTable();
});

function loadChangesTable() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'tabla_reportes.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('userTable').innerHTML = xhr.responseText;
        } else {
            showMessage('error', 'Error al cargar los datos');
        }
    };
    xhr.send();
}

		
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
</body>
</html>
