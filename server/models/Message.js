const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;



// first create a schema
//      a blueprint for how documents in the collection
//      should be structured

const messageSchema = new Schema ({
    message: String,
    tone: String,
    replies: Boolean,
    replySentiment:String,
    user_id: {type: ObjectId, ref: "User"},
    location: String
});




//next, create a model using the Schema
const messageModel = mongoose.model('Message', messageSchema);

module.exports = messageModel;