const axios = require('axios');

const API = 'http://localhost:3000/api/tarea';

describe('API CMDB - Pruebas contra servidor corriendo', () => {
  let nuevoCiId;

  test('GET - debe devolver todos los CIs', async () => {
    const res = await axios.get(API);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test('POST /registrar- debe crear un nuevo CI', async () => {
    const nuevoCI = {
        "nombre": "Servidor de QA",
        "tipo_ci": "Hardware",
        "descripcion": "Servidor para pruebas QA",
        "numero_serie": "QA123456",
        "version": "v1.1",
        "fecha_adquisicion": "2023-06-01",
        "estado": "Activo",
        "relacionado_con": null,
        "padre": null,
        "ubicacion": "DataCenter 2",
        "responsable": "QA Team",
        "fecha_cambio": "2023-07-01",
        "descripcion_cambio": "Instalación inicial",
        "documentacion": "http://example.com/docs",
        "enlaces_incidentes": "http://example.com/incidentes",
        "nivel_seguridad": "Medio",
        "cumplimiento": "Cumple",
        "estado_configuracion": "Aprobado",
        "numero_licencia": "QA999",
        "fecha_vencimiento": "2025-01-01",
        "ambiente": "QA"
        };

    const res = await axios.post(`${API}/registrar`, nuevoCI);
    expect(res.status).toBe(201);
    expect(res.data.message).toBe('CI registrado correctamente');
  });

  test('GET /:id - debe obtener un CI por ID', async () => {
    if (!nuevoCiId) return;
    const res = await axios.get(`${API}/${nuevoCiId}`);
    expect(res.status).toBe(200);
    expect(res.data.nombre).toBe('Servidor Test');
  });

  test('PUT /actualizar/:id - debe actualizar un CI', async () => {
    if (!nuevoCiId) return;
    const res = await axios.put(`${API}/${nuevoCiId}`, {
      descripcion: "Servidor actualizado"
    });
    expect(res.status).toBe(200);
    expect(res.data.descripcion).toBe("Servidor actualizado");
  });

  test('DELETE /eliminar/:id - debe eliminar un CI', async () => {
    if (!nuevoCiId) return;
    const res = await axios.delete(`${API}/${nuevoCiId}`);
    expect(res.status).toBe(204);
  });
});
