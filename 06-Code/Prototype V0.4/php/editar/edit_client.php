<?php
session_start();
include '../db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM clientes WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $cliente = $result->fetch_assoc(); 

    if ($cliente) { 
        ?>
       <section id="formSection1">
    <form id="editForm" action="editar/update.php" method="POST">
        <input type="hidden" name="tipo" value="cliente">
        <input type="hidden" name="id" value="<?php echo htmlspecialchars($cliente['id']); ?>"> <!-- Campo oculto para el ID -->
        <h1 align="center">Actualizar Cliente</h1>
        
        <div class="form-group">
            <input type="text" id="nombre" name="nombre" size="50%" value="<?php echo htmlspecialchars($cliente['nombre']); ?>" required>
            <label for="nombre">Nombre</label>
        </div>
        
        <div class="form-group">
            <input type="text" id="apellido" name="apellido" value="<?php echo htmlspecialchars($cliente['apellido']); ?>" required>
            <label for="apellido">Apellido</label>
        </div>
        
        <div class="form-group">
            <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($cliente['email']); ?>" required>
            <label for="email">Email</label>
        </div>
        
        <div class="form-group">
            <select id="genero" name="genero" required>
                <option value="M" <?php if ($cliente['genero'] === 'M') echo 'selected'; ?>>Masculino</option>
                <option value="F" <?php if ($cliente['genero'] === 'F') echo 'selected'; ?>>Femenino</option>
            </select>
            <label for="genero">Género</label>
        </div>
        
        <div class="form-group">
            <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" value="<?php echo htmlspecialchars($cliente['fecha_nacimiento']); ?>" required>
            <label for="fecha_nacimiento">Fecha de Nacimiento</label>
        </div>
        
        <div class="form-group">
            <input type="text" id="cedula" name="cedula" value="<?php echo htmlspecialchars($cliente['cedula']); ?>" required>
            <label for="cedula">Cédula</label>
        </div>
        
        <div class="form-group">
            <input type="text" id="numero" name="numero" value="<?php echo htmlspecialchars($cliente['numero']); ?>" required>
            <label for="numero">Número</label>
        </div>
        
        <div class="form-group">
            <input type="text" id="locacion" name="locacion" value="<?php echo htmlspecialchars($cliente['locacion']); ?>">
            <label for="locacion">Locación</label>
        </div>

        <p class="centrar">
            <button type="submit">Actualizar Cliente</button>
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
