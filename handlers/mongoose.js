const { connect } = require('mongoose');
const config = require('../config');
const { log } = require('../functions');

module.exports = async () => {
    log('Démarrage de la connexion à MongoDB.', 'warn');

    await connect(process.env.MONGODB_URI || config.handler.mongodb.uri).then(() => {
        log("MongoDB est connecté à l'atlas !", 'done');
    });
};