const { Message } = require('discord.js');
const ExtendedClient = require('../../../classes/ExtendedClient');

module.exports = {
    structure: {
        name: 'ping',
        description: 'Donne la latence du bot',
        aliases: ['p']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args
     */
    run: async (client, message, args) => {
        await message.reply({
            content: 'Ma latence est de ' + client.ws.ping +'ms'
        });
    }
};