let Core = require("../util/dataCore").Core;

DataServise.$inject = ['app.bookRepository'];
Core.module('app').service('app.libraryDataServise', LibraryDataServise);

function LibraryDataServise (userRepository) {
    let self = this;

    self.takeBook = (cbSuccess, cbError) => {
        self.takeBook(
            (result) => { cbSuccess(result); },
            (err) => { cbError(err); }
        );
    }

    self.add1111 = (data, cbSuccess, cbError) => {
        self.oneUser(
            Zone.current.data.user.id,
            (result) => {                
                if (checkUserBooks(addBook, result, Zone.current.data, cbError)) return;

                let book = (addBook) ? { book : Zone.current.data.book } : { book : { name: '', date: '' } };

                self.SchemaModel.findOneAndUpdate({ _id: Zone.current.data.user.id }, book)
                .then((user) => {
                    Zone.current.data.user = rebuildUserData(user, null, null, true);
                    cbSuccess(Zone.current.data.user);
                })
                .catch((err) => { cbError({ error: err.message }, 500); });
            },
            (err, status) => { cbError(err, status); }
        );
    }

    self.books = (addBook, cbSuccess, cbError) => {   
        let emptyField = checkEmptyField(Zone.current.data.book);

        if (emptyField.length !== 0) {
            cbError({ error: "Fields empty."}, 400);
        } else {
            userRepository.workingWithBooks(
                addBook,
                (result) => { cbSuccess(result); },
                (err, status) => { cbError(err, status); }
            );
        }
    }

    self.delete = (id, cbSuccess, cbError) => {
        userRepository.deleteUser(
            id,
            () => { cbSuccess(); },
            (err) => { cbError(err); }
        );
    }

    function checkEmptyField(userData) {
        let result = [];

        for (let index in userData) {
            let field = userData[index];			
            field = field.replace(/\s*/g, '');
        
            if (field === "") result.push(index);
        }

        return result;
    }
}