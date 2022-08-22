const userModel = require('../model/user.model.js');

const multer = require('multer')

const getItems = async (req, res) => {
    try {
        const data = await userModel.find();
        res.send({data});
    } catch (e) {
        console.log(e);
        res.send(e)
    }
}

const createItem = async (req, res) => {
    try {
        const body = req.body;
        const data = await userModel.create(body);
        res.send({data})
    } catch (e) {
        console.log(e);
        res.send(e)
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = await userModel.updateOne({id:id}, body);
        res.send({data})
    } catch (e) {
        console.log(e);
        res.send(e)
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userModel.deleteOne({id:id});
        res.send({data})
    } catch (e) {
        console.log(e);
        res.send(e)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../backend/uploads')
    },
    filename: (req, file, cb) => {
        
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({ storage })

module.exports = { getItems, createItem, updateItem, deleteItem, upload };