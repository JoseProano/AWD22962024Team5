document.addEventListener('DOMContentLoaded', () => {
    // Lógica para el botón de colapsar el menú (si existe)
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Seleccionar los elementos de la pestaña y las secciones
    const listTab = document.getElementById('listTab');
    const newProfileTab = document.getElementById('newProfileTab');
    const listSection = document.getElementById('listSection');
    const formSection = document.getElementById('formSection');

    // Función para manejar el cambio de pestañas
    function activateTab(tabToActivate) {
        // Eliminar la clase activa de ambos botones
        listTab.classList.remove('active');
        newProfileTab.classList.remove('active');
        // Ocultar ambas secciones
        listSection.style.display = 'none';
        formSection.style.display = 'none';

        // Añadir la clase activa al botón seleccionado
        tabToActivate.classList.add('active');

        // Mostrar la sección correspondiente
        if (tabToActivate === listTab) {
            listSection.style.display = 'block';
        } else if (tabToActivate === newProfileTab) {
            formSection.style.display = 'block';
        }
    }

    // Simular clic en el botón "Usuarios" al cargar la página
    listTab.click(); // Forzar el clic en el botón "Usuarios"

    // Añadir la lógica para cambiar entre pestañas
    listTab.addEventListener('click', () => activateTab(listTab));
    newProfileTab.addEventListener('click', () => activateTab(newProfileTab));
});           
// Funcionalidad de cerrar sesión
            document.getElementById('logoutBtn').addEventListener('click', function() {
                document.getElementById('logoutModal').style.display = 'block';
            });

            document.getElementById('cancelLogout').addEventListener('click', function() {
                document.getElementById('logoutModal').style.display = 'none';
            });

            document.getElementById('confirmLogout').addEventListener('click', function() {
                window.location.href = 'logout.php';
            });

