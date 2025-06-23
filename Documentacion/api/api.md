[REGRESAR](/README.md)

## DOCUMENTACIÓN DE LA API
Esta sección describe los endpoints disponibles para gestionar los Elementos de Configuración (CIs) en la CMDB.

### Endpoints

### Obtener todos los CIs

- **URL:** `http://localhost:3000/api/tarea`
- **Método:** GET
- **Descripción:** Retorna una lista con todos los CIs.
- **Respuesta exitosa:**

```json
[
    {
        "id": 2,
        "nombre": "Servidor1",
        "tipo_ci": "Hardware",
        "descripcion": "Servidor de Aplicaciones",
        "numero_serie": "SN123456",
        "version": "v1.0",
        "fecha_adquisicion": "2022-01-01T06:00:00.000Z",
        "estado": "Activo",
        "relacionado_con": 1,
        "padre": null,
        "ubicacion": "Sala de Servidores 1",
        "responsable": "Equipo de Infraestructura",
        "fecha_cambio": "2022-02-01T06:00:00.000Z",
        "descripcion_cambio": "Actualización de Software",
        "documentacion": "[Enlace a Manual](url)",
        "enlaces_incidentes": "[Enlace a Incidente](url)",
        "nivel_seguridad": "Alto",
        "cumplimiento": "Cumple",
        "estado_configuracion": "Aprobado",
        "numero_licencia": "ABC123",
        "fecha_vencimiento": "2023-01-01T06:00:00.000Z",
        "ambiente": "PROD"
    },
    {
        "id": 3,
        "nombre": "Aplicación",
        "tipo_ci": "Software",
        "descripcion": "Aplicación de contabilidad",
        "numero_serie": null,
        "version": "v2.5",
        "fecha_adquisicion": "2022-03-15T06:00:00.000Z",
        "estado": "Activo",
        "relacionado_con": 1,
        "padre": 2,
        "ubicacion": "Servidor1",
        "responsable": "Equipo de Desarrollo",
        "fecha_cambio": "2022-04-01T06:00:00.000Z",
        "descripcion_cambio": "Parche de Seguridad",
        "documentacion": "[Enlace a Documentación Técnica](url)",
        "enlaces_incidentes": "[Enlace a Incidente](url)",
        "nivel_seguridad": "Medio",
        "cumplimiento": "Cumple",
        "estado_configuracion": "Aprobado",
        "numero_licencia": "XYZ456",
        "fecha_vencimiento": "2024-01-01T06:00:00.000Z",
        "ambiente": "PROD"
    }
]
```


### Obtener CI por ID

- **URL:** `http://localhost:3000/api/tarea/:id`
- **Método:** GET
- **Parámetros:**
    id - Identificador del CI.
- **Respuesta exitosa:**

```json
{
    "id": 2,
    "nombre": "Servidor1",
    "tipo_ci": "Hardware",
    "descripcion": "Servidor de Aplicaciones",
    "numero_serie": "SN123456",
    "version": "v1.0",
    "fecha_adquisicion": "2022-01-01T06:00:00.000Z",
    "estado": "Activo",
    "relacionado_con": 1,
    "padre": null,
    "ubicacion": "Sala de Servidores 1",
    "responsable": "Equipo de Infraestructura",
    "fecha_cambio": "2022-02-01T06:00:00.000Z",
    "descripcion_cambio": "Actualización de Software",
    "documentacion": "[Enlace a Manual](url)",
    "enlaces_incidentes": "[Enlace a Incidente](url)",
    "nivel_seguridad": "Alto",
    "cumplimiento": "Cumple",
    "estado_configuracion": "Aprobado",
    "numero_licencia": "ABC123",
    "fecha_vencimiento": "2023-01-01T06:00:00.000Z",
    "ambiente": "PROD"
}
```

### Registrar CI
- **URL:** `http://localhost:3000/api/tarea/registrar`
- **Método:** POST
- **Body - raw:**
```json
{
  "nombre": "Servidor QA",
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
  "ambiente": "QA",

  "relacion_explicita": "dependencia",
  "relacion_con_id": 12
}
```
Tipos de relaciones en la CMDB
1. relacionado_con (Relación simple)
    Permite referenciar directamente otro CI por su id. Es útil para relaciones básicas o directas (por ejemplo, "esta aplicación usa esta base de datos").

2. relacion_explicita + relacion_con_id (Relación compleja)

    - relacion_explicita: tipo de relación 
    - relacion_con_id: ID del CI destino

    Se usan para insertar una fila en la tabla relaciones_ci, permitiendo relaciones más detalladas y múltiples. Puede establecer que un CI depende de varios otros, o tiene diferentes tipos de relación (por ejemplo, dependencia, herencia, etc.).

- **Respuesta exitosa:**

```json
{
    "message": "CI registrado correctamente",
    "id": 13
}
```

### Eliminar CI
- **URL:** `http://localhost:3000/api/tarea/eliminar/ID`
- **Método:** DELETE
- **Parámetros:**
    id - Identificador del CI.

- **Respuesta exitosa:**

```json
{
    "message": "CI eliminado correctamente"
}
```

### Actualizar CI
- **URL:** `http://localhost:3000/api/tarea/actualizar/ID`
- **Método:** PUT
- **Parámetros:**
    id - Identificador del CI.
- **Body - raw:**
```json
{
  "nombre": "Servidor QA Actualizado",
  "tipo_ci": "Hardware",
  "descripcion": "Servidor actualizado para ambiente de pruebas",
  "numero_serie": "SN-QA-999",
  "version": "v2.0",
  "fecha_adquisicion": "2023-06-01",
  "estado": "Activo",
  "relacionado_con": null,
  "padre": null,
  "ubicacion": "DataCenter 2",
  "responsable": "Equipo QA",
  "fecha_cambio": "2024-06-22T12:00:00",
  "descripcion_cambio": "Cambio de versión de firmware",
  "documentacion": "https://example.com/manual_actualizado",
  "enlaces_incidentes": "https://example.com/incidentes_qa",
  "nivel_seguridad": "Medio",
  "cumplimiento": "Cumple",
  "estado_configuracion": "Aprobado",
  "numero_licencia": "LIC-QA-1234",
  "fecha_vencimiento": "2025-12-31",
  "ambiente": "QA"
}
```

- **Respuesta exitosa:**

```json
{
    "message": "CI actualizado correctamente"
}
```

[REGRESAR](/README.md)