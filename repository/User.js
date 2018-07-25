let mongoose = require("mongoose"),
    Core = require("../util/dataCore").Core,
    Schema = mongoose.Schema;
    
Core.module('app').service('app.repository.User', SchemaDb);

function SchemaDb(){
    let self = this;

    self.UserSchema = new Schema({
            username: {
                type: String,
                unique: true,
                required: true
            },
            email: {
                type: String,
                unique: true,
                required: true
            },
            post: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            fullname: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            regDate: {
                type: String,
                required: true
            }
        });	

        self.Schema = mongoose.model("User", self.UserSchema);
}
