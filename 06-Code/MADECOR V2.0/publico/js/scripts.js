
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      });
    });

    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('d-none');
    });

    document.addEventListener("DOMContentLoaded", () => {
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (!user) {
          window.location.href = "/login.html";
      } else if (user.type !== "trabajador") {
          window.location.href = "/index.html";
      }


  const modulos = user ? user.modulos : []; 

  const menuItems = {
    asignar: document.getElementById("asignarBtn"),
    cliente: document.getElementById("clienteBtn"),
    productos: document.getElementById("inventarioBtn"),
    ventas: document.getElementById("ventasBtn"),
    reportes: document.getElementById("reportesBtn"),
    permisos: document.getElementById("configuracionesBtn"),
  };

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
    "/html/asignar.html": "asignar",
    "/html/clientes.html": "cliente",
    "/html/productos.html": "productos",
    "/html/ventas.html": "ventas",
    "/html/reportes.html": "reportes",
    "/html/permisos.html": "permisos"
  };

  const requiredPermission = pagePermissions[currentPage];
  if (requiredPermission && !modulos.includes(requiredPermission)) {
    alert("No tienes permiso para acceder a esta página.");
    window.location.href = "/html/error.html"; 
  }
});


document.getElementById('cerrarSesionBtn').addEventListener('click', function () {
  const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
  logoutModal.show();
});

document.getElementById('confirmLogoutBtn').addEventListener('click', function () {
  window.location.href = '/index.html';
});
