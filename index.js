const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/** 
 * Sempre que uma nova tarefa for criada passará neste método
 */
exports.onTaskCreateTemp = functions //Criando a função onTaskCreate
    .database
    .ref('tasks/{id}') //Escuta o nó task
    .onCreate((snapshot, context) => {

        const json = snapshot.val();
        const key = context.params.id;

        const log = Object.assign({ createAt: context.timestamp }, json);

        console.log(log);

        return admin
            .database()
            .ref(`/logs/${key}`)
            .set(log);
    });

exports.onTaskDelete = functions
    .database
    .ref('tasks/{id}')
    .onCreate((snapshot, context) => {

        const json = snapshot.val();
        const key = context.params.id;

        const log = Object.assign({ deletedAt: context.timestamp }, json);
        console.log(log);

        return admin
            .database()
            .ref(`logs/${key}`)
            .set(log);

    });

exports.onTaskUpdate = functions
    .database
    .ref('tasks/{id}')
    .onCreate((snapshot, context) => {

        const json = snapshot.val();
        const key = context.params.id;

        const log = Object.assign({ updatedAt: context.timestamp }, json);
        console.log(log);

        return admin
            .database()
            .ref(`logs/${key}`)
            .set(log);

    });