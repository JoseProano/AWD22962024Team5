<?php
session_start();
include '../db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM productos WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $producto = $result->fetch_assoc(); 

    if ($producto) { 
        ?>
        <section id="formSection1">
            <form id="editForm" action="editar/update.php" method="POST">
                <input type="hidden" name="tipo" value="producto">
                <input type="hidden" name="id" value="<?php echo htmlspecialchars($producto['id']); ?>"> <!-- Campo oculto para el ID -->
                <h1 align="center">Actualizar Producto</h1>
                
                <div class="form-group">
                    <input type="text" id="nombre_producto" name="nombre_producto" value="<?php echo htmlspecialchars($producto['nombre']); ?>" readonly required size="50%" oninput="this.setCustomValidity(this.value.trim() === '' ? 'El nombre del producto es obligatorio.' : '');">
                    <label for="nombre_producto">Nombre del Producto:</label>
                </div>
                
                <div class="form-group">
                    <input type="number" id="precio_compra" name="precio_compra" step="0.01" value="<?php echo htmlspecialchars($producto['precio_compra']); ?>" required oninput="this.setCustomValidity(this.value === '' || parseFloat(this.value) <= 0 ? 'El precio de compra debe ser mayor a 0.' : '');">
                    <label for="precio_compra">Precio de Compra:</label>
                </div>
                
                <div class="form-group">
                    <input type="number" id="precio_producto" name="precio_producto" step="0.01" value="<?php echo htmlspecialchars($producto['precio']); ?>" required oninput="this.setCustomValidity(this.value === '' || parseFloat(this.value) <= 0 ? 'El precio de venta debe ser mayor a 0.' : '');">
                    <label for="precio_producto">Precio de Venta:</label>
                </div>
                
                <div class="form-group">
                    <input type="number" id="cantidad_producto" name="cantidad_producto" value="<?php echo htmlspecialchars($producto['cantidad']); ?>" required oninput="this.setCustomValidity(this.value === '' || parseInt(this.value) < 0 ? 'La cantidad debe ser 0 o mayor.' : '');">
                    <label for="cantidad_producto">Cantidad/Stock:</label>
                </div>
                
                <div class="form-group">
                    <input type="text" id="marca_producto" name="marca_producto" value="<?php echo htmlspecialchars($producto['marca']); ?>" required readonly oninput="this.setCustomValidity(this.value.trim() === '' ? 'La marca es obligatoria.' : '');">
                    <label for="marca_producto">Marca:</label>
                </div>
                
                <div class="form-group">
                    <input type="text" id="codigo_producto" name="codigo_producto" value="<?php echo htmlspecialchars($producto['codigo']); ?>" readonly required oninput="this.setCustomValidity(this.value.trim() === '' ? 'El código del producto es obligatorio.' : '');">
                    <label for="codigo_producto">Código del Producto:</label>
                </div>

                <p class="centrar">
                    <button type="submit">Actualizar Producto</button>
                </p>
            </form>
        </section>

        <?php
    } else {
        echo '<p>Producto no encontrado.</p>';
    }
} else {
    echo '<p>ID no proporcionado.</p>';
}
?>
