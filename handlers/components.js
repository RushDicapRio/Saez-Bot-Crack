const { readdirSync } = require('fs');
const { log } = require('../functions');
const ExtendedClient = require('../classes/ExtendedClient');

/** 
 * @param {ExtendedClient} client 
 */
module.exports = (client) => {
    for (const dir of readdirSync('./components/')) {
        for (const file of readdirSync('./components/' + dir).filter((f) => f.endsWith('.js'))) {
            const module = require('../components/' + dir + '/' + file);

            if (!module) continue;
            if (dir === 'button') {
                if (!module.customId || !module.run) {
                    log('Impossible de charger le composant ' + file + 'en raison de propriétés \'structure#customId\' ou/et \'run\' manquantes.', 'warn');
                    continue;
                };

                client.collection.components.buttons.set(module.customId, module);
            } else if (dir === 'select') {
                if (!module.customId || !module.run) {
                    log('Impossible de charger le menu de sélection ' + file + 'en raison de propriétés \'structure#customId\' ou/et \'run\' manquantes.', 'warn');
                    continue;
                };

                client.collection.components.selects.set(module.customId, module);
            } else {
                log('Type de composant non valide : ' + file, 'warn');
                continue;
            };

            log('Nouveau composant chargé : ' + file, 'info');
        };
    };
};