module.exports = function(app) {
    var todouser = require('../controler/controller');

    // todoList Routes
    app.route('/view').get(todouser.list_all_users);
    app.route('/add').post(todouser.create_a_user);
    app.route('/id:id').get(todouser.read_a_user);
    app.route('/edit:id').put(todouser.update_a_user);
    app.route('/del:id').delete(todouser.delete_a_user);
};