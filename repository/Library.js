let mongoose = require("mongoose"),
    Core = require("../util/dataCore").Core,
    Schema = mongoose.Schema;
    
BookRepository.$inject = ['app.userRepository'];
Core.module('app').service('app.bookRepository', BookRepository);

function BookRepository(){
    let self = this;

    self.BookSchema = new Schema({
        userName: {
            type: String,
            unique: true,
            required: true
        },
        bookName: {
            type: String,
            required: true
        },
        dateReceiving: {
            type: String,
            required: true
        }
    });	

    self.SchemaModel = mongoose.model("Book", self.BookSchema);

    self.take = function (cbSuccess, cbError) {
        self.getOne(Zone.current.data.userName)
        .then((user) => {
            if (user.bookName !== "") {
                cbError({ error: 'User have a book.'}, 400);
                return;
            }
            self.SchemaModel.findOneAndUpdate({ userName: Zone.current.data.userName }, Zone.current.data.bookName)
            .then((user) => { cbSuccess({ statusTest: 'Ok' }); })
            .catch((err) => { cbError({ error: err.message }, 500); });
        })
        .catch((err) => { cbError({ error: err.message }, 400); })
    }

    self.return = function (cbSuccess, cbError) {
        self.getOne(Zone.current.data.userName)
        .then((user) => {
            if (user.bookName === Zone.current.data.bookName) {
                cbError({ error: 'User don\'t  have this book.'}, 400);
                return;
            }
            self.SchemaModel.findOneAndRemove({ userName: Zone.current.data.userName })
            .then((user) => { cbSuccess({ statusTest: 'Ok' }); })
            .catch((err) => { cbError({ error: err.message }, 500); });
        })
        .catch((err) => { cbError({ error: err.message }, 400); })
    }
}
