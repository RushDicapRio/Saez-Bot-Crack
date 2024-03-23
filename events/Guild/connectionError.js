const ExtendedClient = require('../../classes/ExtendedClient');
const { Queue } = require('discord-player');

module.exports = {
event: 'connectionError',
/**
 * @param {ExtendedClient } client 
 * @param {Queue} queue 
 * @param {Error} connection
 */
run: (client, queue, err) => {
    console.log(err);
    console.log(`Erreur de connexion dans ${queue.guild.name} | ${queue.guild.id}`);
}
}