<?php
session_start();
include 'db.php';

$cedula = isset($_GET['cedula_cliente']) ? $_GET['cedula_cliente'] : ''; 

$query = "SELECT id, cedula_cliente, total_pagar, vendedor, fecha_creacion FROM ventas";
if (!empty($cedula)) {
    $cedula = mysqli_real_escape_string($conn, $cedula);
    $query .= " WHERE cedula_cliente = '$cedula'";
}

$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    echo '<table class="user-table">';
    echo '<thead><tr>';

    $headers = ['ID', 'Cédula', 'Total', 'Vendedor', 'Fecha de Registro', 'Acciones'];
    foreach ($headers as $header) {
        echo '<th>' . htmlspecialchars($header) . '</th>';
    }

    echo '</tr></thead>';
    echo '<tbody>';

    while ($row = mysqli_fetch_assoc($result)) {
        echo '<tr>';
        echo '<td>' . htmlspecialchars($row['id']) . '</td>';
        echo '<td>' . htmlspecialchars($row['cedula_cliente']) . '</td>';
        echo '<td>' . htmlspecialchars($row['total_pagar']) . '</td>';
        echo '<td>' . htmlspecialchars($row['vendedor']) . '</td>';
        echo '<td>' . htmlspecialchars($row['fecha_creacion']) . '</td>';
        echo '<td>';
        echo '<div class="action-buttons">';
        echo '<button class="btn-invoice" data-id="' . htmlspecialchars($row['id']) . '"><i class="fa fa-file"></i> Factura</button>';
        echo '</div>';
        echo '</td>';
        echo '</tr>';
    }

    echo '</tbody>';
    echo '</table>';
} else {
    echo '<p>No hay datos disponibles.</p>';
}

mysqli_close($conn);
?>
