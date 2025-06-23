const db = require('../config/config');

// Obtener todos los CI
exports.getAllCIs = async (req, res) => {
  const result = await db.query('SELECT * FROM cmdb');
  res.json(result.rows);
};

// Obtener un CI por ID
exports.getCIById = async (req, res) => {
  const { id } = req.params;
  const result = await db.query('SELECT * FROM cmdb WHERE id = $1', [id]);
  result.rows.length
    ? res.json(result.rows[0])
    : res.status(404).json({ message: "No encontrado" });
};

// Crear un nuevo CI
exports.createCI = async (req, res) => {
  const data = req.body;
  const result = await db.query(`
    INSERT INTO cmdb (
      nombre, tipo_ci, descripcion, numero_serie, version,
      fecha_adquisicion, estado, relacionado_con, padre, ubicacion,
      responsable, fecha_cambio, descripcion_cambio, documentacion,
      enlaces_incidentes, nivel_seguridad, cumplimiento, estado_configuracion,
      numero_licencia, fecha_vencimiento, ambiente
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
    ) RETURNING *`,
    [
      data.nombre, data.tipo_ci, data.descripcion, data.numero_serie, data.version,
      data.fecha_adquisicion, data.estado, data.relacionado_con, data.padre, data.ubicacion,
      data.responsable, data.fecha_cambio, data.descripcion_cambio, data.documentacion,
      data.enlaces_incidentes, data.nivel_seguridad, data.cumplimiento, data.estado_configuracion,
      data.numero_licencia, data.fecha_vencimiento, data.ambiente
    ]
  );
  res.status(201).json(result.rows[0]);
};

// Actualizar un CI
exports.updateCI = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await db.query(`
    UPDATE cmdb SET
      nombre = $1, tipo_ci = $2, descripcion = $3, numero_serie = $4, version = $5,
      fecha_adquisicion = $6, estado = $7, relacionado_con = $8, padre = $9, ubicacion = $10,
      responsable = $11, fecha_cambio = $12, descripcion_cambio = $13, documentacion = $14,
      enlaces_incidentes = $15, nivel_seguridad = $16, cumplimiento = $17, estado_configuracion = $18,
      numero_licencia = $19, fecha_vencimiento = $20, ambiente = $21
    WHERE id = $22 RETURNING *`,
    [
      data.nombre, data.tipo_ci, data.descripcion, data.numero_serie, data.version,
      data.fecha_adquisicion, data.estado, data.relacionado_con, data.padre, data.ubicacion,
      data.responsable, data.fecha_cambio, data.descripcion_cambio, data.documentacion,
      data.enlaces_incidentes, data.nivel_seguridad, data.cumplimiento, data.estado_configuracion,
      data.numero_licencia, data.fecha_vencimiento, data.ambiente,
      id
    ]
  );
  result.rowCount === 0
    ? res.status(404).json({ message: "No encontrado" })
    : res.json(result.rows[0]);
};

// Eliminar un CI
exports.deleteCI = async (req, res) => {
  const { id } = req.params;
  const result = await db.query('DELETE FROM cmdb WHERE id = $1', [id]);
  result.rowCount === 0
    ? res.status(404).json({ message: "No encontrado" })
    : res.status(204).send();
};
