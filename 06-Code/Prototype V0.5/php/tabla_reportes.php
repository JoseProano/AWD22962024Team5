<?php
session_start();
include 'db.php';

// Consulta para obtener los datos de los cambios
$query = "SELECT id, id_cambiado, descripcion, tipo_cambio, fecha, tabla_afectada FROM cambios ORDER BY fecha DESC";
$headers = ['ID', 'ID de Cambio', 'Descripción', 'Tipo de Cambio', 'Fecha', 'Tabla Afectada'];

$result = mysqli_query($conn, $query);

// Verificar si hubo un error en la consulta
if (!$result) {
    die("Error en la consulta: " . mysqli_error($conn));
}

// Verificar el número de filas en el resultado
if (mysqli_num_rows($result) > 0) {
    echo '<table class="user-table">';
    echo '<thead><tr>';

    // Imprimir los encabezados de la tabla
    foreach ($headers as $header) {
        echo '<th>' . htmlspecialchars($header) . '</th>';
    }

    echo '</tr></thead>';
    echo '<tbody>';

    while ($row = mysqli_fetch_assoc($result)) {
        echo '<tr>';
        echo '<td>' . htmlspecialchars($row['id']) . '</td>';
        echo '<td>' . htmlspecialchars($row['id_cambiado']) . '</td>';
        echo '<td>' . htmlspecialchars($row['descripcion']) . '</td>';
        echo '<td>' . htmlspecialchars($row['tipo_cambio']) . '</td>';
        echo '<td>' . htmlspecialchars($row['fecha']) . '</td>';
        echo '<td>' . htmlspecialchars($row['tabla_afectada']) . '</td>';
        echo '</tr>';
    }

    echo '</tbody>';
    echo '</table>';
} else {
    echo '<p>No hay datos disponibles.</p>';
}

mysqli_close($conn);
?>
