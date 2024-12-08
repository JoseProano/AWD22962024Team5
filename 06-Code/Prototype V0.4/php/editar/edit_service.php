
<?php
session_start();
include '../db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM servicios WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $servicio = $result->fetch_assoc(); 

    if ($servicio) {
        // Obtener productos activos
        $productStmt = $conn->prepare("SELECT * FROM productos WHERE estado = 'activo'");
        $productStmt->execute();
        $productResult = $productStmt->get_result();
        $productos = $productResult->fetch_all(MYSQLI_ASSOC);

        // Decodificar el JSON de productos añadidos
        $productos_json = json_decode($servicio['productos'], true);
        ?>
        <section id="formSection1">
            <form id="editForm" action="editar/update.php" method="POST">
                <input type="hidden" name="tipo" value="servicio">
                <input type="hidden" name="id" value="<?php echo htmlspecialchars($servicio['id']); ?>"> <!-- Campo oculto para el ID -->
                <h1 align="center">Actualizar Servicio</h1>
                
                <div class="form-group">
                    <input type="text" id="nombre_servicio" name="nombre_servicio" value="<?php echo htmlspecialchars($servicio['nombre']); ?>" required size="50%">
                    <label for="nombre_servicio">Nombre del Servicio:</label>
                </div>

                <div class="form-group">
                    <select id="producto_servicio" name="producto_servicio" required>
                        <?php
                        foreach ($productos as $producto) {
                            $selected = ($producto['id'] == $servicio['producto_servicio']) ? 'selected' : '';
                            echo "<option value=\"" . htmlspecialchars($producto['id']) . "\" $selected>" . htmlspecialchars($producto['nombre']) . "</option>";
                        }
                        ?>
                    </select>
                    <label for="producto_servicio">Producto:</label>
                </div>

                <div class="form-group">
                    <input type="number" id="cantidad_producto_servicio" name="cantidad_producto_servicio" step="1" min="1">
                    <label for="cantidad_producto_servicio">Cantidad del Producto:</label>
                </div>

                <button type="button" id="addProduct">Añadir Producto</button>

                <!-- Listado de productos añadidos -->
                <div id="addedProductsContainer">
                    <h3>Productos Añadidos</h3>
                    <ul id="addedProductsList" class="addedProductsList">
                        <?php
                        if (!empty($productos_json)) {
                            foreach ($productos_json as $producto) {
                                echo "<li>" . htmlspecialchars($producto['nombre']) . " - Cantidad: " . htmlspecialchars($producto['cantidad']) . " - Costo: " . htmlspecialchars($producto['costo']) . "</li>";
                            }
                        }
                        ?>
                    </ul>
                </div>

                <div class="form-group">
                    <textarea id="descripcion" name="descripcion" rows="4" required><?php echo htmlspecialchars($servicio['descripcion']); ?></textarea>
                    <label for="descripcion">Descripción del Servicio:</label>
                </div>

                <div class="form-group">
                    <input type="number" id="costo_servicio" name="costo_servicio" step="0.01" value="<?php echo htmlspecialchars($servicio['costo_servicio']); ?>" required>
                    <label for="costo_servicio">Costo del Servicio:</label>
                </div>

                <div class="form-group">
                    <input type="number" id="coste_total" name="coste_total" step="0.01" readonly value="<?php echo htmlspecialchars($servicio['coste_total']); ?>">
                    <label for="coste_total">Costo Total:</label>
                </div>

                <input type="hidden" name="productos_json" id="productos_json" value='<?php echo htmlspecialchars($servicio['productos_json']); ?>'>
                <p class="centrar">
                    <button type="submit">Actualizar Servicio</button>
                </p>
            </form>
        </section>
        <?php
    } else {
        echo '<p>Servicio no encontrado.</p>';
    }
} else {
    echo '<p>ID no proporcionado.</p>';
}
?>
