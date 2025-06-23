const db = require('../config/config');

async function seed() {
  try {
    await db.query('DELETE FROM relaciones_ci;');
    await db.query('DELETE FROM logs;');
    await db.query('DELETE FROM cmdb;');

    // 1. Insertar datos iniciales
    await db.query(`
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
    `);

    const { rows } = await db.query(`SELECT id, nombre FROM cmdb WHERE nombre IN ('Base de Datos1', 'Servidor1', 'Aplicación')`);

    const baseDatosId = rows.find(r => r.nombre === 'Base de Datos1').id;
    const servidorId = rows.find(r => r.nombre === 'Servidor1').id;
    const aplicacionId = rows.find(r => r.nombre === 'Aplicación').id;

    await db.query(
      `UPDATE cmdb SET relacionado_con = $1 WHERE id = $2`,
      [baseDatosId, servidorId]
    );

    await db.query(
      `UPDATE cmdb SET relacionado_con = $1, padre = $2 WHERE id = $3`,
      [baseDatosId, servidorId, aplicacionId]
    );

    console.log('Datos iniciales insertados correctamente.');
    process.exit(0);
  } catch (err) {
    console.error('Error al insertar datos:', err);
    process.exit(1);
  }
}

seed();

