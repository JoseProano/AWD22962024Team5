document.addEventListener('includesLoaded', () => {
  // Activar enlaces de navegación
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // Mostrar/esconder menú lateral
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('d-none');
    });
  }

  // Verificar usuario y permisos
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    window.location.href = '/login.html';
  } else if (user.type !== 'trabajador') {
    window.location.href = '/index.html';
  }

  const modulos = user ? user.modulos : [];
  const menuItems = {
    asignar: document.getElementById('asignarBtn'),
    cliente: document.getElementById('clienteBtn'),
    productos: document.getElementById('inventarioBtn'),
    ventas: document.getElementById('ventasBtn'),
    reportes: document.getElementById('reportesBtn'),
    permisos: document.getElementById('configuracionesBtn'),
  };

  for (const [key, element] of Object.entries(menuItems)) {
    if (!modulos.includes(key) && element) {
      element.classList.add('d-none');
    }
  }

  // Verificar permisos de página
  const currentPage = location.pathname.split('/').pop();
  const pagePermissions = {
    'asignar.html': 'asignar',
    'clientes.html': 'cliente',
    'productos.html': 'productos',
    'ventas.html': 'ventas',
    'reportes.html': 'reportes',
    'permisos.html': 'permisos'
  };

  const requiredPermission = pagePermissions[currentPage];
  if (requiredPermission && !modulos.includes(requiredPermission)) {
    alert('No tienes permiso para acceder a esta página.');
    window.location.href = '/html/error.html';
  }

  // Mostrar modal de cierre de sesión
  const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener('click', () => {
      const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
      logoutModal.show();
    });
  }

  // Confirmar cierre de sesión
  const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
  if (confirmLogoutBtn) {
    confirmLogoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = '/login.html';
    });
  }
});