<?php
function generateMenu($menuFile) {
    if (file_exists($menuFile)) {
        $currentFile = basename($_SERVER['SCRIPT_NAME']); 
        $isIndex = ($currentFile === 'index.php'); 
        $menuItems = file($menuFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($menuItems as $menuItem) {
            list($text, $link) = explode('|', $menuItem);

            if (!$isIndex && strpos($link, 'php/') === 0) {
                $link = substr($link, 4); 
            }

            echo "<a href=\"$link\">$text</a>";
        }
    } else {
        echo "Menu file not found.";
    }
}
?>
