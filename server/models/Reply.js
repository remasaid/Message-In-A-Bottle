const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


// first create a schema
//      a blueprint for how documents in the collection
//      should be structured

const replySchema = new Schema ({
    message:  {type: String, required: true},
    tone: {type: String, required: true},
    user_id: {type: ObjectId, ref: "User"},
    message_id:{type: ObjectId, ref: 'Message'},
    isRead: Boolean,
    location: String
});

//next, create a model using the Schema
const replyModel = mongoose.model('Reply', replySchema);

module.exports = replyModel;