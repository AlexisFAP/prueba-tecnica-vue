const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema(
    {
        name: {
            type:String,
        },
        id: {
            type:String,
            index: {unique: true, dropDups: true}
        },
        age: {
            type:String,
        },
        address: {
            type:String,
        },
        photo_url: {
            type:String,
        }
    },
    {
        timestamps:false,
        versionKey:false,
    }
)

module.exports = mongoose.model('users', UserScheme);