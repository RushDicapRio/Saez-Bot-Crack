const { REST, Routes } = require('discord.js');
const { log } = require('../functions');
const config = require('../config');
const ExtendedClient = require('../classes/ExtendedClient');

/**
 * @param {ExtendedClient} client 
 */
module.exports = async (client) => {
    const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN || config.client.token);

    try {
        log("Commencé à charger les commandes de l'application... (cela peut prendre quelques minutes !)", 'warn');

        await rest.put(Routes.applicationCommands(config.client.id), {
            body: client.applicationcommandsArray
        });

        log("Les commandes d'application ont été chargées avec succès dans l'API Discord.", 'done');
    } catch (e) {
        log("Impossible de charger les commandes de l'application dans l'API Discord.", 'err');
    };
};