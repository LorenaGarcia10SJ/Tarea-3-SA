const express = require('express');
const router = express.Router();
const controller = require('../controllers/tareaController');

router.get('/', controller.obtenerTodos);
router.get('/:id', controller.obtenerById);
router.post('/registrar', controller.crearCi);
router.put('/actualizar/:id', controller.actualizarById);
router.delete('/eliminar/:id', controller.eliminarById);

module.exports = router;
