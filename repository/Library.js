let mongoose = require("mongoose"),
    Core = require("../util/dataCore").Core,
    Schema = mongoose.Schema;
    
Library.$inject = ['app.userRepository'];
Core.module('app').service('app.libraryRepository', Library);

function Library(userRepository){
    let self = this;

    self.BookSchema = new Schema({
        username: {
            type: String,
            unique: true,
            required: true
        },
        bookname: {
            type: String,
            required: true
        },
        dateReceiving: {
            type: String,
            required: true
        }
    });	

    self.SchemaModel = mongoose.model("Book", self.BookSchema);

    self.take = function () {
        return new Promise((resolve, reject) => {
            userRepository.getOne(Zone.current.data.username)
            .then((user) => {
                if (user.bookname !== "") {
                    reject({ message: 'User have a book.', status: 400 });
                    return;
                }

                self.SchemaModel.findOneAndUpdate({ username: Zone.current.data.username }, Zone.current.data.bookname)
                .then(() => resolve({ message: 'Ok' }))
                .catch((err) => reject({ message: err.message, status: 500 }));
            })
            .catch((err) => reject({ message: err.message, status: 400 }));
        });
    }

    self.return = function () {
        return new Promise((resolve, reject) => {
            userRepository.getOne(Zone.current.data.username)
            .then((user) => {
                if (user.booknnme === Zone.current.data.bookname) {
                    reject({ message: 'User don\'t  have this book.', status: 400 });
                    return;
                }

                self.SchemaModel.findOneAndRemove({ username: Zone.current.data.username })
                .then(() => resolve({ message: 'Ok' }))
                .catch((err) => reject({ message: err.message, status: 500 }));
            })
            .catch((err) => reject({ message: err.message, status: 400 }));
        });
    }
}
