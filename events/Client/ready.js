const { log } = require('../../functions');
const ExtendedClient = require('../../classes/ExtendedClient');

module.exports = {
    event: 'ready',
    once: true,
    /**
     * @param {ExtendedClient} _ 
     * @param {import('discord.js').Client<true>} client
     */
    run: (_, client) => {
        log('Connecté en tant que : ' + client.user.tag, 'done');
    }
};