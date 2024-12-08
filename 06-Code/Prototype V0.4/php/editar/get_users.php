<?php
session_start();
include '../db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM perfiles WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        ?>
        <section id="formSection1">
            <form id="editForm" action="editar/update.php" method="POST">
				<input type="hidden" name="tipo" value="perfil">
                <input type="hidden" name="id" value="<?php echo htmlspecialchars($user['id']); ?>"> <!-- Campo oculto para el ID -->
                <h1 align="center">Actualizar Usuario</h1>
                <div class="form-group">
                    <input type="text" id="nombre" name="nombre" size="50%" value="<?php echo htmlspecialchars($user['nombre']); ?>" readonly>
                    <label for="nombre">Nombre</label>
                </div>
                <div class="form-group">
                    <input type="text" id="apellido" name="apellido" value="<?php echo htmlspecialchars($user['apellido']); ?>" readonly>
                    <label for="apellido">Apellido</label>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" required>
                    <label for="email">Email</label>
                </div>
                <div class="form-group">
                    <select id="genero" name="genero" required>
                        <option value="M" <?php if ($user['genero'] === 'M') echo 'selected'; ?>>Masculino</option>
                        <option value="F" <?php if ($user['genero'] === 'F') echo 'selected'; ?>>Femenino</option>
                    </select>
                    <label for="genero">Género</label>
                </div>
                <div class="form-group">
                    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" value="<?php echo htmlspecialchars($user['fecha_nacimiento']); ?>" required>
                    <label for="fecha_nacimiento">Fecha de Nacimiento</label>
                </div>
                <div class="form-group">
                    <input type="text" id="cedula" name="cedula" value="<?php echo htmlspecialchars($user['cedula']); ?>" readonly>
                    <label for="cedula">Cédula</label>
                </div>
                <div class="form-group">
                    <input type="text" id="usuario" name="usuario" value="<?php echo htmlspecialchars($user['usuario']); ?>" required>
                    <label for="usuario">Usuario</label>
                </div>
                <div class="form-group">
                    <input type="password" id="contraseña" name="contraseña">
                    <label for="contraseña">Contraseña(Dejar en blanco si no desea cambiarla)</label>
                </div>
                <div class="form-group">
                    <input type="text" id="perfil" name="perfil" value="<?php echo htmlspecialchars($user['perfil']); ?>" required>
                    <label for="perfil">Perfil</label>
                </div>
                <fieldset class="permissions-fieldset">
                    <legend>Permisos:</legend>
                    <div class="form-checkbox-row">
                        <input type="checkbox" id="perm_inicio" name="permisos[]" value="Inicio" <?php if (in_array('Inicio', explode(',', $user['permisos']))) echo 'checked'; ?>>
                        <label for="perm_inicio">Inicio</label>
                        <input type="checkbox" id="perm_asignar" name="permisos[]" value="Asignar" <?php if (in_array('Asignar', explode(',', $user['permisos']))) echo 'checked'; ?>>
                        <label for="perm_asignar">Asignar</label>
                        <input type="checkbox" id="perm_cliente" name="permisos[]" value="Cliente" <?php if (in_array('Cliente', explode(',', $user['permisos']))) echo 'checked'; ?>>
                        <label for="perm_cliente">Cliente</label>
                    </div>
                    <div class="form-checkbox-row">
                        <input type="checkbox" id="perm_ventas" name="permisos[]" value="Ventas" <?php if (in_array('Ventas', explode(',', $user['permisos']))) echo 'checked'; ?>>
                        <label for="perm_ventas">Ventas</label>
                        <input type="checkbox" id="perm_productos" name="permisos[]" value="Productos" <?php if (in_array('Productos', explode(',', $user['permisos']))) echo 'checked'; ?>>
                        <label for="perm_productos">Productos</label>
                        <input type="checkbox" id="perm_servicios" name="permisos[]" value="Servicios" <?php if (in_array('Servicios', explode(',', $user['permisos']))) echo 'checked'; ?>>
                        <label for="perm_servicios">Servicios</label>
                    </div>
                    <div class="form-checkbox-row">
                        <input type="checkbox" id="perm_proveedores" name="permisos[]" value="Proveedores" <?php if (in_array('Proveedores', explode(',', $user['permisos']))) echo 'checked'; ?>>
                        <label for="perm_proveedores">Proveedores</label>
                        <input type="checkbox" id="perm_reportes" name="permisos[]" value="Reportes" <?php if (in_array('Reportes', explode(',', $user['permisos']))) echo 'checked'; ?>>
                        <label for="perm_reportes">Reportes</label>
                    </div>
                </fieldset>
				<p class="centrar">
                <button type="submit">Actualizar Usuario</button>
					</p>
            </form>
        </section>
        <?php
    } else {
        echo '<p>Usuario no encontrado.</p>';
    }
} else {
    echo '<p>ID no proporcionado.</p>';
}
?>
