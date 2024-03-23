const { readdirSync } = require('fs');
const { log } = require('../functions');
const ExtendedClient = require('../classes/ExtendedClient');

/**
 * @param {ExtendedClient} client
 */
module.exports = (client) => {
    for (const dir of readdirSync('./events/')) {
        for (const file of readdirSync('./events/' + dir).filter((f) => f.endsWith('.js'))) {
            const module = require('../events/' + dir + '/' + file);

            if (!module) continue;
            if (!module.event || !module.run) {
                log("Impossible de charger l'événement " + file + 'en raison des propriétés \'name\' ou/et \'run\' manquantes.','warn');
                continue;
            };

            log('Nouvel événement chargé : ' + file, 'info');

            if (module.once) {
                client.once(module.event, (...args) => module.run(client, ...args));
            } else {
                client.on(module.event, (...args) => module.run(client, ...args));
            };
        };
    };
};