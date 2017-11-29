const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// first create a schema
//      a blueprint for how documents in the collection
//      should be structured

const userSchema = new Schema ({
    	username: {type: String, required: true, unique: true},
    	password: {type: String, required: true},
    	location: {type: String, required: true}

});

//next, create a model using the Schema
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;