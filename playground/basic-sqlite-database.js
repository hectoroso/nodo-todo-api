var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 250]
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

sequelize.sync({
    force: true // forces recreate of tables
}).then(function () {
    console.log('Everything synced');

    Todo.create({
        description: "Pick up package",
        completed: false
    }).then(function(todo) {
        Todo.create({
            description: "Vacuum"
        });
    }).then(function() {
        //return Todo.findById(1);
        return Todo.findAll({
            where: {
                completed: false,
                description: {
                    $like: '%P%'
                }
            }
        })
    }).then(function(todos) {
        if (todos) {
            todos.forEach(function(todo) {
                console.log(todo.toJSON());
            });
        }
        else {
            console.log('None found.');
        }
    }).catch(function(e) {
        console.log(e);
    });
});