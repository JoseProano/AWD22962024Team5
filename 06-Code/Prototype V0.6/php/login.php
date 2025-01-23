<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    $usuario = mysqli_real_escape_string($conn, $usuario);

    $sql = "SELECT * FROM perfiles WHERE usuario = ? AND estado = 'activo'";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['contraseña'])) {
            $_SESSION['usuario'] = $user['usuario'];
            $_SESSION['perfil'] = $user['perfil'];

            $_SESSION['permisos'] = explode(',', $user['permisos']);
            
            header('Location: system.php');
            exit();
        } else {
            $error = "Usuario o contraseña incorrectos.";
        }
    } else {
        $error = "Usuario no encontrado o cuenta inactiva.";
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="login-body">
    <div class="login-container">
        <form action="login.php" method="POST">
            <h1>Iniciar Sesión</h1>
            <?php if (isset($error)): ?>
                <p class="error"><?php echo htmlspecialchars($error); ?></p>
            <?php endif; ?>
            <div class="form-group">
                <i class="fas fa-user"></i>
                <input type="text" id="usuario" name="usuario" required placeholder=" ">
                <label for="usuario">Usuario</label>
            </div>
            <div class="form-group">
                <i class="fas fa-lock"></i>
                <input type="password" id="password" name="password" required placeholder=" " autocomplete="off">
                <label for="password">Contraseña</label>
                <i class="far fa-eye" id="togglePassword"></i>
            </div>
            <button type="submit">Entrar</button>
        </form>
    </div>
    <script>
        document.getElementById('togglePassword').addEventListener('click', function () {
            const passwordField = document.getElementById('password');
            const type = passwordField.type === 'password' ? 'text' : 'password';
            passwordField.type = type;
            this.classList.toggle('fa-eye-slash');
        });
    </script>
</body>
</html>
