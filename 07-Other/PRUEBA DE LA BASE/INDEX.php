<?php
if (!extension_loaded('mongodb')) {
    die("La extensión MongoDB no está cargada.");
}

try {
    // Conectar a MongoDB Atlas
    $uri = "mongodb+srv://Epciclon:2002@basemadecor.070fd.mongodb.net/?retryWrites=true&w=majority";
    $cliente = new MongoDB\Driver\Manager($uri);

    echo "Conexión exitosa a MongoDB Atlas!<br><br>";
    
    // Obtener todos los clientes (sin filtro)
    $query = new MongoDB\Driver\Query([]);  // Sin filtro, selecciona todos los documentos
    $cursor = $cliente->executeQuery('madecor_base.clientes', $query);

    // Mostrar todos los datos de los clientes
    echo "Clientes en MongoDB Atlas:<br>";
    foreach ($cursor as $documento) {
        echo "<pre>"; // Esto ayuda a que se vea de manera más legible en la página
        print_r($documento);  // Muestra todos los campos de cada cliente
        echo "</pre><br>";
    }

} catch (MongoDB\Driver\Exception\Exception $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>

