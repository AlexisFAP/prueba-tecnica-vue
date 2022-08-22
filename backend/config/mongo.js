const mongoose = require("mongoose")

let user = '';
let password = '';

const dbConnect = () => {
    const URL = `mongodb+srv://${user}:${password}@cluster0.m9ws5.mongodb.net/?retryWrites=true&w=majority`
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