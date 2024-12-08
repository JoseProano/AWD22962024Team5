<?php
session_start();
include '../db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM proveedores WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $proveedor = $result->fetch_assoc(); 

    if ($proveedor) { 
        ?>
        <section id="formSection1">
            <form id="editForm" action="editar/update.php" method="POST">
                <input type="hidden" name="tipo" value="proveedor">
                <input type="hidden" name="id" value="<?php echo htmlspecialchars($proveedor['id']); ?>">
                <h1 align="center">Actualizar Proveedor</h1>
                
                <div class="form-group">
                    <input type="text" id="nombre_empresa" name="nombre_empresa" value="<?php echo htmlspecialchars($proveedor['nombre_empresa']); ?>" readonly required size="50%">
                    <label for="nombre_empresa">Nombre de la Empresa:</label>
                </div>
                <div class="form-group">
                    <input type="email" id="email_proveedor" name="email_proveedor" value="<?php echo htmlspecialchars($proveedor['email']); ?>" required>
                    <label for="email_proveedor">Email:</label>
                </div>
                <div class="form-group">
                    <input type="text" id="numero_proveedor" name="numero_proveedor" value="<?php echo htmlspecialchars($proveedor['numero']); ?>" required>
                    <label for="numero_proveedor">Número:</label>
                </div>
                <div class="form-group">
                    <input type="text" id="web_proveedor" name="web_proveedor" value="<?php echo htmlspecialchars($proveedor['web']); ?>" readonly required>
                    <label for="web_proveedor">Web:</label>
                </div>
                <p class="centrar">
                    <button type="submit">Actualizar Proveedor</button>
                </p>
            </form>
        </section>
        <?php
    } else {
        echo '<p>Proveedor no encontrado.</p>';
    }
} else {
    ?>
    <section id="formSection2">
        <form action="save.php" method="POST">
            <input type="hidden" name="tipo" value="proveedor">
            <h1 align="center">Registro Nuevo Proveedor</h1>
            
            <div class="form-group">
                <input type="text" id="nombre_empresa" name="nombre_empresa" required size="50%">
                <label for="nombre_empresa">Nombre de la Empresa</label>
            </div>
            <div class="form-group">
                <input type="email" id="email_proveedor" name="email_proveedor">
                <label for="email_proveedor">Email</label>
            </div>
            <div class="form-group">
                <input type="text" id="numero_proveedor" name="numero_proveedor">
                <label for="numero_proveedor">Número</label>
            </div>
            <div class="form-group">
                <input type="text" id="web_proveedor" name="web_proveedor">
                <label for="web_proveedor">Web</label>
            </div>
            <p class="centrar">
                <button type="submit">Guardar Proveedor</button>
            </p>
        </form>
    </section>
    <?php
}
?>
