const ExtendedClient = require('../../classes/ExtendedClient');
const { Queue, StreamDispatcher } = require('discord-player');

module.exports = {
event: 'connectionCreate',
/**
 * @param {ExtendedClient} client 
 * @param {Queue} queue 
 * @param {StreamDispatcher} connection
 */
run: (client, queue, connection) => {
    console.log(`Connexion crée dans ${queue.guild.name} | ${queue.guild.id}`);
}
}