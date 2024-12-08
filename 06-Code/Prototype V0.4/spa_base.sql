-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 30-08-2024 a las 04:50:46
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `spa_base`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cambios`
--

CREATE TABLE `cambios` (
  `id` int(11) NOT NULL,
  `id_cambiado` int(11) NOT NULL,
  `usuario_id` varchar(110) NOT NULL,
  `descripcion` text,
  `tipo_cambio` enum('Agregar','Actualizar','Activo','Inactivo') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tabla_afectada` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cambios`
--

INSERT INTO `cambios` (`id`, `id_cambiado`, `usuario_id`, `descripcion`, `tipo_cambio`, `fecha`, `tabla_afectada`) VALUES
(1, 0, 'admin', 'Cliente agregado: prueba Renso', 'Agregar', '2024-08-30 02:55:53', 'clientes'),
(2, 0, 'administrador', 'Producto agregado: Pepino', 'Agregar', '2024-08-30 03:29:43', 'productos'),
(3, 2, 'administrador', 'Cliente actualizado: Ikea Renso (Cédula: 1724354459)', 'Actualizar', '2024-08-30 03:49:43', 'clientes'),
(4, 3, 'administrador', 'Producto actualizado:  (Categoría: )', 'Actualizar', '2024-08-30 03:50:40', 'productos'),
(5, 15, 'administrador', 'Servicio actualizado:  (D: Servicio Prueba)', 'Actualizar', '2024-08-30 04:00:39', 'servicios'),
(6, 15, 'administrador', 'Servicio actualizado: Servicio Prueba (D: jasasa555)', 'Actualizar', '2024-08-30 04:01:40', 'servicios'),
(7, 2, 'administrador', 'Perfil activado: Ikea Renso (Cédula: 1755211433)', '', '2024-08-30 04:07:33', 'perfiles'),
(8, 12, 'administrador', 'Servicio desactivado: nxkzxxzk', '', '2024-08-30 04:09:13', 'servicios'),
(9, 1, 'administrador', 'Cliente activado: Darwin Panchez (Cédula: 1755897285)', 'Activo', '2024-08-30 04:09:26', 'clientes'),
(10, 2, 'administrador', 'Proveedor desactivado: Josh (Web: www.josh.com)', 'Inactivo', '2024-08-30 04:12:46', 'proveedores'),
(11, 2, 'administrador', 'Proveedor activado: Josh (Web: www.josh.com)', 'Activo', '2024-08-30 04:12:49', 'proveedores'),
(12, 2, 'administrador', 'Proveedor desactivado: Josh (Web: www.josh.com)', 'Inactivo', '2024-08-30 04:12:50', 'proveedores'),
(13, 2, 'administrador', 'Proveedor activado: Josh (Web: www.josh.com)', 'Activo', '2024-08-30 04:13:00', 'proveedores'),
(14, 2, 'administrador', 'Proveedor desactivado: Josh (Web: www.josh.com)', 'Inactivo', '2024-08-30 04:13:00', 'proveedores'),
(15, 2, 'administrador', 'Proveedor activado: Josh (Web: www.josh.com)', 'Activo', '2024-08-30 04:13:01', 'proveedores'),
(16, 2, 'administrador', 'Proveedor desactivado: Josh (Web: www.josh.com)', 'Inactivo', '2024-08-30 04:13:01', 'proveedores'),
(17, 0, 'administrador', 'Proveedor agregado: lss', 'Agregar', '2024-08-30 04:13:46', 'proveedores'),
(18, 2, 'administrador', 'Proveedor activado: Josh (Web: www.josh.com)', 'Activo', '2024-08-30 04:13:57', 'proveedores'),
(19, 2, 'administrador', 'Proveedor desactivado: Josh (Web: www.josh.com)', 'Inactivo', '2024-08-30 04:14:44', 'proveedores'),
(20, 2, 'administrador', 'Proveedor activado: Josh (Web: www.josh.com)', 'Activo', '2024-08-30 04:14:45', 'proveedores'),
(21, 2, 'administrador', 'Proveedor desactivado: Josh (Web: www.josh.com)', 'Inactivo', '2024-08-30 04:14:55', 'proveedores'),
(22, 2, 'administrador', 'Proveedor activado: Josh (Web: www.josh.com)', 'Activo', '2024-08-30 04:14:56', 'proveedores'),
(23, 2, 'administrador', 'Proveedor desactivado: Josh (Web: www.josh.com)', 'Inactivo', '2024-08-30 04:15:45', 'proveedores'),
(24, 2, 'administrador', 'Proveedor activado: Josh (Web: www.josh.com)', 'Activo', '2024-08-30 04:15:57', 'proveedores'),
(25, 2, 'administrador', 'Proveedor desactivado: Josh (Web: www.josh.com)', 'Inactivo', '2024-08-30 04:16:09', 'proveedores'),
(26, 2, 'administrador', 'Proveedor activado: Josh (Web: www.josh.com)', 'Activo', '2024-08-30 04:16:09', 'proveedores'),
(27, 3, 'administrador', 'Proveedor desactivado: lss (Web: )', 'Inactivo', '2024-08-30 04:17:11', 'proveedores'),
(28, 3, 'administrador', 'Proveedor activado: lss (Web: )', 'Activo', '2024-08-30 04:17:15', 'proveedores'),
(29, 3, 'administrador', 'Proveedor desactivado: lss (Web: )', 'Inactivo', '2024-08-30 04:17:29', 'proveedores'),
(30, 3, 'administrador', 'Proveedor activado: lss (Web: )', 'Activo', '2024-08-30 04:17:30', 'proveedores'),
(31, 3, 'administrador', 'Proveedor desactivado: lss (Web: )', 'Inactivo', '2024-08-30 04:17:40', 'proveedores'),
(32, 3, 'administrador', 'Proveedor activado: lss (Web: )', 'Activo', '2024-08-30 04:17:42', 'proveedores'),
(33, 3, 'administrador', 'Proveedor desactivado: lss (Web: )', 'Inactivo', '2024-08-30 04:17:55', 'proveedores'),
(34, 3, 'administrador', 'Proveedor activado: lss (Web: )', 'Activo', '2024-08-30 04:17:55', 'proveedores'),
(35, 3, 'administrador', 'Proveedor desactivado: lss (Web: )', 'Inactivo', '2024-08-30 04:18:06', 'proveedores'),
(36, 3, 'administrador', 'Proveedor activado: lss (Web: )', 'Activo', '2024-08-30 04:18:07', 'proveedores'),
(37, 4, 'administrador', 'Cliente actualizado: prueba Renso (Cédula: 1723415418)', 'Actualizar', '2024-08-30 04:22:42', 'clientes'),
(38, 4, 'administrador', 'Cliente actualizado: prueba Renso (Cédula: 1723415418)', 'Actualizar', '2024-08-30 04:23:46', 'clientes'),
(39, 3, 'administrador', 'Cliente actualizado: admin admin (Cédula: 1755897287)', 'Actualizar', '2024-08-30 04:24:23', 'clientes'),
(40, 3, 'administrador', 'Cliente actualizado: admin admin (Cédula: 1755897287)', 'Actualizar', '2024-08-30 04:33:21', 'clientes'),
(41, 3, 'administrador', 'Cliente actualizado: admin admin (Cédula: 1755897287)', 'Actualizar', '2024-08-30 04:36:11', 'clientes'),
(42, 3, 'administrador', 'Cliente actualizado: admin admin (Cédula: 1755897287)', 'Actualizar', '2024-08-30 04:36:31', 'clientes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `genero` enum('M','F') NOT NULL,
  `locacion` varchar(100) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `apellido`, `cedula`, `numero`, `email`, `fecha_nacimiento`, `genero`, `locacion`, `estado`, `fecha_creacion`) VALUES
(1, 'Darwin', 'Panchez', '1755897285', '0', 'javierjacome@hotmail.ec', '2024-08-12', 'M', 'machachi', 'activo', '2024-08-30 04:09:26'),
(2, 'Ikea', 'Renso', '1724354459', '955897281', 'ikea@gmail.es', '2024-08-14', 'M', 'quito', 'activo', '2024-08-30 03:49:43'),
(3, 'admin', 'admin', '1755897287', '0955897285', 'javierjacome@hotmail', '2024-08-09', 'M', 'machachi', 'activo', '2024-08-30 04:36:31'),
(4, 'prueba', 'Renso', '1723415418', '0955897285', 'admin@gmail.com', '2024-08-13', 'M', 'quito', 'activo', '2024-08-30 04:23:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

CREATE TABLE `perfiles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `genero` enum('M','F') NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `perfil` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `permisos` set('Inicio','Asignar','Cliente','Ventas','Productos','Servicios','Proveedores','Reportes') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `perfiles`
--

