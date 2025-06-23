const express = require('express');
const router = express.Router();
const controller = require('../controllers/tareaController');

router.get('/', controller.getAllCIs);
router.get('/:id', controller.getCIById);
router.post('/', controller.createCI);
router.put('/:id', controller.updateCI);
router.delete('/:id', controller.deleteCI);

module.exports = router;
