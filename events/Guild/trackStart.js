const ExtendedClient = require('../../classes/ExtendedClient');
const { Queue, Track } = require('discord-player');

module.exports = {
event: 'trackStart',
/**
 * @param {ExtendedClient} client 
 * @param {Queue} queue 
 * @param {Track} track
 */
run: (client, queue, track) => {
    queue.metadata.channel.send(`Lecture en cours \`${track.title}\`...`);
}
}