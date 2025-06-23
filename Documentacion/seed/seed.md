[REGRESAR](/README.md)


##  Script
```
-- Limpiar tablas dependientes
DELETE FROM relaciones_ci;
DELETE FROM logs;
DELETE FROM cmdb;

-- Insertar datos iniciales
INSERT INTO cmdb (
  nombre, tipo_ci, descripcion, numero_serie, version, fecha_adquisicion,
  estado, relacionado_con, padre, ubicacion, responsable, fecha_cambio,
  descripcion_cambio, documentacion, enlaces_incidentes, nivel_seguridad,
  cumplimiento, estado_configuracion, numero_licencia, fecha_vencimiento, ambiente
) VALUES
('Base de Datos1', 'Software', 'Base de datos principal', NULL, 'v12', '2021-12-01',
 'Activo', NULL, NULL, 'Datacenter', 'DB Team', '2022-01-01', 'Instalación inicial',
 'Documentación BD', 'Ninguno', 'Alto', 'Cumple', 'Aprobado', 'BD123', '2024-01-01', 'PROD'),

('Servidor1', 'Hardware', 'Servidor de Aplicaciones', 'SN123456', 'v1.0', '2022-01-01',
 'Activo', NULL, NULL, 'Sala de Servidores 1', 'Equipo de Infraestructura', '2022-02-01',
 'Actualización de Software', '[Enlace a Manual](url)', '[Enlace a Incidente](url)',
 'Alto', 'Cumple', 'Aprobado', 'ABC123', '2023-01-01', 'PROD'),

('Aplicación', 'Software', 'Aplicación de contabilidad', NULL, 'v2.5', '2022-03-15',
 'Activo', NULL, NULL, 'Servidor1', 'Equipo de Desarrollo', '2022-04-01',
 'Parche de Seguridad', '[Enlace a Documentación Técnica](url)', '[Enlace a Incidente](url)',
 'Medio', 'Cumple', 'Aprobado', 'XYZ456', '2024-01-01', 'PROD');

```

[REGRESAR](/README.md)
