const mongoose = require("mongoose")

const dbConnect = () => {
    const URL = 'mongodb://localhost:27017/prueba-vue';
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, 
    (err, res) => {
        if(!err){
            console.log('*******CONNECTION SUCCESSFUL*******');
        }else{
            console.log('*******CONNECTION UNSUCCESSFUL*******');
        }
    })
}

module.exports = dbConnect;