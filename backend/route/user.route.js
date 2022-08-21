const express = require('express');
const router = express.Router();
const { getItems, createItem, updateItem, deleteItem, upload } = require('../controller/user.controller.js');

router.get('/', getItems);

router.post('/', createItem);

router.put('/:id',  updateItem);

router.delete('/:id', deleteItem);

router.post('/photo', upload.single('file'), (req, res) => {
    res.send({ data:'Imagen cargada'})
})

module.exports = router;