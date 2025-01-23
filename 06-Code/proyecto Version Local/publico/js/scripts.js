// Función para activar el botón seleccionado
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      });
    });

    // Función para mostrar/esconder el menú
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('d-none');
    });

    document.addEventListener("DOMContentLoaded", () => {
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (!user) {
          // Si no hay usuario logueado, redirigir a la página de login
          window.location.href = "login.html";
      } else if (user.type !== "trabajador") {
          // Si el usuario no es trabajador, redirigirlo a la página de inicio (cliente)
          window.location.href = "index.html";
      }


  const modulos = user ? user.modulos : []; // Permisos del usuario

  // Elementos del menú lateral
  const menuItems = {
    asignar: document.getElementById("asignarBtn"),
    cliente: document.getElementById("clienteBtn"),
    productos: document.getElementById("inventarioBtn"),
    ventas: document.getElementById("ventasBtn"),
    reportes: document.getElementById("reportesBtn"),
    permisos: document.getElementById("configuracionesBtn"),
  };

  // Ocultar botones según permisos
  for (const [key, element] of Object.entries(menuItems)) {
    if (!modulos.includes(key) && element) {
      element.classList.add("d-none");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const modulos = user ? user.modulos : []; 
  const currentPage = location.pathname.split("/").pop(); 

  const pagePermissions = {
    "asignar.html": "asignar",
    "clientes.html": "cliente",
    "productos.html": "productos",
    "ventas.html": "ventas",
    "reportes.html": "reportes",
    "permisos.html": "permisos"
  };

  // Comprobar si el usuario tiene permiso para esta página
  const requiredPermission = pagePermissions[currentPage];
  if (requiredPermission && !modulos.includes(requiredPermission)) {
    // Redirigir si no tiene permiso
    alert("No tienes permiso para acceder a esta página.");
    window.location.href = "../html/error.html"; // O página de inicio
  }
});


document.getElementById('cerrarSesionBtn').addEventListener('click', function () {
  const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
  logoutModal.show();
});

document.getElementById('confirmLogoutBtn').addEventListener('click', function () {
  window.location.href = '../index.html';
});
