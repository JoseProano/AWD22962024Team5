<?php
function generateMenu($menuFile) {
    if (file_exists($menuFile)) {
        $currentFile = basename($_SERVER['SCRIPT_NAME']); // Archivo actual
        $isIndex = ($currentFile === 'index.php'); // Verificar si estamos en index.php
        $menuItems = file($menuFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($menuItems as $menuItem) {
            list($text, $link) = explode('|', $menuItem);

            // Si no estamos en index.php, eliminar el prefijo "php/" de los enlaces
            if (!$isIndex && strpos($link, 'php/') === 0) {
                $link = substr($link, 4); // Eliminar los primeros 4 caracteres (php/)
            }

            echo "<a href=\"$link\">$text</a>";
        }
    } else {
        echo "Menu file not found.";
    }
}
?>
