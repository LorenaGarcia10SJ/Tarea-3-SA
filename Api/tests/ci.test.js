const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/tarea';
let nuevoCiId;

describe('API CMDB - Pruebas contra servidor corriendo', () => {
  
  test('GET - debe devolver todos los CIs', async () => {
    const res = await axios.get(BASE_URL);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test('POST /registrar - debe crear un nuevo CI', async () => {
    const nuevoCI = {
      nombre: "Servidor de QA",
      tipo_ci: "Hardware",
      descripcion: "Servidor para pruebas QA",
      numero_serie: "QA123456",
      version: "v1.1",
      fecha_adquisicion: "2023-06-01",
      estado: "Activo",
      relacionado_con: null,
      padre: null,
      ubicacion: "DataCenter 2",
      responsable: "QA Team",
      fecha_cambio: "2023-07-01",
      descripcion_cambio: "Instalación inicial",
      documentacion: "http://example.com/docs",
      enlaces_incidentes: "http://example.com/incidentes",
      nivel_seguridad: "Medio",
      cumplimiento: "Cumple",
      estado_configuracion: "Aprobado",
      numero_licencia: "QA999",
      fecha_vencimiento: "2025-01-01",
      ambiente: "QA"
    };

    const res = await axios.post(`${BASE_URL}/registrar`, nuevoCI);

    expect(res.status).toBe(201);
    expect(res.data.message).toBe('CI registrado correctamente');

    nuevoCiId = res.data.id || res.data.ci?.id;
    console.warn("No se creó un CI para esta prueba",nuevoCiId);
  });

  test('GET /:id - debe obtener un CI por ID', async () => {
    if (!nuevoCiId) return console.warn("No se creó un CI para esta prueba");
    const res = await axios.get(`${BASE_URL}/${nuevoCiId}`);
    expect(res.status).toBe(200);
    expect(res.data.nombre).toBe('Servidor de QA');
  });

 /* test('PUT /actualizar/:id - debe actualizar un CI', async () => {
    if (!nuevoCiId) return console.warn("No se creó un CI para esta prueba");
    const res = await axios.put(`${BASE_URL}/actualizar/${nuevoCiId}`, {
      descripcion: "Servidor actualizado"
    });
    expect(res.status).toBe(200);
    expect(res.data.descripcion).toBe("Servidor actualizado");
  }); */

 /* test('DELETE /eliminar/:id - debe eliminar un CI', async () => {
    //if (!nuevoCiId) return console.warn("No se creó un CI para esta prueba");
    const res = await axios.delete(`${BASE_URL}/eliminar/${nuevoCiId}`);
    expect(res.status).toBe(204);
  });*/
});