INSERT INTO `perfiles` (`id`, `nombre`, `apellido`, `email`, `genero`, `fecha_nacimiento`, `cedula`, `usuario`, `contraseña`, `perfil`, `permisos`, `estado`, `fecha_creacion`) VALUES
(2, 'Ikea', 'Renso', 'renso@gmail.es', 'M', '2024-08-15', '1755211433', 'Ikea', '$2y$10$eAHg82Ap.jfx4SFTf.rcjupc0DTEpZNrrfLTGDQq.vO/9X/hbkGn6', 'bodega', 'Inicio,Ventas,Productos,Proveedores,Reportes', 'activo', '2024-08-30 04:07:33'),
(3, 'Darwin', 'Panchez', 'javierjacome@hotmail.ec', 'M', '2024-08-01', '1755897285', 'darwin', '$2y$10$nPPqRfUyphPOLGeUvsoe1.Itx7Q2219P8Yv54VBdryaJYhrqCneRu', 'ventas', 'Inicio,Cliente,Ventas,Reportes', 'activo', '2024-08-28 15:34:25'),
(6, 'admin', 'admin', 'admin@gmail.com', 'M', '0000-00-00', '', 'administrador', '$2y$10$jshYTCnGKhKFK0LL0S1de.fu735sHvJyGxGHYiqvRGgiPZ7O2Sl1S', 'admin', 'Inicio,Asignar,Cliente,Ventas,Productos,Servicios,Proveedores,Reportes', 'activo', '2024-08-28 20:30:11'),
(10, 'prueba', 'Renso', 'javierjacome@hot', 'M', '2024-08-30', '1755897287', 'prueba', '$2y$10$ChcEavKvFPRQ4qrv27FF0eOt4ExurXuvFP5xD7L.SSBW97B7FK9He', 'prueba', '', 'activo', '2024-08-28 15:37:49'),
(11, 'sa', 'Renso', 'admin@gmail.es', 'M', '2024-08-07', '1723415418', 'prueba2', '$2y$10$HcWx2iuGdf1U5jRJxuR3WutQ4bUMoRrTskZaggW7JusBT32mMqrNm', 'bodega', 'Inicio,Productos,Servicios,Proveedores,Reportes', 'activo', '2024-08-30 02:53:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `proveedor` varchar(150) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `precio_compra` decimal(10,2) NOT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `codigo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `cantidad`, `proveedor`, `precio`, `precio_compra`, `marca`, `codigo`, `estado`, `fecha_creacion`) VALUES
(1, 'Acondicionador 3lt', 41, 'Pepe', '2.50', '1.00', 'EVO', '1', 'inactivo', '2024-08-29 15:02:17'),
(2, 'Acondicionador 1lt', 42, 'Pepe\r\n', '1.50', '0.00', 'EVO', '5', 'activo', '2024-08-29 14:36:30'),
(3, 'Jabon Pelo Castaño', 43, '', '5.10', '2.00', 'EVO2', '', 'activo', '2024-08-30 03:50:40'),
(4, 'Acondicionador Triple Pete', 80, 'Josh', '5.00', '2.00', 'DILAN', '4', 'activo', '2024-08-29 13:56:26'),
(5, 'Pepino', 120, '2', '8.00', '2.00', 'mercadona', '3', 'activo', '2024-08-30 03:29:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre_empresa` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `web` varchar(100) DEFAULT NULL,
  `estado` varchar(30) NOT NULL DEFAULT 'activo',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre_empresa`, `email`, `numero`, `web`, `estado`, `fecha_creacion`) VALUES
(1, 'Pepe', 'pepelascuatro@gmail.com', '55555554', 'www.pepe.com', 'activo', '2024-08-29 19:34:18'),
(2, 'Josh', 'joshlascuatro@gmail.com', '12233444', 'www.josh.com', 'activo', '2024-08-30 04:16:09'),
(3, 'lss', '', '', '', 'activo', '2024-08-30 04:18:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `productos` json DEFAULT NULL,
  `coste_total` decimal(10,2) NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL DEFAULT 'activo',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `costo_servicio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `descripcion`, `productos`, `coste_total`, `estado`, `fecha_creacion`, `costo_servicio`) VALUES
(12, 'Servicio Prueba2', 'nxkzxxzk', '[{\"id\": \"1\", \"costo\": 2.3, \"nombre\": \"Acondicionador 3lt\", \"cantidad\": 1}, {\"id\": \"2\", \"costo\": 1.5, \"nombre\": \"Acondicionador 1lt\", \"cantidad\": 2}]', '9.40', 'inactivo', '2024-08-30 04:09:13', '4.00'),
(15, 'Servicio Prueba', 'jasasa555', '[{\"id\": \"2\", \"costo\": 1.5, \"nombre\": \"Acondicionador 1lt\", \"cantidad\": 2}, {\"id\": \"3\", \"costo\": 5, \"nombre\": \"Jabon Pelo Castaño\", \"cantidad\": 2}]', '18.00', 'activo', '2024-08-30 04:01:40', '5.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `cedula_cliente` varchar(10) NOT NULL,
  `productos` json DEFAULT NULL,
  `servicios` json DEFAULT NULL,
  `iva` int(2) NOT NULL,
  `total_pagar` decimal(10,2) NOT NULL,
  `vendedor` varchar(100) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `cedula_cliente`, `productos`, `servicios`, `iva`, `total_pagar`, `vendedor`, `estado`, `fecha_creacion`) VALUES
(3, '1755897285', '[{\"id\": \"1\", \"costo\": 2.3, \"nombre\": \"Acondicionador 3lt\", \"cantidad\": 2}, {\"id\": \"3\", \"costo\": 5, \"nombre\": \"Jabon Pelo Castaño\", \"cantidad\": 2}]', '[{\"id\": \"11\", \"costo\": 31.3, \"nombre\": \"Servicio Prueba\", \"cantidad\": 1, \"productos\": [{\"id\": \"1\", \"costo\": 2.3, \"nombre\": \"Acondicionador 3lt\", \"cantidad\": 1}, {\"id\": \"3\", \"costo\": 5, \"nombre\": \"Jabon Pelo Castaño\", \"cantidad\": 5}]}]', 0, '0.00', '', 'activo', '2024-08-28 00:51:02'),
(4, '1755897285', '[{\"id\": \"1\", \"costo\": 2.3, \"nombre\": \"Acondicionador 3lt\", \"cantidad\": 2}, {\"id\": \"3\", \"costo\": 5, \"nombre\": \"Jabon Pelo Castaño\", \"cantidad\": 2}]', '[{\"id\": \"11\", \"costo\": 31.3, \"nombre\": \"Servicio Prueba\", \"cantidad\": 1, \"productos\": [{\"id\": \"1\", \"costo\": 2.3, \"nombre\": \"Acondicionador 3lt\", \"cantidad\": 1}, {\"id\": \"3\", \"costo\": 5, \"nombre\": \"Jabon Pelo Castaño\", \"cantidad\": 5}]}]', 0, '0.00', '', 'activo', '2024-08-28 00:51:04'),
(5, '1755897285', '[{\"id\": \"1\", \"costo\": 2.3, \"nombre\": \"Acondicionador 3lt\", \"cantidad\": 1}]', '[{\"id\": \"11\", \"costo\": 31.3, \"nombre\": \"Servicio Prueba\", \"cantidad\": 1, \"productos\": [{\"id\": \"1\", \"costo\": 2.3, \"nombre\": \"Acondicionador 3lt\", \"cantidad\": 1}, {\"id\": \"3\", \"costo\": 5, \"nombre\": \"Jabon Pelo Castaño\", \"cantidad\": 5}]}]', 15, '38.64', 'admin admin', 'activo', '2024-08-28 00:53:54');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cambios`
--
ALTER TABLE `cambios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- Indices de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `web` (`web`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cambios`
--
ALTER TABLE `cambios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
